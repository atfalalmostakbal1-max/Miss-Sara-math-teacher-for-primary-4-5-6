
import { GoogleGenAI, Chat, Modality, LiveServerMessage } from "@google/genai";
import { MISS_SARA_PROMPT } from "./constants";
import { Language } from "./types";

// Helper function for base64 decoding as per Gemini SDK guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper function for base64 encoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper function for PCM audio decoding as per Gemini SDK guidelines
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;
  private outputAudioContext: AudioContext | null = null;
  private liveSession: any = null;
  private sources = new Set<AudioBufferSourceNode>();
  private nextStartTime = 0;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async toggleAudio() {
    if (this.outputAudioContext) {
      if (this.outputAudioContext.state === 'running') {
        await this.outputAudioContext.suspend();
        return 'suspended';
      } else {
        await this.outputAudioContext.resume();
        return 'running';
      }
    }
    return 'none';
  }

  async startLessonChat(grade: string, unit: string, lesson: string, lang: Language) {
    const systemInstruction = `${MISS_SARA_PROMPT}\nCurrently teaching: Grade ${grade}, Unit: ${unit}, Lesson: ${lesson}. Output Language: ${lang === Language.Arabic ? 'Arabic' : 'English'}.`;
    
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    
    return true;
  }

  async getInitialExplanation(grade: string, lesson: string, lang: Language) {
    if (!this.chat) throw new Error("Chat not initialized");
    const prompt = lang === Language.Arabic 
      ? `ابدئي بترحيب حار بطلاب الصف ${grade} واشرحي ببراعة الفقرة الأولى فقط من درس ${lesson}. اجعلي الشرح بسيطاً جداً ومشوقاً.`
      : `Start with a warm welcome to ${grade} students and explain only the first paragraph of lesson: ${lesson}. Keep it simple and engaging.`;
      
    const response = await this.chat.sendMessage({ message: prompt });
    return response.text;
  }

  async sendMessage(message: string) {
    if (!this.chat) throw new Error("Chat not initialized");
    const response = await this.chat.sendMessage({ message });
    return response.text;
  }

  async speak(text: string, lang: Language) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say clearly and warmly: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: lang === Language.Arabic ? 'Kore' : 'Zephyr' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        await this.playRawAudio(base64Audio);
      }
    } catch (error) {
      console.error("TTS Error:", error);
    }
  }

  private async playRawAudio(base64: string) {
    if (!this.outputAudioContext) {
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    
    if (this.outputAudioContext.state === 'suspended') {
      await this.outputAudioContext.resume();
    }

    const audioBuffer = await decodeAudioData(
      decode(base64),
      this.outputAudioContext,
      24000,
      1,
    );

    const source = this.outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.outputAudioContext.destination);
    
    return new Promise((resolve) => {
      source.onended = resolve;
      source.start();
    });
  }

  async connectLive(callbacks: {
    onMessage: (text: string, isUser: boolean) => void;
    onStatusChange: (status: string, emotion: 'happy' | 'thinking' | 'talking') => void;
  }, lang: Language, grade: string, lesson: string) {
    if (this.liveSession) return;

    if (!this.outputAudioContext) {
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    
    await this.outputAudioContext.resume();
    await inputAudioContext.resume();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    let currentInputTranscription = '';
    let currentOutputTranscription = '';

    const sessionPromise = this.ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          callbacks.onStatusChange(lang === Language.Arabic ? 'ميس سارة تسمعك الآن...' : 'Miss Sara is listening...', 'happy');
          const source = inputAudioContext.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
            const pcmBlob = createBlob(inputData);
            sessionPromise.then((session) => {
              session.sendRealtimeInput({ media: pcmBlob });
            });
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContext.destination);
          this.liveSession = { sessionPromise, stream, scriptProcessor, inputAudioContext };
        },
        onmessage: async (message: LiveServerMessage) => {
          if (message.serverContent?.outputTranscription) {
            currentOutputTranscription += message.serverContent.outputTranscription.text;
          } else if (message.serverContent?.inputTranscription) {
            currentInputTranscription += message.serverContent.inputTranscription.text;
          }

          if (message.serverContent?.turnComplete) {
            if (currentInputTranscription) callbacks.onMessage(currentInputTranscription, true);
            if (currentOutputTranscription) callbacks.onMessage(currentOutputTranscription, false);
            currentInputTranscription = '';
            currentOutputTranscription = '';
          }

          const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
          if (base64EncodedAudioString) {
            callbacks.onStatusChange(lang === Language.Arabic ? 'ميس سارة تتحدث...' : 'Miss Sara is talking...', 'talking');
            this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext!.currentTime);
            const audioBuffer = await decodeAudioData(decode(base64EncodedAudioString), this.outputAudioContext!, 24000, 1);
            const source = this.outputAudioContext!.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.outputAudioContext!.destination);
            source.addEventListener('ended', () => {
              this.sources.delete(source);
              if (this.sources.size === 0) {
                callbacks.onStatusChange(lang === Language.Arabic ? 'ميس سارة تسمعك...' : 'Miss Sara is listening...', 'happy');
              }
            });
            source.start(this.nextStartTime);
            this.nextStartTime += audioBuffer.duration;
            this.sources.add(source);
          }

          if (message.serverContent?.interrupted) {
            for (const source of this.sources.values()) {
              try { source.stop(); } catch(e) {}
              this.sources.delete(source);
            }
            this.nextStartTime = 0;
          }
        },
        onerror: (e) => this.stopLive(),
        onclose: () => this.stopLive(),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        outputAudioTranscription: {},
        inputAudioTranscription: {},
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: lang === Language.Arabic ? 'Kore' : 'Zephyr' } },
        },
        systemInstruction: `${MISS_SARA_PROMPT}\nYou are in a real-time voice conversation. Use standard symbols (+, -, *, /) and match your text output to your speech.`,
      },
    });

    return sessionPromise;
  }

  async stopLive() {
    if (this.liveSession) {
      const { sessionPromise, stream, scriptProcessor, inputAudioContext } = this.liveSession;
      sessionPromise.then((session: any) => { try { session.close(); } catch(e) {} });
      stream.getTracks().forEach((track: any) => track.stop());
      scriptProcessor.disconnect();
      try { inputAudioContext.close(); } catch(e) {}
      this.liveSession = null;
      for (const source of this.sources.values()) {
        try { source.stop(); } catch(e) {}
        this.sources.delete(source);
      }
    }
  }
}

export const geminiService = new GeminiService();

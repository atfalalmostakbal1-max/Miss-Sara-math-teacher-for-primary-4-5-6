
import React, { useState, useEffect, useRef } from 'react';
import { CURRICULUM } from './constants';
import { Grade, Language, Unit, Lesson, Message } from './types';
import { geminiService } from './services/geminiService';
import { ToolRenderer } from './components/InteractiveTools';
import { 
  Book, 
  Star, 
  Pencil, 
  Palette, 
  HelpCircle, 
  Mic, 
  MicOff,
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  GraduationCap,
  Layout,
  Play,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';

const MISS_SARA_IMG = "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=256&h=256&auto=format&fit=crop";

const App: React.FC = () => {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [language, setLanguage] = useState<Language>(Language.Arabic);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLessonStarted, setIsLessonStarted] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saraStatus, setSaraStatus] = useState<string>('');
  const [saraEmotion, setEmotion] = useState<'happy' | 'thinking' | 'talking'>('happy');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isRtl = language === Language.Arabic;

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (!grade) {
      setSaraStatus(isRtl ? 'مرحباً! أنا ميس سارة، اختر صفك الدراسي' : 'Hi! I am Miss Sara, choose your grade');
    }
  }, [grade, isRtl]);

  const handleGradeSelect = (g: Grade) => {
    setGrade(g);
    setSelectedUnit(null);
    setSelectedLesson(null);
    setMessages([]);
    setSaraStatus(isRtl ? `أهلاً بك في منهج ${g}` : `Welcome to ${g} curriculum`);
  };

  const handleLessonStart = async (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsLessonStarted(false);
    setMessages([]);
    setProgress(10);
    setEmotion('happy');
    setSaraStatus(isRtl ? 'اضغط على زر "اشرحي لي" للبدء' : 'Click "Explain to me" to start');
    await geminiService.startLessonChat(grade!, selectedUnit!.title.en, lesson.title.en, language);
  };

  const startExplanation = async () => {
    setIsLoading(true);
    setIsLessonStarted(true);
    setEmotion('thinking');
    setSaraStatus(isRtl ? 'ميس سارة تحضر الدرس...' : 'Miss Sara is preparing the lesson...');
    
    try {
      const initialText = await geminiService.getInitialExplanation(grade!, selectedLesson!.title.en, language);
      setMessages([{ role: 'model', text: initialText || '' }]);
      setProgress(20);
      setSaraStatus(isRtl ? 'ميس سارة تتحدث...' : 'Miss Sara is talking...');
      setEmotion('talking');
      await geminiService.speak(initialText || '', language);
      setEmotion('happy');
      setSaraStatus(isRtl ? 'بانتظار إجابتك يا بطل!' : 'Waiting for your answer, hero!');
    } catch (error) {
      setMessages([{ role: 'model', text: isRtl ? 'حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.' : 'Connection error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const messageToSend = customPrompt || userInput;
    if (!messageToSend.trim() || isLoading) return;

    if (!customPrompt) setUserInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);
    setEmotion('thinking');
    setSaraStatus(isRtl ? 'ميس سارة تفكر...' : 'Miss Sara is thinking...');

    try {
      const aiResponse = await geminiService.sendMessage(messageToSend);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse || '' }]);
      setEmotion('talking');
      setSaraStatus(isRtl ? 'ميس سارة تشرح...' : 'Miss Sara is explaining...');
      await geminiService.speak(aiResponse || '', language);
      setEmotion('happy');
      setSaraStatus(isRtl ? 'أنت ذكي جداً، لنكمل!' : 'You are so smart, let\'s continue!');
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: isRtl ? 'أعتذر، حدث شيء غير متوقع.' : 'Oops! Something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMic = async () => {
    if (isLiveActive) {
      await geminiService.stopLive();
      setIsLiveActive(false);
      setSaraStatus(isRtl ? 'تم إغلاق الميكروفون' : 'Microphone closed');
      setEmotion('happy');
    } else {
      setIsLiveActive(true);
      setSaraStatus(isRtl ? 'جاري فتح الميكروفون...' : 'Opening microphone...');
      try {
        await geminiService.connectLive({
          onMessage: (text, isUser) => {
            if (text.trim()) {
              setMessages(prev => [...prev, { role: isUser ? 'user' : 'model', text }]);
            }
          },
          onStatusChange: (status, emotion) => {
            setSaraStatus(status);
            setEmotion(emotion);
          }
        }, language, grade!, selectedLesson?.title.en || '');
      } catch (err) {
        console.error(err);
        setIsLiveActive(false);
        setSaraStatus(isRtl ? 'تعذر فتح الميكروفون' : 'Could not open microphone');
      }
    }
  };

  const toggleAudio = async () => {
    const newState = await geminiService.toggleAudio();
    setIsAudioPaused(newState === 'suspended');
  };

  const handleSidebarClick = (action: string) => {
    if (action === 'voice') {
      toggleMic();
      return;
    }
    let prompt = "";
    switch(action) {
      case 'book': prompt = isRtl ? "أريد رؤية محتوى الكتاب المدرسي لهذا الجزء" : "I want to see the textbook content for this part"; break;
      case 'achievements': prompt = isRtl ? "هل أنا بطل ماث اليوم؟ شجعيني!" : "Am I a math hero today? Encourage me!"; break;
      case 'practice': prompt = isRtl ? "أعطيني تمرين ماث من الكتاب الآن" : "Give me a math exercise from the book now"; break;
      case 'creative': prompt = isRtl ? "اشرحي لي هذا المفهوم بطريقة مبتكرة" : "Explain this concept to me in a creative way"; break;
      case 'help': prompt = isRtl ? "أحتاج مساعدة إضافية في فهم هذا" : "I need extra help understanding this"; break;
    }
    handleSendMessage(undefined, prompt);
  };

  const handleProgressMove = (direction: 'next' | 'prev') => {
    const prompt = direction === 'next' 
      ? (isRtl ? "أكملي الشرح للفقرة التالية" : "Continue explanation to the next part")
      : (isRtl ? "أريد مراجعة الفقرة السابقة" : "I want to review the previous part");
    handleSendMessage(undefined, prompt);
    setProgress(prev => direction === 'next' ? Math.min(100, prev + 15) : Math.max(20, prev - 15));
  };

  const resetSelection = () => {
    if (isLiveActive) geminiService.stopLive();
    setSelectedLesson(null);
    setSelectedUnit(null);
    setMessages([]);
    setIsLessonStarted(false);
    setIsLiveActive(false);
    setIsAudioPaused(false);
    setProgress(0);
  };

  const SidebarButton = ({ icon, color, label, enLabel, onClick, active }: { icon: React.ReactNode, color: string, label: string, enLabel: string, onClick: () => void, active?: boolean }) => (
    <div className="relative group">
      <button 
        onClick={onClick}
        className={`w-12 h-12 rounded-2xl ${active ? 'bg-red-500 text-white animate-pulse' : color} shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-[#F3E5F5]`}
      >
        {icon}
      </button>
      <div className={`absolute ${isRtl ? 'right-16' : 'left-16'} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#4527A0] text-white text-[10px] font-bold py-1 px-3 rounded-lg whitespace-nowrap z-50 pointer-events-none shadow-xl border border-white/20`}>
        {isRtl ? label : enLabel}
      </div>
    </div>
  );

  if (!grade) {
    return (
      <div className={`min-h-screen bg-[#FDFCFE] flex flex-col items-center justify-center p-6 ${isRtl ? 'rtl' : ''}`}>
        <div className="max-w-3xl w-full text-center space-y-10 animate-fade-in">
          <div className="relative inline-block mb-4">
            <div className={`w-32 h-32 rounded-full border-4 border-[#E91E63] p-1 overflow-hidden mx-auto shadow-xl transition-all`}>
              <img src={MISS_SARA_IMG} alt="Miss Sara" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#E91E63] text-white p-2 rounded-full shadow-lg">
              <Star size={24} fill="currentColor" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#6236FF]">{isRtl ? 'ميس سارة معلمة الرياضيات الخاصة' : 'Miss Sara - Private Math Teacher'}</h1>
            <p className="text-xl text-[#B39DDB] font-bold">Primary 4 – 6 (Egypt)</p>
            <p className="text-sm text-[#9575CD] italic animate-pulse">{saraStatus}</p>
          </div>
          <div className="bg-white rounded-[40px] p-10 shadow-xl border border-[#F3E5F5]">
            <div className="flex justify-center gap-4 mb-10">
              <button onClick={() => setLanguage(Language.Arabic)} className={`px-8 py-3 rounded-2xl font-bold transition-all ${language === Language.Arabic ? 'bg-[#6236FF] text-white scale-105 shadow-lg' : 'bg-[#F3E5F5] text-[#9575CD]'}`}>عربي</button>
              <button onClick={() => setLanguage(Language.English)} className={`px-8 py-3 rounded-2xl font-bold transition-all ${language === Language.English ? 'bg-[#6236FF] text-white scale-105 shadow-lg' : 'bg-[#F3E5F5] text-[#9575CD]'}`}>English</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[Grade.Primary4, Grade.Primary5, Grade.Primary6].map((g) => (
                <button key={g} onClick={() => handleGradeSelect(g)} className="group h-48 bg-[#F3E5F5]/30 rounded-[30px] border-2 border-transparent hover:border-[#6236FF] hover:bg-white transition-all flex flex-col items-center justify-center p-6 shadow-sm hover:shadow-2xl">
                  <div className="bg-white p-4 rounded-3xl mb-4 group-hover:scale-110 transition-all"><GraduationCap size={40} className="text-[#6236FF]" /></div>
                  <span className="font-black text-[#6236FF] text-lg">{g}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedLesson) {
    return (
      <div className={`min-h-screen bg-[#FDFCFE] p-6 md:p-10 ${isRtl ? 'rtl' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <button onClick={() => setGrade(null)} className="p-4 bg-white rounded-2xl shadow-md hover:bg-[#F3E5F5] text-[#6236FF]"><ArrowLeft size={28} /></button>
              <div>
                <h1 className="text-3xl font-black text-[#4527A0]">{grade}</h1>
                <p className="text-[#9575CD] font-bold">{isRtl ? 'الفصل الدراسي الأول' : 'First Term'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-3 px-6 rounded-full shadow-md border border-[#F3E5F5]">
              <span className="font-bold text-[#E91E63]">{saraStatus}</span>
            </div>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              {CURRICULUM[grade].map((unit) => (
                <button key={unit.id} onClick={() => setSelectedUnit(unit)} className={`w-full text-right p-6 rounded-[25px] font-bold text-lg transition-all border-b-4 ${selectedUnit?.id === unit.id ? 'bg-[#6236FF] text-white border-[#4527A0] shadow-lg' : 'bg-white hover:bg-[#F3E5F5] text-[#4527A0]'}`}>
                  {isRtl ? unit.title.ar : unit.title.en}
                </button>
              ))}
            </div>
            <div className="lg:col-span-8">
              {selectedUnit ? (
                <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#F3E5F5] min-h-[500px]">
                  <h2 className="text-2xl font-black text-[#4527A0] mb-8 pb-6 border-b border-[#F3E5F5] flex items-center gap-3">
                    <Book className="text-[#6236FF]" /> {isRtl ? selectedUnit.title.ar : selectedUnit.title.en}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedUnit.lessons.map((lesson, idx) => (
                      <button key={lesson.id} onClick={() => handleLessonStart(lesson)} className="flex items-center justify-between p-5 rounded-[20px] bg-[#FDFCFE] border-2 border-[#F3E5F5] hover:border-[#6236FF] hover:bg-white group transition-all">
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-lg bg-[#E91E63] text-white flex items-center justify-center font-bold text-sm">{idx + 1}</span>
                          <span className="font-bold text-[#4527A0] group-hover:text-[#6236FF]">{isRtl ? lesson.title.ar : lesson.title.en}</span>
                        </div>
                        <ChevronRight className="text-[#BDBDBD] group-hover:text-[#6236FF]" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center bg-white border-4 border-dashed border-[#F3E5F5] rounded-[40px] p-20 text-center"><Layout size={64} className="text-[#9575CD] mb-6 animate-pulse" /><h3 className="text-2xl font-bold text-[#9575CD]">{isRtl ? 'اختر وحدة للبدء' : 'Select a Unit to Begin'}</h3></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen bg-[#F7F7F9] flex flex-col ${isRtl ? 'rtl' : ''} overflow-hidden`}>
      <header className="bg-white px-6 py-4 shadow-sm z-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={resetSelection} className="p-2 hover:bg-[#F3E5F5] rounded-xl text-[#9575CD]"><ArrowLeft size={28} /></button>
          <div className="hidden sm:block">
            <h2 className="text-lg font-black text-[#4527A0]">{isRtl ? selectedLesson.title.ar : selectedLesson.title.en}</h2>
            <span className="text-[10px] bg-[#E91E63] text-white px-2 py-0.5 rounded-full font-bold uppercase">{isLessonStarted ? 'Lesson in Progress' : 'Ready to Start'}</span>
          </div>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <div className="h-4 bg-[#F3E5F5] rounded-full overflow-hidden flex gap-1 p-1">
            {[20, 40, 60, 80, 100].map((step, i) => (
              <div key={i} className={`flex-1 h-full rounded-full transition-all duration-700 ${progress >= step ? 'bg-[#E91E63]' : 'bg-[#E0E0E0]'}`}/>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#E91E63]">{isRtl ? 'ميس سارة' : 'Miss Sara'}</p>
            <div className="flex items-center justify-end gap-1">
               {saraEmotion === 'happy' && <CheckCircle size={10} className="text-green-500" />}
               {saraEmotion === 'thinking' && <AlertCircle size={10} className="text-blue-500 animate-spin" />}
               <p className="text-[10px] text-[#9575CD] italic">{saraStatus}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleAudio} 
              className={`p-2 rounded-xl transition-all shadow-md ${isAudioPaused ? 'bg-red-500 text-white' : 'bg-[#6236FF] text-white'}`}
              title={isRtl ? (isAudioPaused ? "استئناف الحديث" : "إيقاف الحديث") : (isAudioPaused ? "Resume Speaking" : "Stop Speaking")}
            >
              {isAudioPaused ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <div className={`w-12 h-12 rounded-full border-2 border-[#E91E63] p-0.5 shadow-md transition-all ${saraEmotion === 'talking' ? 'scale-110 animate-bounce' : ''}`}>
              <img src={MISS_SARA_IMG} alt="Miss Sara" className={`w-full h-full object-cover rounded-full ${saraEmotion === 'thinking' ? 'grayscale' : ''}`} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row relative min-h-0">
        <aside className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4`}>
          <SidebarButton onClick={() => handleSidebarClick('book')} icon={<Book size={24} />} color="bg-white text-[#4527A0]" label="الكتاب" enLabel="Book" />
          <SidebarButton onClick={() => handleSidebarClick('achievements')} icon={<Star size={24} />} color="bg-white text-yellow-500" label="الإنجازات" enLabel="Achievements" />
          <SidebarButton onClick={() => handleSidebarClick('practice')} icon={<Pencil size={24} />} color="bg-white text-orange-400" label="تمرين" enLabel="Practice" />
          <SidebarButton onClick={() => handleSidebarClick('creative')} icon={<Palette size={24} />} color="bg-white text-green-400" label="إبداع" enLabel="Creative" />
          <SidebarButton onClick={() => handleSidebarClick('help')} icon={<HelpCircle size={24} />} color="bg-white text-red-400" label="مساعدة" enLabel="Help" />
          <SidebarButton 
            onClick={() => handleSidebarClick('voice')} 
            icon={isLiveActive ? <MicOff size={24} /> : <Mic size={24} />} 
            color="bg-blue-600 text-white" 
            label={isLiveActive ? "إغلاق الميكروفون" : "تحدثي معي"} 
            enLabel={isLiveActive ? "Close Mic" : "Voice Chat"} 
            active={isLiveActive}
          />
        </aside>

        <main className={`flex-1 flex flex-col min-h-0 ${isRtl ? 'lg:pr-24 lg:pl-10' : 'lg:pl-24 lg:pr-10'}`}>
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth pb-40">
            {!isLessonStarted && (
              <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#F3E5F5] text-[#6236FF]">
                  <Sparkles size={48} />
                </div>
                <h3 className="text-2xl font-black text-[#4527A0]">{isRtl ? 'هل أنت مستعد لبدء الدرس؟' : 'Are you ready to start the lesson?'}</h3>
                <button 
                  onClick={startExplanation} 
                  disabled={isLoading}
                  className="bg-[#6236FF] text-white px-10 py-4 rounded-[25px] font-black text-xl shadow-2xl hover:bg-[#4527A0] hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  <Play fill="currentColor" /> {isRtl ? 'اشرحي لي' : 'Explain to me'}
                </button>
              </div>
            )}
            {isLessonStarted && (
              <div className="max-w-4xl mx-auto w-full space-y-6">
                {selectedLesson.toolType !== 'none' && <ToolRenderer type={selectedLesson.toolType} />}
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-end gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`relative max-w-[85%] p-6 rounded-[30px] shadow-sm text-lg font-medium leading-relaxed ${m.role === 'user' ? 'bg-[#6236FF] text-white rounded-br-none shadow-indigo-100' : 'bg-white text-[#4527A0] rounded-bl-none border border-[#F3E5F5] shadow-purple-50'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-4 px-6 rounded-full border border-[#F3E5F5] flex gap-2 shadow-sm"><div className="w-2 h-2 bg-[#E91E63] rounded-full animate-bounce" /><div className="w-2 h-2 bg-[#E91E63] rounded-full animate-bounce [animation-delay:0.2s]" /><div className="w-2 h-2 bg-[#E91E63] rounded-full animate-bounce [animation-delay:0.4s]" /></div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F7F9] via-[#F7F7F9] to-transparent z-10 pointer-events-none">
            <div className="max-w-4xl mx-auto flex flex-col gap-4 pointer-events-auto">
              {isLessonStarted && (
                <div className="flex justify-between items-center gap-4 px-4">
                  <button onClick={() => handleProgressMove('prev')} disabled={isLoading || isLiveActive} className="bg-white text-[#9575CD] p-3 px-8 rounded-2xl shadow-xl border border-[#F3E5F5] font-black flex items-center gap-2 hover:bg-[#F3E5F5] transition-all disabled:opacity-50"><ChevronLeft size={24} /> {isRtl ? 'السابق' : 'Prev'}</button>
                  <button onClick={() => handleProgressMove('next')} disabled={isLoading || isLiveActive} className="bg-white text-[#6236FF] p-3 px-8 rounded-2xl shadow-xl border border-[#F3E5F5] font-black flex items-center gap-2 hover:bg-[#F3E5F5] transition-all disabled:opacity-50">{isRtl ? 'التالي' : 'Next'} <ChevronRight size={24} /></button>
                </div>
              )}
              <form onSubmit={handleSendMessage} className="relative group">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={isLiveActive ? (isRtl ? "الميكروفون مفتوح.. تحدث الآن" : "Mic is open.. speak now") : (isRtl ? "اكتب سؤالك أو إجابتك هنا..." : "Type your question or answer...")}
                  className={`w-full p-6 pr-20 bg-white rounded-[35px] shadow-2xl outline-none focus:ring-4 ring-[#6236FF]/20 border ${isLiveActive ? 'border-red-400' : 'border-[#F3E5F5]'} text-xl font-bold text-[#4527A0] transition-all`}
                  disabled={isLiveActive}
                />
                {!isLiveActive && (
                  <button type="submit" disabled={isLoading} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#6236FF] text-white w-14 h-14 rounded-full hover:bg-[#4527A0] shadow-lg flex items-center justify-center disabled:opacity-50 transition-all">
                    <Play size={28} fill="currentColor" />
                  </button>
                )}
                {isLiveActive && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1">
                    <div className="w-1.5 h-6 bg-red-500 rounded-full animate-bounce [animation-delay:0s]" />
                    <div className="w-1.5 h-8 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-6 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

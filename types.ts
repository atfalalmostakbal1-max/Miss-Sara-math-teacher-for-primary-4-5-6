
export enum Grade {
  Primary4 = 'Primary 4',
  Primary5 = 'Primary 5',
  Primary6 = 'Primary 6'
}

export enum Language {
  Arabic = 'ar',
  English = 'en'
}

export interface Lesson {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  warmup: string;
  concept: string;
  toolType: 'counters' | 'placeValue' | 'array' | 'graph' | 'none';
}

export interface Unit {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  lessons: Lesson[];
}

export interface Curriculum {
  [Grade.Primary4]: Unit[];
  [Grade.Primary5]: Unit[];
  [Grade.Primary6]: Unit[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

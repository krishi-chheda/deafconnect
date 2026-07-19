export interface CardOption {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface StepContent {
  title: string;
  subtitle: string;
  question: string;
  options: CardOption[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  communication: ('auslan' | 'interpreter' | 'chat' | 'email' | 'video' | 'in_person')[];
  delivery: string;
  location: string;
  cost: 'Free' | '$' | '$$';
  bestMatch?: boolean;
  buttonText?: string;
  detailsLink: string;
}

export interface TranslationSchema {
  chipLabel: string;
  step1: StepContent;
  step2: StepContent;
  step3: StepContent;
  results: {
    title: string;
    subtitle: string;
    backBtn: string;
    continueBtn: string;
    submitBtn: string;
    bookBtn: string;
    detailsBtn: string;
    recommendations: Recommendation[];
  };
}

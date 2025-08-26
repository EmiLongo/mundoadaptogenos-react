// src/types/FaqTypes.ts
// Interface para cada pregunta individual
export interface Question {
  title: string;
  description: string[];
}

// Interface para cada sección de preguntas
export interface FaqSection {
  sectionTitle: string;
  questions: Question[];
}

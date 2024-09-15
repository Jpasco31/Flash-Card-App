export interface Question {
  id: string;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  { id: "1", question: "What is the capital of France?", answer: "Paris" },
  {
    id: "2",
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
  {
    id: "3",
    question: 'Who wrote "To Kill a Mockingbird"?',
    answer: "Harper Lee",
  },
  {
    id: "4",
    question: "What is the boiling point of water?",
    answer: "100°C (212°F)",
  },
  {
    id: "5",
    question: "What language is primarily spoken in Brazil?",
    answer: "Portuguese",
  },
  { id: "6", question: "What is the smallest prime number?", answer: "2" },
  {
    id: "7",
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
  },
  { id: "8", question: "What is the chemical symbol for gold?", answer: "Au" },
  { id: "9", question: "What is the fastest land animal?", answer: "Cheetah" },
  {
    id: "10",
    question: "Who developed the theory of relativity?",
    answer: "Albert Einstein",
  },
];

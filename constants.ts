import { Question } from './types';
import { 
  Users, 
  Building2, 
  Fuel, 
  Flag, 
  Globe 
} from 'lucide-react';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Consumers',
    type: 'boolean',
    question: "When oil drops to $50/bbl, do consumers typically see a decrease in disposable income?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    explanation: "Consumers see INCREASED disposable income due to lower fuel costs, leaving more money for discretionary spending."
  },
  {
    id: 2,
    category: 'Energy',
    type: 'boolean',
    question: "True or False: The shale oil industry is highly vulnerable to a drop to $50/bbl due to high break-even costs.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Shale producers often have higher production costs, putting them under pressure when prices fall."
  },
  {
    id: 3,
    category: 'Business',
    type: 'multiple_choice',
    question: "Which of these non-energy industries benefits MOST directly from lower oil prices?",
    options: ["Solar Panel Manufacturing", "Airlines", "Deep Sea Drilling", "Gold Mining"],
    correctAnswer: "Airlines",
    explanation: "Energy-intensive industries like airlines and logistics see reduced operational costs and higher profit margins."
  },
  {
    id: 4,
    category: 'Nations',
    type: 'boolean',
    question: "Do oil-exporting nations typically experience a fiscal surplus when oil prices crash?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    explanation: "They face fiscal DEFICITS due to a sharp decline in government revenue."
  },
  {
    id: 5,
    category: 'Global',
    type: 'multiple_choice',
    question: "What is a potential negative side effect for the global environment?",
    options: ["Increased reforestation", "Slowed renewable transition", "Reduced plastic production", "Lower sea levels"],
    correctAnswer: "Slowed renewable transition",
    explanation: "Cheap oil reduces the immediate economic incentive to invest in green energy alternatives."
  },
  {
    id: 6,
    category: 'Nations',
    type: 'boolean',
    question: "True or False: Oil-importing nations generally see a positive impact on GDP growth.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Oil-importing nations experience a macroeconomic boost and lower inflation."
  },
  {
    id: 7,
    category: 'Energy',
    type: 'multiple_choice',
    question: "How do major oil companies typically react to a price drop?",
    options: ["Increase exploration", "Hire more staff", "Cut investments and jobs", "Lower executive bonuses only"],
    correctAnswer: "Cut investments and jobs",
    explanation: "The industry faces reduced exploration projects, investment cuts, and significant job losses/redundancies."
  },
  {
    id: 8,
    category: 'Business',
    type: 'boolean',
    question: "Does the cost of transporting goods generally increase or decrease?",
    options: ["Increase", "Decrease"],
    correctAnswer: "Decrease",
    explanation: "Businesses benefit from lower transportation expenses, contributing to reduced operational costs."
  },
  {
    id: 9,
    category: 'Nations',
    type: 'multiple_choice',
    question: "How might an oil-exporting nation cover its revenue gap?",
    options: ["Printing more money only", "Reliance on reserves and debt", "Investing in startups", "Buying more oil"],
    correctAnswer: "Reliance on reserves and debt",
    explanation: "Nations often increase borrowing or tap into sovereign wealth funds to survive the shortfall."
  },
  {
    id: 10,
    category: 'Global',
    type: 'boolean',
    question: "Is the net effect on Global Growth considered positive or negative in this scenario?",
    options: ["Positive", "Negative"],
    correctAnswer: "Positive",
    explanation: "It is a NET POSITIVE for global growth as income shifts from producers (savers) to consumers (spenders)."
  }
];

export const CATEGORY_ICONS: Record<string, any> = {
  'Consumers': Users,
  'Business': Building2,
  'Energy': Fuel,
  'Nations': Flag,
  'Global': Globe
};

export const PENALTY_MS = 5000; // 5 seconds penalty for wrong answer

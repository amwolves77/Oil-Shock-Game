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
    type: 'multiple_choice',
    question: "Which consumer outcome is MOST likely to follow a sustained oil price drop?",
    options: [
      "Higher savings rates only",
      "Reduced discretionary spending",
      "Increased discretionary spending",
      "No measurable change in consumption"
    ],
    correctAnswer: "Increased discretionary spending",
    explanation: "Lower fuel costs generally increase disposable income, which tends to support higher discretionary spending on goods and services."
  },
  {
    id: 2,
    category: 'Energy',
    type: 'boolean',
    question: "True or False: The shale oil industry is highly vulnerable to a drop to $50/bbl due to high break-even costs.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Shale producers are often more exposed to price downturns because many plays require higher prices to remain attractive, putting pressure on cashflow when prices fall."
  },
  {
    id: 3,
    category: 'Business',
    type: 'multiple_choice',
    question: "Which of these non-energy industries benefits MOST directly from lower oil prices?",
    options: ["Solar Panel Manufacturing", "Airlines", "Deep Sea Drilling", "Gold Mining"],
    correctAnswer: "Airlines",
    explanation: "Energy-intensive industries like airlines and logistics benefit from reduced fuel and transportation costs, which can lift margins."
  },
  {
    id: 4,
    category: 'Nations',
    type: 'multiple_choice',
    question: "Why do oil-exporting nations often face fiscal stress after a sharp oil price drop?",
    options: [
      "Rising import costs",
      "Reduced tax compliance",
      "Loss of hydrocarbon-linked government revenue",
      "Higher interest rates globally"
    ],
    correctAnswer: "Loss of hydrocarbon-linked government revenue",
    explanation: "Many oil-exporting governments rely heavily on oil-related revenues, so a price crash can quickly widen deficits and force spending cuts."
  },
  {
    id: 5,
    category: 'Global',
    type: 'multiple_choice',
    question: "What is a potential negative side effect for the global environment?",
    options: [
      "Increased reforestation",
      "Slowed renewable transition",
      "Reduced plastic production",
      "Lower sea levels"
    ],
    correctAnswer: "Slowed renewable transition",
    explanation: "Cheaper oil can reduce the near-term economic incentive to invest in renewable energy and other low-carbon alternatives."
  },
  {
    id: 6,
    category: 'Nations',
    type: 'boolean',
    question: "True or False: Oil-importing nations generally see a positive impact on GDP growth after a sustained oil price drop.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Lower energy import costs can act like a tailwind for oil-importing economies, supporting growth and easing inflation pressure."
  },
  {
    id: 7,
    category: 'Energy',
    type: 'multiple_choice',
    question: "Which strategic response is MOST common among oil producers during a prolonged price downturn?",
    options: [
      "Accelerating exploration to gain market share",
      "Delaying high-cost projects and cutting capex",
      "Increasing leverage to expand production",
      "Shifting entirely to renewables short-term"
    ],
    correctAnswer: "Delaying high-cost projects and cutting capex",
    explanation: "When prices fall, producers typically protect cash by cutting capex, deferring marginal projects, and reducing activity, which can also lead to layoffs."
  },
  {
    id: 8,
    category: 'Business',
    type: 'multiple_choice',
    question: "Lower oil prices most directly reduce which business cost component?",
    options: [
      "Labour costs",
      "Capital depreciation",
      "Transportation and logistics",
      "Corporate tax rates"
    ],
    correctAnswer: "Transportation and logistics",
    explanation: "Fuel is a major input cost for transport-heavy operations, so lower oil prices tend to reduce logistics and energy-related operating expenses."
  },
  {
    id: 9,
    category: 'Nations',
    type: 'multiple_choice',
    question: "How might an oil-exporting nation cover its revenue gap after a price crash?",
    options: [
      "Printing more money only",
      "Reliance on reserves and debt",
      "Investing in startups",
      "Buying more oil"
    ],
    correctAnswer: "Reliance on reserves and debt",
    explanation: "Oil exporters may borrow more or draw down reserves/sovereign wealth funds to bridge budget shortfalls when revenues fall."
  },
  {
    id: 10,
    category: 'Global',
    type: 'multiple_choice',
    question: "Why can a sharp oil price drop be a net positive for global growth?",
    options: [
      "It permanently lowers inflation everywhere",
      "It transfers income from producers to consumers",
      "It guarantees higher investment levels",
      "It eliminates energy price volatility"
    ],
    correctAnswer: "It transfers income from producers to consumers",
    explanation: "A price drop can shift income from producers to consumers, and consumers tend to spend a higher share of income, supporting demand and global growth overall."
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

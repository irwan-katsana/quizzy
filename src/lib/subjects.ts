// Define the topic structure
export interface SubjectTopic {
  standard: string;
  topics: string[];
}

export interface SubjectData {
  [subject: string]: {
    [standard: string]: string[];
  };
}

// Define the subject data
export const subjectTopics: SubjectData = {
  "Math": {
    "1": [
      "Counting and Representing Numbers",
      "Addition and Subtraction within 20",
      "Shapes (Circle, Square, Triangle, Rectangle)",
      "Comparing Length and Weight",
      "Recognizing Coins and Bills",
      "Patterns and Sequences",
      "Data Collection and Simple Graphs",
      "Time (Hour and Half-Hour)",
      "Ordinal Numbers",
      "Problem-Solving Strategies"
    ],
    "2": [
      "Multiplication Introduction",
      "Division Introduction",
      "Fractions (Halves and Quarters)",
      "2D Shapes and Symmetry",
      "Measurement (Length, Mass, Capacity)",
      "Money (Addition and Subtraction)",
      "Reading and Interpreting Graphs",
      "Time (Minutes and Hours)",
      "Estimation and Rounding",
      "Multi-Step Word Problems"
    ],
    "3": [
      "Multiplication and Division Strategies",
      "Equivalent Fractions",
      "Decimal Numbers",
      "Polygons and Angles",
      "Area and Perimeter",
      "Mass, Volume, and Capacity Conversions",
      "Probability and Data Analysis",
      "Time (24-Hour Format)",
      "Ratio and Proportion",
      "Problem-Solving Involving Fractions"
    ],
    "4": [
      "Advanced Multiplication and Division",
      "Proper and Improper Fractions",
      "Decimal Operations",
      "Transformations and Symmetry",
      "Volume and Surface Area",
      "Temperature and Unit Conversions",
      "Collecting and Interpreting Data",
      "Time Calculations and Word Problems",
      "Rates and Unit Rates",
      "Algebraic Expressions and Equations"
    ],
    "5": [
      "Operations with Fractions and Decimals",
      "Geometry and Angle Relationships",
      "Metric System Conversions",
      "Probability and Chance",
      "Patterns and Rules in Algebra",
      "Financial Literacy (Budgeting, Saving)",
      "Interpreting and Representing Data",
      "Ratio and Proportion Word Problems",
      "Applying the Order of Operations",
      "Multi-Step Problem Solving Strategies"
    ],
    "6": [
      "Complex Fraction Operations",
      "Geometric Constructions and Proofs",
      "Ratio, Proportion, and Percentage",
      "Linear Equations and Inequalities",
      "Advanced Data Analysis and Interpretation",
      "Measurement and Scale Drawings",
      "Probability and Experimental Probability",
      "Financial Mathematics (Interest, Profit)",
      "Algebraic Formulas and Substitutions",
      "Real-World Problem-Solving Applications"
    ]
  },
  "Science": {
    "1": [
      "The Five Senses",
      "Living and Non-Living Things",
      "Basic Weather Observations",
      "Plant and Animal Features",
      "Properties of Everyday Materials",
      "Care for Living Things",
      "Floating and Sinking",
      "Light and Shadows",
      "Sounds Around Us",
      "Magnetism in Daily Life"
    ],
    "2": [
      "Life Cycles of Plants and Animals",
      "Simple Machines (Levers, Pulleys)",
      "States of Water and Water Cycle",
      "Habitats and Adaptations",
      "Forces and Motion",
      "Characteristics of Living Things",
      "Properties of Materials",
      "Electricity and Simple Circuits",
      "Earth, Sun, and Moon",
      "Basic Needs of Living Things"
    ],
    "3": [
      "Skeletal and Muscular Systems",
      "Seed Plants and Flowering Plants",
      "Friction and Gravity",
      "Light, Reflection, and Refraction",
      "Properties of Solids, Liquids, and Gases",
      "Ecosystems and Food Chains",
      "Simple Machines (Wheels, Inclined Planes)",
      "Renewable and Non-renewable Energy",
      "Weather and Climate",
      "Conductors and Insulators"
    ],
    "4": [
      "Digestive and Circulatory Systems",
      "Diversity of Living Organisms",
      "Forces and Newton's Laws",
      "Properties of Light and Sound",
      "Chemical and Physical Changes",
      "Adaptation and Survival",
      "Simple Machines (Gears, Pulleys)",
      "Energy Transformations",
      "Earth's Layers and Geological Changes",
      "Interactions in the Environment"
    ],
    "5": [
      "Reproductive Systems",
      "Classification of Living Things",
      "Electricity and Electromagnetism",
      "Properties of Matter and Mixtures",
      "Ecosystems and Environmental Issues",
      "Simple Machines (Levers, Pulleys, Gears)",
      "Forms of Energy and Energy Transfers",
      "Earth's Rotation and Revolution",
      "Technology and Scientific Inventions",
      "Human Impacts on the Environment"
    ],
    "6": [
      "Nervous and Endocrine Systems",
      "Biodiversity and Conservation",
      "Forces, Motion, and Momentum",
      "Properties of Acids, Bases, and Salts",
      "Renewable and Non-renewable Resources",
      "Simple Machines (Inclined Planes, Screws)",
      "Thermal Energy and Temperature",
      "The Solar System and Beyond",
      "Scientific Inquiry and Experimentation",
      "Technological Advancements and Ethics"
    ]
  }
};

// Helper function to get random topics for a subject and standard
export function getRandomTopics(subject: string, standard: string, count: number = 3): string[] {
  const topics = subjectTopics[subject]?.[standard] || [];
  if (topics.length === 0) return [];

  const shuffled = [...topics].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, topics.length));
}

// Helper function to get all topics for a subject and standard
export function getTopics(subject: string, standard: string): string[] {
  return subjectTopics[subject]?.[standard] || [];
}

// Helper function to check if a topic exists
export function isValidTopic(subject: string, standard: string, topic: string): boolean {
  const topics = subjectTopics[subject]?.[standard] || [];
  return topics.includes(topic);
}
// Define the topic structure with helper text
export interface TopicDetails {
  name: string;
  helper: string;
}

export interface SubjectData {
  [subject: string]: {
    [standard: string]: TopicDetails[];
  };
}

// Define the subject data with helper text for LLM
export const subjectTopics: SubjectData = {
  "Math": {
    "1": [
      {
        name: "Counting and Representing Numbers",
        helper: "Include questions about number recognition (1-100), counting forwards and backwards, comparing numbers, and representing numbers using objects or pictures. Focus on real-world scenarios like counting objects in a classroom or arranging items in groups."
      },
      {
        name: "Addition and Subtraction within 20",
        helper: "Create word problems involving simple addition and subtraction within 20, using everyday situations like buying items at a school canteen or sharing items with friends. Include visual aids in questions where appropriate."
      },
      {
        name: "Shapes (Circle, Square, Triangle, Rectangle)",
        helper: "Mix questions about identifying shapes in everyday objects, comparing shape properties, and recognizing shapes in different orientations. Include real-world examples like road signs, building blocks, or classroom objects."
      },
      {
        name: "Comparing Length and Weight",
        helper: "Focus on basic comparisons using terms like longer/shorter, heavier/lighter, and taller/shorter. Use familiar objects like pencils, books, or toys in the questions to make them relatable."
      },
      {
        name: "Recognizing Coins and Bills",
        helper: "Include questions about identifying Malaysian currency, simple addition of money values, and basic shopping scenarios. Use realistic prices and common items that students encounter daily."
      },
      {
        name: "Patterns and Sequences",
        helper: "Create questions about simple number patterns, shape patterns, and color patterns. Include both identifying patterns and extending them. Use engaging scenarios like decorating items or arranging objects."
      },
      {
        name: "Data Collection and Simple Graphs",
        helper: "Focus on reading simple pictographs and bar graphs about familiar topics like favorite fruits, pets, or colors. Include questions about counting and comparing data from graphs."
      },
      {
        name: "Time (Hour and Half-Hour)",
        helper: "Create questions about reading analog and digital clocks, focusing on hour and half-hour times. Include daily routine scenarios like school schedules or TV program timings."
      },
      {
        name: "Ordinal Numbers",
        helper: "Include questions about positions (1st to 10th), relating to real situations like races, queues, or classroom arrangements. Mix both numerical and word form of ordinal numbers."
      },
      {
        name: "Problem-Solving Strategies",
        helper: "Create simple word problems that can be solved using pictures, objects, or basic number operations. Focus on step-by-step thinking and logical reasoning appropriate for 7-year-olds."
      }
    ],
    "2": [
      {
        name: "Multiplication Introduction",
        helper: "Focus on basic multiplication as repeated addition, using arrays and groups. Include real-world scenarios like arranging chairs in rows or sharing items equally among friends."
      },
      {
        name: "Division Introduction",
        helper: "Create questions about sharing items equally and grouping objects. Use concrete examples like distributing sweets or organizing items into equal groups."
      },
      {
        name: "Fractions (Halves and Quarters)",
        helper: "Include visual representations of fractions, focusing on halves and quarters of shapes and sets. Use familiar contexts like sharing food or folding paper."
      },
      {
        name: "2D Shapes and Symmetry",
        helper: "Mix questions about identifying lines of symmetry, completing symmetric patterns, and recognizing 2D shapes in different orientations. Use examples from nature and everyday objects."
      },
      {
        name: "Measurement (Length, Mass, Capacity)",
        helper: "Create problems involving standard units (cm, kg, L) and their relationships. Include practical measuring scenarios and simple conversions."
      },
      {
        name: "Money (Addition and Subtraction)",
        helper: "Include questions about calculating total costs, giving change, and comparing prices. Use realistic Malaysian currency values and common shopping scenarios."
      },
      {
        name: "Reading and Interpreting Graphs",
        helper: "Focus on reading and interpreting simple bar graphs and pictographs with scales. Include questions about comparing data and drawing conclusions."
      },
      {
        name: "Time (Minutes and Hours)",
        helper: "Create problems about reading time to 5-minute intervals, calculating duration, and scheduling daily activities. Include both analog and digital time formats."
      },
      {
        name: "Estimation and Rounding",
        helper: "Include questions about estimating quantities, lengths, and weights. Focus on reasonable estimates and rounding to the nearest ten."
      },
      {
        name: "Multi-Step Word Problems",
        helper: "Create simple two-step word problems involving basic operations. Use engaging scenarios that 8-year-olds can relate to, like planning a party or school event."
      }
    ],
    "3": [
      {
        name: "Multiplication and Division Strategies",
        helper: "Include questions about multiplication tables, mental calculation strategies, and word problems involving grouping and sharing. Focus on real-world applications."
      },
      {
        name: "Equivalent Fractions",
        helper: "Create problems about identifying and generating equivalent fractions, using visual aids and real-life contexts like sharing pizza or cake."
      },
      {
        name: "Decimal Numbers",
        helper: "Focus on understanding tenths and hundredths, converting between fractions and decimals, and using decimals in money contexts."
      },
      {
        name: "Polygons and Angles",
        helper: "Include questions about identifying types of angles, properties of polygons, and recognizing shapes in different orientations. Use architectural and natural examples."
      },
      {
        name: "Area and Perimeter",
        helper: "Create problems about calculating area and perimeter of rectangles and composite shapes. Use practical contexts like gardening or room decoration."
      },
      {
        name: "Mass, Volume, and Capacity Conversions",
        helper: "Include questions about converting between units, comparing measurements, and solving practical measurement problems."
      },
      {
        name: "Probability and Data Analysis",
        helper: "Focus on basic probability concepts (likely, unlikely, certain, impossible) and interpreting data from various graph types."
      },
      {
        name: "Time (24-Hour Format)",
        helper: "Create problems involving conversion between 12-hour and 24-hour formats, calculating time intervals, and scheduling scenarios."
      },
      {
        name: "Ratio and Proportion",
        helper: "Include simple ratio problems in practical contexts like recipes, mixing colors, or sharing items proportionally."
      },
      {
        name: "Problem-Solving Involving Fractions",
        helper: "Create word problems involving addition and subtraction of like fractions, using real-world scenarios that 9-year-olds can relate to."
      }
    ],
    "4": [
      {
        name: "Advanced Multiplication and Division",
        helper: "Include multi-digit multiplication and division problems, focusing on real-world applications and problem-solving strategies."
      },
      {
        name: "Proper and Improper Fractions",
        helper: "Create questions about converting between proper, improper fractions and mixed numbers. Use visual representations and practical contexts."
      },
      {
        name: "Decimal Operations",
        helper: "Focus on addition, subtraction, and multiplication of decimals. Include money calculations and measurement contexts."
      },
      {
        name: "Transformations and Symmetry",
        helper: "Include questions about rotations, reflections, and translations. Use geometric patterns and real-world examples like logos or tiles."
      },
      {
        name: "Volume and Surface Area",
        helper: "Create problems about calculating volume of cubes and cuboids, and surface area of 3D shapes. Use practical contexts like packaging or construction."
      },
      {
        name: "Temperature and Unit Conversions",
        helper: "Include questions about converting between Celsius and Fahrenheit, and solving problems involving temperature changes."
      },
      {
        name: "Collecting and Interpreting Data",
        helper: "Focus on gathering data, creating graphs, and drawing conclusions. Include real survey scenarios and data interpretation."
      },
      {
        name: "Time Calculations and Word Problems",
        helper: "Create complex time-related problems involving multiple operations and time zones. Use travel and scheduling contexts."
      },
      {
        name: "Rates and Unit Rates",
        helper: "Include problems about speed, pricing, and other rates. Use practical scenarios like shopping, travel, and sports."
      },
      {
        name: "Algebraic Expressions and Equations",
        helper: "Create simple algebraic problems using variables and equations. Focus on translating word problems into mathematical expressions."
      }
    ],
    "5": [
      {
        name: "Operations with Fractions and Decimals",
        helper: "Include complex operations involving both fractions and decimals. Use real-world contexts like recipes, measurements, and money."
      },
      {
        name: "Geometry and Angle Relationships",
        helper: "Create problems about angle properties in triangles and polygons, parallel lines, and geometric reasoning."
      },
      {
        name: "Metric System Conversions",
        helper: "Focus on converting between metric units and solving multi-step measurement problems. Include real-world applications."
      },
      {
        name: "Probability and Chance",
        helper: "Include theoretical and experimental probability problems. Use games, weather predictions, and other practical scenarios."
      },
      {
        name: "Patterns and Rules in Algebra",
        helper: "Create questions about number patterns, sequences, and algebraic expressions. Focus on finding and applying rules."
      },
      {
        name: "Financial Literacy (Budgeting, Saving)",
        helper: "Include problems about personal finance, simple interest, budgeting, and making financial decisions."
      },
      {
        name: "Interpreting and Representing Data",
        helper: "Focus on various graph types, measures of central tendency, and data analysis. Use real-world data sets."
      },
      {
        name: "Ratio and Proportion Word Problems",
        helper: "Create complex ratio problems involving scaling, maps, and proportional relationships in real contexts."
      },
      {
        name: "Applying the Order of Operations",
        helper: "Include multi-step calculations requiring BODMAS/PEMDAS. Use practical scenarios where possible."
      },
      {
        name: "Multi-Step Problem Solving Strategies",
        helper: "Create complex word problems requiring multiple operations and logical reasoning. Focus on practical applications."
      }
    ],
    "6": [
      {
        name: "Complex Fraction Operations",
        helper: "Include advanced operations with fractions, mixed numbers, and decimals. Use challenging real-world contexts."
      },
      {
        name: "Geometric Constructions and Proofs",
        helper: "Create problems about geometric constructions, properties of shapes, and simple geometric proofs."
      },
      {
        name: "Ratio, Proportion, and Percentage",
        helper: "Include complex problems involving percentages, ratios, and proportional reasoning in practical contexts."
      },
      {
        name: "Linear Equations and Inequalities",
        helper: "Create problems about solving and graphing linear equations and inequalities. Use real-world applications."
      },
      {
        name: "Advanced Data Analysis and Interpretation",
        helper: "Focus on statistical measures, data representation, and drawing conclusions from complex data sets."
      },
      {
        name: "Measurement and Scale Drawings",
        helper: "Include problems about scale factors, similar shapes, and technical drawings. Use architectural and design contexts."
      },
      {
        name: "Probability and Experimental Probability",
        helper: "Create problems comparing theoretical and experimental probability, including compound events."
      },
      {
        name: "Financial Mathematics (Interest, Profit)",
        helper: "Include problems about compound interest, profit/loss, and financial planning. Use realistic scenarios."
      },
      {
        name: "Algebraic Formulas and Substitutions",
        helper: "Create problems involving formula manipulation and substitution. Use scientific and practical contexts."
      },
      {
        name: "Real-World Problem-Solving Applications",
        helper: "Include complex multi-step problems requiring various mathematical skills. Focus on practical applications."
      }
    ]
  },
  "Science": {
    "1": [
      {
        name: "The Five Senses",
        helper: "Create questions about how we use different senses to observe and interact with our environment. Include practical examples of using multiple senses together."
      },
      {
        name: "Living and Non-Living Things",
        helper: "Focus on characteristics that distinguish living from non-living things. Use familiar examples from students' surroundings."
      },
      {
        name: "Basic Weather Observations",
        helper: "Include questions about different weather conditions, appropriate clothing, and simple weather patterns."
      },
      {
        name: "Plant and Animal Features",
        helper: "Create questions about basic plant parts, animal characteristics, and how they help organisms survive."
      },
      {
        name: "Properties of Everyday Materials",
        helper: "Focus on observable properties like texture, hardness, flexibility of common materials. Include practical uses."
      },
      {
        name: "Care for Living Things",
        helper: "Include questions about basic needs of plants and animals, and how to care for pets and plants."
      },
      {
        name: "Floating and Sinking",
        helper: "Create questions about which objects float or sink, and simple factors affecting buoyancy."
      },
      {
        name: "Light and Shadows",
        helper: "Include basic concepts about light sources, shadow formation, and how shadows change during the day."
      },
      {
        name: "Sounds Around Us",
        helper: "Focus on identifying different sounds, how sounds are made, and sound properties (loud/soft, high/low)."
      },
      {
        name: "Magnetism in Daily Life",
        helper: "Create questions about magnetic materials, uses of magnets, and magnetic properties in everyday objects."
      }
    ],
    "2": [
      {
        name: "Life Cycles of Plants and Animals",
        helper: "Include questions about growth stages, changes during life cycles, and comparing different organisms' life cycles."
      },
      {
        name: "Simple Machines (Levers, Pulleys)",
        helper: "Create problems about how simple machines work and their everyday applications. Use practical examples."
      },
      {
        name: "States of Water and Water Cycle",
        helper: "Focus on the three states of water, changes between states, and basic water cycle concepts."
      },
      {
        name: "Habitats and Adaptations",
        helper: "Include questions about different habitats, how animals adapt, and matching organisms to their habitats."
      },
      {
        name: "Forces and Motion",
        helper: "Create questions about pushing, pulling, and how forces affect object movement."
      },
      {
        name: "Characteristics of Living Things",
        helper: "Focus on basic life processes and characteristics common to all living things."
      },
      {
        name: "Properties of Materials",
        helper: "Include questions about material properties and their uses based on these properties."
      },
      {
        name: "Electricity and Simple Circuits",
        helper: "Create questions about basic electrical safety, simple circuits, and electrical conductors/insulators."
      },
      {
        name: "Earth, Sun, and Moon",
        helper: "Focus on basic relationships between Earth, Sun, and Moon, including day/night cycle."
      },
      {
        name: "Basic Needs of Living Things",
        helper: "Include questions about essential needs for survival and how different organisms meet these needs."
      }
    ],
    "3": [
      {
        name: "Skeletal and Muscular Systems",
        helper: "Create questions about bone types, muscle functions, and how they work together for movement."
      },
      {
        name: "Seed Plants and Flowering Plants",
        helper: "Include questions about plant parts, seed dispersal methods, and plant life cycles."
      },
      {
        name: "Friction and Gravity",
        helper: "Focus on how these forces affect motion, practical applications, and everyday examples."
      },
      {
        name: "Light, Reflection, and Refraction",
        helper: "Create questions about light behavior, mirrors, and simple optical phenomena."
      },
      {
        name: "Properties of Solids, Liquids, and Gases",
        helper: "Include questions about state properties, changes between states, and particle arrangement."
      },
      {
        name: "Ecosystems and Food Chains",
        helper: "Focus on simple food chains, energy flow, and relationships between organisms."
      },
      {
        name: "Simple Machines (Wheels, Inclined Planes)",
        helper: "Create questions about mechanical advantage and practical applications of simple machines."
      },
      {
        name: "Renewable and Non-renewable Energy",
        helper: "Include questions about energy sources, their uses, and environmental impact."
      },
      {
        name: "Weather and Climate",
        helper: "Focus on weather patterns, climate factors, and how they affect daily life."
      },
      {
        name: "Conductors and Insulators",
        helper: "Create questions about thermal and electrical conductivity in everyday materials."
      }
    ],
    "4": [
      {
        name: "Digestive and Circulatory Systems",
        helper: "Include questions about organ functions, system processes, and maintaining health."
      },
      {
        name: "Diversity of Living Organisms",
        helper: "Create questions about classification, biodiversity, and adaptations of different species."
      },
      {
        name: "Forces and Newton's Laws",
        helper: "Focus on basic physics principles, forces in action, and real-world applications."
      },
      {
        name: "Properties of Light and Sound",
        helper: "Include questions about wave properties, behavior, and practical applications."
      },
      {
        name: "Chemical and Physical Changes",
        helper: "Create questions about types of changes, reversible/irreversible processes, and examples."
      },
      {
        name: "Adaptation and Survival",
        helper: "Focus on how organisms adapt to their environment and survival strategies."
      },
      {
        name: "Simple Machines (Gears, Pulleys)",
        helper: "Include questions about mechanical systems, efficiency, and everyday applications."
      },
      {
        name: "Energy Transformations",
        helper: "Create questions about different forms of energy and their transformations."
      },
      {
        name: "Earth's Layers and Geological Changes",
        helper: "Focus on Earth's structure, geological processes, and their effects."
      },
      {
        name: "Interactions in the Environment",
        helper: "Include questions about ecosystems, environmental relationships, and human impact."
      }
    ],
    "5": [
      {
        name: "Reproductive Systems",
        helper: "Create age-appropriate questions about human and plant reproduction processes."
      },
      {
        name: "Classification of Living Things",
        helper: "Include questions about taxonomic groups, classification criteria, and diversity."
      },
      {
        name: "Electricity and Electromagnetism",
        helper: "Focus on electrical circuits, electromagnetic effects, and practical applications."
      },
      {
        name: "Properties of Matter and Mixtures",
        helper: "Create questions about material properties, separating mixtures, and solutions."
      },
      {
        name: "Ecosystems and Environmental Issues",
        helper: "Include questions about ecosystem balance, environmental problems, and solutions."
      },
      {
        name: "Simple Machines (Levers, Pulleys, Gears)",
        helper: "Focus on complex mechanical systems and their applications in technology."
      },
      {
        name: "Forms of Energy and Energy Transfers",
        helper: "Create questions about energy types, conservation, and practical applications."
      },
      {
        name: "Earth's Rotation and Revolution",
        helper: "Include questions about Earth's movements and their effects on daily life."
      },
      {
        name: "Technology and Scientific Inventions",
        helper: "Focus on scientific discoveries, technological advances, and their impact."
      },
      {
        name: "Human Impacts on the Environment",
        helper: "Create questions about environmental issues, conservation, and sustainability."
      }
    ],
    "6": [
      {
        name: "Nervous and Endocrine Systems",
        helper: "Include questions about neural control, hormones, and body coordination."
      },
      {
        name: "Biodiversity and Conservation",
        helper: "Create questions about species diversity, conservation efforts, and environmental protection."
      },
      {
        name: "Forces, Motion, and Momentum",
        helper: "Focus on advanced physics concepts, calculations, and real-world applications."
      },
      {
        name: "Properties of Acids, Bases, and Salts",
        helper: "Include questions about chemical properties, reactions, and everyday examples."
      },
      {
        name: "Renewable and Non-renewable Resources",
        helper: "Create questions about resource management, sustainability, and environmental impact."
      },
      {
        name: "Simple Machines (Inclined Planes, Screws)",
        helper: "Focus on complex mechanical principles and technological applications."
      },
      {
        name: "Thermal Energy and Temperature",
        helper: "Include questions about heat transfer, thermal properties, and practical applications."
      },
      {
        name: "The Solar System and Beyond",
        helper: "Create questions about space science, celestial bodies, and space exploration."
      },
      {
        name: "Scientific Inquiry and Experimentation",
        helper: "Focus on scientific method, experimental design, and data analysis."
      },
      {
        name: "Technological Advancements and Ethics",
        helper: "Include questions about modern technology, scientific ethics, and future implications."
      }
    ]
  }
};

// Helper function to get random topics for a subject and standard
export function getRandomTopics(subject: string, standard: string, count: number = 3): string[] {
  const topics = subjectTopics[subject]?.[standard] || [];
  if (topics.length === 0) return [];

  const shuffled = [...topics].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, topics.length)).map(topic => topic.name);
}

// Helper function to get all topics for a subject and standard
export function getTopics(subject: string, standard: string): string[] {
  const topics = subjectTopics[subject]?.[standard] || [];
  return topics.map(topic => topic.name);
}

// Helper function to get helper text for a topic
export function getTopicHelper(subject: string, standard: string, topicName: string): string | undefined {
  const topics = subjectTopics[subject]?.[standard] || [];
  const topic = topics.find(t => t.name === topicName);
  return topic?.helper;
}

// Helper function to check if a topic exists
export function isValidTopic(subject: string, standard: string, topic: string): boolean {
  const topics = getTopics(subject, standard);
  return topics.includes(topic);
}
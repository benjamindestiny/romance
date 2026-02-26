// ====================== soloQuizData.js ======================
// Centralized source of truth for all solo quiz content
// WHY THIS FILE: Easy to maintain, add new categories, or move to backend later

export const soloQuizCategories = [
  {
    id: 1,
    displayName: "Communication Mastery",
    key: "communication",
    questions: [
      {
        id: 1,
        text: "When your partner is upset, the best first response is:",
        options: [
          "Give advice immediately",
          "Listen without interrupting",
          "Defend yourself",
          "Change the subject",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Active listening means:",
        options: [
          "Planning your reply",
          "Repeating what you heard",
          "Staying silent",
          "Interrupting with stories",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Non-verbal communication includes:",
        options: [
          "Only words",
          "Body language and tone",
          "Email only",
          "Text messages",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "The most important time to communicate is:",
        options: [
          "When you're angry",
          "During calm moments",
          "Never",
          "Only when asked",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Effective communication requires:",
        options: [
          "One person talking",
          "Both listening and speaking",
          "Yelling louder",
          "Avoiding eye contact",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    displayName: "Emotional Intelligence",
    key: "emotionalIntelligence",
    questions: [
      {
        id: 1,
        text: "Emotional intelligence is:",
        options: [
          "Being smart academically",
          "Understanding your own emotions",
          "Having lots of friends",
          "Being wealthy",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Self-regulation means:",
        options: [
          "Controlling others",
          "Managing your emotions",
          "Following rules strictly",
          "Ignoring feelings",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Empathy is:",
        options: [
          "Feeling sorry for yourself",
          "Understanding others' feelings",
          "Being competitive",
          "Avoiding emotions",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Motivation in EQ refers to:",
        options: [
          "Money incentives",
          "Intrinsic drive",
          "External rewards",
          "Punishment",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Social skills in EQ include:",
        options: [
          "Being alone",
          "Building relationships",
          "Ignoring others",
          "Being rude",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    displayName: "Conflict Resolution",
    key: "conflictResolution",
    questions: [
      {
        id: 1,
        text: "The first step in resolving conflict is:",
        options: [
          "Yell louder",
          "Stay calm and listen",
          "Walk away",
          "Blame the other",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Compromise means:",
        options: [
          "One wins, one loses",
          "Both give a little",
          "Fight until exhausted",
          "Ignore the issue",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Active conflict resolution involves:",
        options: [
          "Avoiding discussion",
          "Using 'I' statements",
          "Name-calling",
          "Threatening",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "When to seek help in conflict:",
        options: [
          "Never",
          "When it affects health",
          "Always immediately",
          "Only if winning",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Resolution success depends on:",
        options: [
          "Who is stronger",
          "Mutual respect",
          "Who speaks first",
          "Louder voice",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 4,
    displayName: "Self-Awareness",
    key: "selfAwareness",
    questions: [
      {
        id: 1,
        text: "Self-awareness is:",
        options: [
          "Knowing your name",
          "Understanding your strengths/weaknesses",
          "Being popular",
          "Having many skills",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Journaling helps with:",
        options: [
          "Forgetting thoughts",
          "Reflecting on emotions",
          "Wasting time",
          "Avoiding self",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Blind spots are:",
        options: [
          "Things you see clearly",
          "Areas you don't recognize in yourself",
          "Physical vision issues",
          "Favorite foods",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Self-reflection requires:",
        options: [
          "Constant distraction",
          "Quiet time alone",
          "Being busy always",
          "Ignoring feelings",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Growth mindset involves:",
        options: [
          "Fixed abilities",
          "Believing you can improve",
          "Avoiding challenges",
          "Blaming others",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 5,
    displayName: "Love Languages",
    key: "loveLanguages",
    questions: [
      {
        id: 1,
        text: "Words of Affirmation means:",
        options: [
          "Compliments and encouragement",
          "Buying gifts",
          "Doing chores",
          "Physical touch",
        ],
        correct: 0,
      },
      {
        id: 2,
        text: "Acts of Service are:",
        options: [
          "Verbal praise",
          "Helping with tasks",
          "Expensive presents",
          "Hugs",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Receiving Gifts shows:",
        options: [
          "Thoughtfulness in giving",
          "Verbal communication",
          "Physical closeness",
          "Quality time",
        ],
        correct: 0,
      },
      {
        id: 4,
        text: "Quality Time means:",
        options: [
          "Undivided attention",
          "Buying things",
          "Doing housework",
          "Saying nice things",
        ],
        correct: 0,
      },
      {
        id: 5,
        text: "Physical Touch includes:",
        options: [
          "Talking sweetly",
          "Holding hands, hugs",
          "Helping around house",
          "Thoughtful gifts",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 6,
    displayName: "Attachment Styles",
    key: "attachmentStyles",
    questions: [
      {
        id: 1,
        text: "Secure attachment is:",
        options: [
          "Fearful of closeness",
          "Comfortable with intimacy",
          "Needy and clingy",
          "Distant and avoidant",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Anxious attachment shows as:",
        options: [
          "Trust and security",
          "Fear of abandonment",
          "Independence",
          "Emotional distance",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Avoidant attachment means:",
        options: [
          "Seeking constant reassurance",
          "Preferring independence",
          "Open communication",
          "Emotional vulnerability",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Attachment styles are:",
        options: [
          "Fixed forever",
          "Can change with effort",
          "Only for children",
          "Not real",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Healthy relationships need:",
        options: [
          "Matching styles exactly",
          "Understanding and compromise",
          "One dominant style",
          "Avoiding discussion",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 7,
    displayName: "Wealth Creation Mindset",
    key: "wealthCreation",
    questions: [
      {
        id: 1,
        text: "The foundation of building wealth is:",
        options: [
          "Spending less than you earn",
          "Buying luxury items",
          "Waiting for a big win",
          "Borrowing heavily",
        ],
        correct: 0,
      },
      {
        id: 2,
        text: "Compound interest is best described as:",
        options: [
          "Interest only on principal",
          "Interest on interest",
          "Bank fees",
          "Government tax",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "The 50/30/20 rule refers to:",
        options: [
          "Budgeting needs/wants/savings",
          "Stock market percentages",
          "Tax brackets",
          "Investment returns",
        ],
        correct: 0,
      },
      {
        id: 4,
        text: "An emergency fund should cover:",
        options: [
          "3-6 months of expenses",
          "One month only",
          "Luxury purchases",
          "Daily coffee",
        ],
        correct: 0,
      },
      {
        id: 5,
        text: "The best long-term wealth vehicle for most people is:",
        options: [
          "Index funds",
          "Lottery tickets",
          "Crypto memes",
          "Keeping cash under mattress",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 8,
    displayName: "Animal Kingdom Trivia",
    key: "animals",
    questions: [
      {
        id: 1,
        text: "Which animal is known as the 'king of the jungle'?",
        options: ["Tiger", "Lion", "Elephant", "Gorilla"],
        correct: 1,
      },
      {
        id: 2,
        text: "Octopuses have how many hearts?",
        options: ["One", "Two", "Three", "Four"],
        correct: 2,
      },
      {
        id: 3,
        text: "The fastest land animal is:",
        options: ["Lion", "Cheetah", "Leopard", "Tiger"],
        correct: 1,
      },
      {
        id: 4,
        text: "Which animal can hold its breath underwater for up to 13 minutes?",
        options: ["Dolphin", "Seal", "Whale", "Penguin"],
        correct: 1,
      },
      {
        id: 5,
        text: "A group of lions is called:",
        options: ["Herd", "Pack", "Pride", "Flock"],
        correct: 2,
      },
    ],
  },
  {
    id: 9,
    displayName: "World Places Explorer",
    key: "places",
    questions: [
      {
        id: 1,
        text: "The tallest mountain in the world is:",
        options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
        correct: 1,
      },
      {
        id: 2,
        text: "The longest river in the world is:",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correct: 1,
      },
      {
        id: 3,
        text: "The largest desert in the world is:",
        options: ["Sahara", "Gobi", "Antarctica", "Arabian"],
        correct: 2,
      },
      {
        id: 4,
        text: "The capital of Australia is:",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2,
      },
      {
        id: 5,
        text: "The smallest country in the world is:",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: 1,
      },
    ],
  },
  {
    id: 10,
    displayName: "Mindfulness",
    key: "mindfulness",
    questions: [
      {
        id: 1,
        text: "Mindfulness means:",
        options: [
          "Thinking about the past",
          "Being present in the moment",
          "Planning the future",
          "Multitasking",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Meditation helps with:",
        options: [
          "Stress reduction",
          "Increasing worry",
          "Avoiding thoughts",
          "Being busy",
        ],
        correct: 0,
      },
      {
        id: 3,
        text: "Breathing exercises are for:",
        options: [
          "Holding breath",
          "Calming the mind",
          "Exercising lungs",
          "Talking more",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Mindful eating involves:",
        options: [
          "Eating quickly",
          "Focusing on taste and texture",
          "Watching TV",
          "Rushing meals",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "The benefits of mindfulness include:",
        options: [
          "More anxiety",
          "Better focus",
          "Less awareness",
          "Increased distraction",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 11,
    displayName: "Goal Setting",
    key: "goalSetting",
    questions: [
      {
        id: 1,
        text: "SMART goals stand for:",
        options: [
          "Simple, Measurable, Achievable, Relevant, Time-bound",
          "Strict, Major, Ambitious, Realistic, Temporary",
          "Small, Manageable, Attainable, Reasonable, Timely",
          "Specific, Measurable, Achievable, Relevant, Time-bound",
        ],
        correct: 3,
      },
      {
        id: 2,
        text: "Short-term goals are:",
        options: [
          "Achieved in years",
          "Completed in days/weeks",
          "Lifetime achievements",
          "Never ending",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Long-term goals need:",
        options: [
          "No planning",
          "Breaking into steps",
          "Immediate action only",
          "Ignoring details",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Goal tracking helps with:",
        options: [
          "Forgetting progress",
          "Staying motivated",
          "Avoiding success",
          "Being lazy",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Adjusting goals is:",
        options: [
          "A sign of failure",
          "Normal and healthy",
          "Never necessary",
          "Only for quitters",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 12,
    displayName: "Empathy",
    key: "empathy",
    questions: [
      {
        id: 1,
        text: "Empathy is:",
        options: [
          "Feeling sorry for yourself",
          "Understanding others' feelings",
          "Being judgmental",
          "Ignoring emotions",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Cognitive empathy means:",
        options: [
          "Feeling emotions",
          "Understanding perspectives",
          "Physical touch",
          "Verbal praise",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Emotional empathy involves:",
        options: [
          "Logical analysis",
          "Feeling what others feel",
          "Giving advice",
          "Staying detached",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Empathy helps in relationships by:",
        options: [
          "Creating distance",
          "Building connection",
          "Increasing conflict",
          "Reducing understanding",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Practicing empathy requires:",
        options: [
          "Active listening",
          "Interrupting",
          "Judging quickly",
          "Talking more",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 13,
    displayName: "Intimacy",
    key: "intimacy",
    questions: [
      {
        id: 1,
        text: "Emotional intimacy involves:",
        options: [
          "Physical closeness",
          "Sharing feelings and thoughts",
          "Being in the same room",
          "Talking about weather",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Physical intimacy includes:",
        options: [
          "Deep conversations",
          "Touch and closeness",
          "Sharing secrets",
          "Working together",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Intellectual intimacy means:",
        options: [
          "Physical attraction",
          "Sharing ideas and learning",
          "Emotional support",
          "Daily routines",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Spiritual intimacy is:",
        options: [
          "Sharing beliefs and values",
          "Physical activities",
          "Intellectual debates",
          "Emotional outbursts",
        ],
        correct: 0,
      },
      {
        id: 5,
        text: "Building intimacy takes:",
        options: [
          "No effort",
          "Time and trust",
          "Instant results",
          "Avoiding vulnerability",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 14,
    displayName: "Future Visioning",
    key: "futureVisioning",
    questions: [
      {
        id: 1,
        text: "Visioning the future helps with:",
        options: [
          "Living in the past",
          "Setting direction",
          "Avoiding planning",
          "Being aimless",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "A vision board is for:",
        options: [
          "Decorating walls",
          "Visualizing goals",
          "Storing memories",
          "Hiding things",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Future planning includes:",
        options: [
          "Ignoring possibilities",
          "Considering scenarios",
          "Staying stuck",
          "Avoiding change",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Motivation from vision comes from:",
        options: [
          "Fear of failure",
          "Excitement for success",
          "Comfort in present",
          "Avoiding effort",
        ],
        correct: 1,
      },
      {
        id: 5,
        text: "Revisiting your vision:",
        options: [
          "Is a waste of time",
          "Keeps you aligned",
          "Creates confusion",
          "Reduces focus",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 15,
    displayName: "Gratitude",
    key: "gratitude",
    questions: [
      {
        id: 1,
        text: "Gratitude means:",
        options: [
          "Taking things for granted",
          "Appreciating what you have",
          "Complaining more",
          "Ignoring positives",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "Keeping a gratitude journal helps:",
        options: [
          "Focus on negatives",
          "Notice positives",
          "Forget good things",
          "Increase complaints",
        ],
        correct: 1,
      },
      {
        id: 3,
        text: "Expressing gratitude to others:",
        options: [
          "Weakens relationships",
          "Strengthens bonds",
          "Creates obligation",
          "Is unnecessary",
        ],
        correct: 1,
      },
      {
        id: 4,
        text: "Gratitude improves:",
        options: [
          "Mental health",
          "Makes you unhappy",
          "Increases envy",
          "Reduces happiness",
        ],
        correct: 0,
      },
      {
        id: 5,
        text: "Practicing gratitude daily:",
        options: [
          "Is too time-consuming",
          "Shifts perspective",
          "Creates unrealistic expectations",
          "Is pointless",
        ],
        correct: 1,
      },
    ],
  },
];

export default soloQuizCategories;

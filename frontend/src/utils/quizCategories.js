// ====================== src/utils/quizCategories.js ======================
// CENTRAL QUIZ DATA FILE FOR THE COUPLES QUIZ APP
//
// WHY THIS FILE EXISTS:
// - Keeps Collaborate.jsx short and clean (your request)
// - Single source of truth for all quiz content
// - Easy to add new categories or translate later
// - 15 carefully chosen deep categories
// - Every category has exactly 8 tough, reflective questions
// - Gender-aware phrasing so questions feel natural to both partners
// - All questions are designed for real growth, not just fun

export const coupleQuizCategories = [
  {
    id: 1,
    displayName: "Communication Mastery",
    questions: [
      {
        id: 1,
        male: "As a man, what is the hardest thing for you to say out loud to your partner?",
        female:
          "As a woman, what is the hardest thing for you to say out loud to your partner?",
        options: [
          "I feel insecure",
          "I need more space",
          "I'm scared of losing you",
          "I feel unappreciated",
        ],
      },
      {
        id: 2,
        male: "As a man, when your partner is upset, do you try to fix it or just listen?",
        female:
          "As a woman, when your partner is upset, do you try to fix it or just listen?",
        options: [
          "Fix it immediately",
          "Just listen and validate",
          "Get defensive",
          "Withdraw",
        ],
      },
      {
        id: 3,
        male: "As a man, how do you usually react when your partner criticises you?",
        female:
          "As a woman, how do you usually react when your partner criticises you?",
        options: [
          "I get defensive",
          "I shut down",
          "I reflect and apologise",
          "I turn it back on them",
        ],
      },
      {
        id: 4,
        male: "As a man, what makes you feel truly respected by your partner?",
        female:
          "As a woman, what makes you feel truly respected by your partner?",
        options: [
          "Being listened to without interruption",
          "Being supported in my decisions",
          "Physical affection",
          "Words of affirmation",
        ],
      },
      {
        id: 5,
        male: "As a man, do you prefer to talk about problems right away or later?",
        female:
          "As a woman, do you prefer to talk about problems right away or later?",
        options: [
          "Immediately",
          "After I calm down",
          "Only when it becomes big",
          "I avoid it",
        ],
      },
      {
        id: 6,
        male: "As a man, what is one communication habit of yours that you know hurts your partner?",
        female:
          "As a woman, what is one communication habit of yours that you know hurts your partner?",
        options: [
          "Raising my voice",
          "Stonewalling",
          "Giving the silent treatment",
          "Being sarcastic",
        ],
      },
      {
        id: 7,
        male: "As a man, how do you know when your partner is not okay even if they say they are?",
        female:
          "As a woman, how do you know when your partner is not okay even if they say they are?",
        options: [
          "Tone of voice",
          "Body language",
          "They stop initiating",
          "I just feel it",
        ],
      },
      {
        id: 8,
        male: "As a man, what is the one thing you wish your partner would stop doing when you argue?",
        female:
          "As a woman, what is the one thing you wish your partner would stop doing when you argue?",
        options: [
          "Bringing up the past",
          "Yelling",
          "Walking away",
          "Invalidating my feelings",
        ],
      },
    ],
  },
  {
    id: 2,
    displayName: "Trust & Honesty",
    questions: [
      {
        id: 1,
        male: "As a man, what is the biggest thing that would break your trust forever?",
        female:
          "As a woman, what is the biggest thing that would break your trust forever?",
        options: [
          "Lying about money",
          "Emotional cheating",
          "Physical cheating",
          "Hiding big decisions",
        ],
      },
      {
        id: 2,
        male: "As a man, do you have any secrets you are still keeping from your partner?",
        female:
          "As a woman, do you have any secrets you are still keeping from your partner?",
        options: [
          "Yes, one big one",
          "Small things only",
          "No secrets at all",
          "I'm not sure",
        ],
      },
      {
        id: 3,
        male: "As a man, how do you rebuild trust after it has been broken?",
        female:
          "As a woman, how do you rebuild trust after it has been broken?",
        options: [
          "Consistent actions over time",
          "Apologies and promises",
          "Giving space",
          "Therapy together",
        ],
      },
      {
        id: 4,
        male: "As a man, have you ever hidden something from your partner because you were afraid of their reaction?",
        female:
          "As a woman, have you ever hidden something from your partner because you were afraid of their reaction?",
        options: ["Yes", "No", "Once or twice", "Many times"],
      },
      {
        id: 5,
        male: "As a man, what does complete honesty look like to you in a relationship?",
        female:
          "As a woman, what does complete honesty look like to you in a relationship?",
        options: [
          "Telling everything even if it hurts",
          "Being transparent about feelings",
          "No white lies",
          "Full access to phone",
        ],
      },
      {
        id: 6,
        male: "As a man, how often do you check your partner's phone or social media?",
        female:
          "As a woman, how often do you check your partner's phone or social media?",
        options: [
          "Never",
          "Sometimes when suspicious",
          "Regularly",
          "I have the password",
        ],
      },
      {
        id: 7,
        male: "As a man, what would you do if you found out your partner lied about something important?",
        female:
          "As a woman, what would you do if you found out your partner lied about something important?",
        options: [
          "End the relationship",
          "Try to understand why",
          "Forgive but not forget",
          "Give them one chance",
        ],
      },
      {
        id: 8,
        male: "As a man, do you believe you and your partner are 100% honest with each other right now?",
        female:
          "As a woman, do you believe you and your partner are 100% honest with each other right now?",
        options: ["Yes", "Mostly", "No", "I don't know"],
      },
    ],
  },
  {
    id: 3,
    displayName: "Financial Harmony",
    questions: [
      {
        id: 1,
        male: "As a man, how do you feel when your partner spends money without telling you?",
        female:
          "As a woman, how do you feel when your partner spends money without telling you?",
        options: [
          "It's fine",
          "It bothers me",
          "I get angry",
          "I feel disrespected",
        ],
      },
      {
        id: 2,
        male: "As a man, who should manage the finances in the relationship?",
        female:
          "As a woman, who should manage the finances in the relationship?",
        options: ["Me", "My partner", "Both together", "Doesn't matter"],
      },
      {
        id: 3,
        male: "As a man, what is your biggest fear about money in this relationship?",
        female:
          "As a woman, what is your biggest fear about money in this relationship?",
        options: [
          "Running out of money",
          "One person spending too much",
          "Debt",
          "Different financial goals",
        ],
      },
      {
        id: 4,
        male: "As a man, do you think we are financially compatible right now?",
        female:
          "As a woman, do you think we are financially compatible right now?",
        options: ["Yes", "Somewhat", "No", "I don't know"],
      },
      {
        id: 5,
        male: "As a man, how open are you about your salary and debts?",
        female: "As a woman, how open are you about your salary and debts?",
        options: [
          "Completely open",
          "Somewhat open",
          "Not very open",
          "I hide things",
        ],
      },
      {
        id: 6,
        male: "As a man, what money habit of your partner worries you the most?",
        female:
          "As a woman, what money habit of your partner worries you the most?",
        options: [
          "Impulsive spending",
          "Being too frugal",
          "Avoiding money talks",
          "Secret spending",
        ],
      },
      {
        id: 7,
        male: "As a man, do you want joint or separate bank accounts?",
        female: "As a woman, do you want joint or separate bank accounts?",
        options: ["Joint only", "Separate only", "Both", "Doesn't matter"],
      },
      {
        id: 8,
        male: "As a man, how do you want to handle big purchases in the future?",
        female:
          "As a woman, how do you want to handle big purchases in the future?",
        options: [
          "Discuss first",
          "Anyone can decide under a limit",
          "I decide",
          "Partner decides",
        ],
      },
    ],
  },
  {
    id: 4,
    displayName: "Emotional & Physical Intimacy",
    questions: [
      {
        id: 1,
        male: "As a man, how often do you feel emotionally connected to your partner?",
        female:
          "As a woman, how often do you feel emotionally connected to your partner?",
        options: [
          "Every day",
          "A few times a week",
          "Rarely",
          "I feel distant",
        ],
      },
      {
        id: 2,
        male: "As a man, what makes you feel most emotionally safe with your partner?",
        female:
          "As a woman, what makes you feel most emotionally safe with your partner?",
        options: [
          "Being able to cry without judgment",
          "Sharing my deepest fears",
          "Knowing they won't leave",
          "Physical closeness",
        ],
      },
      {
        id: 3,
        male: "As a man, how satisfied are you with our physical intimacy?",
        female: "As a woman, how satisfied are you with our physical intimacy?",
        options: [
          "Very satisfied",
          "Somewhat satisfied",
          "Not satisfied",
          "I avoid it",
        ],
      },
      {
        id: 4,
        male: "As a man, what is one thing you wish was different about our sex life?",
        female:
          "As a woman, what is one thing you wish was different about our sex life?",
        options: [
          "More frequency",
          "More emotional connection",
          "More variety",
          "Nothing",
        ],
      },
      {
        id: 5,
        male: "As a man, do you feel comfortable initiating intimacy?",
        female: "As a woman, do you feel comfortable initiating intimacy?",
        options: ["Yes always", "Sometimes", "Rarely", "Never"],
      },
      {
        id: 6,
        male: "As a man, how important is non-sexual touch to you?",
        female: "As a woman, how important is non-sexual touch to you?",
        options: [
          "Very important",
          "Somewhat important",
          "Not very important",
          "I don't like it",
        ],
      },
      {
        id: 7,
        male: "As a man, what turns you on the most emotionally?",
        female: "As a woman, what turns you on the most emotionally?",
        options: [
          "Deep conversations",
          "Feeling appreciated",
          "Feeling desired",
          "Playfulness",
        ],
      },
      {
        id: 8,
        male: "As a man, are there any unspoken needs in our intimacy that you haven't shared?",
        female:
          "As a woman, are there any unspoken needs in our intimacy that you haven't shared?",
        options: ["Yes", "No", "I'm not sure", "I'm afraid to say"],
      },
    ],
  },
  {
    id: 5,
    displayName: "Future Vision & Goals",
    questions: [
      {
        id: 1,
        male: "As a man, where do you see us living in 10 years?",
        female: "As a woman, where do you see us living in 10 years?",
        options: ["Same city", "Different city", "Abroad", "I don't know"],
      },
      {
        id: 2,
        male: "As a man, do you want children? How many and when?",
        female: "As a woman, do you want children? How many and when?",
        options: ["Yes, 2-3 soon", "Yes, later", "No children", "Not sure"],
      },
      {
        id: 3,
        male: "As a man, what is your biggest dream for our relationship?",
        female: "As a woman, what is your biggest dream for our relationship?",
        options: [
          "Marriage",
          "Buying a house",
          "Travelling the world",
          "Growing old together",
        ],
      },
      {
        id: 4,
        male: "As a man, are our long-term goals aligned?",
        female: "As a woman, are our long-term goals aligned?",
        options: ["Yes completely", "Mostly", "Somewhat", "No"],
      },
      {
        id: 5,
        male: "As a man, what scares you most about our future?",
        female: "As a woman, what scares you most about our future?",
        options: [
          "Growing apart",
          "Financial problems",
          "Health issues",
          "Losing passion",
        ],
      },
      {
        id: 6,
        male: "As a man, how do you want to celebrate milestones together?",
        female: "As a woman, how do you want to celebrate milestones together?",
        options: ["Big parties", "Quiet dinners", "Travel", "Gifts"],
      },
      {
        id: 7,
        male: "As a man, would you move cities or countries for our relationship?",
        female:
          "As a woman, would you move cities or countries for our relationship?",
        options: [
          "Yes without hesitation",
          "Only if necessary",
          "No",
          "Depends",
        ],
      },
      {
        id: 8,
        male: "As a man, what does 'growing old together' look like to you?",
        female:
          "As a woman, what does 'growing old together' look like to you?",
        options: [
          "Still best friends",
          "Still passionate",
          "Peaceful life",
          "I haven't thought about it",
        ],
      },
    ],
  },
  {
    id: 6,
    displayName: "Family & In-Laws",
    questions: [
      {
        id: 1,
        male: "As a man, how involved do you want your family to be in our life?",
        female:
          "As a woman, how involved do you want your family to be in our life?",
        options: [
          "Very involved",
          "Somewhat involved",
          "Minimal involvement",
          "No involvement",
        ],
      },
      {
        id: 2,
        male: "As a man, how do you feel about spending holidays with in-laws?",
        female:
          "As a woman, how do you feel about spending holidays with in-laws?",
        options: ["Love it", "It's okay", "I dread it", "I avoid it"],
      },
      {
        id: 3,
        male: "As a man, have you ever felt your partner chooses their family over you?",
        female:
          "As a woman, have you ever felt your partner chooses their family over you?",
        options: ["Yes often", "Sometimes", "Never", "I'm not sure"],
      },
      {
        id: 4,
        male: "As a man, how do you handle disagreements between me and your parents?",
        female:
          "As a woman, how do you handle disagreements between me and your parents?",
        options: [
          "I side with you",
          "I stay neutral",
          "I side with my parents",
          "I avoid the topic",
        ],
      },
      {
        id: 5,
        male: "As a man, what boundary with in-laws do you think we need?",
        female: "As a woman, what boundary with in-laws do you think we need?",
        options: [
          "Less visits",
          "No unannounced visits",
          "No money requests",
          "Respect our privacy",
        ],
      },
      {
        id: 6,
        male: "As a man, do you feel your family accepts me fully?",
        female: "As a woman, do you feel your family accepts me fully?",
        options: ["Yes", "Mostly", "Not really", "No"],
      },
      {
        id: 7,
        male: "As a man, how important is it that our children have a close relationship with grandparents?",
        female:
          "As a woman, how important is it that our children have a close relationship with grandparents?",
        options: [
          "Very important",
          "Somewhat important",
          "Not important",
          "I prefer distance",
        ],
      },
      {
        id: 8,
        male: "As a man, what is one thing about my family that worries you?",
        female:
          "As a woman, what is one thing about my family that worries you?",
        options: ["Too involved", "Too distant", "Different values", "Nothing"],
      },
    ],
  },
  {
    id: 7,
    displayName: "Spirituality & Core Values",
    questions: [
      {
        id: 1,
        male: "As a man, how important is faith or spirituality in your daily life?",
        female:
          "As a woman, how important is faith or spirituality in your daily life?",
        options: [
          "Very important",
          "Somewhat important",
          "Not important",
          "I'm not spiritual",
        ],
      },
      {
        id: 2,
        male: "As a man, do our core values align on the most important things?",
        female:
          "As a woman, do our core values align on the most important things?",
        options: ["Yes completely", "Mostly", "Somewhat", "No"],
      },
      {
        id: 3,
        male: "As a man, would you be okay raising children with different beliefs than yours?",
        female:
          "As a woman, would you be okay raising children with different beliefs than yours?",
        options: [
          "Yes",
          "Only if we agree on basics",
          "No",
          "I haven't thought about it",
        ],
      },
      {
        id: 4,
        male: "As a man, how do you feel when we have different opinions on moral issues?",
        female:
          "As a woman, how do you feel when we have different opinions on moral issues?",
        options: [
          "It's fine",
          "It bothers me",
          "It causes arguments",
          "We avoid the topic",
        ],
      },
      {
        id: 5,
        male: "As a man, do you pray or meditate together?",
        female: "As a woman, do you pray or meditate together?",
        options: ["Often", "Sometimes", "Never", "I would like to"],
      },
      {
        id: 6,
        male: "As a man, what is one value you will never compromise on?",
        female: "As a woman, what is one value you will never compromise on?",
        options: ["Honesty", "Loyalty", "Family first", "Personal freedom"],
      },
      {
        id: 7,
        male: "As a man, how do you want to handle religious or spiritual differences?",
        female:
          "As a woman, how do you want to handle religious or spiritual differences?",
        options: [
          "Respect each other's path",
          "Find common ground",
          "One person follows the other",
          "Avoid the topic",
        ],
      },
      {
        id: 8,
        male: "As a man, does our spiritual compatibility worry you?",
        female: "As a woman, does our spiritual compatibility worry you?",
        options: [
          "Not at all",
          "A little",
          "Yes it does",
          "I haven't thought about it",
        ],
      },
    ],
  },
  {
    id: 8,
    displayName: "Forgiveness & Apology Styles",
    questions: [
      {
        id: 1,
        male: "As a man, how long does it usually take you to forgive your partner?",
        female:
          "As a woman, how long does it usually take you to forgive your partner?",
        options: ["Immediately", "A few days", "Weeks", "I hold grudges"],
      },
      {
        id: 2,
        male: "As a man, what is your apology language?",
        female: "As a woman, what is your apology language?",
        options: [
          "Saying sorry",
          "Changing behaviour",
          "Explaining why",
          "Giving gifts",
        ],
      },
      {
        id: 3,
        male: "As a man, do you feel your apologies are accepted?",
        female: "As a woman, do you feel your apologies are accepted?",
        options: ["Yes", "Sometimes", "Rarely", "No"],
      },
      {
        id: 4,
        male: "As a man, what hurts you the most after an argument?",
        female: "As a woman, what hurts you the most after an argument?",
        options: [
          "Being ignored",
          "Repeated criticism",
          "No apology",
          "Cold behaviour",
        ],
      },
      {
        id: 5,
        male: "As a man, how do you know when you have truly forgiven someone?",
        female:
          "As a woman, how do you know when you have truly forgiven someone?",
        options: [
          "I stop bringing it up",
          "I feel peace",
          "I can trust again",
          "I forget it happened",
        ],
      },
      {
        id: 6,
        male: "As a man, have you ever forgiven something you still resent?",
        female:
          "As a woman, have you ever forgiven something you still resent?",
        options: ["Yes", "No", "I'm not sure", "I pretend to forgive"],
      },
      {
        id: 7,
        male: "As a man, what makes an apology meaningful to you?",
        female: "As a woman, what makes an apology meaningful to you?",
        options: [
          "Sincerity",
          "Specific details",
          "Changed behaviour",
          "Emotional expression",
        ],
      },
      {
        id: 8,
        male: "As a man, is there something from the past you haven't fully forgiven?",
        female:
          "As a woman, is there something from the past you haven't fully forgiven?",
        options: ["Yes", "No", "One small thing", "Many things"],
      },
    ],
  },
  {
    id: 9,
    displayName: "Household Roles & Fairness",
    questions: [
      {
        id: 1,
        male: "As a man, how do you feel about the current division of household chores?",
        female:
          "As a woman, how do you feel about the current division of household chores?",
        options: ["Fair", "Somewhat fair", "Unfair", "I do most of it"],
      },
      {
        id: 2,
        male: "As a man, who should cook and clean in the relationship?",
        female: "As a woman, who should cook and clean in the relationship?",
        options: [
          "Both equally",
          "Whoever has more time",
          "Traditional roles",
          "I don't care",
        ],
      },
      {
        id: 3,
        male: "As a man, do you feel appreciated for the chores you do?",
        female: "As a woman, do you feel appreciated for the chores you do?",
        options: ["Yes", "Sometimes", "Rarely", "No"],
      },
      {
        id: 4,
        male: "As a man, what household task do you hate the most?",
        female: "As a woman, what household task do you hate the most?",
        options: [
          "Doing dishes",
          "Laundry",
          "Cleaning bathroom",
          "Taking out trash",
        ],
      },
      {
        id: 5,
        male: "As a man, should chores be 50/50 even if incomes differ?",
        female: "As a woman, should chores be 50/50 even if incomes differ?",
        options: [
          "Yes",
          "No, the one who earns more does less",
          "Depends on workload",
          "I don't know",
        ],
      },
      {
        id: 6,
        male: "As a man, how do you feel when your partner doesn't help with chores?",
        female:
          "As a woman, how do you feel when your partner doesn't help with chores?",
        options: ["Resentful", "Frustrated", "I let it go", "I do it myself"],
      },
      {
        id: 7,
        male: "As a man, do we need a chore schedule?",
        female: "As a woman, do we need a chore schedule?",
        options: ["Yes", "No", "Maybe", "We already have one"],
      },
      {
        id: 8,
        male: "As a man, what is one chore you wish your partner would do more of?",
        female:
          "As a woman, what is one chore you wish your partner would do more of?",
        options: ["Cooking", "Cleaning", "Planning", "Taking initiative"],
      },
    ],
  },
  {
    id: 10,
    displayName: "Jealousy & Insecurity",
    questions: [
      {
        id: 1,
        male: "As a man, how do you feel when your partner receives attention from others?",
        female:
          "As a woman, how do you feel when your partner receives attention from others?",
        options: ["Proud", "Slightly jealous", "Very jealous", "Insecure"],
      },
      {
        id: 2,
        male: "As a man, do you ever feel insecure about your looks or success compared to your partner?",
        female:
          "As a woman, do you ever feel insecure about your looks or success compared to your partner?",
        options: ["Never", "Sometimes", "Often", "Always"],
      },
      {
        id: 3,
        male: "As a man, how do you handle jealousy in a healthy way?",
        female: "As a woman, how do you handle jealousy in a healthy way?",
        options: ["Talk about it", "Work on myself", "Ignore it", "Get angry"],
      },
      {
        id: 4,
        male: "As a man, have past relationships made you more jealous?",
        female: "As a woman, have past relationships made you more jealous?",
        options: ["Yes", "No", "A little", "A lot"],
      },
      {
        id: 5,
        male: "As a man, what triggers your insecurity the most?",
        female: "As a woman, what triggers your insecurity the most?",
        options: [
          "Partner's ex",
          "Social media",
          "Opposite-sex friends",
          "Compliments to partner",
        ],
      },
      {
        id: 6,
        male: "As a man, do you want your partner to reassure you when you're jealous?",
        female:
          "As a woman, do you want your partner to reassure you when you're jealous?",
        options: ["Yes always", "Sometimes", "No", "I hide it"],
      },
      {
        id: 7,
        male: "As a man, how do you build your own confidence in the relationship?",
        female:
          "As a woman, how do you build your own confidence in the relationship?",
        options: ["Self-work", "Partner's words", "Achievements", "Therapy"],
      },
      {
        id: 8,
        male: "As a man, is jealousy hurting our relationship right now?",
        female: "As a woman, is jealousy hurting our relationship right now?",
        options: ["No", "A little", "Yes", "We don't talk about it"],
      },
    ],
  },
  {
    id: 11,
    displayName: "Long-Term Commitment",
    questions: [
      {
        id: 1,
        male: "As a man, do you see yourself with me for the rest of your life?",
        female:
          "As a woman, do you see yourself with me for the rest of your life?",
        options: ["Yes", "I hope so", "I'm not sure", "No"],
      },
      {
        id: 2,
        male: "As a man, what does marriage mean to you?",
        female: "As a woman, what does marriage mean to you?",
        options: [
          "Legal commitment",
          "Spiritual bond",
          "Just a paper",
          "Lifelong partnership",
        ],
      },
      {
        id: 3,
        male: "As a man, are you ready for lifelong commitment right now?",
        female: "As a woman, are you ready for lifelong commitment right now?",
        options: ["Yes", "Almost", "Not yet", "I need more time"],
      },
      {
        id: 4,
        male: "As a man, what would make you leave the relationship?",
        female: "As a woman, what would make you leave the relationship?",
        options: ["Cheating", "Loss of respect", "Unhappiness", "Nothing"],
      },
      {
        id: 5,
        male: "As a man, how do you define loyalty?",
        female: "As a woman, how do you define loyalty?",
        options: [
          "No cheating",
          "Emotional fidelity",
          "Supporting each other",
          "All of the above",
        ],
      },
      {
        id: 6,
        male: "As a man, do you believe we can grow old and still be in love?",
        female:
          "As a woman, do you believe we can grow old and still be in love?",
        options: ["Yes", "I hope so", "I'm scared we won't", "I don't know"],
      },
      {
        id: 7,
        male: "As a man, what scares you most about long-term commitment?",
        female: "As a woman, what scares you most about long-term commitment?",
        options: ["Losing freedom", "Growing apart", "Boredom", "Nothing"],
      },
      {
        id: 8,
        male: "As a man, what is one promise you are willing to make to me today?",
        female:
          "As a woman, what is one promise you are willing to make to me today?",
        options: [
          "I will always be honest",
          "I will work on myself",
          "I will choose you every day",
          "I will never give up",
        ],
      },
    ],
  },
  {
    id: 12,
    displayName: "Conflict Resolution",
    questions: [
      {
        id: 1,
        male: "As a man, how do you usually behave during an argument?",
        female: "As a woman, how do you usually behave during an argument?",
        options: ["Calm", "Loud", "Silent", "Defensive"],
      },
      {
        id: 2,
        male: "As a man, how long after a fight do you want to make up?",
        female: "As a woman, how long after a fight do you want to make up?",
        options: [
          "Immediately",
          "After cooling down",
          "Next day",
          "I need space",
        ],
      },
      {
        id: 3,
        male: "As a man, do you ever say things in anger that you later regret?",
        female:
          "As a woman, do you ever say things in anger that you later regret?",
        options: ["Often", "Sometimes", "Rarely", "Never"],
      },
      {
        id: 4,
        male: "As a man, what helps you calm down during conflict?",
        female: "As a woman, what helps you calm down during conflict?",
        options: ["Space", "Talking it out", "Physical touch", "Time alone"],
      },
      {
        id: 5,
        male: "As a man, do we fight fair?",
        female: "As a woman, do we fight fair?",
        options: ["Yes", "Mostly", "No", "We avoid fights"],
      },
      {
        id: 6,
        male: "As a man, what is our most common argument about?",
        female: "As a woman, what is our most common argument about?",
        options: ["Money", "Time", "Family", "Intimacy"],
      },
      {
        id: 7,
        male: "As a man, how can we improve the way we resolve conflicts?",
        female: "As a woman, how can we improve the way we resolve conflicts?",
        options: ["More listening", "No yelling", "Take breaks", "Seek help"],
      },
      {
        id: 8,
        male: "As a man, after a fight, do you feel closer or more distant?",
        female:
          "As a woman, after a fight, do you feel closer or more distant?",
        options: ["Closer", "Same", "More distant", "Depends"],
      },
    ],
  },
  {
    id: 13,
    displayName: "Personal Growth Together",
    questions: [
      {
        id: 1,
        male: "As a man, do you feel we support each other's personal growth?",
        female:
          "As a woman, do you feel we support each other's personal growth?",
        options: ["Yes fully", "Somewhat", "Not really", "No"],
      },
      {
        id: 2,
        male: "As a man, what is one area you want to improve in yourself?",
        female: "As a woman, what is one area you want to improve in yourself?",
        options: ["Patience", "Communication", "Fitness", "Career"],
      },
      {
        id: 3,
        male: "As a man, how do you feel when your partner grows and changes?",
        female:
          "As a woman, how do you feel when your partner grows and changes?",
        options: ["Proud", "Inspired", "Insecure", "Worried"],
      },
      {
        id: 4,
        male: "As a man, do we celebrate each other's wins enough?",
        female: "As a woman, do we celebrate each other's wins enough?",
        options: ["Yes", "Sometimes", "Rarely", "Never"],
      },
      {
        id: 5,
        male: "As a man, what is one goal we should work on together?",
        female: "As a woman, what is one goal we should work on together?",
        options: ["Health", "Finances", "Relationship", "Travel"],
      },
      {
        id: 6,
        male: "As a man, are you afraid of growing apart as we grow individually?",
        female:
          "As a woman, are you afraid of growing apart as we grow individually?",
        options: ["Yes", "A little", "No", "I haven't thought about it"],
      },
      {
        id: 7,
        male: "As a man, how can I better support your personal growth?",
        female: "As a woman, how can I better support your personal growth?",
        options: [
          "Encouragement",
          "Giving space",
          "Accountability",
          "Celebrating wins",
        ],
      },
      {
        id: 8,
        male: "As a man, do you believe we are becoming better versions of ourselves together?",
        female:
          "As a woman, do you believe we are becoming better versions of ourselves together?",
        options: ["Yes", "Somewhat", "Not yet", "No"],
      },
    ],
  },
  {
    id: 14,
    displayName: "Love Languages Deep Dive",
    questions: [
      {
        id: 1,
        male: "As a man, which love language do you give most naturally?",
        female: "As a woman, which love language do you give most naturally?",
        options: [
          "Words of Affirmation",
          "Acts of Service",
          "Receiving Gifts",
          "Quality Time",
          "Physical Touch",
        ],
      },
      {
        id: 2,
        male: "As a man, which love language do you need most from your partner?",
        female:
          "As a woman, which love language do you need most from your partner?",
        options: [
          "Words of Affirmation",
          "Acts of Service",
          "Receiving Gifts",
          "Quality Time",
          "Physical Touch",
        ],
      },
      {
        id: 3,
        male: "As a man, do you feel your partner speaks your love language?",
        female:
          "As a woman, do you feel your partner speaks your love language?",
        options: ["Yes", "Sometimes", "Rarely", "No"],
      },
      {
        id: 4,
        male: "As a man, what is one way I can love you better this week?",
        female: "As a woman, what is one way I can love you better this week?",
        options: [
          "More compliments",
          "Help with chores",
          "Undivided attention",
          "More affection",
        ],
      },
      {
        id: 5,
        male: "As a man, do we have the same primary love language?",
        female: "As a woman, do we have the same primary love language?",
        options: ["Yes", "No", "I'm not sure", "We have multiple"],
      },
      {
        id: 6,
        male: "As a man, how has learning love languages changed our relationship?",
        female:
          "As a woman, how has learning love languages changed our relationship?",
        options: [
          "Made it better",
          "No change",
          "Made it worse",
          "We haven't tried",
        ],
      },
      {
        id: 7,
        male: "As a man, what is the most meaningful way your partner has shown love recently?",
        female:
          "As a woman, what is the most meaningful way your partner has shown love recently?",
        options: ["A surprise", "Listening", "Helping", "Affection"],
      },
      {
        id: 8,
        male: "As a man, what is one love language you want to improve giving?",
        female:
          "As a woman, what is one love language you want to improve giving?",
        options: ["Words", "Service", "Gifts", "Time", "Touch"],
      },
    ],
  },
  {
    id: 15,
    displayName: "Sexual Compatibility & Desires",
    questions: [
      {
        id: 1,
        male: "As a man, how satisfied are you with our sex life?",
        female: "As a woman, how satisfied are you with our sex life?",
        options: [
          "Very satisfied",
          "Somewhat satisfied",
          "Not satisfied",
          "I avoid thinking about it",
        ],
      },
      {
        id: 2,
        male: "As a man, what is one thing you wish was different in our sex life?",
        female:
          "As a woman, what is one thing you wish was different in our sex life?",
        options: [
          "More frequency",
          "More variety",
          "More emotional connection",
          "More initiation from partner",
        ],
      },
      {
        id: 3,
        male: "As a man, do you feel comfortable expressing your sexual desires?",
        female:
          "As a woman, do you feel comfortable expressing your sexual desires?",
        options: ["Yes", "Somewhat", "Rarely", "No"],
      },
      {
        id: 4,
        male: "As a man, how important is sexual compatibility to you in a long-term relationship?",
        female:
          "As a woman, how important is sexual compatibility to you in a long-term relationship?",
        options: [
          "Very important",
          "Important",
          "Somewhat important",
          "Not important",
        ],
      },
      {
        id: 5,
        male: "As a man, have our sexual needs changed over time?",
        female: "As a woman, have our sexual needs changed over time?",
        options: ["Yes", "No", "A little", "I don't know"],
      },
      {
        id: 6,
        male: "As a man, what makes you feel most desired by your partner?",
        female: "As a woman, what makes you feel most desired by your partner?",
        options: ["Initiation", "Compliments", "Seduction", "Aftercare"],
      },
      {
        id: 7,
        male: "As a man, are there any fantasies or desires you haven't shared?",
        female:
          "As a woman, are there any fantasies or desires you haven't shared?",
        options: ["Yes", "No", "One or two", "I'm afraid to share"],
      },
      {
        id: 8,
        male: "As a man, how can we keep the spark alive for many years?",
        female: "As a woman, how can we keep the spark alive for many years?",
        options: [
          "Open communication",
          "Trying new things",
          "Date nights",
          "Emotional connection",
        ],
      },
    ],
  },
];

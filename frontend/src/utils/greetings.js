// Array of greeting messages
export const greetings = [
  "Welcome Back",
  "Happy to see you",
  "Glad you're here",
  "Great to have you back",
  "Hello",
  "hey",
  "Let's see how today is gonna be",
  "Yoo",
  "Looking good today",
  "Let's make today count",
  "Ready to grow together",
  "Your journey continues",
  "Time to shine",
  "Let's connect",
];

// Function to get a random greeting
export const getRandomGreeting = () => {
  return greetings[Math.floor(Math.random() * greetings.length)];
};

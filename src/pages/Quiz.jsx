import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';

export default function Quiz() {
  // Example quiz questions related to romance, relationships, and self-growth
  const questions = [
    {
      question: 'What is your primary love language?',
      options: ['Words of Affirmation', 'Acts of Service', 'Receiving Gifts', 'Quality Time', 'Physical Touch'],
    },
    {
      question: 'Which quality do you value most in a partner?',
      options: ['Trust', 'Communication', 'Empathy', 'Ambition', 'Humor'],
    },
    {
      question: 'How do you prefer to resolve conflicts?',
      options: ['Open discussion', 'Taking a break', 'Writing it out', 'Seeking advice', 'Letting time pass'],
    },
    {
      question: 'What is your biggest relationship goal this year?',
      options: ['Better communication', 'More quality time', 'Building trust', 'Trying new things together', 'Personal growth'],
    },
    {
      question: 'How do you show appreciation to your partner?',
      options: ['Saying thank you', 'Doing something special', 'Giving gifts', 'Spending time', 'Physical affection'],
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4 max-w-2xl mx-auto">
        <h1 className="text-primary-purple text-2xl font-bold mb-6">Relationship & Self-Growth Quiz</h1>
        <form className="space-y-8 bg-card-bg rounded-2xl p-8 shadow-lg">
          {questions.map((q, idx) => (
            <div key={idx}>
              <p className="font-semibold mb-4 text-lg">{q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer bg-[#18121F] hover:bg-[#23232B] px-4 py-3 rounded-lg">
                    <input type="radio" name={`q${idx}`} value={opt} className="accent-primary-purple" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="w-full bg-pink-accent text-white py-3 rounded-lg font-bold hover:bg-[#E0559B]">Submit Answers</button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}

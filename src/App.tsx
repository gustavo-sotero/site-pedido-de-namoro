import React, { useState } from 'react';
import { Heart, Stars, Sparkles } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { Question } from './components/Question';

function App() {
  const [stage, setStage] = useState(0);
  const [showProposal, setShowProposal] = useState(false);
  const [response, setResponse] = useState<boolean | null>(null);

  const messages = [
    'Desde o momento em que te vi pela primeira vez...',
    'Cada dia com você tem sido mágico...',
    'Você faz meu coração acelerar...',
    'E agora quero te perguntar algo especial...',
  ];

  const handleNext = () => {
    if (stage < messages.length - 1) {
      setStage(stage + 1);
    } else {
      setShowProposal(true);
    }
  };

  const handleResponse = (answer: boolean) => {
    setResponse(answer);
  };

  if (response !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
        <div className="text-center">
          {response ? (
            <div className="animate-fadeIn">
              <h1 className="text-4xl font-bold text-rose-600 mb-6">
                Você me fez a pessoa mais feliz do mundo! ❤️
              </h1>
              <FloatingHearts />
            </div>
          ) : (
            <p className="text-2xl text-gray-700">💔</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {!showProposal ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center transform transition-all duration-500 hover:scale-102">
            <div className="mb-6">
              {stage % 2 === 0 ? (
                <Heart className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
              ) : (
                <Stars className="w-12 h-12 text-rose-500 mx-auto animate-spin-slow" />
              )}
            </div>
            <p className="text-2xl text-gray-800 font-medium mb-8 leading-relaxed">
              {messages[stage]}
            </p>
            <button
              onClick={handleNext}
              className="bg-rose-500 text-white px-8 py-3 rounded-full font-medium transform transition-all duration-300 hover:bg-rose-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
            >
              Continue
            </button>
          </div>
        ) : (
          <Question onResponse={handleResponse} />
        )}
      </div>
    </div>
  );
}

export default App;

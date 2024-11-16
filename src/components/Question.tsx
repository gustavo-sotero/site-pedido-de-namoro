import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface QuestionProps {
  onResponse: (answer: boolean) => void;
}

export const Question: React.FC<QuestionProps> = ({ onResponse }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState<{
    x: number;
    y: number | null;
  }>({ x: 0, y: null });
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const buttonWidth = 120;
      const buttonHeight = 48;

      const padding = 20;
      const maxX = container.width - buttonWidth - padding * 2;
      const maxY = container.height - buttonHeight - padding * 2;

      const newX = padding + Math.random() * maxX;
      const newY = padding + Math.random() * maxY;

      setNoButtonPosition({ x: newX, y: newY });
      setAttempts((prev) => prev + 1);
    }
  };

  const handleNoInteraction = (event: React.MouseEvent) => {
    event.preventDefault();
    if (attempts === 0) {
      setAttempts(1);
    } else if (attempts < 5) {
      moveButton();
    } else {
      setAttempts(10);
    }
  };

  const noButtonStyle =
    attempts === 0
      ? {}
      : attempts === 1
      ? {
          position: 'absolute' as const,
          left: '50%',
          transform: 'translateX(-50%)',
          top: '60px',
          transition: 'all 0.3s ease-out',
        }
      : {
          position: 'absolute' as const,
          transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
          transition: 'all 0.3s ease-out',
        };

  return (
    <div
      ref={containerRef}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center transform transition-all duration-500 relative"
      style={{ minHeight: '400px', maxWidth: '600px', margin: '0 auto' }}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <div className="w-full mb-8">
          <Sparkles className="w-16 h-16 text-rose-500 mx-auto mb-6 animate-spin-slow" />
          <h1 className="text-4xl font-bold text-gray-800">
            Você aceita namorar comigo? {isHovering ? '❤️' : ''}
          </h1>
        </div>

        {/* Buttons container */}
        <div className="relative w-full" style={{ height: '200px' }}>
          <div
            className={`flex flex-col justify-center items-center gap-4 ${
              attempts > 1 ? 'h-full' : ''
            }`}
          >
            {/* Yes button */}
            <button
              onClick={() => onResponse(true)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="bg-rose-500 text-white px-8 py-3 rounded-full font-medium transform transition-all duration-300 hover:bg-rose-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 z-10"
            >
              SIM! ❤️
            </button>

            {/* No button */}
            {attempts < 10 && (
              <button
                onClick={handleNoInteraction}
                onMouseEnter={handleNoInteraction}
                style={noButtonStyle}
                className="bg-gray-200 text-gray-600 px-8 py-3 rounded-full font-medium transform transition-all duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                {attempts === 1 ? 'Não' : 'Serio?'}
              </button>
            )}
          </div>

          {/* Message container */}
          {attempts > 0 && attempts < 10 && (
            <div className="absolute bottom-0 left-0 right-0 text-center">
              <p className="text-rose-500 italic animate-bounce">
                {attempts < 5
                  ? 'Você tem certeza disso? 😏'
                  : 'Acho que você sabe o que quer dizer... 😊'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

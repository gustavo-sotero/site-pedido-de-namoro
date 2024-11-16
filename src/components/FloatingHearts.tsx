import React from 'react';
import { Heart } from 'lucide-react';

export const FloatingHearts = () => {
  return (
    <div className="relative h-96">
      {[...Array(15)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-rose-500 animate-float-${i % 5} opacity-80`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${Math.random() * 20 + 20}px`
          }}
        />
      ))}
    </div>
  );
};
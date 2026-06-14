import React, { ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
}

export default function CardWrapper({ children }: CardWrapperProps) {
  return (
    <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg border border-white/30 dark:border-gray-500/30 rounded-xl shadow-xl p-6 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out">
      {children}
    </div>
  );
}

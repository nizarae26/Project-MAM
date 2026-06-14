import React, { ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
}

export default function CardWrapper({ children }: CardWrapperProps) {
  return (
    <div className="glass-panel glass-edge rounded-3xl p-6 transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1">
      {children}
    </div>
  );
}

import React from 'react';
import CardWrapper from './CardWrapper';

type LightCardProps = {
  lux: number;
  weather: string;
};

export default function LightCard({ lux, weather }: LightCardProps) {
  return (
    <CardWrapper>
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
          <span className="text-xl">☀️</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 mb-6">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Intensitas Cahaya</span>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-slate-800 dark:text-white">{lux}</span>
          <span className="text-xl font-medium text-slate-500 dark:text-slate-400">Lux</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Perkiraan Cuaca</span>
        <span className="text-lg font-semibold text-amber-600 dark:text-amber-400 capitalize">{weather || 'Cerah'}</span>
      </div>
    </CardWrapper>
  );
}

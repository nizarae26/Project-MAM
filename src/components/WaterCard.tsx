import React from 'react';
import CardWrapper from './CardWrapper';

type WaterCardProps = {
  percent: number;
  height: number;
  status: 'KRITIS' | 'PENGISIAN' | 'PENUH';
};

export default function WaterCard({ percent, height, status }: WaterCardProps) {
  const isKritis = status === 'KRITIS';
  const statusColors = {
    KRITIS: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30',
    PENGISIAN: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/30',
    PENUH: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30',
  };
  
  return (
    <CardWrapper>
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
          <span className="text-xl">💧</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      
      <div className="flex flex-col gap-1 mb-6">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Level Air</span>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-slate-800 dark:text-white">{percent}</span>
          <span className="text-xl font-medium text-slate-500 dark:text-slate-400">%</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-3 rounded-full overflow-hidden shadow-inner mb-6">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${isKritis ? 'bg-rose-500' : 'bg-blue-500 dark:bg-blue-400'}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      
      <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Tinggi Fisik</span>
        <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">{height} cm</span>
      </div>
    </CardWrapper>
  );
}

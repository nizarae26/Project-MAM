import React from 'react';
import CardWrapper from './CardWrapper';

type Alarm = {
  icon: string;
  title: string;
  detail: string; // e.g., 'Level Air: 5%' or 'Lux: 12.500'
  time: string; // HH:MM
};

type AlarmPanelProps = {
  alarms: Alarm[];
  title?: string;
  icon?: string;
};

export default function AlarmPanel({ alarms, title = "Log Peringatan Sistem", icon = "🔔" }: AlarmPanelProps) {
  return (
    <CardWrapper>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
            <span className="text-rose-600 dark:text-rose-400">{icon}</span>
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {title}
          </h2>
        </div>
        {alarms.length > 0 && (
          <span className="px-2 py-1 bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 rounded-full text-xs font-bold">
            {alarms.length} Baru
          </span>
        )}
      </div>
      
      <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {alarms.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-slate-300 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5">
            <div className="text-4xl mb-3 opacity-50">✨</div>
            <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Semua sistem beroperasi normal</p>
          </div>
        ) : (
          <ul className="list-none space-y-3">
            {alarms.map((a, idx) => {
              const isWarning = a.title.includes('HUJAN');
              const colorClass = isWarning 
                ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-100' 
                : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-900 dark:text-rose-100';
              return (
                <li key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border shadow-sm ${colorClass} transition-all hover:scale-[1.01]`}>
                  <div className="flex items-start sm:items-center">
                    <span className="mr-3 text-2xl" aria-hidden="true">{a.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{a.title}</span>
                      <span className="text-xs opacity-80 mt-0.5">{a.detail}</span>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 px-3 py-1 bg-white/50 dark:bg-black/20 rounded-full border border-white/20 shadow-sm text-xs font-semibold">
                    {a.time}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </CardWrapper>
  );
}

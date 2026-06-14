import React from 'react';
import CardWrapper from './CardWrapper';

type Device = {
  device_id: string;
  is_online: boolean;
};

type DeviceStatusPanelProps = {
  devices: Device[];
};

export default function DeviceStatusPanel({ devices }: DeviceStatusPanelProps) {
  return (
    <CardWrapper>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Status Node Hardware</h2>
        <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-md text-xs font-medium text-slate-500 dark:text-slate-400">Jaringan</span>
      </div>
      <ul className="list-none space-y-3">
        {devices.map((d, idx) => (
          <li key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="flex items-center">
              <span className="text-slate-400 font-medium text-sm w-8">#{idx + 1}</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{d.device_id}</span>
            </div>
            <div className="flex items-center px-2 py-1 rounded-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 shadow-sm">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${d.is_online ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span className={`text-xs font-semibold ${d.is_online ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                {d.is_online ? 'Online' : 'Offline'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
}

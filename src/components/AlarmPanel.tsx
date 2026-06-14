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
};

export default function AlarmPanel({ alarms }: AlarmPanelProps) {
  return (
    <CardWrapper>
      <h2 className="text-lg font-medium mb-2">Alarm Panel</h2>
      <ul className="list-none space-y-2 text-sm">
        {alarms.map((a, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2 text-xl" aria-hidden="true">{a.icon}</span>
            <div>
              <div className="font-medium">{a.title}</div>
              <div>{a.detail}</div>
              <div className="text-gray-500 dark:text-gray-400">Waktu: {a.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
}

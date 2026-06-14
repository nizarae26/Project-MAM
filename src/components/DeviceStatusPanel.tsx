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
      <h2 className="text-lg font-medium mb-2">Device Status</h2>
      <ul className="list-none space-y-1 text-sm">
        {devices.map((d, idx) => (
          <li key={idx} className="flex items-center">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${d.is_online ? 'bg-success' : 'bg-danger'}`}></span>
            <span>{d.device_id}</span>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
}

import React from 'react';
import CardWrapper from './CardWrapper';

type WaterCardProps = {
  percent: number;
  height: number;
  status: 'KRITIS' | 'PENGISIAN' | 'PENUH';
};

export default function WaterCard({ percent, height, status }: WaterCardProps) {
  const statusColor =
    status === 'KRITIS'
      ? 'bg-danger'
      : status === 'PENGISIAN'
      ? 'bg-warning'
      : 'bg-success';

  return (
    <CardWrapper>
      <h2 className="text-lg font-medium mb-2">Monitoring Air</h2>
      <p>Persentase: {percent}%</p>
      <p>Tinggi: {height} cm</p>
      <span
        className={`inline-block mt-2 px-2 py-1 rounded ${statusColor} text-white text-sm`}
      >
        Status: {status}
      </span>
    </CardWrapper>
  );
}

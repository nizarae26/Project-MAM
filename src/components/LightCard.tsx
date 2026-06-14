import React from 'react';
import CardWrapper from './CardWrapper';

type LightCardProps = {
  lux: number;
  weather: string;
};

export default function LightCard({ lux, weather }: LightCardProps) {
  return (
    <CardWrapper>
      <h2 className="text-lg font-medium mb-2">Monitoring Cahaya</h2>
      <p>Intensitas: {lux} Lux</p>
      <p>Cuaca: {weather}</p>
    </CardWrapper>
  );
}

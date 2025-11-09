
import React from 'react';
import { Pollutant } from '../types';

interface PollutantDetailsCardProps {
  pollutants: Pollutant[];
}

const PollutantRow: React.FC<{ pollutant: Pollutant }> = ({ pollutant }) => {
    const getPollutantColor = (name: string, value: number) => {
        // Simplified color scale
        if (name === 'PM2.5' && value > 55) return 'bg-red-500';
        if (name === 'PM10' && value > 155) return 'bg-red-500';
        if (name === 'O3' && value > 70) return 'bg-orange-500';
        if (value > 50) return 'bg-yellow-500';
        return 'bg-green-500';
    };
    
    const color = getPollutantColor(pollutant.name, pollutant.value);
    const width = Math.min(100, (pollutant.value / 2)); // Simple scaling

    return (
        <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-600 w-16">{pollutant.name}</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mx-4">
                <div className={`${color} h-2.5 rounded-full`} style={{ width: `${width}%` }}></div>
            </div>
            <span className="font-bold text-gray-800 w-12 text-right">{pollutant.value}</span>
        </div>
    );
};

const PollutantDetailsCard: React.FC<PollutantDetailsCardProps> = ({ pollutants }) => {
  return (
    <div className="space-y-3">
      {pollutants.map((p) => (
        <PollutantRow key={p.name} pollutant={p} />
      ))}
    </div>
  );
};

export default PollutantDetailsCard;


import React from 'react';
import { AqiLevel } from '../types';

interface CurrentAqiCardProps {
  aqi: number;
  level: AqiLevel;
  cityName: string;
}

const getAqiColor = (level: AqiLevel): string => {
  switch (level) {
    case 'Good': return 'bg-green-500';
    case 'Moderate': return 'bg-yellow-500';
    case 'Unhealthy for Sensitive Groups': return 'bg-orange-500';
    case 'Unhealthy': return 'bg-red-500';
    case 'Very Unhealthy': return 'bg-purple-500';
    case 'Hazardous': return 'bg-red-800';
    default: return 'bg-gray-500';
  }
};

const CurrentAqiCard: React.FC<CurrentAqiCardProps> = ({ aqi, level, cityName }) => {
  const bgColor = getAqiColor(level);

  return (
    <div className={`${bgColor} text-white p-8 rounded-xl shadow-2xl flex flex-col md:flex-row justify-between items-center`}>
      <div>
        <h2 className="text-2xl font-bold">Current Air Quality in {cityName}</h2>
        <p className="text-lg opacity-90">{level}</p>
      </div>
      <div className="text-center md:text-right mt-4 md:mt-0">
        <div className="text-7xl font-bold">{aqi}</div>
        <div className="text-sm font-semibold tracking-wider">US AQI</div>
      </div>
    </div>
  );
};

export default CurrentAqiCard;

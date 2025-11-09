import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Forecast } from '../types';

interface AqiForecastChartProps {
  forecast: Forecast[];
}

const getAqiColor = (aqi: number): string => {
  if (aqi <= 50) return '#22c55e'; // green-500
  if (aqi <= 100) return '#eab308'; // yellow-500
  if (aqi <= 150) return '#f97316'; // orange-500
  if (aqi <= 200) return '#ef4444'; // red-500
  if (aqi <= 300) return '#8b5cf6'; // purple-500
  return '#b91c1c'; // red-800
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
        <p className="font-bold">{`${label}`}</p>
        <p className="text-blue-600">{`AQI: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AqiForecastChart: React.FC<AqiForecastChartProps> = ({ forecast }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={forecast} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}/>
          <Bar dataKey="aqi" name="AQI" barSize={50}>
            {forecast.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getAqiColor(entry.aqi)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AqiForecastChart;
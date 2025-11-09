
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FeatureImportance } from '../types';

interface FeatureImportanceChartProps {
  features: FeatureImportance[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
        <p className="font-bold">{`${label}`}</p>
        <p className="text-indigo-600">{`Importance: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ features }) => {
  const sortedFeatures = [...features].sort((a, b) => a.importance - b.importance);
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={sortedFeatures} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis dataKey="feature" type="category" stroke="#6b7280" width={120} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }} />
          <Bar dataKey="importance" name="Importance" fill="#4f46e5" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;

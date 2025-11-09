
import React, { useState, useEffect } from 'react';
import { AqiLevel } from '../types';
import { getHealthRecommendations } from '../services/geminiService';

interface HealthRecommendationsProps {
  aqi: number;
  level: AqiLevel;
}

const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ aqi, level }) => {
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getHealthRecommendations(aqi, level);
        setRecommendations(result);
      } catch (err) {
        setError('Failed to fetch recommendations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [aqi, level]);

  const renderContent = () => {
    if (loading) {
      return <div className="flex items-center text-gray-500"><i className="fas fa-spinner fa-spin mr-2"></i>Generating recommendations...</div>;
    }
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    const parts = recommendations.split('\n- ');
    const explanation = parts[0];
    const items = parts.slice(1).map(item => item.trim());

    return (
        <div className="prose max-w-none text-gray-600">
            <p>{explanation}</p>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
  };
  
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
      {renderContent()}
    </div>
  );
};

export default HealthRecommendations;

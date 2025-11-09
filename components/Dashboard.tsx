import React from 'react';
import { AqiData } from '../types';
import CurrentAqiCard from './CurrentAqiCard';
import AqiForecastChart from './AqiForecastChart';
import PollutantDetailsCard from './PollutantDetailsCard';
import FeatureImportanceChart from './FeatureImportanceChart';
import HealthRecommendations from './HealthRecommendations';

interface DashboardProps {
  data: AqiData | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  lastUpdated: Date | null;
}

const Dashboard: React.FC<DashboardProps> = ({ data, loading, error, onRefresh, lastUpdated }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    const isInfo = error.includes('Displaying sample data');
    const containerClasses = isInfo
      ? "bg-blue-100 border-l-4 border-blue-500 text-blue-700"
      : "bg-red-100 border-l-4 border-red-500 text-red-700";
    const title = isInfo ? "Info" : "Error";

    return (
      <div className={`${containerClasses} p-4 rounded-lg shadow-md`} role="alert">
        <p className="font-bold">{title}</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 px-2">
        <p className="text-sm text-gray-500">
          {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Loading...'}
        </p>
        <button 
          onClick={onRefresh}
          className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors disabled:opacity-50"
          disabled={loading}
        >
          <i className="fas fa-sync-alt mr-2"></i>
          Refresh Data
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <CurrentAqiCard aqi={data.currentAqi} level={data.level} cityName={data.city} />
        </div>
        
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">3-Day AQI Forecast</h2>
          <AqiForecastChart forecast={data.forecast} />
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Pollutant Levels</h2>
          <PollutantDetailsCard pollutants={data.pollutants} />
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">AI-Powered Health Recommendations</h2>
          <HealthRecommendations aqi={data.currentAqi} level={data.level} />
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Model Insights: Feature Importance</h2>
          <FeatureImportanceChart features={data.featureImportance} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
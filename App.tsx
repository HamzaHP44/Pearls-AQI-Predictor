import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CitySelector from './components/CitySelector';
import Dashboard from './components/Dashboard';
import { useAqiData } from './hooks/useAqiData';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('Karachi');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { data, loading, error, fetchByCity } = useAqiData(city);

  const availableCities = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta'];

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    fetchByCity(newCity);
  };
  
  const handleRefresh = () => {
    fetchByCity(city);
  }

  useEffect(() => {
    if (!loading && data) {
      setLastUpdated(new Date());
    }
  }, [loading, data]);


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <CitySelector
            onCityChange={handleCityChange}
            initialCity={city}
            availableCities={availableCities}
          />
          <Dashboard 
            data={data} 
            loading={loading} 
            error={error}
            onRefresh={handleRefresh}
            lastUpdated={lastUpdated}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
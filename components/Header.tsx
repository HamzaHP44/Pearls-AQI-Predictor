import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Pearls <span className="text-blue-600">AQI Predictor</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Forecasting air quality for the next 3 days.
        </p>
      </div>
    </header>
  );
};

export default Header;
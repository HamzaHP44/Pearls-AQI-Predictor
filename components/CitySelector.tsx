import React, { useState } from 'react';

interface CitySelectorProps {
  onCityChange: (city: string) => void;
  initialCity: string;
  availableCities: string[];
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCityChange, initialCity, availableCities }) => {
  const [inputValue, setInputValue] = useState(initialCity);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim()) {
      const filtered = availableCities.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsDropdownVisible(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setInputValue(city);
    onCityChange(city);
    setIsDropdownVisible(false);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownVisible(false);
    if (inputValue.trim()) {
      onCityChange(inputValue.trim());
    }
  };
  
  const handleBlur = () => {
    // Delay hiding to allow click events on suggestions to register
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 150);
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
        <label htmlFor="city-input" className="sr-only">Enter City</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-map-marker-alt text-gray-400"></i>
            </div>
            <input
                id="city-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter a city in Pakistan..."
                className="w-full bg-white pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                autoComplete="off"
            />
            {isDropdownVisible && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map(city => (
                  <li
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onMouseDown={() => handleSuggestionClick(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Predict AQI
        </button>
      </form>
    </div>
  );
};

export default CitySelector;
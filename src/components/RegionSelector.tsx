'use client';

import { useState } from 'react';
import { continents, Continent, Country } from '../constants/regions';
import { saveRegion } from '../utils/storage';

export default function RegionSelector() {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleContinentClick = (continent: Continent) => {
    setSelectedContinent(continent);
    setIsOpen(true);
  };

  const handleCountrySelect = (country: Country) => {
    // Save the selection to localStorage
    saveRegion(country.code, selectedContinent?.code || '');
    
    // Set the selected country
    setSelectedCountry(country);
    
    // Close the dropdown
    setIsOpen(false);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg text-gray-600">
          Please select your region to continue shopping
        </p>
      </div>

      {/* Selected Region Display */}
      {selectedCountry && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-lg">
            Your selected region: <span className="font-medium">{selectedCountry.name}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {continents.map((continent) => (
          <button
            key={continent.code}
            onClick={() => handleContinentClick(continent)}
            className={`py-4 px-6 rounded-lg border transition-all duration-200 hover:shadow-md text-center ${
              selectedContinent?.code === continent.code
                ? 'border-primary bg-gray-100'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className="font-medium">{continent.name}</span>
          </button>
        ))}
      </div>

      {isOpen && selectedContinent && (
        <div className="relative">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10" onClick={closeDropdown}></div>
          <div className="absolute z-20 top-0 left-0 right-0 bg-white rounded-lg shadow-xl p-4 max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Select a country from {selectedContinent.name}</h3>
              <button 
                onClick={closeDropdown}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedContinent.countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center space-x-2 p-3 rounded hover:bg-gray-100 transition-colors"
                >
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
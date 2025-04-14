// Storage keys
const REGION_KEY = 'user_region';

// Function to save region selection to localStorage
export const saveRegion = (countryCode: string, continentCode: string): void => {
  if (typeof window !== 'undefined') {
    const regionData = {
      country: countryCode,
      continent: continentCode,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(REGION_KEY, JSON.stringify(regionData));
  }
};

// Function to get stored region
export const getStoredRegion = () => {
  if (typeof window !== 'undefined') {
    const regionData = localStorage.getItem(REGION_KEY);
    
    if (regionData) {
      try {
        return JSON.parse(regionData);
      } catch (error) {
        console.error('Error parsing stored region data:', error);
        return null;
      }
    }
  }
  
  return null;
};

// Function to check if user has selected a region
export const hasRegionSelected = (): boolean => {
  return getStoredRegion() !== null;
};

// Function to clear region selection
export const clearRegionSelection = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(REGION_KEY);
  }
}; 
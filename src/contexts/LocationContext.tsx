
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Location {
  state: string;
  district?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (isOpen: boolean) => void;
  hasRequestedLocation: boolean;
  setHasRequestedLocation: (hasRequested: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(() => {
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(() => {
    return localStorage.getItem('hasRequestedLocation') === 'true';
  });

  useEffect(() => {
    if (location) {
      localStorage.setItem('userLocation', JSON.stringify(location));
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('hasRequestedLocation', hasRequestedLocation.toString());
  }, [hasRequestedLocation]);

  useEffect(() => {
    if (!hasRequestedLocation) {
      // Show location modal after a short delay when user first visits
      const timer = setTimeout(() => {
        setIsLocationModalOpen(true);
        setHasRequestedLocation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasRequestedLocation]);

  return (
    <LocationContext.Provider 
      value={{ 
        location, 
        setLocation, 
        isLocationModalOpen, 
        setIsLocationModalOpen,
        hasRequestedLocation,
        setHasRequestedLocation 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

// List of Indian states and some major disaster-prone districts
export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

export const disasterProneAreas: Record<string, string[]> = {
  'Kerala': ['Wayanad', 'Idukki', 'Kochi', 'Alappuzha', 'Pathanamthitta'],
  'Odisha': ['Puri', 'Kendrapara', 'Jagatsinghpur', 'Balasore', 'Bhadrak'],
  'Uttarakhand': ['Chamoli', 'Pithoragarh', 'Rudraprayag', 'Uttarkashi', 'Tehri'],
  'Assam': ['Dhemaji', 'Lakhimpur', 'Dibrugarh', 'Jorhat', 'Majuli'],
  'Bihar': ['Darbhanga', 'Muzaffarpur', 'Sitamarhi', 'Madhubani', 'Katihar'],
  'Gujarat': ['Kutch', 'Jamnagar', 'Dwarka', 'Porbandar', 'Junagadh'],
  'Maharashtra': ['Mumbai', 'Pune', 'Raigad', 'Sindhudurg', 'Ratnagiri'],
  'Tamil Nadu': ['Chennai', 'Cuddalore', 'Nagapattinam', 'Kanniyakumari', 'Thoothukudi']
};

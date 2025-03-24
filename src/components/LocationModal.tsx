
import React, { useState } from 'react';
import { MapPin, X, AlertCircle } from 'lucide-react';
import { useLocation, indianStates, disasterProneAreas } from '../contexts/LocationContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { toast } from '../hooks/use-toast';

const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, setLocation } = useLocation();
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [isGettingGeoLocation, setIsGettingGeoLocation] = useState(false);
  const [geoLocationError, setGeoLocationError] = useState<string | null>(null);

  const handleGetCurrentLocation = () => {
    setIsGettingGeoLocation(true);
    setGeoLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsGettingGeoLocation(false);
          
          // In a real app, we would reverse geocode these coordinates to get state and district
          // For now, we'll just store the coordinates
          setLocation({
            state: 'Unknown',
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
          
          setIsLocationModalOpen(false);
          toast({
            title: 'Location Updated',
            description: 'Your coordinates have been saved. We\'ll show relevant alerts for your area.',
          });
        },
        (error) => {
          setIsGettingGeoLocation(false);
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setGeoLocationError('Location permission denied. Please use manual selection.');
              break;
            case error.POSITION_UNAVAILABLE:
              setGeoLocationError('Location information unavailable. Please try the manual selection.');
              break;
            case error.TIMEOUT:
              setGeoLocationError('Location request timed out. Please try the manual selection.');
              break;
            default:
              setGeoLocationError('An unknown error occurred. Please try the manual selection.');
          }
        }
      );
    } else {
      setIsGettingGeoLocation(false);
      setGeoLocationError('Geolocation is not supported by your browser. Please use the manual selection.');
    }
  };

  const handleManualLocationSubmit = () => {
    if (selectedState) {
      setLocation({
        state: selectedState,
        district: selectedDistrict || undefined
      });
      setIsLocationModalOpen(false);
      toast({
        title: 'Location Updated',
        description: `You've selected ${selectedDistrict ? `${selectedDistrict}, ` : ''}${selectedState}. We'll show relevant alerts for this area.`,
      });
    }
  };

  return (
    <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Set Your Location
          </DialogTitle>
          <DialogDescription>
            Help us provide you with location-specific disaster alerts and emergency information.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGetCurrentLocation}
            disabled={isGettingGeoLocation}
          >
            {isGettingGeoLocation ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                <span>Getting location...</span>
              </>
            ) : (
              <>
                <MapPin size={16} />
                <span>Use my current location</span>
              </>
            )}
          </Button>
          
          {geoLocationError && (
            <div className="text-sm flex items-start gap-2 text-destructive p-2 border border-destructive/20 rounded-md bg-destructive/10">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>{geoLocationError}</p>
            </div>
          )}
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full border-border" />
              <span className="absolute px-3 text-xs text-muted-foreground bg-background">or select manually</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium">
                State <span className="text-destructive">*</span>
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('');
                }}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="">Select a state</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            {selectedState && disasterProneAreas[selectedState] && (
              <div className="space-y-2">
                <label htmlFor="district" className="text-sm font-medium">
                  District
                </label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select a district</option>
                  {disasterProneAreas[selectedState].map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button 
            variant="ghost" 
            onClick={() => setIsLocationModalOpen(false)}
          >
            Remind me later
          </Button>
          <Button 
            onClick={handleManualLocationSubmit}
            disabled={!selectedState}
            className="button-shine"
          >
            Save location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;

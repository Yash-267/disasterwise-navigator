
import React, { useEffect, useRef, useState } from 'react';
import { Map as MapIcon, Compass, Locate, Layers, Info } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { location } = useLocation();
  const [showMapInfo, setShowMapInfo] = useState(false);
  
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Simulating a map loading
    const mapContainer = mapContainerRef.current;
    mapContainer.style.background = 'linear-gradient(135deg, #e6f3ff 0%, #d6ebff 100%)';
    
    // This would be where we'd initialize a real map library like Google Maps, Mapbox, etc.
    console.log('Map would initialize here in production');
    
    // Cleanup function
    return () => {
      console.log('Map cleanup would happen here');
    };
  }, []);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden group">
      {/* Map container */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 bg-secondary animate-fade-in"
      />
      
      {/* Map overlay for simulating a real map */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-blue-500/5"></div>
        <div className="h-full w-full grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-blue-200/20"></div>
          ))}
        </div>
        
        {/* Simulated map points - would be dynamic in a real implementation */}
        {location?.state === 'Kerala' && (
          <>
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-alert-high rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-high rounded-full animate-ripple opacity-50"></div>
            </div>
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-alert-high rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-high rounded-full animate-ripple opacity-50"></div>
            </div>
          </>
        )}
        
        {location?.state === 'Odisha' && (
          <>
            <div className="absolute top-2/5 left-3/5 w-3 h-3 bg-alert-moderate rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-moderate rounded-full animate-ripple opacity-30"></div>
            </div>
            <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-alert-high rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-high rounded-full animate-ripple opacity-50"></div>
            </div>
          </>
        )}
        
        {location?.state === 'Uttarakhand' && (
          <>
            <div className="absolute top-1/5 left-1/2 w-3 h-3 bg-alert-high rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-high rounded-full animate-ripple opacity-50"></div>
            </div>
            <div className="absolute top-1/3 left-3/5 w-3 h-3 bg-alert-moderate rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-moderate rounded-full animate-ripple opacity-30"></div>
            </div>
          </>
        )}
        
        {/* Default points when no location is selected */}
        {!location && (
          <>
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-alert-high rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-high rounded-full animate-ripple opacity-50"></div>
            </div>
            <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-alert-moderate rounded-full shadow-lg">
              <div className="absolute inset-0 bg-alert-moderate rounded-full animate-ripple opacity-30"></div>
            </div>
            <div className="absolute top-1/2 left-1/5 w-3 h-3 bg-alert-low rounded-full shadow-lg"></div>
          </>
        )}
        
        {/* User location */}
        {location?.coordinates && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg">
            <div className="absolute inset-0 bg-primary rounded-full animate-ripple opacity-40"></div>
          </div>
        )}
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors">
          <Compass size={18} />
        </button>
        <button className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors">
          <Locate size={18} />
        </button>
        <button className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors">
          <Layers size={18} />
        </button>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors">
              <Info size={18} />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>About Map Integration</SheetTitle>
              <SheetDescription>
                This is a simulated map for demonstration purposes.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <p className="text-sm text-muted-foreground">
                To integrate a real map, you would need to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Obtain a Google Maps API key from the Google Cloud Console</li>
                <li>Set up billing for the Google Maps Platform</li>
                <li>Implement the Google Maps JavaScript API with your API key</li>
                <li>Use the Maps JavaScript API to display dynamic, real-time maps</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Alternatives to Google Maps include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Mapbox (requires an access token)</li>
                <li>OpenStreetMap (free but requires hosting)</li>
                <li>HERE Maps (requires API key)</li>
                <li>Bing Maps (requires API key)</li>
              </ul>
              <div className="p-4 rounded-md bg-primary/10 mt-4">
                <p className="text-sm font-medium">Note:</p>
                <p className="text-sm mt-1">
                  All these services require API keys and may have usage limits and costs
                  associated with them. For disaster management applications, you might 
                  qualify for nonprofit or public service discounts.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 glass-panel rounded-lg p-3 transition-opacity duration-300 opacity-70 group-hover:opacity-100">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-alert-high"></div>
            <span className="text-xs">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-alert-moderate"></div>
            <span className="text-xs">Moderate Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-alert-low"></div>
            <span className="text-xs">Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs">Your Location</span>
          </div>
        </div>
      </div>
      
      {/* Map indicator */}
      <div className="absolute bottom-4 right-4 bg-primary text-white rounded-lg py-1.5 px-3 flex items-center gap-2">
        <MapIcon size={14} />
        <span className="text-xs font-medium">
          {location ? `${location.state} Disaster Map` : 'Interactive Map'}
        </span>
      </div>
    </div>
  );
};

export default MapComponent;


import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Map from '../components/Map';
import { MapPin, Locate, Compass } from 'lucide-react';

const MapPage = () => {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <MapPin size={22} className="text-primary" />
            <h1 className="text-2xl font-bold">Interactive Map</h1>
          </div>
          <p className="text-muted-foreground mt-1">View disaster zones, evacuation routes, and emergency services</p>
        </div>
        
        <div className="glass-panel rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Map Layers</h2>
            <div className="flex flex-wrap gap-3">
              {['Disaster Zones', 'Evacuation Routes', 'Shelters', 'Hospitals', 'Fire Stations', 'Police Stations'].map((layer) => (
                <button 
                  key={layer} 
                  className="px-4 py-2 rounded-lg bg-secondary hover:bg-primary/10 text-sm transition-colors"
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="glass-panel rounded-lg p-6 h-[650px]">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-primary" />
              <h2 className="text-lg font-semibold">Disaster Monitoring Map</h2>
            </div>
            <button className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-primary text-primary-foreground button-shine">
              <Locate size={14} />
              <span>My Location</span>
            </button>
          </div>
          
          <div className="h-[calc(100%-3rem)]">
            <Map />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MapPage;

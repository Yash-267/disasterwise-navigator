
import React, { useState, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';
import AlertPanel from '../components/AlertPanel';
import LocationModal from '../components/LocationModal';
import { Bell, Filter, Search, MapPin } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { Button } from '@/components/ui/button';

const AlertsPage = () => {
  const { location, setIsLocationModalOpen } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // More comprehensive mock data for alerts across India
  const allAlerts = [
    {
      id: '1',
      title: 'Flood Warning',
      description: 'Heavy rainfall causing flooding in low-lying areas of Kerala. Move to higher ground immediately.',
      level: 'high' as const,
      timestamp: '10 min ago',
      location: 'Kochi, Kerala'
    },
    {
      id: '2',
      title: 'Cyclone Watch',
      description: 'Cyclone approaching the eastern coast. Stay indoors and away from windows. Follow evacuation notices.',
      level: 'moderate' as const,
      timestamp: '25 min ago',
      location: 'Odisha Coast'
    },
    {
      id: '3',
      title: 'Landslide Alert',
      description: 'Potential landslides in hilly regions due to continuous rainfall. Avoid travel on hill roads.',
      level: 'low' as const,
      timestamp: '1 hour ago',
      location: 'Uttarakhand'
    },
    {
      id: '4',
      title: 'Earthquake Report',
      description: 'Magnitude 4.2 earthquake detected. No major damage reported but stay alert for aftershocks.',
      level: 'moderate' as const,
      timestamp: '2 hours ago',
      location: 'Himalayan Region'
    },
    {
      id: '5',
      title: 'Heat Wave Advisory',
      description: 'Temperatures expected to exceed 45°C. Stay hydrated and limit outdoor exposure.',
      level: 'high' as const,
      timestamp: '3 hours ago',
      location: 'Rajasthan'
    },
    {
      id: '6',
      title: 'Flash Flood Warning',
      description: 'Sudden heavy rainfall causing flash floods in Wayanad district. Seek higher ground immediately.',
      level: 'high' as const,
      timestamp: '15 min ago',
      location: 'Wayanad, Kerala'
    },
    {
      id: '7',
      title: 'Coastal Flooding',
      description: 'High tides combined with heavy rainfall causing coastal flooding. Evacuate low-lying coastal areas.',
      level: 'moderate' as const,
      timestamp: '45 min ago',
      location: 'Alappuzha, Kerala'
    },
    {
      id: '8',
      title: 'Dam Release Warning',
      description: 'Controlled water release from Tehri Dam. Communities along the river basin should be vigilant.',
      level: 'moderate' as const,
      timestamp: '1.5 hours ago',
      location: 'Tehri, Uttarakhand'
    },
    {
      id: '9',
      title: 'Thunderstorm Warning',
      description: 'Severe thunderstorms with lightning expected. Avoid open areas and stay away from tall objects.',
      level: 'moderate' as const,
      timestamp: '30 min ago',
      location: 'Bihar'
    },
    {
      id: '10',
      title: 'Disease Outbreak Alert',
      description: 'Increased cases of waterborne diseases reported in flood-affected areas. Boil water before consumption.',
      level: 'high' as const,
      timestamp: '4 hours ago',
      location: 'Darbhanga, Bihar'
    }
  ];

  // Filter alerts based on search query
  const filteredAlerts = useMemo(() => {
    if (!searchQuery) return allAlerts;
    
    const query = searchQuery.toLowerCase();
    return allAlerts.filter(alert => 
      alert.title.toLowerCase().includes(query) || 
      alert.description.toLowerCase().includes(query) || 
      alert.location.toLowerCase().includes(query)
    );
  }, [allAlerts, searchQuery]);
  
  return (
    <MainLayout>
      <LocationModal />
      <div className="p-6 lg:p-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Bell size={22} className="text-primary" />
            <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
          </div>
          <p className="text-muted-foreground mt-1">Stay updated with the latest emergency alerts across India</p>
        </div>
        
        <div className="glass-panel rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search alerts..." 
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex items-center gap-2 px-4"
                onClick={() => setIsLocationModalOpen(true)}
              >
                <MapPin size={16} />
                <span className="text-sm">
                  {location 
                    ? `${location.district ? `${location.district}, ` : ''}${location.state}` 
                    : 'Set Location'}
                </span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span className="text-sm">Filter</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="glass-panel rounded-lg p-6">
          <AlertPanel alerts={filteredAlerts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AlertsPage;

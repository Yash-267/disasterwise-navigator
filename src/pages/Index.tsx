import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import AlertPanel from '../components/AlertPanel';
import Map from '../components/Map';
import SafetyCard from '../components/SafetyCard';
import ChatAssistant from '../components/ChatAssistant';
import EmergencyContacts from '../components/EmergencyContacts';
import LocationModal from '../components/LocationModal';
import { Shield, Info, Cloud, CloudRain, Wind, Waves, FileWarning, AlertTriangle, Ambulance } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { location } = useLocation();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for alerts in India - these will be filtered by location
  const mockAlerts = [
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
      title: 'Flash Flood Warning',
      description: 'Sudden heavy rainfall causing flash floods in Wayanad district. Seek higher ground immediately.',
      level: 'high' as const,
      timestamp: '15 min ago',
      location: 'Wayanad, Kerala'
    },
    {
      id: '5',
      title: 'Heat Wave Advisory',
      description: 'Temperatures expected to exceed 45°C in Rajasthan. Stay hydrated and limit outdoor exposure.',
      level: 'high' as const,
      timestamp: '3 hours ago',
      location: 'Rajasthan'
    }
  ];
  
  // Mock data for safety tips
  const mockSafetyTips = [
    {
      id: '1',
      title: 'Prepare an Emergency Kit',
      description: 'Include water, non-perishable food, medications, flashlight, and first aid supplies.',
      icon: <Shield size={20} className="text-primary" />
    },
    {
      id: '2',
      title: 'Create an Evacuation Plan',
      description: 'Identify multiple evacuation routes from your home and establish a meeting point.',
      icon: <FileWarning size={20} className="text-primary" />
    },
    {
      id: '3',
      title: 'Stay Informed',
      description: 'Keep a battery-powered radio to receive updates if power and cellular networks fail.',
      icon: <Info size={20} className="text-primary" />
    }
  ];
  
  // Mock data for emergency contacts in India
  const mockEmergencyContacts = [
    {
      id: '1',
      name: 'National Emergency',
      number: '112',
      icon: <AlertTriangle size={20} />,
      priority: 'high' as const
    },
    {
      id: '2',
      name: 'Flood Control Room',
      number: '011-23389469',
      icon: <Waves size={20} />,
      priority: 'normal' as const
    },
    {
      id: '3',
      name: 'Ambulance',
      number: '108',
      icon: <Ambulance size={20} />,
      priority: 'high' as const
    }
  ];
  
  // Weather forecast data for Kerala (flood-prone area)
  const weatherForecast = [
    { day: 'Today', icon: <Cloud size={18} />, temp: '28°C', precip: '60%' },
    { day: 'Tue', icon: <CloudRain size={18} />, temp: '26°C', precip: '80%' },
    { day: 'Wed', icon: <CloudRain size={18} />, temp: '25°C', precip: '90%' },
    { day: 'Thu', icon: <Wind size={18} />, temp: '27°C', precip: '40%' },
    { day: 'Fri', icon: <Cloud size={18} />, temp: '29°C', precip: '20%' }
  ];
  
  // Loading skeletons
  if (isLoading) {
    return (
      <MainLayout>
        <div className="p-6 lg:p-8 animate-fade-in">
          <div className="h-12 mb-8 w-1/3 bg-muted rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 h-[400px] bg-muted rounded-lg animate-pulse"></div>
            <div className="col-span-1 lg:col-span-2 h-[400px] bg-muted rounded-lg animate-pulse"></div>
            <div className="col-span-1 h-[300px] bg-muted rounded-lg animate-pulse"></div>
            <div className="col-span-1 h-[300px] bg-muted rounded-lg animate-pulse"></div>
            <div className="col-span-1 h-[300px] bg-muted rounded-lg animate-pulse"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <LocationModal />
      <div className="p-6 lg:p-8 pb-20 lg:pb-12 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gradient">DisasterNav Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {location 
              ? `Disaster monitoring for ${location.district ? `${location.district}, ` : ''}${location.state}`
              : 'Real-time disaster monitoring and emergency assistance for India'}
          </p>
        </div>
        
        {/* Weather forecast card */}
        <div className="glass-panel p-4 rounded-lg mb-6">
          <div className="flex items-center gap-3 overflow-x-auto">
            {weatherForecast.map((day, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center min-w-[80px] py-2 px-3 rounded-lg transition-colors
                  ${index === 0 ? 'bg-primary/10' : 'hover:bg-secondary'}
                `}
              >
                <span className="text-xs font-medium">{day.day}</span>
                <div className="my-2 text-primary">{day.icon}</div>
                <span className="text-sm font-medium">{day.temp}</span>
                <span className="text-xs text-muted-foreground">{day.precip}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Alerts section */}
          <div className="col-span-1 glass-panel rounded-lg p-6">
            <AlertPanel alerts={mockAlerts} />
          </div>
          
          {/* Map section */}
          <div className="col-span-1 lg:col-span-2 glass-panel rounded-lg p-6 h-[500px]">
            <h2 className="text-lg font-semibold mb-4">Disaster Monitoring Map</h2>
            <div className="h-[calc(100%-2rem)]">
              <Map />
            </div>
          </div>
          
          {/* Safety tips */}
          <div className="col-span-1 glass-panel rounded-lg p-6">
            <SafetyCard tips={mockSafetyTips} />
          </div>
          
          {/* Emergency contacts */}
          <div className="col-span-1 glass-panel rounded-lg p-6">
            <EmergencyContacts contacts={mockEmergencyContacts} />
          </div>
          
          {/* AI Assistant */}
          <div className="col-span-1 glass-panel rounded-lg overflow-hidden flex flex-col h-[400px]">
            <ChatAssistant />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;

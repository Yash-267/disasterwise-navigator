import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import AlertPanel from '../components/AlertPanel';
import Map from '../components/Map';
import SafetyCard from '../components/SafetyCard';
import ChatAssistant from '../components/ChatAssistant';
import EmergencyContacts from '../components/EmergencyContacts';
import { Shield, Info, Cloud, CloudRain, Wind, Waves, FileWarning, AlertTriangle, Ambulance } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for alerts
  const mockAlerts = [
    {
      id: '1',
      title: 'Flash Flood Warning',
      description: 'Heavy rainfall causing flash flooding in low-lying areas. Move to higher ground immediately.',
      level: 'high' as const,
      timestamp: '10 min ago',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      title: 'Thunderstorm Watch',
      description: 'Thunderstorms possible in your area. Stay indoors and away from windows.',
      level: 'moderate' as const,
      timestamp: '25 min ago',
      location: 'Oakland, CA'
    },
    {
      id: '3',
      title: 'Air Quality Alert',
      description: 'Poor air quality conditions due to wildfire smoke. Limit outdoor activities.',
      level: 'low' as const,
      timestamp: '1 hour ago',
      location: 'Bay Area'
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
  
  // Mock data for emergency contacts
  const mockEmergencyContacts = [
    {
      id: '1',
      name: 'Emergency Services',
      number: '911',
      icon: <AlertTriangle size={20} />,
      priority: 'high' as const
    },
    {
      id: '2',
      name: 'Flood Control District',
      number: '(555) 123-4567',
      icon: <Waves size={20} />,
      priority: 'normal' as const
    },
    {
      id: '3',
      name: 'Medical Assistance',
      number: '(555) 987-6543',
      icon: <Ambulance size={20} />,
      priority: 'high' as const
    }
  ];
  
  // Weather forecast data
  const weatherForecast = [
    { day: 'Today', icon: <Cloud size={18} />, temp: '73°F', precip: '20%' },
    { day: 'Tue', icon: <CloudRain size={18} />, temp: '68°F', precip: '80%' },
    { day: 'Wed', icon: <CloudRain size={18} />, temp: '65°F', precip: '90%' },
    { day: 'Thu', icon: <Wind size={18} />, temp: '70°F', precip: '40%' },
    { day: 'Fri', icon: <Cloud size={18} />, temp: '75°F', precip: '10%' }
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
      <div className="p-6 lg:p-8 pb-20 lg:pb-12 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gradient">DisasterNav Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time disaster monitoring and emergency assistance</p>
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

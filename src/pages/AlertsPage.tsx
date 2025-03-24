import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AlertPanel from '../components/AlertPanel';
import { Bell, Filter, Search } from 'lucide-react';

const AlertsPage = () => {
  // Mock data for alerts in India
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
    }
  ];
  
  return (
    <MainLayout>
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
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
              <Filter size={16} />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
        
        <div className="glass-panel rounded-lg p-6">
          <AlertPanel alerts={mockAlerts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AlertsPage;

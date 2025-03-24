
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AlertPanel from '../components/AlertPanel';
import { Bell, Filter, Search } from 'lucide-react';

const AlertsPage = () => {
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
    },
    {
      id: '4',
      title: 'Wildfire Notification',
      description: 'Wildfire detected 15 miles north. No immediate danger, but stay alert for updates.',
      level: 'moderate' as const,
      timestamp: '2 hours ago',
      location: 'Marin County'
    },
    {
      id: '5',
      title: 'Extreme Heat Advisory',
      description: 'Temperatures expected to exceed 100°F. Stay hydrated and limit outdoor exposure.',
      level: 'high' as const,
      timestamp: '3 hours ago',
      location: 'Contra Costa County'
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
          <p className="text-muted-foreground mt-1">Stay updated with the latest emergency alerts and notifications</p>
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

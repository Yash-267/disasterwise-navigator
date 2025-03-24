
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import SafetyCard from '../components/SafetyCard';
import { Shield, FileWarning, Info, Cloud, Droplets, Flame, Wind, Home, FirstAid, Package } from 'lucide-react';

const SafetyPage = () => {
  // Mock data for general safety tips
  const generalSafetyTips = [
    {
      id: '1',
      title: 'Prepare an Emergency Kit',
      description: 'Include water, non-perishable food, medications, flashlight, and first aid supplies.',
      icon: <Package size={20} className="text-primary" />
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
  
  // Mock data for flood safety tips
  const floodSafetyTips = [
    {
      id: '4',
      title: 'Move to Higher Ground',
      description: 'Evacuate if advised to do so. Move to higher ground if flooding is imminent.',
      icon: <Droplets size={20} className="text-primary" />
    },
    {
      id: '5',
      title: 'Avoid Flood Waters',
      description: 'Never walk or drive through flood waters. Six inches of water can knock you down.',
      icon: <Droplets size={20} className="text-primary" />
    }
  ];
  
  // Mock data for fire safety tips
  const fireSafetyTips = [
    {
      id: '6',
      title: 'Create Defensible Space',
      description: 'Clear flammable vegetation around your home to create a buffer zone.',
      icon: <Flame size={20} className="text-primary" />
    },
    {
      id: '7',
      title: 'Evacuation Readiness',
      description: 'Have important documents and valuables ready to go in case of evacuation.',
      icon: <Flame size={20} className="text-primary" />
    }
  ];
  
  // Mock data for hurricane/storm safety tips
  const stormSafetyTips = [
    {
      id: '8',
      title: 'Secure Your Home',
      description: 'Board up windows and secure outdoor items that could become projectiles.',
      icon: <Wind size={20} className="text-primary" />
    },
    {
      id: '9',
      title: 'Know Your Zone',
      description: 'Learn your evacuation zone and route before a hurricane approaches.',
      icon: <Wind size={20} className="text-primary" />
    }
  ];
  
  // Mock data for first aid tips
  const firstAidTips = [
    {
      id: '10',
      title: 'Basic First Aid',
      description: 'Learn how to treat common injuries such as cuts, burns, and sprains.',
      icon: <FirstAid size={20} className="text-primary" />
    },
    {
      id: '11',
      title: 'CPR Training',
      description: 'Consider getting certified in CPR and basic life support techniques.',
      icon: <FirstAid size={20} className="text-primary" />
    }
  ];
  
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Shield size={22} className="text-primary" />
            <h1 className="text-2xl font-bold">Safety Recommendations</h1>
          </div>
          <p className="text-muted-foreground mt-1">Learn how to prepare for and respond to different types of disasters</p>
        </div>
        
        <div className="glass-panel rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Disaster Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Floods', icon: <Droplets size={20} /> },
              { name: 'Fires', icon: <Flame size={20} /> },
              { name: 'Hurricanes', icon: <Wind size={20} /> },
              { name: 'Earthquakes', icon: <Home size={20} /> }
            ].map((disaster) => (
              <button 
                key={disaster.name} 
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  {disaster.icon}
                </div>
                <span className="text-sm font-medium">{disaster.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield size={18} className="text-primary" />
              General Preparedness
            </h2>
            <SafetyCard tips={generalSafetyTips} />
          </div>
          
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Droplets size={18} className="text-primary" />
              Flood Safety
            </h2>
            <SafetyCard tips={floodSafetyTips} />
          </div>
          
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Flame size={18} className="text-primary" />
              Fire Safety
            </h2>
            <SafetyCard tips={fireSafetyTips} />
          </div>
          
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Wind size={18} className="text-primary" />
              Hurricane & Storm Safety
            </h2>
            <SafetyCard tips={stormSafetyTips} />
          </div>
          
          <div className="glass-panel rounded-lg p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FirstAid size={18} className="text-primary" />
              First Aid & Medical
            </h2>
            <SafetyCard tips={firstAidTips} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SafetyPage;

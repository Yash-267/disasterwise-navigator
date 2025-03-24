
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import EmergencyContacts from '../components/EmergencyContacts';
import { Phone, Ambulance, AlertTriangle, Hospital, FireExtinguisher, Police, Users, Wifi, Home } from 'lucide-react';

const EmergencyPage = () => {
  // Mock data for emergency services
  const emergencyServices = [
    {
      id: '1',
      name: 'Emergency Services',
      number: '911',
      icon: <AlertTriangle size={20} />,
      priority: 'high' as const
    },
    {
      id: '2',
      name: 'Medical Assistance',
      number: '(555) 987-6543',
      icon: <Ambulance size={20} />,
      priority: 'high' as const
    },
    {
      id: '3',
      name: 'Fire Department',
      number: '(555) 456-7890',
      icon: <FireExtinguisher size={20} />,
      priority: 'high' as const
    },
    {
      id: '4',
      name: 'Police Department',
      number: '(555) 234-5678',
      icon: <Police size={20} />,
      priority: 'high' as const
    },
  ];
  
  // Mock data for disaster management agencies
  const disasterAgencies = [
    {
      id: '5',
      name: 'FEMA Helpline',
      number: '(800) 621-3362',
      icon: <Home size={20} />,
      priority: 'normal' as const
    },
    {
      id: '6',
      name: 'Flood Control District',
      number: '(555) 123-4567',
      icon: <Wifi size={20} />,
      priority: 'normal' as const
    },
    {
      id: '7',
      name: 'Red Cross',
      number: '(800) 733-2767',
      icon: <Users size={20} />,
      priority: 'normal' as const
    },
  ];
  
  // Mock data for hospitals
  const hospitals = [
    {
      id: '8',
      name: 'General Hospital',
      number: '(555) 789-0123',
      icon: <Hospital size={20} />,
      priority: 'normal' as const
    },
    {
      id: '9',
      name: 'Medical Center',
      number: '(555) 345-6789',
      icon: <Hospital size={20} />,
      priority: 'normal' as const
    },
  ];
  
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Phone size={22} className="text-primary" />
            <h1 className="text-2xl font-bold">Emergency Services</h1>
          </div>
          <p className="text-muted-foreground mt-1">Quick access to emergency contacts and services</p>
        </div>
        
        <div className="glass-panel rounded-lg p-6 mb-6 border-alert-high/20">
          <div className="flex items-start gap-4 p-4 bg-alert-high/5 rounded-lg">
            <div className="shrink-0 w-12 h-12 bg-alert-high/10 rounded-full flex items-center justify-center">
              <AlertTriangle size={24} className="text-alert-high" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Emergency Call</h2>
              <p className="text-muted-foreground mt-1">In life-threatening situations, immediately call:</p>
              <div className="mt-3">
                <a 
                  href="tel:911" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-alert-high text-white rounded-lg font-medium hover:bg-alert-high/90 transition-colors button-shine"
                >
                  <Phone size={18} />
                  <span className="text-lg">911</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-alert-high" />
              Emergency Services
            </h2>
            <EmergencyContacts contacts={emergencyServices} />
          </div>
          
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Hospital size={18} className="text-primary" />
              Hospitals
            </h2>
            <EmergencyContacts contacts={hospitals} />
          </div>
          
          <div className="glass-panel rounded-lg p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users size={18} className="text-primary" />
              Disaster Management Agencies
            </h2>
            <EmergencyContacts contacts={disasterAgencies} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmergencyPage;


import React from 'react';
import { Phone, Ambulance, AlertTriangle } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  icon: React.ReactNode;
  priority: 'high' | 'normal';
}

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ contacts }) => {
  // Sort contacts with high priority first
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return 0;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Phone size={18} className="text-alert-high" />
          Emergency Contacts
        </h2>
      </div>
      
      <div className="space-y-3">
        {sortedContacts.map((contact) => (
          <div 
            key={contact.id} 
            className={`glass-panel rounded-lg p-4 transition-all duration-300 hover:shadow-md
              ${contact.priority === 'high' ? 'border-alert-high/20' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`
                  shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                  ${contact.priority === 'high' 
                    ? 'bg-alert-high/10 text-alert-high' 
                    : 'bg-primary/10 text-primary'}
                `}>
                  {contact.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{contact.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{contact.number}</p>
                </div>
              </div>
              
              <button className="p-2.5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-colors">
                <Phone size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {contacts.length === 0 && (
        <div className="py-8 text-center">
          <Phone size={24} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No emergency contacts available</p>
        </div>
      )}
      
      <div className="glass-panel p-4 rounded-lg bg-alert-high/5 border border-alert-high/20">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="shrink-0 text-alert-high" />
          <div>
            <h4 className="font-medium text-sm">Emergency Help</h4>
            <p className="text-xs text-muted-foreground mt-1">
              In life-threatening situations, always call your local emergency number immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;

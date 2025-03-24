
import React from 'react';
import { AlertTriangle, Info, ArrowRight } from 'lucide-react';

type AlertLevel = 'low' | 'moderate' | 'high';

interface Alert {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  timestamp: string;
  location: string;
}

interface AlertPanelProps {
  alerts: Alert[];
}

const getAlertColor = (level: AlertLevel) => {
  switch (level) {
    case 'low':
      return 'bg-alert-low';
    case 'moderate':
      return 'bg-alert-moderate';
    case 'high':
      return 'bg-alert-high';
    default:
      return 'bg-alert-low';
  }
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  return (
    <div className="animate-fade-in glass-panel rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md group">
      <div className="flex items-center gap-2 p-4">
        <div className={`shrink-0 w-2.5 h-2.5 rounded-full ${getAlertColor(alert.level)} ${alert.level === 'high' ? 'animate-pulse-alert' : ''}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-sm truncate">{alert.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{alert.location} • {alert.timestamp}</p>
            </div>
            <span className={`shrink-0 px-2 py-0.5 text-[10px] rounded-full font-medium ${
              alert.level === 'high' 
                ? 'bg-alert-high/10 text-alert-high' 
                : alert.level === 'moderate'
                ? 'bg-alert-moderate/10 text-alert-moderate'
                : 'bg-alert-low/10 text-alert-low'
            }`}>
              {alert.level.charAt(0).toUpperCase() + alert.level.slice(1)}
            </span>
          </div>
          <p className="text-xs mt-2 line-clamp-2">{alert.description}</p>
        </div>
      </div>
      <div className="border-t border-border px-4 py-2 flex justify-between items-center">
        <span className="text-xs font-medium">View details</span>
        <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform duration-300" />
      </div>
    </div>
  );
};

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const highPriorityAlerts = alerts.filter(alert => alert.level === 'high');
  const otherAlerts = alerts.filter(alert => alert.level !== 'high');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Active Alerts</h2>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          <span>View all</span>
          <ArrowRight size={14} />
        </button>
      </div>
      
      {highPriorityAlerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-alert-high">
            <AlertTriangle size={14} />
            <span className="text-xs font-medium">High Priority</span>
          </div>
          <div className="space-y-3">
            {highPriorityAlerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}
      
      {otherAlerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info size={14} />
            <span className="text-xs font-medium">Other Alerts</span>
          </div>
          <div className="space-y-3">
            {otherAlerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}
      
      {alerts.length === 0 && (
        <div className="py-8 text-center">
          <Info size={24} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No active alerts in your area</p>
        </div>
      )}
    </div>
  );
};

export default AlertPanel;

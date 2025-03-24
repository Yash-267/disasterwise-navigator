
import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SafetyCardProps {
  tips: SafetyTip[];
}

const SafetyCard: React.FC<SafetyCardProps> = ({ tips }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Safety Recommendations</h2>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          <span>View all</span>
          <ArrowRight size={14} />
        </button>
      </div>
      
      {tips.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {tips.map((tip) => (
            <div 
              key={tip.id} 
              className="glass-panel rounded-lg p-4 transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{tip.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                </div>
                <ArrowRight 
                  size={16} 
                  className="shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" 
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <Shield size={24} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No safety tips available</p>
        </div>
      )}
    </div>
  );
};

export default SafetyCard;

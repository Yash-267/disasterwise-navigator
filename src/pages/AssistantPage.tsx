
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ChatAssistant from '../components/ChatAssistant';
import { MessageSquare, Lightbulb, HelpCircle } from 'lucide-react';

const AssistantPage = () => {
  // FAQ items
  const faqItems = [
    {
      question: 'What should I do during a flash flood?',
      answer: 'Move to higher ground immediately. Avoid walking or driving through flood waters. Six inches of moving water can knock you down, and one foot of water can sweep your vehicle away.'
    },
    {
      question: 'How can I prepare for an earthquake?',
      answer: 'Secure heavy furniture to walls, create an emergency kit, know where utility shutoffs are located, and practice "drop, cover, and hold on" with your family.'
    },
    {
      question: 'What goes in an emergency kit?',
      answer: 'Water (one gallon per person per day for at least three days), non-perishable food (at least a three-day supply), battery-powered radio, flashlight, first aid kit, extra batteries, whistle, dust mask, plastic sheeting and duct tape, moist towelettes, garbage bags, wrench or pliers, manual can opener, local maps, and cell phone with chargers.'
    },
  ];
  
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <MessageSquare size={22} className="text-primary" />
            <h1 className="text-2xl font-bold">AI Assistant</h1>
          </div>
          <p className="text-muted-foreground mt-1">Get personalized guidance and answers about emergency situations</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel rounded-lg overflow-hidden flex flex-col h-[600px]">
            <ChatAssistant />
          </div>
          
          <div className="glass-panel rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb size={18} className="text-primary" />
                Suggested Questions
              </h2>
            </div>
            
            <div className="space-y-3">
              {[
                'What should I do during a flood?',
                'How do I prepare for a hurricane?',
                'What are earthquake safety tips?',
                'How do I create an emergency plan?',
                'What goes in an emergency kit?'
              ].map((question, index) => (
                <button 
                  key={index} 
                  className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-primary/10 transition-colors text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
                <HelpCircle size={16} className="text-primary" />
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="rounded-lg border border-border p-4">
                    <h4 className="text-sm font-medium">{item.question}</h4>
                    <p className="text-xs text-muted-foreground mt-2">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AssistantPage;

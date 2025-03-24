
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ChatAssistant from '../components/ChatAssistant';
import { MessageSquare, Lightbulb, HelpCircle } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';

const AssistantPage = () => {
  const { location } = useLocation();
  const userState = location?.state || '';
  
  // Dynamic FAQ items based on location
  const getFaqItems = () => {
    const commonFaqs = [
      {
        question: 'What should I do during a flash flood?',
        answer: 'Move to higher ground immediately. Avoid walking or driving through flood waters. Six inches of moving water can knock you down, and one foot of water can sweep your vehicle away. Call 1078 for flood rescue.'
      },
      {
        question: 'How can I prepare for an earthquake?',
        answer: 'Secure heavy furniture to walls, create an emergency kit, know where utility shutoffs are located, and practice "drop, cover, and hold on" with your family. Stay away from windows and exterior walls.'
      },
      {
        question: 'What goes in an emergency kit?',
        answer: 'Water (one gallon per person per day for at least three days), non-perishable food, battery-powered radio, flashlight, first aid kit, extra batteries, whistle, dust mask, plastic sheeting and duct tape, moist towelettes, garbage bags, wrench or pliers, manual can opener, local maps, cell phone with chargers, and important documents in waterproof container.'
      },
    ];
    
    // Add location-specific FAQs
    if (userState === 'Kerala') {
      return [
        {
          question: 'What are the warning signs of landslides in Kerala?',
          answer: 'Watch for unusual sounds like trees cracking, visible cracks in the ground, houses, or steps, tilting of trees, poles, or walls, doors/windows sticking, and sudden increases in water levels with muddy water in streams.'
        },
        {
          question: 'Which are the flood-prone areas in Kerala?',
          answer: 'Major flood-prone districts include Wayanad, Idukki, Kochi, Alappuzha, and Pathanamthitta. If you live in these areas, stay alert during monsoon season and have an evacuation plan ready.'
        },
        ...commonFaqs
      ];
    } else if (userState === 'Odisha') {
      return [
        {
          question: 'How to prepare for cyclones in Odisha?',
          answer: 'Listen to radio/TV for weather updates, secure your home, prepare an emergency kit, know evacuation routes, and keep important documents in waterproof containers. Move to designated cyclone shelters when directed by authorities.'
        },
        {
          question: 'Which areas of Odisha are most vulnerable to cyclones?',
          answer: 'Coastal districts like Puri, Kendrapara, Jagatsinghpur, Balasore, and Bhadrak are most vulnerable. If you live in these areas, be extra vigilant during cyclone season (April-June and October-December).'
        },
        ...commonFaqs
      ];
    } else if (userState === 'Uttarakhand') {
      return [
        {
          question: 'What should I do during a landslide in Uttarakhand?',
          answer: 'Move away from the path of the landslide quickly. If escape is not possible, curl into a tight ball and protect your head. After the landslide, stay away from the slide area and watch for flooding, which often follows landslides.'
        },
        {
          question: 'Which areas in Uttarakhand are prone to landslides?',
          answer: 'Chamoli, Pithoragarh, Rudraprayag, Uttarkashi, and Tehri districts are highly vulnerable to landslides. If you live or are traveling in these areas, especially during monsoon, stay alert to warnings and avoid traveling during heavy rainfall.'
        },
        ...commonFaqs
      ];
    }
    
    return commonFaqs;
  };
  
  // Location-specific suggested questions
  const getSuggestedQuestions = () => {
    const commonQuestions = [
      'What should I do during a flood?',
      'How do I prepare for a natural disaster?',
      'What are earthquake safety tips?',
      'How do I create an emergency plan?',
      'What goes in an emergency kit?'
    ];
    
    if (userState === 'Kerala') {
      return [
        'What should I do during a flood in Kerala?',
        'Are there landslide warnings for Wayanad?',
        'Where are the nearest relief camps in Kerala?',
        'How to protect my home from monsoon flooding?',
        'What emergency numbers should I call in Kerala?'
      ];
    } else if (userState === 'Odisha') {
      return [
        'What should I do during a cyclone in Odisha?',
        'Where are cyclone shelters in coastal Odisha?',
        'How to secure my home against cyclonic winds?',
        'What are the evacuation routes in Puri?',
        'When is cyclone season in Odisha?'
      ];
    } else if (userState === 'Uttarakhand') {
      return [
        'What should I do during a landslide in Uttarakhand?',
        'Is it safe to travel to Chamoli now?',
        'How to recognize early warning signs of landslides?',
        'What emergency supplies should I keep in hilly areas?',
        'Where are emergency shelters in Uttarkashi?'
      ];
    }
    
    return commonQuestions;
  };
  
  const faqItems = getFaqItems();
  const suggestedQuestions = getSuggestedQuestions();
  
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <MessageSquare size={22} className="text-primary" />
            <h1 className="text-2xl font-bold">AI Assistant</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            {location 
              ? `Get personalized guidance for emergencies in ${location.district ? `${location.district}, ` : ''}${location.state}`
              : 'Get personalized guidance and answers about emergency situations in India'}
          </p>
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
              {suggestedQuestions.map((question, index) => (
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

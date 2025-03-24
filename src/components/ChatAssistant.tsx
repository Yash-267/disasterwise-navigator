import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, User, Mic, MicOff, Volume } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for emergency and disaster situations. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const { location } = useLocation();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          // If still set to listening but recognition stopped, restart it
          recognitionRef.current?.start();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  // Listen for suggested question events
  useEffect(() => {
    const handleSuggestedQuestion = (event: CustomEvent<{ question: string }>) => {
      setInput(event.detail.question);
      // Auto-submit the question
      setTimeout(() => {
        handleSendMessage(new Event('submit') as any);
      }, 100);
    };

    window.addEventListener('send-question', handleSuggestedQuestion as EventListener);

    return () => {
      window.removeEventListener('send-question', handleSuggestedQuestion as EventListener);
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      console.error('Speech recognition not supported');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Set language before starting
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const sentMessage = input; // Store the input before clearing it
    setInput('');
    setIsLoading(true);
    
    // Stop listening when sending a message
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    // Simulate AI response (in a real app, this would be an API call to a LLM)
    setTimeout(() => {
      let responseContent = '';
      const userLocation = location ? `${location.district ? location.district + ', ' : ''}${location.state}` : 'your area';
      
      // Check for various disaster keywords
      if (sentMessage.toLowerCase().includes('flood')) {
        if (location?.state === 'Kerala' || location?.state === 'Assam' || location?.state === 'Bihar') {
          responseContent = `FLOOD EMERGENCY IN ${userLocation.toUpperCase()}: Move to higher ground immediately. Avoid walking or driving through flood waters. Six inches of moving water can knock you down, and one foot of water can sweep your vehicle away. Contact local emergency services at 1078 for flood rescue.`;
        } else {
          responseContent = 'If you\'re experiencing flooding, please move to higher ground immediately. Avoid walking or driving through flood waters. Six inches of moving water can knock you down, and one foot of water can sweep your vehicle away. Contact NDRF at 1078 for flood-related emergencies.';
        }
      } else if (sentMessage.toLowerCase().includes('earthquake')) {
        if (location?.state === 'Uttarakhand' || location?.state === 'Gujarat' || location?.state === 'Himachal Pradesh') {
          responseContent = `EARTHQUAKE ALERT FOR ${userLocation.toUpperCase()}: Drop, Cover, and Hold On. Get under a sturdy table or desk and hold on until the shaking stops. Stay away from windows and exterior walls. After shaking stops, evacuate to open areas. Contact emergency services at 112.`;
        } else {
          responseContent = 'During an earthquake: Drop, Cover, and Hold On. Drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If there\'s no table nearby, cover your face and head with your arms and crouch in an inside corner of the building. After the shaking stops, evacuate to an open area away from damaged buildings.';
        }
      } else if (sentMessage.toLowerCase().includes('hurricane') || sentMessage.toLowerCase().includes('cyclone') || sentMessage.toLowerCase().includes('storm')) {
        if (location?.state === 'Odisha' || location?.state === 'West Bengal' || location?.state === 'Tamil Nadu') {
          responseContent = `CYCLONE WARNING FOR ${userLocation.toUpperCase()}: Stay indoors in a secure building. Move away from windows. Prepare emergency supplies (water, food, medicines, torch, battery radio). Follow evacuation orders immediately if given. Contact state disaster management at 1070.`;
        } else {
          responseContent = 'For cyclones or severe storms, stay informed through local news and IMD alerts. Secure your home, have emergency supplies ready (drinking water, non-perishable food, medicines, flashlight), and follow evacuation orders if given. Stay away from windows during the storm and beware of flooding after the storm passes.';
        }
      } else if (sentMessage.toLowerCase().includes('fire')) {
        responseContent = 'In case of fire: GET OUT, STAY OUT, and CALL FOR HELP. Never go back inside a burning building. If smoke is present, stay low to the ground and cover your mouth with a cloth. Test doors with the back of your hand before opening them. Call fire emergency services at 101 immediately once you are safe.';
      } else if (sentMessage.toLowerCase().includes('landslide')) {
        if (location?.state === 'Uttarakhand' || location?.state === 'Kerala' || location?.state === 'Himachal Pradesh') {
          responseContent = `LANDSLIDE RISK IN ${userLocation.toUpperCase()}: Evacuate immediately if you notice cracks in the ground, tilting trees, or sudden increases in stream water levels. Move to higher, stable ground away from slopes. Contact district emergency operations center or call 1077.`;
        } else {
          responseContent = 'If you suspect an imminent landslide, evacuate immediately. Watch for warning signs like unusual sounds, cracks appearing in the ground, tilting trees, or bulging ground at the base of a slope. Move away from the path of the landslide or debris flow. Contact local disaster management at 1077.';
        }
      } else if (sentMessage.toLowerCase().includes('tsunami')) {
        if (location?.state === 'Tamil Nadu' || location?.state === 'Kerala' || location?.state === 'Andhra Pradesh') {
          responseContent = `TSUNAMI WARNING FOR ${userLocation.toUpperCase()}: If you feel strong earthquake near coast, move immediately to higher ground or inland. Don't wait for official warning. A tsunami may arrive within minutes. Stay away from the coast until officials declare it safe.`;
        } else {
          responseContent = 'If you feel a strong earthquake while near the coast, immediately move to higher ground or inland. Do not wait for an official tsunami warning as a tsunami can arrive within minutes of the earthquake. Stay away from coastal areas until officials declare it safe to return.';
        }
      } else if (sentMessage.toLowerCase().includes('evacuation') || sentMessage.toLowerCase().includes('evacuate')) {
        responseContent = `For evacuation in ${userLocation}: Follow instructions from local authorities immediately. Bring only essential items (medicines, documents, water, food). Shut off utilities if instructed. Use designated evacuation routes. If you need assistance evacuating, contact district disaster management at 1077 or national emergency at 112.`;
      } else if (sentMessage.toLowerCase().includes('hospital') || sentMessage.toLowerCase().includes('medical') || sentMessage.toLowerCase().includes('injured')) {
        responseContent = `For medical emergencies in ${userLocation}, contact ambulance services at 108. For emergency medical advice, call 104. If you're treating injuries during a disaster: for bleeding, apply direct pressure; for burns, cool with clean water; for fractures, immobilize the area; for shock, lay person flat and elevate legs.`;
      } else if (sentMessage.toLowerCase().includes('shelter') || sentMessage.toLowerCase().includes('relief camp')) {
        responseContent = `For shelter information in ${userLocation} during disasters, contact your district emergency operations center or call 1077. Relief camps are typically set up in schools, community halls, and government buildings. You can also contact the local tahsildar office or village administrative officer for the nearest relief camps.`;
      } else if (sentMessage.toLowerCase().includes('help') || sentMessage.toLowerCase().includes('emergency')) {
        responseContent = `For immediate emergency assistance in ${userLocation}, call the National Emergency Number 112. For disaster-specific help, contact: NDRF: 1078, State Disaster Management: 1070, District Disaster Management: 1077, Fire: 101, Ambulance: 108, Police: 100.`;
      } else {
        responseContent = `I understand you're concerned about disaster safety in ${userLocation}. For specific emergency guidance, please mention the type of disaster (flood, earthquake, cyclone, fire, landslide, etc.) you're facing or preparing for. I can provide targeted safety instructions, evacuation procedures, and local emergency contact information based on your situation.`;
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between py-3 px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="font-medium text-sm">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Disaster response guidance</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as 'en-IN' | 'hi-IN')}
            className="text-xs bg-secondary rounded-md border border-border px-2 py-1"
          >
            <option value="en-IN">English</option>
            <option value="hi-IN">हिंदी</option>
          </select>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex items-start gap-2 ${
              message.sender === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.sender === 'assistant' && (
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
            )}
            
            <div 
              className={`max-w-[80%] p-3 rounded-lg animate-scale-in ${
                message.sender === 'assistant' 
                  ? 'bg-secondary text-foreground' 
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            
            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                <User size={16} className="text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Bot size={16} className="text-primary" />
            </div>
            <div className="bg-secondary p-3 rounded-lg animate-pulse">
              <div className="flex items-center gap-1">
                <Loader2 size={14} className="animate-spin" />
                <span className="text-sm">Thinking</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        onSubmit={handleSendMessage} 
        className="border-t p-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask in ${selectedLanguage === 'en-IN' ? 'English' : 'हिंदी'}...`}
          className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2.5 rounded-lg ${
            isListening 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-secondary hover:bg-secondary/80'
          } transition-colors`}
          disabled={isLoading}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          title={isListening ? 'Stop voice input' : 'Start voice input'}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
        <button 
          type="submit" 
          className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none button-shine"
          disabled={!input.trim() || isLoading}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatAssistant;

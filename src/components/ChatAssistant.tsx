
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, User } from 'lucide-react';

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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
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
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      let responseContent = '';
      
      if (input.toLowerCase().includes('flood')) {
        responseContent = 'If you\'re experiencing flooding, please move to higher ground immediately. Avoid walking or driving through flood waters. Six inches of moving water can knock you down, and one foot of water can sweep your vehicle away.';
      } else if (input.toLowerCase().includes('earthquake')) {
        responseContent = 'During an earthquake: Drop, Cover, and Hold On. Drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If there\'s no table nearby, cover your face and head with your arms and crouch in an inside corner of the building.';
      } else if (input.toLowerCase().includes('hurricane') || input.toLowerCase().includes('storm')) {
        responseContent = 'For hurricanes or severe storms, stay informed through local news. Secure your home, have emergency supplies ready, and follow evacuation orders if given. Stay away from windows during the storm.';
      } else if (input.toLowerCase().includes('fire')) {
        responseContent = 'In case of fire, remember to: Get low and go, get out, and stay out. Call emergency services from outside the building. Have a meeting place for family members and never go back inside a burning building.';
      } else {
        responseContent = 'I understand your concern. For specific emergency situations, please provide more details so I can give you the most relevant safety information. Remember to always follow official guidance from local authorities during emergencies.';
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
          placeholder="Ask for emergency assistance..."
          className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          disabled={isLoading}
        />
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

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, User, Mic, MicOff, Volume } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useApiKeys } from './ApiKeyManager';

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
  const { apiKeys } = useApiKeys();
  
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
    
    if (!input.trim() || !apiKeys.openai) return;
    
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
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKeys.openai}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are a disaster response assistant. The user is located in ${location ? `${location.district ? location.district + ', ' : ''}${location.state}` : 'India'}. Provide clear, concise, and location-specific guidance for emergency situations.`
            },
            {
              role: 'user',
              content: sentMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.choices[0].message.content,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'I apologize, but I encountered an error. Please check your API key or try again later.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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

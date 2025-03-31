import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI financial advisor. How can I help you with investment or financial planning in Indian markets today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!localStorage.getItem('openai_api_key'));
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isRateLimited) {
      const timer = setTimeout(() => {
        setIsRateLimited(false);
      }, 60000);
      
      return () => clearTimeout(timer);
    }
  }, [isRateLimited]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved to your browser's local storage.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
    }
  };

  const getAIResponse = async (userMessage: string, retry = 0): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert financial advisor specializing in Indian financial markets. Provide detailed, accurate advice about investments, tax planning, and wealth management specifically for the Indian context. Include specific information about Indian financial products, regulations, and market conditions when relevant. Be thorough but concise.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (response.status === 429 || response.status === 403) {
        setIsRateLimited(true);
        setApiKeyError("Your OpenAI API key has reached its usage limit. Please check your account or try a different key.");
        
        return "I'm currently experiencing high demand. Please verify your OpenAI API key or wait before trying again.";
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        
        if (response.status === 401) {
          setApiKeyError("Invalid API key. Please check and re-enter your OpenAI API key.");
          return "Authentication failed. Please verify your API key.";
        }
        
        return `Connection error. Status: ${response.status}. Please try again later.`;
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Unexpected error:', error);
      return "An unexpected error occurred. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    if (!apiKey && !showApiKeyInput) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue",
      });
      return;
    }
    
    if (isRateLimited) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait a minute before sending another message.",
        variant: "destructive",
      });
      return;
    }
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsAITyping(true);
    
    try {
      const aiResponseText = await getAIResponse(inputMessage);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error in AI response:', error);
      
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsAITyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showApiKeyInput) {
        saveApiKey();
      } else {
        handleSendMessage();
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Finance AI Assistant</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5 text-finance-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>Ask me anything about investments, financial planning, or the Indian financial market. I can help with mutual funds, stocks, tax planning, and more.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {isRateLimited && (
            <Alert className="mb-4">
              <AlertTitle>Rate Limit Exceeded</AlertTitle>
              <AlertDescription>
                You've hit OpenAI's rate limit. Please wait a minute before sending another message.
              </AlertDescription>
            </Alert>
          )}
          
          {showApiKeyInput ? (
            <Card className="mb-4 border border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Enter Your OpenAI API Key</h2>
                <p className="text-gray-600 mb-4">
                  To access expert financial AI advice, please enter your OpenAI API key. 
                  This key will be stored locally in your browser and is only used to make requests to OpenAI.
                </p>
                <div className="flex space-x-2">
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow input-field"
                  />
                  <Button 
                    onClick={saveApiKey} 
                    className="bg-finance-primary hover:bg-finance-primary/90"
                  >
                    Save Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-4 border border-gray-200">
                <CardContent className="p-0">
                  <div className="h-[600px] overflow-y-auto p-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-finance-primary ml-2' 
                              : 'bg-finance-accent mr-2'
                          }`}>
                            {message.sender === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-finance-primary text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                            <div className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-finance-primary-foreground/70' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isAITyping && (
                      <div className="flex mb-4 justify-start">
                        <div className="flex">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-finance-accent mr-2">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                            <div className="flex space-x-1">
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me about investing in the Indian market..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow input-field"
                  disabled={isRateLimited || isAITyping}
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-finance-primary hover:bg-finance-primary/90"
                  disabled={inputMessage.trim() === '' || isAITyping || isRateLimited}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

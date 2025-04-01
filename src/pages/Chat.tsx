
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Info, XCircle, Loader2, Server, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ChatError } from "@/components/chat/ChatError";
import { FeedbackRating } from "@/components/chat/FeedbackRating";
import { RealTimeMarketData } from "@/components/market/RealTimeMarketData";
import ErrorBoundary from "@/components/chat/ErrorBoundary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  fetchOpenAIResponse, 
  OpenAIMessage, 
  OpenAIErrorResponse 
} from '@/utils/openai';
import { fetchGeminiResponse } from '@/utils/gemini';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedbackSubmitted?: boolean;
}

const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your FinAce AI financial advisor. How can I help you with investment or financial planning in Indian markets today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('openai_api_key') || '';
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return '';
    }
  });
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    try {
      return localStorage.getItem('gemini_api_key') || '';
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return '';
    }
  });
  const [showApiKeyInput, setShowApiKeyInput] = useState(() => {
    try {
      return !localStorage.getItem('openai_api_key') && !localStorage.getItem('gemini_api_key');
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return true;
    }
  });
  const [selectedModel, setSelectedModel] = useState(() => {
    try {
      return localStorage.getItem('ai_model') || 'openai';
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return 'openai';
    }
  });
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<OpenAIErrorResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [rateLimitTimer, setRateLimitTimer] = useState<number>(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Modified scroll function that respects user preference
  const scrollToBottom = (force: boolean = false) => {
    try {
      if (!autoScrollEnabled && !force) return;
      
      if (messagesEndRef.current && chatContainerRef.current) {
        // Only auto-scroll if we're already near the bottom or if it's a user message
        const container = chatContainerRef.current;
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        
        if (isNearBottom || force || messages[messages.length - 1]?.sender === 'user') {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    } catch (e) {
      console.error("Error scrolling to bottom:", e);
    }
  };

  // Track scroll position to determine if auto-scroll should be enabled
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      
      // If user scrolls up more than 200px, disable auto-scroll
      if (distanceFromBottom > 200) {
        setAutoScrollEnabled(false);
      } else if (distanceFromBottom < 100) {
        // If user scrolls to near bottom, re-enable auto-scroll
        setAutoScrollEnabled(true);
      }
    }
  };

  useEffect(() => {
    // Only auto-scroll when a new message is added
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      scrollToBottom(lastMessage.sender === 'user');
    }
  }, [messages]);

  useEffect(() => {
    // Add scroll event listener
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isRateLimited) {
      setRateLimitTimer(60);
      const interval = setInterval(() => {
        setRateLimitTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRateLimited(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isRateLimited]);

  const saveApiKey = () => {
    if (selectedModel === 'openai') {
      if (!apiKey.trim()) {
        toast({
          title: "Error",
          description: "Please enter a valid OpenAI API key",
          variant: "destructive",
        });
        return;
      }
      
      // Basic validation for OpenAI API key format
      if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
        toast({
          title: "Invalid API Key Format",
          description: "Please provide a valid OpenAI API key that starts with 'sk-'.",
          variant: "destructive",
        });
        return;
      }

      try {
        localStorage.setItem('openai_api_key', apiKey);
        localStorage.setItem('ai_model', 'openai');
        setSelectedModel('openai');
        setShowApiKeyInput(false);
        setApiKeyError(null);
        toast({
          title: "API Key Saved",
          description: "Your OpenAI API key has been saved securely to your browser's local storage.",
        });
      } catch (e) {
        console.error("Error saving to localStorage:", e);
        toast({
          title: "Error",
          description: "Could not save API key to local storage.",
          variant: "destructive",
        });
      }
    } else if (selectedModel === 'gemini') {
      if (!geminiApiKey.trim()) {
        toast({
          title: "Error",
          description: "Please enter a valid Gemini API key",
          variant: "destructive",
        });
        return;
      }

      try {
        localStorage.setItem('gemini_api_key', geminiApiKey);
        localStorage.setItem('ai_model', 'gemini');
        setSelectedModel('gemini');
        setShowApiKeyInput(false);
        setApiKeyError(null);
        toast({
          title: "API Key Saved",
          description: "Your Gemini API key has been saved securely to your browser's local storage.",
        });
      } catch (e) {
        console.error("Error saving to localStorage:", e);
        toast({
          title: "Error",
          description: "Could not save API key to local storage.",
          variant: "destructive",
        });
      }
    }
  };

  const clearApiKey = () => {
    try {
      localStorage.removeItem('openai_api_key');
      localStorage.removeItem('gemini_api_key');
      localStorage.removeItem('ai_model');
      setApiKey('');
      setGeminiApiKey('');
      setShowApiKeyInput(true);
      setApiKeyError(null);
      toast({
        title: "API Keys Removed",
        description: "Your API keys have been removed from local storage.",
      });
    } catch (e) {
      console.error("Error removing from localStorage:", e);
      toast({
        title: "Error",
        description: "Could not remove API keys from local storage.",
        variant: "destructive",
      });
    }
  };

  const retryAfterRateLimit = () => {
    if (!isRateLimited) {
      setIsRateLimited(false);
      setApiKeyError(null);
      toast({
        title: "Ready",
        description: "You can now send messages again.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only submit on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid form submission
      if (inputMessage.trim() !== '') {
        handleSendMessage();
      }
    }
  };

  const handleFeedbackSubmit = (rating: number, feedback: string, messageId: number) => {
    // In a real app, this would save to a database
    console.log("Feedback submitted:", { messageId, rating, feedback });
    
    // Mark message as having feedback submitted
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, feedbackSubmitted: true } : msg
      )
    );
    
    // Show toast confirmation
    toast({
      title: "Feedback Received",
      description: feedback 
        ? "Thank you for your detailed feedback!" 
        : "Thank you for rating this response!",
    });
  };

  const switchAIProvider = () => {
    const newModel = selectedModel === 'openai' ? 'gemini' : 'openai';
    setSelectedModel(newModel);
    
    try {
      localStorage.setItem('ai_model', newModel);
      
      // Check if we need to show the API key input form
      if (newModel === 'openai' && !apiKey) {
        setShowApiKeyInput(true);
      } else if (newModel === 'gemini' && !geminiApiKey) {
        setShowApiKeyInput(true);
      } else {
        setApiKeyError(null); // Clear any previous errors
      }
      
      toast({
        title: `Switched to ${newModel === 'openai' ? 'OpenAI' : 'Gemini'} API`,
        description: `You are now using the ${newModel === 'openai' ? 'OpenAI' : 'Gemini'} AI provider.`,
      });
    } catch (e) {
      console.error("Error saving model choice to localStorage:", e);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault(); // Prevent page refresh on form submit
    }
    
    if (inputMessage.trim() === '') return;
    
    // Check if we have the necessary API key
    const needsApiKey = (selectedModel === 'openai' && !apiKey) || 
                       (selectedModel === 'gemini' && !geminiApiKey);
                       
    if (needsApiKey && !showApiKeyInput) {
      setShowApiKeyInput(true);
      toast({
        title: `${selectedModel === 'openai' ? 'OpenAI' : 'Gemini'} API Key Required`,
        description: `Please enter your ${selectedModel === 'openai' ? 'OpenAI' : 'Gemini'} API key to continue`,
      });
      return;
    }
    
    if (isRateLimited) {
      toast({
        title: "Rate Limit Exceeded",
        description: `Please wait ${rateLimitTimer} seconds before sending another message or try switching providers.`,
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
    setApiKeyError(null); // Clear previous errors when sending a new message
    
    try {
      if (selectedModel === 'openai') {
        await handleOpenAIRequest(userMessage.text);
      } else {
        await handleGeminiRequest(userMessage.text);
      }
    } catch (error) {
      console.error('Error in AI response:', error);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the AI service. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAITyping(false);
    }
  };

  const handleOpenAIRequest = async (userInput: string) => {
    // Format the messages for the OpenAI API
    const openAIMessages: OpenAIMessage[] = [
      {
        role: 'system',
        content: 'You are an expert financial advisor specializing in Indian financial markets. Provide detailed, accurate advice about investments, tax planning, and wealth management specifically for the Indian context. Include specific information about Indian financial products, regulations, and market conditions when relevant. Format your responses using markdown to emphasize important points, create sections with headers, and organize information with bullet points or numbered lists where appropriate. Be thorough but concise.'
      }
    ];
    
    // Add conversation history (limit to last 10 messages for context)
    const recentMessages = messages.slice(-10).map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.text
    }));
    
    // Add current user message
    openAIMessages.push(...recentMessages, { role: 'user', content: userInput });
    
    const response = await fetchOpenAIResponse(apiKey, openAIMessages);
    
    if (response.error) {
      setApiKeyError(response.error);
      
      if (response.error.status === 401) {
        // If authentication failed, prompt for a new API key
        setShowApiKeyInput(true);
      }
      
      if (response.error.status === 429 || response.error.status === 403) {
        setIsRateLimited(true);
      }
      
      toast({
        title: response.error.title || "API Error",
        description: response.error.message,
        variant: "destructive",
      });
    } else {
      // Clear any previous errors if the request was successful
      setApiKeyError(null);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }
  };

  const handleGeminiRequest = async (userInput: string) => {
    try {
      // Get recent conversation history (last 10 messages)
      const recentMessages = messages.slice(-10);
      
      const response = await fetchGeminiResponse(geminiApiKey, userInput, recentMessages);
      
      if (response.error) {
        setApiKeyError({
          title: response.error.title,
          message: response.error.message,
          variant: response.error.variant || 'general'
        });
        
        if (response.error.variant === 'auth') {
          // If authentication failed, prompt for a new API key
          setShowApiKeyInput(true);
        }
        
        if (response.error.variant === 'rate-limit') {
          setIsRateLimited(true);
        }
        
        toast({
          title: response.error.title || "API Error",
          description: response.error.message,
          variant: "destructive",
        });
      } else {
        // Clear any previous errors if the request was successful
        setApiKeyError(null);
        
        const aiResponse: Message = {
          id: messages.length + 2,
          text: response.text,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }
    } catch (error) {
      console.error('Error with Gemini API:', error);
      
      toast({
        title: "Gemini API Error",
        description: "An unexpected error occurred with the Gemini API.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-4 md:py-8 animate-fade-in">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-finance-primary">FinAce AI</h1>
                  <p className="text-sm text-gray-500 mt-1">Your AI-powered Indian financial markets advisor</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!showApiKeyInput && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={switchAIProvider}
                      className="text-xs md:text-sm border-finance-primary/30 text-finance-primary hover:bg-finance-primary/10"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Switch to {selectedModel === 'openai' ? 'Gemini' : 'OpenAI'}
                    </Button>
                  )}
                  
                  <TabsList className="grid grid-cols-2 w-full md:w-auto">
                    <TabsTrigger value="chat" className="text-xs md:text-sm">
                      <Bot className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">FinAce AI</span>
                      <span className="md:hidden">AI</span>
                    </TabsTrigger>
                    <TabsTrigger value="market" className="text-xs md:text-sm">
                      <Server className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Market Data</span>
                      <span className="md:hidden">Market</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="chat" className="mt-0">
                {showApiKeyInput ? (
                  <Card className="mb-4 border border-gray-200 animate-fade-in shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Info className="h-5 w-5 mr-2 text-finance-primary" />
                        <h2 className="text-lg font-semibold text-finance-primary">
                          Enter Your AI API Key
                        </h2>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 mb-2">
                          Choose which AI provider you want to use:
                        </p>
                        <Select
                          value={selectedModel}
                          onValueChange={setSelectedModel}
                        >
                          <SelectTrigger className="w-full md:w-72 mb-4">
                            <SelectValue placeholder="Select AI Provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                            <SelectItem value="gemini">Google Gemini</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {selectedModel === 'openai' ? (
                        <div>
                          <p className="text-gray-600 mb-4">
                            To access expert financial AI advice via OpenAI, please enter your OpenAI API key. 
                            This key will be stored locally in your browser.
                          </p>
                          
                          <form onSubmit={(e) => { e.preventDefault(); saveApiKey(); }} className="flex space-x-2">
                            <div className="relative flex-grow">
                              <Input
                                type="password"
                                placeholder="sk-..."
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="pr-10 border-finance-primary/20 focus:border-finance-primary focus:ring-2 focus:ring-finance-primary/20"
                              />
                            </div>
                            <Button 
                              type="submit"
                              className="bg-finance-primary hover:bg-finance-primary/90 transition-colors"
                            >
                              Save Key
                            </Button>
                          </form>
                          
                          {apiKeyError && (
                            <p className="mt-2 text-sm text-red-500">{apiKeyError.message}</p>
                          )}
                          
                          <div className="mt-4 text-sm text-gray-500">
                            <p>You can get an OpenAI API key from the <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noreferrer" className="text-finance-primary underline">OpenAI dashboard</a>.</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-600 mb-4">
                            To access expert financial AI advice via Google Gemini, please enter your Gemini API key. 
                            This key will be stored locally in your browser.
                          </p>
                          
                          <form onSubmit={(e) => { e.preventDefault(); saveApiKey(); }} className="flex space-x-2">
                            <div className="relative flex-grow">
                              <Input
                                type="password"
                                placeholder="Your Gemini API Key"
                                value={geminiApiKey}
                                onChange={(e) => setGeminiApiKey(e.target.value)}
                                className="pr-10 border-finance-primary/20 focus:border-finance-primary focus:ring-2 focus:ring-finance-primary/20"
                              />
                            </div>
                            <Button 
                              type="submit"
                              className="bg-finance-primary hover:bg-finance-primary/90 transition-colors"
                            >
                              Save Key
                            </Button>
                          </form>
                          
                          {apiKeyError && (
                            <p className="mt-2 text-sm text-red-500">{apiKeyError.message}</p>
                          )}
                          
                          <div className="mt-4 text-sm text-gray-500">
                            <p>You can get a Gemini API key from the <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-finance-primary underline">Google AI Studio</a>.</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        {apiKeyError && (
                          <ChatError
                            title={apiKeyError.title || "API Error"}
                            description={apiKeyError.message}
                            retryAction={isRateLimited ? retryAfterRateLimit : switchAIProvider}
                            variant={apiKeyError.variant || 'general'}
                            className="mb-4"
                          />
                        )}
                        
                        {isRateLimited && (
                          <ChatError
                            title={`Rate Limit Exceeded (${rateLimitTimer}s)`}
                            description="You've hit the rate limit. Please wait before sending another message or try switching to a different AI provider."
                            retryAction={selectedModel === 'openai' ? switchAIProvider : retryAfterRateLimit}
                            variant="rate-limit"
                            className="mb-4"
                          />
                        )}
                        
                        <Card className="mb-4 border border-gray-200 shadow-md overflow-hidden">
                          <CardContent className="p-0">
                            <div 
                              ref={chatContainerRef}
                              className="h-[calc(100vh-300px)] md:h-[600px] overflow-y-auto p-4 space-y-4"
                              onScroll={handleScroll}
                            >
                              {messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                >
                                  <div className={`flex max-w-[85%] md:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 ${
                                      message.sender === 'user' 
                                        ? 'bg-finance-primary ml-2 shadow-md' 
                                        : 'bg-finance-accent mr-2 shadow-md'
                                    }`}>
                                      {message.sender === 'user' ? (
                                        <User className="h-5 w-5 text-white" />
                                      ) : (
                                        <Bot className="h-5 w-5 text-white" />
                                      )}
                                    </div>
                                    <div
                                      className={`p-4 rounded-lg shadow-sm ${
                                        message.sender === 'user'
                                          ? 'bg-finance-primary text-white'
                                          : 'bg-gray-100 text-gray-800'
                                      }`}
                                    >
                                      {message.sender === 'user' ? (
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                                      ) : (
                                        <>
                                          <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                              {message.text}
                                            </ReactMarkdown>
                                          </div>
                                          
                                          {message.sender === 'ai' && !message.feedbackSubmitted && (
                                            <FeedbackRating 
                                              messageId={message.id} 
                                              onFeedbackSubmit={handleFeedbackSubmit}
                                            />
                                          )}
                                        </>
                                      )}
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
                                <div className="flex mb-4 justify-start animate-fade-in">
                                  <div className="flex">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-finance-accent mr-2 shadow-md">
                                      <Bot className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="p-4 rounded-lg bg-gray-100 text-gray-800 shadow-sm">
                                      <div className="flex space-x-2 items-center">
                                        <div className="flex space-x-1">
                                          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                                          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                                        </div>
                                        <span className="text-sm text-gray-500">Thinking...</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div ref={messagesEndRef} />
                            </div>
                          </CardContent>
                        </Card>
                        
                        <div className="chat-form-container">
                          <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <Input
                              placeholder="Ask me about investing in the Indian market..."
                              value={inputMessage}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                              className="flex-grow input-field shadow-sm focus:shadow-md transition-shadow"
                              disabled={isRateLimited || isAITyping}
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Button 
                                      type="submit"
                                      className="bg-finance-primary hover:bg-finance-primary/90 shadow-sm transition-all"
                                      disabled={inputMessage.trim() === '' || isAITyping || isRateLimited}
                                    >
                                      {isAITyping ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                      ) : (
                                        <Send className="h-5 w-5" />
                                      )}
                                    </Button>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Send message</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Button 
                                      type="button"
                                      variant="outline"
                                      onClick={clearApiKey}
                                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                                    >
                                      <XCircle className="h-5 w-5" />
                                    </Button>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Reset API Key</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </form>
                          <div className="mt-2 text-xs text-gray-500 text-right">
                            Using {selectedModel === 'openai' ? 'OpenAI' : 'Google Gemini'} API
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="market">
                <div className="space-y-6">
                  <RealTimeMarketData />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Chat;

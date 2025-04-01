
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Info, XCircle, Loader2, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ChatError } from "@/components/chat/ChatError";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchOpenAIResponse, OpenAIMessage } from '@/utils/openai';

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
  const [apiKeyError, setApiKeyError] = useState<{title?: string; message: string} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    // Use requestAnimationFrame to ensure we scroll after the DOM has updated
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
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
      setApiKeyError(null);
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

  const clearApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setShowApiKeyInput(true);
    setApiKeyError(null);
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed from local storage.",
    });
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

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault(); // Prevent page refresh on form submit
    }
    
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
      openAIMessages.push(...recentMessages, { role: 'user', content: inputMessage });
      
      const response = await fetchOpenAIResponse(apiKey, openAIMessages);
      
      if (response.error) {
        setApiKeyError({
          title: response.error.title || 'Error',
          message: response.error.message
        });
        
        if (response.error.status === 401) {
          // If authentication failed, prompt for a new API key
          setShowApiKeyInput(true);
        }
        
        if (response.error.status === 429 || response.error.status === 403) {
          setIsRateLimited(true);
        }
      } else {
        // Clear any previous errors if the request was successful
        setApiKeyError(null);
      }
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: response.text,
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-finance-primary">FinAce Assistant</h1>
            <div className="flex items-center gap-2">
              {!showApiKeyInput && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearApiKey}
                  className="text-xs hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <XCircle className="h-3 w-3 mr-1" />
                  Reset Key
                </Button>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5 text-finance-primary" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm bg-white/90 backdrop-blur-sm">
                    <p>Ask me anything about investments, financial planning, or the Indian financial market. I can help with mutual funds, stocks, tax planning, and more.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {isRateLimited && (
            <ChatError
              title="Rate Limit Exceeded"
              description="You've hit OpenAI's rate limit. Please wait a minute before sending another message."
              retryAction={retryAfterRateLimit}
            />
          )}
          
          {apiKeyError && !showApiKeyInput && (
            <ChatError
              title={apiKeyError.title || "API Error"}
              description={apiKeyError.message}
            />
          )}
          
          {showApiKeyInput ? (
            <Card className="mb-4 border border-gray-200 animate-fade-in shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-finance-primary">Enter Your OpenAI API Key</h2>
                <p className="text-gray-600 mb-4">
                  To access expert financial AI advice, please enter your OpenAI API key. 
                  This key will be stored locally in your browser and is only used to make requests to OpenAI.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); saveApiKey(); }} className="flex space-x-2">
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-grow input-field"
                  />
                  <Button 
                    type="submit"
                    className="bg-finance-primary hover:bg-finance-primary/90"
                  >
                    Save Key
                  </Button>
                </form>
                {apiKeyError && (
                  <p className="mt-2 text-sm text-red-500">{apiKeyError.message}</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-4 border border-gray-200 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    ref={chatContainerRef}
                    className="h-[calc(100vh-300px)] md:h-[600px] overflow-y-auto p-4 space-y-4"
                  >
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        <div className={`flex max-w-[85%] md:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-finance-primary ml-2 shadow-md' 
                              : 'bg-finance-accent mr-2 shadow-md'
                          }`}>
                            {message.sender === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg shadow-sm ${
                              message.sender === 'user'
                                ? 'bg-finance-primary text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.sender === 'user' ? (
                              <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                            ) : (
                              <div className="prose prose-sm max-w-none dark:prose-invert">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {message.text}
                                </ReactMarkdown>
                              </div>
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
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-finance-accent mr-2 shadow-md">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="p-3 rounded-lg bg-gray-100 text-gray-800 shadow-sm">
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
                  <Button 
                    type="submit"
                    className="bg-finance-primary hover:bg-finance-primary/90 shadow-sm"
                    disabled={inputMessage.trim() === '' || isAITyping || isRateLimited}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

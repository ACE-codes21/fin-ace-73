
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { fetchOpenAIResponse, OpenAIMessage, OpenAIErrorResponse } from '@/utils/openai';
import { fetchGeminiResponse } from '@/utils/gemini';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedbackSubmitted?: boolean;
}

export const useChat = (apiKey: string, geminiApiKey: string, selectedModel: 'openai' | 'gemini') => {
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
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<OpenAIErrorResponse | null>(null);
  const [rateLimitTimer, setRateLimitTimer] = useState<number>(0);
  const { toast } = useToast();

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
        return { success: false, needsApiKey: true };
      }
      
      if (response.error.status === 429 || response.error.status === 403) {
        setIsRateLimited(true);
      }
      
      toast({
        title: response.error.title || "API Error",
        description: response.error.message,
        variant: "destructive",
      });
      
      return { success: false, needsApiKey: response.error.status === 401 };
    } else if (response.text) {
      // Clear any previous errors if the request was successful
      setApiKeyError(null);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      return { success: true, needsApiKey: false };
    }
    
    return { success: false, needsApiKey: false };
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
          return { success: false, needsApiKey: true };
        }
        
        if (response.error.variant === 'rate-limit') {
          setIsRateLimited(true);
        }
        
        toast({
          title: response.error.title || "API Error",
          description: response.error.message,
          variant: "destructive",
        });
        
        return { success: false, needsApiKey: response.error.variant === 'auth' };
      } else if (response.text) {
        // Clear any previous errors if the request was successful
        setApiKeyError(null);
        
        const aiResponse: Message = {
          id: messages.length + 2,
          text: response.text,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
        return { success: true, needsApiKey: false };
      }
      
      return { success: false, needsApiKey: false };
    } catch (error) {
      console.error('Error with Gemini API:', error);
      
      toast({
        title: "Gemini API Error",
        description: "An unexpected error occurred with the Gemini API.",
        variant: "destructive",
      });
      
      return { success: false, needsApiKey: false };
    }
  };

  const sendMessage = async (userMessage: string = inputMessage) => {
    if (userMessage.trim() === '') return false;
    
    // Record user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsAITyping(true);
    setApiKeyError(null); // Clear previous errors when sending a new message
    
    try {
      let result;
      if (selectedModel === 'openai') {
        result = await handleOpenAIRequest(userMessage);
      } else {
        result = await handleGeminiRequest(userMessage);
      }
      
      return result;
    } catch (error) {
      console.error('Error in AI response:', error);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the AI service. Please check your internet connection and try again.",
        variant: "destructive",
      });
      
      return { success: false, needsApiKey: false };
    } finally {
      setIsAITyping(false);
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

  return {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isAITyping,
    isRateLimited,
    apiKeyError,
    rateLimitTimer,
    sendMessage,
    handleFeedbackSubmit,
    retryAfterRateLimit,
  };
};

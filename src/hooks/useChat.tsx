
import { useState, useRef, useEffect, useCallback } from 'react';
import { generateGeminiResponse, GeminiErrorResponse } from '@/utils/gemini';
import { useChatScroll } from '@/hooks/useChatScroll';
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedbackSubmitted?: boolean;
}

interface UseChatProps {
  geminiApiKey?: string;
}

export const useChat = (props?: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<GeminiErrorResponse | null>(null);
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  
  const { toast } = useToast();
  
  const { 
    chatContainerRef,
    messagesEndRef,
    scrollToBottom,
    handleScroll
  } = useChatScroll(messages);
  
  const currentMessageId = useRef(0);

  // Load API key from localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('geminiApiKey');
    if (storedApiKey) {
      setGeminiApiKey(storedApiKey);
    }
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScrollEvent = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
        setHasScrolledUp(isScrolledUp && messages.length > 3);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScrollEvent);
      return () => container.removeEventListener('scroll', handleScrollEvent);
    }
  }, [messages.length]);

  const getNextMessageId = () => {
    currentMessageId.current += 1;
    return currentMessageId.current;
  };

  const saveApiKey = () => {
    if (geminiApiKey.trim()) {
      localStorage.setItem('geminiApiKey', geminiApiKey);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved to your browser.",
      });
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('geminiApiKey');
    setGeminiApiKey('');
    setMessages([]);
    setApiKeyError(null);
    toast({
      title: "Reset Complete",
      description: "Your API key has been cleared and chat history reset.",
    });
  };

  const generateResponse = async (userMessage: string) => {
    setIsAITyping(true);
    setErrorMessage(null);
    setApiKeyError(null);
    
    if (!geminiApiKey) {
      setErrorMessage("Please provide a valid Gemini API key to use FinAce.");
      setIsAITyping(false);
      return null;
    }
    
    try {
      // Convert messages to format expected by Gemini
      const messageHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Add current user message
      const fullMessageHistory = [...messageHistory, {
        role: 'user',
        content: userMessage
      }];
      
      const response = await generateGeminiResponse(geminiApiKey, fullMessageHistory);
      
      if (response.error) {
        console.error("Gemini API Error:", response.error);
        setApiKeyError(response.error);
        setErrorMessage(response.error.message);
        
        toast({
          title: "API Error",
          description: response.error.message,
          variant: "destructive",
        });
        
        if (response.error.status === 429) {
          setIsRateLimited(true);
          setTimeout(() => setIsRateLimited(false), 60000); // Reset after 1 minute
        }
        
        return null;
      }
      
      return response.text;
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMsg = error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(errorMsg);
      
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsAITyping(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!inputMessage.trim() || isAITyping || isRateLimited) {
      return;
    }
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    const newUserMessage: Message = {
      id: getNextMessageId(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    scrollToBottom(true);
    
    // Generate and add AI response
    const aiResponse = await generateResponse(userMessage);
    
    if (aiResponse) {
      const newAIMessage: Message = {
        id: getNextMessageId(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      scrollToBottom(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onFeedbackSubmit = (rating: number, feedback: string, messageId: number) => {
    // Update message to mark feedback as submitted
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, feedbackSubmitted: true } 
          : message
      )
    );
    
    toast({
      title: "Thank you for your feedback!",
      description: rating > 3 ? "We're glad you found this response helpful." : "We'll work on improving our responses.",
    });
    
    // In a real application, you would send this feedback to a server
    console.log(`Feedback submitted for message ${messageId}: Rating ${rating}, Feedback: "${feedback}"`);
  };

  return {
    messages,
    inputMessage,
    isAITyping,
    isRateLimited,
    errorMessage,
    apiKeyError,
    geminiApiKey,
    hasScrolledUp,
    chatContainerRef,
    messagesEndRef,
    handleSendMessage,
    setInputMessage,
    handleKeyDown,
    onFeedbackSubmit,
    clearApiKey,
    saveApiKey,
    setGeminiApiKey,
    handleScroll,
  };
};

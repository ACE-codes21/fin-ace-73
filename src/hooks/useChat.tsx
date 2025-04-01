
import { useState, useRef, useEffect, useCallback } from 'react';
import { generateGeminiResponse, GeminiErrorResponse } from '@/utils/gemini';
import { useChatScroll } from '@/hooks/useChatScroll';
import { useToast } from "@/hooks/use-toast";

// This is a hardcoded API key for demo purposes
// In a real application, this would be stored on the server side
const SERVER_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedbackSubmitted?: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<GeminiErrorResponse | null>(null);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  
  const { toast } = useToast();
  
  const { 
    chatContainerRef,
    messagesEndRef,
    scrollToBottom,
    handleScroll
  } = useChatScroll(messages);
  
  const currentMessageId = useRef(0);

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

  const generateResponse = async (userMessage: string) => {
    setIsAITyping(true);
    setErrorMessage(null);
    setApiKeyError(null);
    
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
      
      const response = await generateGeminiResponse(SERVER_API_KEY, fullMessageHistory);
      
      if (response.error) {
        console.error("Gemini API Error:", response.error);
        setApiKeyError(response.error);
        setErrorMessage(response.error.message);
        
        toast({
          title: "AI Service Error",
          description: "We're experiencing some issues with our AI service. Please try again later.",
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
        description: "We're experiencing some issues. Please try again later.",
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
    hasScrolledUp,
    chatContainerRef,
    messagesEndRef,
    handleSendMessage,
    setInputMessage,
    handleKeyDown,
    onFeedbackSubmit,
    handleScroll,
  };
};

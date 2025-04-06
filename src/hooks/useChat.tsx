
import { useState, useRef, useEffect } from 'react';
import { useChatScroll } from '@/hooks/useChatScroll';
import { useToast } from "@/hooks/use-toast";
import { generateGeminiResponse } from '@/services/geminiService';
import { useFeedback } from '@/hooks/useFeedback';
import { Message, GeminiErrorResponse } from '@/types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<GeminiErrorResponse | null>(null);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [fileUploads, setFileUploads] = useState<File[]>([]);
  
  const { toast } = useToast();
  const { handleFeedbackSubmit } = useFeedback();
  
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

  const generateResponse = async (userMessage: string, files?: File[]) => {
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
      
      const response = await generateGeminiResponse(fullMessageHistory, files);
      
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
    
    if ((!inputMessage.trim() && fileUploads.length === 0) || isAITyping || isRateLimited) {
      return;
    }
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Create message text to include file information if present
    let messageText = userMessage;
    if (fileUploads.length > 0) {
      const fileNames = fileUploads.map(file => file.name).join(", ");
      const fileText = fileUploads.length === 1 
        ? `[Attached file: ${fileNames}]` 
        : `[Attached files: ${fileNames}]`;
      
      messageText = messageText 
        ? `${messageText}\n\n${fileText}` 
        : fileText;
    }
    
    // Add user message to chat
    const newUserMessage: Message = {
      id: getNextMessageId(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      feedbackSubmitted: false
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    scrollToBottom(true);
    
    // Capture files and then clear them
    const filesToProcess = [...fileUploads];
    setFileUploads([]);
    
    // Generate and add AI response
    const aiResponse = await generateResponse(messageText, filesToProcess);
    
    if (aiResponse) {
      const newAIMessage: Message = {
        id: getNextMessageId(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        feedbackSubmitted: false
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

  const updateMessageWithFeedback = (messageId: number) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, feedbackSubmitted: true } 
          : message
      )
    );
  };

  const onFeedbackSubmit = (rating: number, feedback: string, messageId: number) => {
    handleFeedbackSubmit(rating, feedback, messageId, updateMessageWithFeedback);
  };

  return {
    messages,
    inputMessage,
    isAITyping,
    isRateLimited,
    errorMessage,
    apiKeyError,
    hasScrolledUp,
    fileUploads,
    setFileUploads,
    chatContainerRef,
    messagesEndRef,
    handleSendMessage,
    setInputMessage,
    handleKeyDown,
    onFeedbackSubmit,
    handleScroll,
  };
};

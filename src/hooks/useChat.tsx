
import { useState, useEffect } from 'react';
import { useChatScroll } from '@/hooks/useChatScroll';
import { useFeedback } from '@/hooks/useFeedback';
import { useMessages } from '@/hooks/useMessages';
import { useAIResponse } from '@/hooks/useAIResponse';
import { useFileUploads } from '@/hooks/useFileUploads';
import { Message } from '@/types/chat';

export const useChat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  
  const { messages, addUserMessage, addAIMessage, updateMessageWithFeedback } = useMessages();
  const { isAITyping, isRateLimited, errorMessage, apiKeyError, generateResponse } = useAIResponse();
  const { fileUploads, addFiles, clearFiles, removeFile } = useFileUploads();
  const { handleFeedbackSubmit } = useFeedback();
  
  const { 
    chatContainerRef,
    messagesEndRef,
    scrollToBottom,
    handleScroll
  } = useChatScroll(messages);

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
    addUserMessage(messageText);
    scrollToBottom(true);
    
    // Capture files and then clear them
    const filesToProcess = [...fileUploads];
    clearFiles();
    
    // Generate and add AI response
    // Convert messages to format expected by Gemini
    const messageHistory = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
    
    // Add current user message
    const fullMessageHistory = [...messageHistory, {
      role: 'user',
      content: messageText
    }];
    
    const aiResponse = await generateResponse(fullMessageHistory, filesToProcess);
    
    if (aiResponse) {
      addAIMessage(aiResponse);
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
    setFileUploads: addFiles,
    chatContainerRef,
    messagesEndRef,
    handleSendMessage,
    setInputMessage,
    handleKeyDown,
    onFeedbackSubmit,
    handleScroll,
  };
};

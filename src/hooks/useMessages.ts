
import { useState, useRef } from 'react';
import { Message } from '@/types/chat';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const currentMessageId = useRef(0);

  const getNextMessageId = () => {
    currentMessageId.current += 1;
    return currentMessageId.current;
  };

  const addUserMessage = (text: string): number => {
    const messageId = getNextMessageId();
    
    const newUserMessage: Message = {
      id: messageId,
      text,
      sender: 'user',
      timestamp: new Date(),
      feedbackSubmitted: false
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    return messageId;
  };

  const addAIMessage = (text: string): number => {
    const messageId = getNextMessageId();
    
    const newAIMessage: Message = {
      id: messageId,
      text,
      sender: 'ai',
      timestamp: new Date(),
      feedbackSubmitted: false
    };
    
    setMessages(prev => [...prev, newAIMessage]);
    return messageId;
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

  return {
    messages,
    addUserMessage,
    addAIMessage,
    updateMessageWithFeedback
  };
};

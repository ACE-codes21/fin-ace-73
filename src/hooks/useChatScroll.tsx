
import { useRef, useState, useEffect, useCallback } from 'react';
import { Message } from './useChat';

export const useChatScroll = (messages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const lastMessageCountRef = useRef(messages.length);

  // Modified scroll function that respects user preference
  const scrollToBottom = useCallback((force: boolean = false) => {
    try {
      if (!autoScrollEnabled && !force) return;
      
      if (messagesEndRef.current && chatContainerRef.current) {
        // Only auto-scroll if we're already near the bottom or if it's a new message or forced
        const container = chatContainerRef.current;
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        const hasNewMessage = messages.length > lastMessageCountRef.current;
        
        if (isNearBottom || force || hasNewMessage || messages[messages.length - 1]?.sender === 'user') {
          messagesEndRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end' 
          });
        }
      }
    } catch (e) {
      console.error("Error scrolling to bottom:", e);
    }
  }, [messages, autoScrollEnabled]);

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

  // Update last message count
  useEffect(() => {
    lastMessageCountRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    // Only auto-scroll when a new message is added
    if (messages.length > 0) {
      scrollToBottom(messages.length === 1); // Force scroll on first message
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    // Add scroll event listener
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return {
    messagesEndRef,
    chatContainerRef,
    autoScrollEnabled,
    scrollToBottom,
    handleScroll,
  };
};

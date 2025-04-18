
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Message } from '@/types/chat';
import ChatMessage from './ChatMessage';
import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatContainerProps {
  messages: Message[];
  isAITyping: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleScroll: () => void;
  onFeedbackSubmit: (rating: number, feedback: string, messageId: number) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isAITyping,
  chatContainerRef,
  messagesEndRef,
  handleScroll,
  onFeedbackSubmit,
}) => {
  // Add subtle background animation
  useEffect(() => {
    const interval = setInterval(() => {
      const container = chatContainerRef.current;
      if (container) {
        const gradient = `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
          rgba(14, 165, 233, 0.02), 
          rgba(139, 92, 246, 0.02), 
          rgba(255, 255, 255, 0))`;
        container.style.background = gradient;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [chatContainerRef]);

  return (
    <Card className="mb-4 border border-gray-200 rounded-xl shadow-md overflow-hidden backdrop-blur-sm bg-gray-50/60">
      <CardContent className="p-0">
        <div 
          ref={chatContainerRef}
          className="h-[calc(100vh-260px)] sm:h-[calc(100vh-300px)] md:h-[600px] overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 transition-all duration-500"
          onScroll={handleScroll}
        >
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-50/70 to-gray-100/70 shadow-sm border border-gray-200 max-w-[95%] sm:max-w-md mx-auto"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to FinAce AI Chat</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Ask me questions about investing in the Indian market, financial planning, 
                  or anything related to personal finance. I can help in multiple languages.
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Upload financial documents (PDFs, Excel files, images) to get more specific advice.</p>
                  <p className="mt-1">(File analysis feature coming soon)</p>
                </div>
              </motion.div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onFeedbackSubmit={onFeedbackSubmit}
              />
            ))}
            
            {isAITyping && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex mb-4 justify-start"
              >
                <div className="flex max-w-[70%]">
                  <div className="p-3 rounded-2xl bg-gray-100 text-gray-800 shadow-sm border border-gray-200">
                    <div className="flex space-x-2 items-center">
                      <div className="flex space-x-2">
                        <motion.span 
                          className="h-2 w-2 bg-finance-accent/70 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.span 
                          className="h-2 w-2 bg-finance-accent/70 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
                        />
                        <motion.span 
                          className="h-2 w-2 bg-finance-accent/70 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, delay: 0.6, repeat: Infinity }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContainer;

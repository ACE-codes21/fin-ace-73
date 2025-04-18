
import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FeedbackRating } from "@/components/chat/FeedbackRating";
import { Message } from '@/types/chat';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
  onFeedbackSubmit: (rating: number, feedback: string, messageId: number) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedbackSubmit }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: message.sender === 'user' ? 20 : -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 40,
        mass: 1
      }
    }
  };
  
  // Auto-scroll when message appears
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Check if message contains file attachment info
  const hasFileAttachment = message.text.includes('[Attached file');

  return (
    <motion.div
      ref={messageRef}
      key={message.id}
      className={`flex mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={`flex max-w-[90%] sm:max-w-[80%] md:max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
        <div
          className={`p-3 md:p-4 rounded-2xl ${
            message.sender === 'user'
              ? 'bg-gradient-to-br from-finance-primary/90 to-finance-primary/70 text-white shadow-sm'
              : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
          }`}
        >
          {message.sender === 'user' ? (
            <div>
              {hasFileAttachment ? (
                <div>
                  <p style={{ whiteSpace: 'pre-wrap' }} className="text-sm md:text-base">
                    {message.text.split('\n\n[Attached file')[0]}
                  </p>
                  <div className="mt-2 p-2 bg-finance-primary/20 rounded-lg text-white/90 text-xs">
                    {message.text.split('\n\n')[1]}
                  </div>
                </div>
              ) : (
                <p style={{ whiteSpace: 'pre-wrap' }} className="text-sm md:text-base">{message.text}</p>
              )}
            </div>
          ) : (
            <>
              <div className="prose prose-sm max-w-none dark:prose-invert text-sm md:text-base" dir="auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.text}
                </ReactMarkdown>
              </div>
              
              {message.sender === 'ai' && !message.feedbackSubmitted && (
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <FeedbackRating 
                    messageId={message.id} 
                    onFeedbackSubmit={onFeedbackSubmit}
                  />
                </div>
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
    </motion.div>
  );
};

export default ChatMessage;

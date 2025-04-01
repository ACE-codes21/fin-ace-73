
import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';
import { FeedbackRating } from "@/components/chat/FeedbackRating";
import { Message } from '@/types/chat';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <motion.div
      ref={messageRef}
      key={message.id}
      className={`flex mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className="flex-shrink-0 mx-2">
          {message.sender === 'user' ? (
            <Avatar className="h-10 w-10 border-2 border-finance-primary shadow-sm">
              <AvatarImage src="/user-avatar.png" alt="User" />
              <AvatarFallback className="bg-finance-primary text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="h-10 w-10 border-2 border-finance-accent shadow-sm">
              <AvatarImage src="/bot-avatar.png" alt="FinAce" />
              <AvatarFallback className="bg-finance-accent text-white">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        
        <div
          className={`p-4 rounded-2xl shadow-md ${
            message.sender === 'user'
              ? 'bg-gradient-to-br from-finance-primary to-finance-primary/80 text-white'
              : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-100'
          }`}
        >
          {message.sender === 'user' ? (
            <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
          ) : (
            <>
              <div className="prose prose-sm max-w-none dark:prose-invert">
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

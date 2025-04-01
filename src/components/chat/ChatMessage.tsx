
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';
import { FeedbackRating } from "@/components/chat/FeedbackRating";
import { Message } from '@/hooks/useChat';

interface ChatMessageProps {
  message: Message;
  onFeedbackSubmit: (rating: number, feedback: string, messageId: number) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedbackSubmit }) => {
  return (
    <div
      key={message.id}
      className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
    >
      <div className={`flex max-w-[85%] md:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 ${
          message.sender === 'user' 
            ? 'bg-finance-primary ml-2 shadow-md' 
            : 'bg-finance-accent mr-2 shadow-md'
        }`}>
          {message.sender === 'user' ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-white" />
          )}
        </div>
        <div
          className={`p-4 rounded-lg shadow-sm ${
            message.sender === 'user'
              ? 'bg-finance-primary text-white'
              : 'bg-gray-100 text-gray-800'
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
                <FeedbackRating 
                  messageId={message.id} 
                  onFeedbackSubmit={onFeedbackSubmit}
                />
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
    </div>
  );
};

export default ChatMessage;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Message } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import { Loader2, Bot } from 'lucide-react';

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
  return (
    <Card className="mb-4 border border-gray-200 shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div 
          ref={chatContainerRef}
          className="h-[calc(100vh-300px)] md:h-[600px] overflow-y-auto p-4 space-y-4"
          onScroll={handleScroll}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onFeedbackSubmit={onFeedbackSubmit}
            />
          ))}
          
          {isAITyping && (
            <div className="flex mb-4 justify-start animate-fade-in">
              <div className="flex">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-finance-accent mr-2 shadow-md">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="p-4 rounded-lg bg-gray-100 text-gray-800 shadow-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="flex space-x-1">
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContainer;


import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import { ChatError } from '@/components/chat/ChatError';
import { useChat } from '@/hooks/useChat';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import ErrorBoundary from '@/components/chat/ErrorBoundary';

const Chat = () => {
  const {
    messages,
    inputMessage,
    isAITyping,
    isRateLimited,
    apiKeyError,
    hasScrolledUp,
    handleSendMessage,
    setInputMessage,
    handleKeyDown,
    onFeedbackSubmit,
    messagesEndRef,
    chatContainerRef,
    handleScroll,
  } = useChat();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-finance-primary to-finance-accent bg-clip-text text-transparent">
            FinAce AI Chat
          </h1>
          
          <ErrorBoundary>
            {isRateLimited && (
              <ChatError
                title="Rate Limit Exceeded"
                description="You've sent too many messages in a short period. Please wait a moment before sending more messages."
                variant="rate-limit"
              />
            )}
            
            {apiKeyError && (
              <ChatError
                title="AI Service Error"
                description="We're experiencing some issues with our AI service. Please try again later."
                variant="auth"
              />
            )}

            <>
              <Alert variant="default" className="mb-4 bg-finance-primary/5 border border-finance-primary/20">
                <Shield className="h-4 w-4 text-finance-primary" />
                <AlertDescription>
                  Ask me anything about investing in the Indian market, financial planning, or managing your personal finances.
                </AlertDescription>
              </Alert>

              <ChatContainer
                messages={messages}
                isAITyping={isAITyping}
                chatContainerRef={chatContainerRef}
                messagesEndRef={messagesEndRef}
                handleScroll={handleScroll}
                onFeedbackSubmit={onFeedbackSubmit}
              />

              <ChatInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                isAITyping={isAITyping}
                isRateLimited={isRateLimited}
                handleKeyDown={handleKeyDown}
              />

              {hasScrolledUp && messages.length > 3 && (
                <div className="fixed bottom-24 right-1/2 transform translate-x-1/2 bg-finance-primary text-white px-4 py-2 rounded-full text-sm shadow-lg animate-bounce">
                  New messages below
                </div>
              )}
            </>
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

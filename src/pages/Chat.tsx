
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ApiKeyInput from '@/components/chat/ApiKeyInput';
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
    geminiApiKey,
    hasScrolledUp,
    handleSendMessage,
    setInputMessage,
    handleKeyDown,
    onFeedbackSubmit,
    clearApiKey,
    saveApiKey,
    setGeminiApiKey,
    handleScroll,
    messagesEndRef,
    chatContainerRef,
  } = useChat();

  const navigate = useNavigate();

  // Redirect to home if no API key after 3 seconds
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    if (!geminiApiKey) {
      timeoutId = setTimeout(() => {
        // This would be where you'd redirect if needed
        // navigate('/');
      }, 3000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [geminiApiKey, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-finance-primary to-finance-accent bg-clip-text text-transparent">
            FinAce AI Chat Assistant
          </h1>
          
          <ErrorBoundary>
            {!geminiApiKey && (
              <ApiKeyInput
                geminiApiKey={geminiApiKey}
                setGeminiApiKey={setGeminiApiKey}
                saveApiKey={saveApiKey}
                apiKeyError={apiKeyError}
              />
            )}
            
            {isRateLimited && (
              <ChatError
                title="Rate Limit Exceeded"
                description="You've sent too many messages in a short period. Please wait a moment before sending more messages."
                variant="rate-limit"
              />
            )}
            
            {geminiApiKey && apiKeyError && (
              <ChatError
                title="API Key Error"
                description={apiKeyError.message}
                variant="auth"
                retryAction={clearApiKey}
              />
            )}

            {geminiApiKey && !apiKeyError && (
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
                  clearApiKey={clearApiKey}
                  handleKeyDown={handleKeyDown}
                />

                {hasScrolledUp && messages.length > 3 && (
                  <div className="fixed bottom-24 right-1/2 transform translate-x-1/2 bg-finance-primary text-white px-4 py-2 rounded-full text-sm shadow-lg animate-bounce">
                    New messages below
                  </div>
                )}
              </>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

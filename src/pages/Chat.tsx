
import React from 'react';
import Layout from '@/components/layout/Layout';
import ApiKeyInput from '@/components/chat/ApiKeyInput';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import { SecurityInfo } from '@/components/chat/SecurityInfo';
import ErrorBoundary from '@/components/chat/ErrorBoundary';
import { ChatError } from '@/components/chat/ChatError';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useChat } from '@/hooks/useChat';

const Chat = () => {
  const {
    apiKey,
    setApiKey,
    geminiApiKey,
    setGeminiApiKey,
    selectedModel,
    setSelectedModel,
    showApiKeyInput,
    saveApiKey,
    clearApiKey
  } = useApiKeys();

  const {
    messages,
    inputMessage,
    setInputMessage,
    isAITyping,
    isRateLimited,
    errorMessage,
    apiKeyError,
    chatContainerRef,
    messagesEndRef,
    handleSendMessage,
    handleKeyDown,
    handleScroll,
    onFeedbackSubmit
  } = useChat({
    apiKey,
    geminiApiKey,
    selectedModel,
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-gradient">FinAce AI Chat Assistant</span>
        </h1>

        <div className="max-w-4xl mx-auto">
          <ErrorBoundary>
            {showApiKeyInput && (
              <ApiKeyInput
                apiKey={apiKey}
                setApiKey={setApiKey}
                geminiApiKey={geminiApiKey}
                setGeminiApiKey={setGeminiApiKey}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                saveApiKey={saveApiKey}
                apiKeyError={apiKeyError}
              />
            )}

            {errorMessage && (
              <ChatError
                title={apiKeyError?.type === "insufficient_quota" ? "API Rate Limit Exceeded" : "Error"}
                description={errorMessage}
                variant={apiKeyError?.status === 429 ? "rate-limit" : apiKeyError?.type === "invalid_request_error" ? "auth" : "general"}
              />
            )}

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

            <div className="mt-8">
              <SecurityInfo />
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

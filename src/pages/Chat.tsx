
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
import Chat3DBackground from '@/components/effects/Chat3DBackground';
import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/effects/ParticlesBackground';
import { Bot } from 'lucide-react';

const Chat = () => {
  const {
    geminiApiKey,
    setGeminiApiKey,
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
    geminiApiKey,
  });

  return (
    <Layout>
      <ParticlesBackground />
      <Chat3DBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-finance-primary p-2 rounded-full mr-3">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-center">
              <span className="bg-gradient-to-r from-finance-primary via-finance-accent to-finance-secondary bg-clip-text text-transparent">
                FinAce AI Chat Assistant
              </span>
            </h1>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <ErrorBoundary>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {showApiKeyInput && (
                <ApiKeyInput
                  geminiApiKey={geminiApiKey}
                  setGeminiApiKey={setGeminiApiKey}
                  saveApiKey={saveApiKey}
                  apiKeyError={apiKeyError}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {errorMessage && (
                <ChatError
                  title={apiKeyError?.status === 429 ? "API Rate Limit Exceeded" : "Error"}
                  description={errorMessage}
                  variant={apiKeyError?.status === 429 ? "rate-limit" : "general"}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ChatContainer
                messages={messages}
                isAITyping={isAITyping}
                chatContainerRef={chatContainerRef}
                messagesEndRef={messagesEndRef}
                handleScroll={handleScroll}
                onFeedbackSubmit={onFeedbackSubmit}
              />
            </motion.div>

            <ChatInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              isAITyping={isAITyping}
              isRateLimited={isRateLimited}
              clearApiKey={clearApiKey}
              handleKeyDown={handleKeyDown}
            />

            <div className="mt-4">
              <SecurityInfo />
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

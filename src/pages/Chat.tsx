
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import ChatInput from '@/components/chat/ChatInput';
import ChatContainer from '@/components/chat/ChatContainer';
import { ChatError } from '@/components/chat/ChatError';
import ErrorBoundary from '@/components/chat/ErrorBoundary';
import { Message, GeminiErrorResponse } from '@/types/chat';
import Layout from '@/components/layout/Layout';
import Chat3DBackground from '@/components/effects/Chat3DBackground';
import { DocumentService, FileInfo } from '@/services/DocumentService';
import { useChat } from '@/hooks/useChat';

const Chat = () => {
  const { toast } = useToast();
  const {
    messages,
    inputMessage,
    isAITyping,
    isRateLimited,
    errorMessage,
    apiKeyError,
    hasScrolledUp,
    fileUploads,
    setFileUploads,
    chatContainerRef,
    messagesEndRef,
    handleSendMessage,
    setInputMessage,
    handleKeyDown,
    onFeedbackSubmit,
    handleScroll,
  } = useChat();

  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
    
    try {
      setFileUploads(files);
      
      toast({
        title: "Files Added",
        description: `${files.length} file(s) ready to be sent with your message.`
      });
    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: "Error",
        description: "Failed to process uploaded files.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 relative">
        <Chat3DBackground />
        
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold gradient-text mb-2">FinAce AI Chat Assistant</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ask questions about investing in Indian markets, financial planning, or analyze your financial documents.
            </p>
          </div>
          
          <div className="w-full">
            <ErrorBoundary>
              {apiKeyError && apiKeyError.code !== 429 && (
                <ChatError
                  title={`API Error (${apiKeyError.code})`}
                  description={apiKeyError.message}
                  variant="auth"
                />
              )}
              
              {isRateLimited && (
                <ChatError
                  title="Rate Limit Exceeded"
                  description="You've reached the request limit. Please wait a moment before trying again."
                  variant="rate-limit"
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
                handleKeyDown={handleKeyDown}
                onFileUpload={handleFileUpload}
                uploadedFiles={fileUploads}
                removeFile={(index) => {
                  setFileUploads(prev => prev.filter((_, i) => i !== index));
                }}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

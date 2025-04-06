
import React from 'react';
import ChatInput from '@/components/chat/ChatInput';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatErrorDisplay from '@/components/chat/ChatErrorDisplay';
import ErrorBoundary from '@/components/chat/ErrorBoundary';
import Layout from '@/components/layout/Layout';
import Chat3DBackground from '@/components/effects/Chat3DBackground';
import { useChat } from '@/hooks/useChat';
import ChatUploadHandler from '@/components/chat/ChatUploadHandler';

const Chat = () => {
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

  const uploadHandler = ChatUploadHandler({ setFileUploads });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 relative">
        <Chat3DBackground />
        
        <div className="max-w-5xl mx-auto z-10 relative">
          <ChatHeader />
          
          <div className="w-full">
            <ErrorBoundary>
              <ChatErrorDisplay 
                apiKeyError={apiKeyError} 
                isRateLimited={isRateLimited} 
              />
              
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
                onFileUpload={uploadHandler.handleFileUpload}
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

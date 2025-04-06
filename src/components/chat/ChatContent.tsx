
import React from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatErrorDisplay from '@/components/chat/ChatErrorDisplay';
import { useChat } from '@/hooks/useChat';
import ChatInput from '@/components/chat/ChatInput';

const ChatContent = () => {
  const {
    messages,
    inputMessage,
    isAITyping,
    isRateLimited,
    errorMessage,
    apiKeyError,
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

  const handleFileUpload = (files: File[]) => {
    setFileUploads(files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = fileUploads.filter((_, i) => i !== index);
    setFileUploads(updatedFiles);
  };

  return (
    <>
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
        onFileUpload={handleFileUpload}
        uploadedFiles={fileUploads}
        removeFile={removeFile}
      />
    </>
  );
};

export default ChatContent;

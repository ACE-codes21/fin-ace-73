
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ChatError } from "@/components/chat/ChatError";
import { RealTimeMarketData } from "@/components/market/RealTimeMarketData";
import ErrorBoundary from "@/components/chat/ErrorBoundary";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Bot, Server, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useChat } from '@/hooks/useChat';
import { useChatScroll } from '@/hooks/useChatScroll';
import ApiKeyInput from '@/components/chat/ApiKeyInput';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';

const Chat = () => {
  // API key and model state management
  const {
    apiKey,
    setApiKey,
    geminiApiKey,
    setGeminiApiKey,
    selectedModel,
    setSelectedModel,
    showApiKeyInput,
    setShowApiKeyInput,
    saveApiKey,
    clearApiKey,
    switchAIProvider,
  } = useApiKeys();

  // Chat functionality
  const {
    messages,
    inputMessage,
    setInputMessage,
    isAITyping,
    isRateLimited,
    apiKeyError,
    rateLimitTimer,
    sendMessage,
    handleFeedbackSubmit,
    retryAfterRateLimit,
  } = useChat(apiKey, geminiApiKey, selectedModel);

  // Chat scrolling behavior
  const {
    messagesEndRef,
    chatContainerRef,
    handleScroll,
  } = useChatScroll(messages);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<string>("chat");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only submit on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid form submission
      if (inputMessage.trim() !== '') {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault(); // Prevent page refresh on form submit
    }
    
    if (inputMessage.trim() === '') return;
    
    // Check if we have the necessary API key
    const needsApiKey = (selectedModel === 'openai' && !apiKey) || 
                       (selectedModel === 'gemini' && !geminiApiKey);
                       
    if (needsApiKey && !showApiKeyInput) {
      setShowApiKeyInput(true);
      return;
    }
    
    await sendMessage();
  };

  return (
    <Layout>
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-4 md:py-8 animate-fade-in">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-finance-primary">FinAce AI</h1>
                  <p className="text-sm text-gray-500 mt-1">Your AI-powered Indian financial markets advisor</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!showApiKeyInput && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={switchAIProvider}
                      className="text-xs md:text-sm border-finance-primary/30 text-finance-primary hover:bg-finance-primary/10"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Switch to {selectedModel === 'openai' ? 'Gemini' : 'OpenAI'}
                    </Button>
                  )}
                  
                  <TabsList className="grid grid-cols-2 w-full md:w-auto">
                    <TabsTrigger value="chat" className="text-xs md:text-sm">
                      <Bot className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">FinAce AI</span>
                      <span className="md:hidden">AI</span>
                    </TabsTrigger>
                    <TabsTrigger value="market" className="text-xs md:text-sm">
                      <Server className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Market Data</span>
                      <span className="md:hidden">Market</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="chat" className="mt-0">
                {showApiKeyInput ? (
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
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        {apiKeyError && (
                          <ChatError
                            title={apiKeyError.title || "API Error"}
                            description={apiKeyError.message}
                            retryAction={isRateLimited ? retryAfterRateLimit : switchAIProvider}
                            variant={apiKeyError.variant || 'general'}
                            className="mb-4"
                          />
                        )}
                        
                        {isRateLimited && (
                          <ChatError
                            title={`Rate Limit Exceeded (${rateLimitTimer}s)`}
                            description="You've hit the rate limit. Please wait before sending another message or try switching to a different AI provider."
                            retryAction={selectedModel === 'openai' ? switchAIProvider : retryAfterRateLimit}
                            variant="rate-limit"
                            className="mb-4"
                          />
                        )}
                        
                        <ChatContainer 
                          messages={messages}
                          isAITyping={isAITyping}
                          chatContainerRef={chatContainerRef}
                          messagesEndRef={messagesEndRef}
                          handleScroll={handleScroll}
                          onFeedbackSubmit={handleFeedbackSubmit}
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
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="market">
                <RealTimeMarketData />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Chat;

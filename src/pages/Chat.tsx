import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { RealTimeMarketData } from "@/components/market/RealTimeMarketData";
import ErrorBoundary from "@/components/chat/ErrorBoundary";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Bot, Server } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useChatScroll } from '@/hooks/useChatScroll';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';

const Chat = () => {
  // Chat functionality
  const {
    messages,
    inputMessage,
    setInputMessage,
    isAITyping,
    sendMessage,
    handleFeedbackSubmit,
    setMessages,
  } = useChat();

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
    
    await sendMessage();
  };

  const clearChat = () => {
    // Clear all messages except the initial greeting
    const initialGreeting = messages[0];
    setInputMessage('');
    setMessages([initialGreeting]);
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
                <div className="grid grid-cols-1 gap-6">
                  <div>
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
                      isRateLimited={false}
                      clearApiKey={clearChat}
                      handleKeyDown={handleKeyDown}
                    />

                    <div className="text-xs text-gray-500 text-center mt-2">
                      This is a demo with pre-programmed responses. No API keys required.
                    </div>
                  </div>
                </div>
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

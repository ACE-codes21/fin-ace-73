
import React from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ErrorBoundary from '@/components/chat/ErrorBoundary';
import Layout from '@/components/layout/Layout';
import Chat3DBackground from '@/components/effects/Chat3DBackground';
import ChatContent from '@/components/chat/ChatContent';

const Chat = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 relative">
        <Chat3DBackground />
        
        <div className="max-w-5xl mx-auto z-10 relative">
          <ChatHeader />
          
          <div className="w-full">
            <ErrorBoundary>
              <ChatContent />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

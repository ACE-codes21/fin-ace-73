
import React from 'react';
import { ChatError } from '@/components/chat/ChatError';
import { GeminiErrorResponse } from '@/types/chat';

interface ChatErrorDisplayProps {
  apiKeyError: GeminiErrorResponse | null;
  isRateLimited: boolean;
}

const ChatErrorDisplay: React.FC<ChatErrorDisplayProps> = ({
  apiKeyError,
  isRateLimited
}) => {
  if (!apiKeyError && !isRateLimited) return null;
  
  if (apiKeyError && apiKeyError.code !== 429) {
    return (
      <ChatError
        title={`API Error (${apiKeyError.code})`}
        description={apiKeyError.message}
        variant="auth"
      />
    );
  }
  
  if (isRateLimited) {
    return (
      <ChatError
        title="Rate Limit Exceeded"
        description="You've reached the request limit. Please wait a moment before trying again."
        variant="rate-limit"
      />
    );
  }
  
  return null;
};

export default ChatErrorDisplay;

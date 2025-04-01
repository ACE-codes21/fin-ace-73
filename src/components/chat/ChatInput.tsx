
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Info, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  isAITyping: boolean;
  isRateLimited: boolean;
  clearApiKey: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isAITyping,
  isRateLimited,
  clearApiKey,
  handleKeyDown,
}) => {
  return (
    <div className="chat-form-container">
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <Input
          placeholder="Ask me about investing in the Indian market..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow input-field shadow-sm focus:shadow-md transition-shadow"
          disabled={isAITyping || isRateLimited}
        />
        <Button 
          type="submit" 
          className="bg-finance-primary hover:bg-finance-primary/90 transition-all duration-300"
          disabled={isAITyping || isRateLimited || inputMessage.trim() === ''}
        >
          {isAITyping ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={clearApiKey} 
                className="text-gray-500 hover:text-red-500"
                type="button"
              >
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear API Key</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
      
      <div className="text-xs text-gray-500 text-center mt-2">
        Your API key is stored locally and never sent to our servers.
      </div>
    </div>
  );
};

export default ChatInput;

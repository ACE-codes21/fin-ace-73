
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, RefreshCcw, Rocket, Sparkles, PanelBottomClose } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  isAITyping: boolean;
  isRateLimited: boolean;
  clearApiKey: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const QUICK_PROMPTS = [
  "Explain mutual funds for beginners",
  "What's the difference between stocks and bonds?",
  "How do I start investing in the Indian market?",
  "Tell me about SIP investments",
  "How to build an emergency fund?",
  "What are the tax benefits of ELSS funds?",
];

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isAITyping,
  isRateLimited,
  clearApiKey,
  handleKeyDown,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleQuickPromptSelect = (prompt: string) => {
    setInputMessage(prompt);
    setShowSuggestions(false);
  };

  return (
    <motion.div 
      className="chat-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <form onSubmit={handleSendMessage} className="relative">
        <div className="flex space-x-2">
          <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
            <PopoverTrigger asChild>
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                className="bg-white hover:bg-gray-50 border-gray-200 text-gray-500"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-3 border-b border-gray-100">
                <h3 className="text-sm font-medium">Quick Prompts</h3>
                <p className="text-xs text-gray-500">Select a prompt to get started</p>
              </div>
              <div className="p-2 max-h-60 overflow-y-auto">
                {QUICK_PROMPTS.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left text-sm mb-1 h-auto py-2"
                    onClick={() => handleQuickPromptSelect(prompt)}
                  >
                    <Rocket className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{prompt}</span>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex-grow relative">
            <Input
              placeholder="Ask me about investing in the Indian market..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="py-6 pl-4 pr-12 rounded-full input-field shadow-sm hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm border-gray-200"
              disabled={isAITyping || isRateLimited}
            />
            <Button 
              type="submit" 
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-finance-primary hover:bg-finance-primary/90 transition-all duration-300 h-8 w-8"
              disabled={isAITyping || isRateLimited || inputMessage.trim() === ''}
            >
              {isAITyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={clearApiKey} 
                  size="icon"
                  className="bg-white hover:bg-gray-50 border-gray-200 text-gray-500 hover:text-red-500"
                  type="button"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear API Key & Reset Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;

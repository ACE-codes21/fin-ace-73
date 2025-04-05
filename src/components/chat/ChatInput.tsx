
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, Sparkles, Upload } from 'lucide-react';
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
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const QUICK_PROMPTS = [
  "Explain mutual funds for beginners",
  "What's the difference between stocks and bonds?",
  "How do I start investing in the Indian market?",
  "Tell me about SIP investments",
  "How to build an emergency fund?",
  "What are the tax benefits of ELSS funds?",
  // Multilingual examples
  "मुझे म्यूचुअल फंड के बारे में बताएं", // Hindi
  "எனக்கு நிதி திட்டமிடல் பற்றி சொல்லுங்கள்", // Tamil
  "స్టాక్ మార్కెట్లో ఎలా పెట్టుబడి పెట్టాలి?", // Telugu
];

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isAITyping,
  isRateLimited,
  handleKeyDown,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fileUploads, setFileUploads] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleQuickPromptSelect = (prompt: string) => {
    setInputMessage(prompt);
    setShowSuggestions(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileUploads(prev => [...prev, ...Array.from(files)]);
      // Reset the input to allow selecting the same file again
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFileUploads(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      className="chat-form-container pb-2 sm:pb-4 px-2 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {fileUploads.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-3">
          {fileUploads.map((file, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 py-1 px-2 rounded-full text-xs">
              <span className="truncate max-w-[180px]">{file.name}</span>
              <button 
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="relative">
        <div className="flex space-x-2">
          <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
            <PopoverTrigger asChild>
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-500 shadow-sm h-10 w-10 flex-shrink-0"
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 sm:w-80 p-0" align="start">
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
                    <Sparkles className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{prompt}</span>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-500 shadow-sm h-10 w-10 flex-shrink-0"
                  onClick={handleFileUpload}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload financial documents (PDF, Excel, Images)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            multiple
          />
          
          <motion.div 
            className="flex-grow relative"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              placeholder="Ask about investing..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="py-5 sm:py-6 pl-3 sm:pl-4 pr-10 sm:pr-12 rounded-full input-field shadow-sm hover:shadow-md transition-shadow bg-gray-50/80 backdrop-blur-sm border-gray-200 text-sm sm:text-base"
              disabled={isAITyping || isRateLimited}
            />
            <Button 
              type="submit" 
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-finance-primary hover:bg-finance-primary/90 transition-all duration-300 h-7 w-7 sm:h-8 sm:w-8"
              disabled={isAITyping || isRateLimited || (inputMessage.trim() === '' && fileUploads.length === 0)}
            >
              {isAITyping ? (
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </motion.div>
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;

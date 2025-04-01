
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info, KeyIcon } from 'lucide-react';
import { GeminiErrorResponse } from '@/types/chat';
import { motion } from 'framer-motion';

interface ApiKeyInputProps {
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  saveApiKey: () => void;
  apiKeyError: GeminiErrorResponse | null;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  geminiApiKey,
  setGeminiApiKey,
  saveApiKey,
  apiKeyError,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 shadow-card border border-gray-100 bg-white overflow-hidden">
        <CardContent className="p-6">
          <motion.div 
            className="flex items-center mb-4"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <KeyIcon className="h-5 w-5 mr-2 text-finance-primary" />
            <h2 className="text-lg font-semibold text-gray-800">
              Enter Your Gemini API Key
            </h2>
          </motion.div>
          
          <div>
            <motion.p 
              className="text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              To access expert financial AI advice via Google Gemini, please enter your Gemini API key. 
              Your key will be stored locally in your browser.
            </motion.p>
            
            <motion.form 
              onSubmit={(e) => { e.preventDefault(); saveApiKey(); }} 
              className="flex space-x-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative flex-grow">
                <Input
                  type="password"
                  placeholder="Your Gemini API Key"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="modern-input pr-10 shadow-inner"
                />
              </div>
              <Button 
                type="submit"
                className="modern-button"
              >
                Save Key
              </Button>
            </motion.form>
            
            {apiKeyError && (
              <motion.p 
                className="mt-2 text-sm text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {apiKeyError.message}
              </motion.p>
            )}
            
            <motion.div 
              className="mt-4 text-sm text-gray-500 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Info className="h-3 w-3 mr-1" />
              <p>You can get a Gemini API key from the <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-finance-primary underline">Google AI Studio</a>.</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ApiKeyInput;

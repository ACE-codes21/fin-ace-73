
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info, KeyIcon, ShieldCheck } from 'lucide-react';
import { GeminiErrorResponse } from '@/utils/gemini';
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
      <Card className="mb-4 border border-gray-200 shadow-lg backdrop-blur-sm bg-white/80 overflow-hidden">
        <CardContent className="p-6">
          <motion.div 
            className="flex items-center mb-4"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <KeyIcon className="h-5 w-5 mr-2 text-finance-primary" />
            <h2 className="text-lg font-semibold text-finance-primary">
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
                  className="pr-10 border-finance-primary/20 focus:border-finance-primary focus:ring-2 focus:ring-finance-primary/20 shadow-inner"
                />
                <ShieldCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <Button 
                type="submit"
                className="bg-finance-primary hover:bg-finance-primary/90 transition-colors"
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

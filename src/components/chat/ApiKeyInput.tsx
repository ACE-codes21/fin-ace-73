
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { GeminiErrorResponse } from '@/utils/gemini';

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
    <Card className="mb-4 border border-gray-200 animate-fade-in shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Info className="h-5 w-5 mr-2 text-finance-primary" />
          <h2 className="text-lg font-semibold text-finance-primary">
            Enter Your Gemini API Key
          </h2>
        </div>
        
        <div>
          <p className="text-gray-600 mb-4">
            To access expert financial AI advice via Google Gemini, please enter your Gemini API key. 
            This key will be stored locally in your browser.
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); saveApiKey(); }} className="flex space-x-2">
            <div className="relative flex-grow">
              <Input
                type="password"
                placeholder="Your Gemini API Key"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="pr-10 border-finance-primary/20 focus:border-finance-primary focus:ring-2 focus:ring-finance-primary/20"
              />
            </div>
            <Button 
              type="submit"
              className="bg-finance-primary hover:bg-finance-primary/90 transition-colors"
            >
              Save Key
            </Button>
          </form>
          
          {apiKeyError && (
            <p className="mt-2 text-sm text-red-500">{apiKeyError.message}</p>
          )}
          
          <div className="mt-4 text-sm text-gray-500">
            <p>You can get a Gemini API key from the <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-finance-primary underline">Google AI Studio</a>.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;

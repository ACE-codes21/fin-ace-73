
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OpenAIErrorResponse } from '@/utils/openai';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  selectedModel: 'openai' | 'gemini';
  setSelectedModel: (model: 'openai' | 'gemini') => void;
  saveApiKey: () => void;
  apiKeyError: OpenAIErrorResponse | null;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKey,
  setApiKey,
  geminiApiKey,
  setGeminiApiKey,
  selectedModel,
  setSelectedModel,
  saveApiKey,
  apiKeyError,
}) => {
  return (
    <Card className="mb-4 border border-gray-200 animate-fade-in shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Info className="h-5 w-5 mr-2 text-finance-primary" />
          <h2 className="text-lg font-semibold text-finance-primary">
            Enter Your AI API Key
          </h2>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            Choose which AI provider you want to use:
          </p>
          <Select
            value={selectedModel}
            onValueChange={setSelectedModel as (value: string) => void}
          >
            <SelectTrigger className="w-full md:w-72 mb-4">
              <SelectValue placeholder="Select AI Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI (GPT)</SelectItem>
              <SelectItem value="gemini">Google Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {selectedModel === 'openai' ? (
          <div>
            <p className="text-gray-600 mb-4">
              To access expert financial AI advice via OpenAI, please enter your OpenAI API key. 
              This key will be stored locally in your browser.
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); saveApiKey(); }} className="flex space-x-2">
              <div className="relative flex-grow">
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
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
              <p>You can get an OpenAI API key from the <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noreferrer" className="text-finance-primary underline">OpenAI dashboard</a>.</p>
            </div>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;

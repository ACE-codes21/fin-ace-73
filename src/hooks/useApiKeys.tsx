
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface ApiKeys {
  openai: string;
  gemini: string;
  selectedModel: 'openai' | 'gemini';
  showApiKeyInput: boolean;
}

export const useApiKeys = () => {
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('openai_api_key') || '';
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return '';
    }
  });
  
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    try {
      return localStorage.getItem('gemini_api_key') || '';
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return '';
    }
  });
  
  const [showApiKeyInput, setShowApiKeyInput] = useState(() => {
    try {
      return !localStorage.getItem('openai_api_key') && !localStorage.getItem('gemini_api_key');
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return true;
    }
  });
  
  const [selectedModel, setSelectedModel] = useState<'openai' | 'gemini'>(() => {
    try {
      const storedModel = localStorage.getItem('ai_model');
      return (storedModel === 'openai' || storedModel === 'gemini') 
        ? storedModel 
        : 'openai';
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return 'openai';
    }
  });

  const { toast } = useToast();

  const saveApiKey = () => {
    if (selectedModel === 'openai') {
      if (!apiKey.trim()) {
        toast({
          title: "Error",
          description: "Please enter a valid OpenAI API key",
          variant: "destructive",
        });
        return false;
      }
      
      // Basic validation for OpenAI API key format
      if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
        toast({
          title: "Invalid API Key Format",
          description: "Please provide a valid OpenAI API key that starts with 'sk-'.",
          variant: "destructive",
        });
        return false;
      }

      try {
        localStorage.setItem('openai_api_key', apiKey);
        localStorage.setItem('ai_model', 'openai');
        setSelectedModel('openai');
        setShowApiKeyInput(false);
        toast({
          title: "API Key Saved",
          description: "Your OpenAI API key has been saved securely to your browser's local storage.",
        });
        return true;
      } catch (e) {
        console.error("Error saving to localStorage:", e);
        toast({
          title: "Error",
          description: "Could not save API key to local storage.",
          variant: "destructive",
        });
        return false;
      }
    } else {
      if (!geminiApiKey.trim()) {
        toast({
          title: "Error",
          description: "Please enter a valid Gemini API key",
          variant: "destructive",
        });
        return false;
      }

      try {
        localStorage.setItem('gemini_api_key', geminiApiKey);
        localStorage.setItem('ai_model', 'gemini');
        setSelectedModel('gemini');
        setShowApiKeyInput(false);
        toast({
          title: "API Key Saved",
          description: "Your Gemini API key has been saved securely to your browser's local storage.",
        });
        return true;
      } catch (e) {
        console.error("Error saving to localStorage:", e);
        toast({
          title: "Error",
          description: "Could not save API key to local storage.",
          variant: "destructive",
        });
        return false;
      }
    }
  };

  const clearApiKey = () => {
    try {
      localStorage.removeItem('openai_api_key');
      localStorage.removeItem('gemini_api_key');
      localStorage.removeItem('ai_model');
      setApiKey('');
      setGeminiApiKey('');
      setShowApiKeyInput(true);
      toast({
        title: "API Keys Removed",
        description: "Your API keys have been removed from local storage.",
      });
      return true;
    } catch (e) {
      console.error("Error removing from localStorage:", e);
      toast({
        title: "Error",
        description: "Could not remove API keys from local storage.",
        variant: "destructive",
      });
      return false;
    }
  };

  const switchAIProvider = () => {
    const newModel = selectedModel === 'openai' ? 'gemini' : 'openai';
    setSelectedModel(newModel);
    
    try {
      localStorage.setItem('ai_model', newModel);
      
      // Check if we need to show the API key input form
      if (newModel === 'openai' && !apiKey) {
        setShowApiKeyInput(true);
      } else if (newModel === 'gemini' && !geminiApiKey) {
        setShowApiKeyInput(true);
      }
      
      toast({
        title: `Switched to ${newModel === 'openai' ? 'OpenAI' : 'Gemini'} API`,
        description: `You are now using the ${newModel === 'openai' ? 'OpenAI' : 'Gemini'} AI provider.`,
      });
      
      return true;
    } catch (e) {
      console.error("Error saving model choice to localStorage:", e);
      return false;
    }
  };

  return {
    apiKey,
    setApiKey,
    geminiApiKey,
    setGeminiApiKey,
    selectedModel,
    setSelectedModel,
    showApiKeyInput,
    setShowApiKeyInput,
    saveApiKey,
    clearApiKey,
    switchAIProvider,
  };
};

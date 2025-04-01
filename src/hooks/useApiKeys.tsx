
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useApiKeys = () => {
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
      return !localStorage.getItem('gemini_api_key');
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return true;
    }
  });

  const { toast } = useToast();

  const saveApiKey = () => {
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
  };

  const clearApiKey = () => {
    try {
      localStorage.removeItem('gemini_api_key');
      setGeminiApiKey('');
      setShowApiKeyInput(true);
      toast({
        title: "API Key Cleared",
        description: "Your API key has been removed from local storage.",
      });
    } catch (e) {
      console.error("Error clearing localStorage:", e);
      toast({
        title: "Error",
        description: "Could not clear API key from local storage.",
        variant: "destructive",
      });
    }
  };

  return {
    geminiApiKey,
    setGeminiApiKey,
    showApiKeyInput,
    setShowApiKeyInput,
    saveApiKey,
    clearApiKey,
  };
};

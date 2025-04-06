
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateGeminiResponse } from '@/services/geminiService';
import { GeminiErrorResponse } from '@/types/chat';

export const useAIResponse = () => {
  const [isAITyping, setIsAITyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<GeminiErrorResponse | null>(null);
  
  const { toast } = useToast();

  const generateResponse = async (messageHistory: { role: string; content: string }[], files?: File[]) => {
    setIsAITyping(true);
    setErrorMessage(null);
    setApiKeyError(null);
    
    try {
      const response = await generateGeminiResponse(messageHistory, files);
      
      if (response.error) {
        console.error("Gemini API Error:", response.error);
        setApiKeyError(response.error);
        setErrorMessage(response.error.message);
        
        toast({
          title: "AI Service Error",
          description: "We're experiencing some issues with our AI service. Please try again later.",
          variant: "destructive",
        });
        
        if (response.error.code === 429) {
          setIsRateLimited(true);
          setTimeout(() => setIsRateLimited(false), 60000); // Reset after 1 minute
        }
        
        return null;
      }
      
      return response.text;
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMsg = error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(errorMsg);
      
      toast({
        title: "Error",
        description: "We're experiencing some issues. Please try again later.",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsAITyping(false);
    }
  };

  return {
    isAITyping,
    isRateLimited,
    errorMessage,
    apiKeyError,
    generateResponse,
  };
};

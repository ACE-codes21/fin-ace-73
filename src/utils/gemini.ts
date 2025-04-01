
import { Message } from "../pages/Chat";

interface GeminiErrorResponse {
  title: string;
  message: string;
  variant?: 'rate-limit' | 'auth' | 'general';
}

export const fetchGeminiResponse = async (
  apiKey: string,
  userInput: string,
  messageHistory: Message[]
): Promise<{ text: string; error: null } | { text: null; error: GeminiErrorResponse }> => {
  try {
    // Format messages for Gemini API
    const formattedMessages = messageHistory
      .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
    
    // Add the current user message
    formattedMessages.push({
      role: 'user',
      parts: [{ text: userInput }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 400) {
        return {
          text: null,
          error: {
            title: 'Invalid Request',
            message: 'The request to Gemini API was invalid. Please check your input.',
            variant: 'general'
          }
        };
      } else if (response.status === 401 || response.status === 403) {
        return {
          text: null,
          error: {
            title: 'Authentication Failed',
            message: 'Invalid Gemini API key. Please check your API key and try again.',
            variant: 'auth'
          }
        };
      } else if (response.status === 429) {
        return {
          text: null,
          error: {
            title: 'Rate Limit Exceeded',
            message: 'You have exceeded your Gemini API rate limit. Please try again later.',
            variant: 'rate-limit'
          }
        };
      } else {
        return {
          text: null,
          error: {
            title: 'API Error',
            message: `Error ${response.status}: ${response.statusText}`,
            variant: 'general'
          }
        };
      }
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
      return {
        text: data.candidates[0].content.parts[0].text,
        error: null
      };
    } else {
      return {
        text: null,
        error: {
          title: 'Response Format Error',
          message: 'Received an unexpected response format from Gemini API.',
          variant: 'general'
        }
      };
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      text: null,
      error: {
        title: 'Connection Error',
        message: error instanceof Error ? error.message : 'Failed to connect to Gemini API',
        variant: 'general'
      }
    };
  }
};

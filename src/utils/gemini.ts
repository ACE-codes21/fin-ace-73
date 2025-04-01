
import { Message } from "../pages/Chat";

interface GeminiErrorResponse {
  title: string;
  message: string;
  status?: number;
  variant?: 'rate-limit' | 'auth' | 'general';
}

export const fetchGeminiResponse = async (
  apiKey: string,
  userInput: string,
  messageHistory: Message[]
): Promise<{ text: string; error: null } | { text: null; error: GeminiErrorResponse }> => {
  try {
    // Validate API key
    if (!apiKey || apiKey.trim() === '') {
      return {
        text: null,
        error: {
          title: 'Missing API Key',
          message: 'Please provide a valid Google AI API key to continue.',
          variant: 'auth'
        }
      };
    }

    // Validate input
    if (!userInput || userInput.trim() === '') {
      return {
        text: null,
        error: {
          title: 'Empty Message',
          message: 'Please provide a message to generate a response.',
          variant: 'general'
        }
      };
    }

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

    // Get system message if it exists
    const systemMessage = messageHistory.find(msg => msg.sender === 'system');
    
    // Create the request payload
    const requestBody: any = {
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000
      }
    };

    // Add system message if present (as system instructions in Gemini API)
    if (systemMessage) {
      requestBody.systemInstruction = { 
        parts: [{ text: systemMessage.text }] 
      };
    }

    // Make the API request
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: { message: 'Unknown error occurred' } };
      }

      // Handle specific error cases
      if (response.status === 400) {
        return {
          text: null,
          error: {
            title: 'Invalid Request',
            message: errorData.error?.message || 'The request to Gemini API was invalid. Please check your input.',
            status: response.status,
            variant: 'general'
          }
        };
      } else if (response.status === 401 || response.status === 403) {
        return {
          text: null,
          error: {
            title: 'Authentication Failed',
            message: errorData.error?.message || 'Invalid Gemini API key. Please check your API key and try again.',
            status: response.status,
            variant: 'auth'
          }
        };
      } else if (response.status === 429) {
        return {
          text: null,
          error: {
            title: 'Rate Limit Exceeded',
            message: errorData.error?.message || 'You have exceeded your Gemini API rate limit. Please try again later.',
            status: response.status,
            variant: 'rate-limit'
          }
        };
      } else if (response.status === 404) {
        return {
          text: null,
          error: {
            title: 'API Resource Not Found',
            message: 'The requested API endpoint could not be found. Please check your API version or model availability.',
            status: response.status,
            variant: 'general'
          }
        };
      } else {
        return {
          text: null,
          error: {
            title: 'API Error',
            message: errorData.error?.message || `Error ${response.status}: ${response.statusText}`,
            status: response.status,
            variant: 'general'
          }
        };
      }
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts || !data.candidates[0].content.parts[0]?.text) {
      return {
        text: null,
        error: {
          title: 'Response Format Error',
          message: 'Received an unexpected response format from Gemini API.',
          variant: 'general'
        }
      };
    }

    return {
      text: data.candidates[0].content.parts[0].text,
      error: null
    };
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

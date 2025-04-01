
import { OpenAIErrorResponse } from './openai';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedbackSubmitted?: boolean;
}

interface GeminiResponse {
  text: string;
  error?: OpenAIErrorResponse;
}

export async function fetchGeminiResponse(
  apiKey: string,
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<GeminiResponse> {
  try {
    // Validate API key format before making request
    if (!apiKey || apiKey.length < 10) {
      return {
        text: '',
        error: {
          title: 'Invalid API Key Format',
          message: 'Please provide a valid Gemini API key.',
          variant: 'auth',
        },
      };
    }

    // Format conversation history
    const messages = conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    // Add the current message
    messages.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // Prepare the request body
    const body = {
      contents: [
        {
          role: 'system',
          parts: [{ 
            text: 'You are an expert financial advisor specializing in Indian financial markets. Provide detailed, accurate advice about investments, tax planning, and wealth management specifically for the Indian context. Include specific information about Indian financial products, regulations, and market conditions when relevant. Format your responses using markdown to emphasize important points, create sections with headers, and organize information with bullet points or numbered lists where appropriate. Be thorough but concise.'
          }],
        },
        ...messages
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topP: 0.95,
        topK: 40,
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);

      // Handle rate limiting errors
      if (response.status === 429) {
        return {
          text: '',
          error: {
            title: 'Rate Limit Exceeded',
            message: 'Google Gemini API rate limit exceeded. Please try again in a few minutes.',
            status: 429,
            variant: 'rate-limit',
          },
        };
      }

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        return {
          text: '',
          error: {
            title: 'Invalid API Key',
            message: 'Your Gemini API key is invalid or has expired. Please check and try again with a new key.',
            status: 401,
            variant: 'auth',
          },
        };
      }
      
      // Generic error
      return {
        text: '',
        error: {
          title: 'Connection Issue',
          message: errorData.error?.message || 'An error occurred while connecting to Gemini API. Please try again later.',
          status: response.status,
          variant: 'general',
        },
      };
    }

    const data = await response.json();
    
    // Check for content filtering or other blocking issues
    if (data.promptFeedback?.blockReason || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return {
        text: '',
        error: {
          title: 'Content Filtered',
          message: 'The Gemini API has filtered this content. Please try rephrasing your message.',
          variant: 'general',
        },
      };
    }

    return {
      text: data.candidates[0].content.parts[0].text,
    };
  } catch (error) {
    console.error('Error connecting to Gemini API:', error);
    return {
      text: '',
      error: {
        title: 'Connection Error',
        message: 'Could not connect to Gemini API. Please check your internet connection and try again.',
        variant: 'general',
      },
    };
  }
}


export interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenAIErrorResponse {
  title: string;
  message: string;
  status?: number;
  variant?: 'rate-limit' | 'auth' | 'general';
}

export const fetchOpenAIResponse = async (
  apiKey: string,
  messages: OpenAIMessage[]
): Promise<{ text: string; error: null } | { text: null; error: OpenAIErrorResponse }> => {
  try {
    // Validate API key
    if (!apiKey || apiKey.trim() === '') {
      return {
        text: null,
        error: {
          title: 'Missing API Key',
          message: 'Please provide a valid OpenAI API key to continue.',
          variant: 'auth'
        }
      };
    }

    // Validate messages
    if (!messages || messages.length === 0) {
      return {
        text: null,
        error: {
          title: 'No Messages Provided',
          message: 'Please provide at least one message to generate a response.',
          variant: 'general'
        }
      };
    }

    // Filter out system messages if needed (depending on the model used)
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // Handle non-OK response
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON
        errorData = { error: { message: 'Unknown error occurred' } };
      }

      // Handle specific error cases
      if (response.status === 401) {
        return {
          text: null,
          error: {
            title: 'Authentication Failed',
            message: 'Invalid API key. Please check your OpenAI API key and try again.',
            status: response.status,
            variant: 'auth'
          }
        };
      } else if (response.status === 429) {
        return {
          text: null,
          error: {
            title: 'Rate Limit Exceeded',
            message: errorData.error?.message || 'You have exceeded your OpenAI API rate limit. Please try again later or upgrade your plan.',
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

    // Parse successful response
    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return {
        text: null,
        error: {
          title: 'Invalid Response Format',
          message: 'The API response was successful but in an unexpected format.',
          variant: 'general'
        }
      };
    }

    return {
      text: data.choices[0].message.content,
      error: null
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      text: null,
      error: {
        title: 'Connection Error',
        message: error instanceof Error ? error.message : 'Failed to connect to OpenAI API',
        variant: 'general'
      }
    };
  }
};

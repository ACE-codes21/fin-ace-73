
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIErrorResponse {
  title?: string;
  message: string;
  status?: number;
  variant?: 'rate-limit' | 'auth' | 'general';
}

export interface OpenAIResponse {
  text: string;
  error?: OpenAIErrorResponse;
}

export async function fetchOpenAIResponse(
  apiKey: string,
  messages: OpenAIMessage[]
): Promise<OpenAIResponse> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);

      // Handle rate limiting errors
      if (response.status === 429) {
        console.info('Rate limit exceeded, status:', response.status);
        return {
          text: '',
          error: {
            title: 'Rate Limit Exceeded',
            message: 'You have sent too many requests. Please wait for 60 seconds before trying again.',
            status: 429,
            variant: 'rate-limit',
          },
        };
      }

      // Handle authentication errors
      if (response.status === 401) {
        return {
          text: '',
          error: {
            title: 'Invalid API Key',
            message: 'Your OpenAI API key is invalid. Please check and try again.',
            status: 401,
            variant: 'auth',
          },
        };
      }
      
      // Handle quota exceeded errors
      if (response.status === 429 && errorData.error?.type === 'insufficient_quota') {
        return {
          text: '',
          error: {
            title: 'API Quota Exceeded',
            message: 'Your OpenAI API quota has been exceeded. Please check your billing details.',
            status: 429,
            variant: 'rate-limit',
          },
        };
      }

      // Generic error
      return {
        text: '',
        error: {
          title: 'API Error',
          message: errorData.error?.message || 'An error occurred while connecting to OpenAI',
          status: response.status,
          variant: 'general',
        },
      };
    }

    const data = await response.json();
    return {
      text: data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error connecting to OpenAI:', error);
    return {
      text: '',
      error: {
        title: 'Connection Error',
        message: 'Could not connect to OpenAI. Please check your internet connection and try again.',
        variant: 'general',
      },
    };
  }
}

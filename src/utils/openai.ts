
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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

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
    return {
      text: data.choices[0].message.content,
      error: null
    };
  } catch (error) {
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


export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  text: string;
  error?: {
    status?: number;
    message: string;
  };
}

export const fetchOpenAIResponse = async (
  apiKey: string,
  messages: OpenAIMessage[]
): Promise<OpenAIResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    // Handle API errors
    if (!response.ok) {
      const status = response.status;
      
      if (status === 429 || status === 403) {
        return {
          text: "I'm currently experiencing high demand. Please verify your OpenAI API key or wait before trying again.",
          error: {
            status,
            message: "Your API key has reached its usage limit. Please check your account or try a different key."
          }
        };
      }
      
      if (status === 401) {
        return {
          text: "Authentication failed. Please verify your API key.",
          error: {
            status,
            message: "Invalid API key. Please check and re-enter your OpenAI API key."
          }
        };
      }
      
      return {
        text: `Connection error. Status: ${status}. Please try again later.`,
        error: {
          status,
          message: `Error ${status}: ${response.statusText}`
        }
      };
    }

    const data = await response.json();
    return { text: data.choices[0].message.content };
  } catch (error) {
    console.error('Error in OpenAI API request:', error);
    return {
      text: "An unexpected error occurred. Please try again later.",
      error: {
        message: error instanceof Error ? error.message : "Unknown error"
      }
    };
  }
};


export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  text: string;
  error?: {
    status?: number;
    message: string;
    title?: string;
    variant?: 'rate-limit' | 'auth' | 'general';
  };
}

export const fetchOpenAIResponse = async (
  apiKey: string,
  messages: OpenAIMessage[]
): Promise<OpenAIResponse> => {
  try {
    if (!apiKey || apiKey.trim() === '') {
      return {
        text: "Please provide a valid OpenAI API key.",
        error: {
          title: "API Key Missing",
          message: "You need to provide an OpenAI API key to continue.",
          variant: "auth"
        }
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    // Handle API errors
    if (!response.ok) {
      const status = response.status;
      
      if (status === 429 || status === 403) {
        console.log("Rate limit exceeded, status:", status);
        return {
          text: "I'm currently experiencing high demand. Please wait a minute before sending another message.",
          error: {
            status,
            title: "Rate Limit Exceeded",
            message: "You've reached OpenAI's rate limit. Please wait about a minute before trying again or check your plan limits.",
            variant: "rate-limit"
          }
        };
      }
      
      if (status === 401) {
        console.log("Authentication failed, status:", status);
        return {
          text: "Authentication failed. Please verify your API key.",
          error: {
            status,
            title: "API Key Invalid",
            message: "Your OpenAI API key appears to be invalid or expired. Please check and re-enter your key.",
            variant: "auth"
          }
        };
      }
      
      console.log("General API error, status:", status);
      return {
        text: `Connection error. Status: ${status}. Please try again later.`,
        error: {
          status,
          title: "Connection Error",
          message: `Error ${status}: ${response.statusText}. Please try again in a moment.`,
          variant: "general"
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
        message: error instanceof Error ? error.message : "Unknown error",
        title: "Unexpected Error",
        variant: "general"
      }
    };
  }
};

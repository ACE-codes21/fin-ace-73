
export interface OpenAIErrorResponse {
  error: boolean;
  message: string;
  status?: number;
  type?: string;
}

interface OpenAIMessage {
  role: string;
  content: string;
}

interface OpenAIResponse {
  message?: string;
  error?: OpenAIErrorResponse;
}

export async function callOpenAI({
  apiKey,
  messages,
  model = "gpt-3.5-turbo",
  temperature = 0.7,
  max_tokens = 500,
}: {
  apiKey: string;
  messages: OpenAIMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}): Promise<OpenAIResponse> {
  try {
    const systemPrompt = {
      role: "system",
      content: "You are FinAce, an AI financial advisor specialized in Indian markets. Provide thorough, accurate financial advice for Indian investors, considering Indian tax laws, regulations, and available investment options."
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [systemPrompt, ...messages],
        temperature,
        max_tokens,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: {
          error: true,
          message: errorData.error?.message || "Error calling OpenAI API",
          status: response.status,
          type: errorData.error?.type
        }
      };
    }

    const data = await response.json();
    return { message: data.choices[0].message.content };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return {
      error: {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error calling OpenAI API",
        status: 500
      }
    };
  }
}

export function isOpenAIError(error: any): error is OpenAIErrorResponse {
  return error && typeof error === "object" && "error" in error && error.error === true;
}

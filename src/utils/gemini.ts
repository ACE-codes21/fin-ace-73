
export interface GeminiErrorResponse {
  error: boolean;
  message: string;
  status?: number;
}

export interface GeminiResponse {
  text?: string;
  error?: GeminiErrorResponse;
}

export async function generateGeminiResponse(
  apiKey: string,
  prompt: string
): Promise<GeminiResponse> {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user", 
              parts: [
                { 
                  text: `You are a financial advisor specialized in Indian markets. Your name is FinAce, an AI financial assistant. Use your expertise to provide thorough, accurate, and personalized financial advice for Indian investors. Explain investment concepts clearly, analyze market trends relevant to India, and give tailored guidance based on the query. Always consider Indian tax laws, regulations, and investment options in your responses. Be conversational but professional. Here's the user's question: ${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: {
          error: true,
          message: errorData.error?.message || "Error calling Gemini API",
          status: response.status,
        },
      };
    }

    const data = await response.json();
    
    if (data.error) {
      return {
        error: {
          error: true,
          message: data.error.message || "Error from Gemini API",
          status: 500,
        },
      };
    }

    // Extract the response text from the Gemini API response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      text: generatedText,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      error: {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error calling Gemini API",
        status: 500,
      },
    };
  }
}

export function isGeminiError(error: any): error is GeminiErrorResponse {
  return error && typeof error === "object" && "error" in error && error.error === true;
}

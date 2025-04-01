
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
  messages: { role: string; content: string }[]
): Promise<GeminiResponse> {
  try {
    // Extract the user's current question (last message)
    const userQuestion = messages.filter(msg => msg.role === 'user').pop()?.content || '';
    
    // Include chat history context for better continuity
    const chatContext = messages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n\n')
      .slice(-5000); // Limit context to avoid token limits
    
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
                  text: `You are an expert financial advisor AI assistant specializing in Indian markets. Your role is to provide personalized, accurate financial guidance while following these key principles:

1. Always begin by understanding the user's situation:
- Financial goals
- Risk tolerance
- Current finances
- Time horizon
- Specific concerns

2. Provide clear, jargon-free explanations:
- Use simple language
- Be transparent about risks and rewards
- Offer alternatives when appropriate

3. Structure responses clearly:
- Start with a brief overview
- Follow with detailed reasoning
- End with key takeaways

4. Focus on:
- Investment guidance
- Retirement planning
- Tax optimization
- Risk management

5. Maintain a professional yet approachable tone:
- Be empathetic and supportive
- Encourage learning
- Ask relevant follow-up questions

6. Always consider Indian market context:
- Local regulations
- Available investment options
- Tax implications
- Market conditions

Previous conversation context:
${chatContext}

Current question: ${userQuestion}

Remember to:
- Give personalized advice based on the user's situation
- Explain concepts simply
- Be transparent about risks
- Ask follow-up questions to better understand the user's needs`
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

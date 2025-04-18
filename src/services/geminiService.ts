
import { GeminiErrorResponse, GeminiResponse } from '@/types/chat';
import { DocumentService, FileInfo } from '@/services/DocumentService';

// Server-side API key for production use
const SERVER_API_KEY = "AIzaSyDYH3gyvcbAu1qwuF2TG1NV-IGBc_3W58w";

export async function generateGeminiResponse(
  messages: { role: string; content: string }[],
  files?: File[]
): Promise<GeminiResponse> {
  try {
    // Extract the user's current question (last message)
    const userQuestion = messages.filter(msg => msg.role === 'user').pop()?.content || '';
    
    // Include minimal chat history context for better continuity
    const chatContext = messages
      .slice(-4) // Use just the last few messages for context
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n\n');
    
    let requestBody: any = {
      contents: [
        {
          role: "user", 
          parts: [
            { 
              text: `You are a financial advisor AI assistant specializing in Indian markets. Provide balanced, practical financial guidance following these principles:

1. Give complete and well-rounded responses - not too short, not too long.
2. Provide enough detail to fully address the question without being overwhelming.
3. Include context and explanation where helpful to understanding.
4. Use clear structure with paragraphs and bullet points when appropriate.
5. Focus on actionable advice rather than theory.
6. Use simple language that non-experts can understand.
7. Consider Indian market context and regulations in your answers.
8. Respond in the same language as the user's query.

Previous conversation:
${chatContext}

Current question: ${userQuestion}

Remember:
- Provide comprehensive but focused answers
- Balance detail with clarity
- Be practical and user-friendly
- Use the same language as the user's query`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.75,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048, // Increased to allow for more complete responses
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
    };

    // Handle file attachments if present
    if (files && files.length > 0) {
      // Process document content to include in the prompt
      const formattedFiles = await formatFilesForPrompt(files);
      if (formattedFiles) {
        // Add file content to the prompt
        requestBody.contents[0].parts[0].text += `\n\nAnalyze the following documents:\n${formattedFiles}`;
      }
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": SERVER_API_KEY,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: {
          code: errorData.error?.code || 500,
          message: errorData.error?.message || "Error calling Gemini API",
          status: errorData.error?.status || "ERROR",
        },
      };
    }

    const data = await response.json();
    
    if (data.error) {
      return {
        error: {
          code: data.error.code || 500,
          message: data.error.message || "Error from Gemini API",
          status: data.error.status || "ERROR",
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
        code: 500,
        message: error instanceof Error ? error.message : "Unknown error calling Gemini API",
        status: "ERROR",
      },
    };
  }
}

async function formatFilesForPrompt(files: File[]): Promise<string | null> {
  try {
    // Use the DocumentService to extract text content
    const processedFiles = await DocumentService.processFiles(files);
    return DocumentService.formatFileContentForAI(processedFiles);
  } catch (error) {
    console.error("Error processing files for prompt:", error);
    return null;
  }
}

export function isGeminiError(error: any): error is GeminiErrorResponse {
  return error && typeof error === "object" && "error" in error && error.error === true;
}


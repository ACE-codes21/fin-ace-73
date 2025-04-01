
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedbackSubmitted?: boolean;
}

export interface GeminiErrorResponse {
  error: boolean;
  message: string;
  status?: number;
}

export interface GeminiResponse {
  text?: string;
  error?: GeminiErrorResponse;
}

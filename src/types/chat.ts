
export interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  feedbackSubmitted: boolean;
}

export interface MessageFeedback {
  messageId: number;
  rating: number;
  feedback: string;
  timestamp: Date;
}

export interface GeminiErrorResponse {
  code: number;
  message: string;
  status: string;
}

export interface GeminiResponse {
  text?: string;
  error?: GeminiErrorResponse;
}

export interface FileInfo extends File {
  id: string;
  content: string | ArrayBuffer;
}

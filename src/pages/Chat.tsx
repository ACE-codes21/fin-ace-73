
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import ApiKeyInput from '@/components/chat/ApiKeyInput';
import ChatInput from '@/components/chat/ChatInput';
import ChatContainer from '@/components/chat/ChatContainer';
import { ChatError } from '@/components/chat/ChatError';
import { SecurityInfo } from '@/components/chat/SecurityInfo';
import ErrorBoundary from '@/components/chat/ErrorBoundary';
import { Message, GeminiErrorResponse } from '@/types/chat';
import Layout from '@/components/layout/Layout';
import Chat3DBackground from '@/components/effects/Chat3DBackground';
import { DocumentService, FileInfo } from '@/services/DocumentService';

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState<GeminiErrorResponse | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setGeminiApiKey(savedApiKey);
    }
  }, []);

  // Auto-scroll when new messages are added
  useEffect(() => {
    if (autoScrollEnabled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScrollEnabled]);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScrollEnabled(atBottom);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveApiKey = () => {
    if (geminiApiKey.trim()) {
      localStorage.setItem('gemini_api_key', geminiApiKey);
      setApiKeyError(null);
      toast({
        title: "API Key Saved",
        description: "Your API key has been saved to your browser's local storage."
      });
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key.",
        variant: "destructive"
      });
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if ((!inputMessage.trim() && uploadedFiles.length === 0) || isAITyping) return;
    
    if (!geminiApiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your Gemini API key first.",
        variant: "destructive"
      });
      return;
    }

    // Prepare file content information
    let fileContent = "";
    if (uploadedFiles.length > 0) {
      fileContent = DocumentService.formatFileContentForAI(uploadedFiles);
    }

    // Create user message
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage + (fileContent ? `\n\n${fileContent}` : ''),
      timestamp: new Date(),
      feedbackSubmitted: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAITyping(true);
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are FinAce, an AI financial advisor specialized in the Indian market. Please provide concise, clear, and actionable advice. Focus on being specific and practical rather than verbose.

${fileContent ? 'I have uploaded some financial documents that you should analyze before responding. Here are the contents:\n\n' + fileContent + '\n\nBased on this information and your knowledge, please provide your analysis.' : ''}

${inputMessage}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
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
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        handleApiError(data.error);
        return;
      }
      
      if (data.candidates && data.candidates[0].content) {
        const aiResponseText = data.candidates[0].content.parts[0].text;
        const aiMessage: Message = {
          id: Date.now(),
          sender: 'ai',
          text: aiResponseText,
          timestamp: new Date(),
          feedbackSubmitted: false
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive"
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now(),
        sender: 'ai',
        text: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        feedbackSubmitted: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAITyping(false);
      // Clear uploaded files after sending
      setUploadedFiles([]);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
    
    try {
      const processedFiles = await DocumentService.processFiles(files);
      setUploadedFiles(processedFiles);
      
      toast({
        title: "Files Added",
        description: `${files.length} file(s) ready to be sent with your message.`
      });
    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: "Error",
        description: "Failed to process uploaded files.",
        variant: "destructive"
      });
    }
  };

  const handleApiError = (error: GeminiErrorResponse) => {
    setApiKeyError(error);
    console.error('Gemini API Error:', error);
    
    if (error.code === 429) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 60000); // Reset after 1 minute
    }
    
    // Add error message to chat
    const errorMessage: Message = {
      id: Date.now(),
      sender: 'ai',
      text: `Error: ${error.message || "Something went wrong with the AI service. Please try again."}`,
      timestamp: new Date(),
      feedbackSubmitted: false
    };
    
    setMessages(prev => [...prev, errorMessage]);
  };

  const handleFeedbackSubmit = (rating: number, feedback: string, messageId: number) => {
    // Update the message to mark feedback as submitted
    setMessages(prev => prev.map(message => 
      message.id === messageId 
        ? { ...message, feedbackSubmitted: true } 
        : message
    ));
    
    // In a real app, you would send this feedback to a backend
    console.log(`Feedback for message ${messageId}: ${rating}/5 - ${feedback}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 relative">
        <Chat3DBackground />
        
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold gradient-text mb-2">FinAce AI Chat Assistant</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ask questions about investing in Indian markets, financial planning, or analyze your financial documents.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ErrorBoundary>
                {!geminiApiKey && (
                  <ApiKeyInput
                    geminiApiKey={geminiApiKey}
                    setGeminiApiKey={setGeminiApiKey}
                    saveApiKey={saveApiKey}
                    apiKeyError={apiKeyError}
                  />
                )}
                
                {apiKeyError && apiKeyError.code !== 429 && (
                  <ChatError
                    title={`API Error (${apiKeyError.code})`}
                    description={apiKeyError.message}
                    variant="auth"
                  />
                )}
                
                {isRateLimited && (
                  <ChatError
                    title="Rate Limit Exceeded"
                    description="You've reached the request limit. Please wait a moment before trying again."
                    variant="rate-limit"
                  />
                )}
                
                <ChatContainer
                  messages={messages}
                  isAITyping={isAITyping}
                  chatContainerRef={chatContainerRef}
                  messagesEndRef={messagesEndRef}
                  handleScroll={handleScroll}
                  onFeedbackSubmit={handleFeedbackSubmit}
                />
                
                <ChatInput
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleSendMessage={handleSendMessage}
                  isAITyping={isAITyping}
                  isRateLimited={isRateLimited}
                  handleKeyDown={handleKeyDown}
                  onFileUpload={handleFileUpload}
                  uploadedFiles={uploadedFiles}
                  removeFile={(index) => {
                    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                  }}
                />
              </ErrorBoundary>
            </div>
            
            <div className="md:col-span-1">
              <SecurityInfo />
              {/* Add more sidebar components here */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

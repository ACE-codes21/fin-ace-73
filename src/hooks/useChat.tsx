
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const useChat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your FinAce AI financial advisor. How can I help you with investment or financial planning in Indian markets today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isAITyping, setIsAITyping] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (userMessage: string = inputMessage) => {
    if (userMessage.trim() === '') return { success: false };
    
    // Record user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsAITyping(true);
    
    try {
      // Simulate AI response after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample responses to common financial questions
      const responses = [
        "Based on current market trends in India, diversifying your portfolio across different asset classes would be advisable.",
        "For tax planning in India, you might want to consider investments under Section 80C of the Income Tax Act.",
        "The Indian mutual fund market offers several SIP options that could align with your risk profile.",
        "Recent RBI policies suggest that interest rates may continue to fluctuate. Consider this when planning fixed deposits.",
        "For retirement planning in India, a combination of EPF, PPF, and NPS could provide a balanced approach.",
      ];
      
      // Select a random response
      const aiResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      return { success: true };
      
    } catch (error) {
      console.error('Error in AI response:', error);
      
      toast({
        title: "AI Response Error",
        description: "Could not generate an AI response. Please try again later.",
        variant: "destructive",
      });
      
      return { success: false };
    } finally {
      setIsAITyping(false);
    }
  };

  const handleFeedbackSubmit = (rating: number, feedback: string, messageId: number) => {
    // Simple feedback logging
    console.log("Feedback submitted:", { messageId, rating, feedback });
    
    // Mark message as having feedback submitted
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, feedbackSubmitted: true } : msg
      )
    );
    
    // Show toast confirmation
    toast({
      title: "Feedback Received",
      description: "Thank you for your feedback!",
    });
  };

  return {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isAITyping,
    sendMessage,
    handleFeedbackSubmit,
  };
};

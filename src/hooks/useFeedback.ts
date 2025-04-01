
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useFeedback = () => {
  const { toast } = useToast();

  const handleFeedbackSubmit = (rating: number, feedback: string, messageId: number, updateMessageCallback: (id: number) => void) => {
    // Update message to mark feedback as submitted
    updateMessageCallback(messageId);
    
    toast({
      title: "Thank you for your feedback!",
      description: rating > 3 ? "We're glad you found this response helpful." : "We'll work on improving our responses.",
    });
    
    // In a real application, you would send this feedback to a server
    console.log(`Feedback submitted for message ${messageId}: Rating ${rating}, Feedback: "${feedback}"`);
  };

  return { handleFeedbackSubmit };
};

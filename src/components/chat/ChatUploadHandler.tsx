
import React from 'react';
import { useToast } from "@/hooks/use-toast";

interface ChatUploadHandlerProps {
  setFileUploads: (files: File[]) => void;
}

const ChatUploadHandler = ({ setFileUploads }: ChatUploadHandlerProps) => {
  const { toast } = useToast();

  const handleFileUpload = (files: File[]) => {
    if (!files || files.length === 0) return;
    
    try {
      setFileUploads(files);
      
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

  return { handleFileUpload };
};

export default ChatUploadHandler;

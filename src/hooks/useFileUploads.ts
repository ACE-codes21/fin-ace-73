
import { useState } from 'react';

export const useFileUploads = () => {
  const [fileUploads, setFileUploads] = useState<File[]>([]);

  const addFiles = (files: File[]) => {
    setFileUploads(files);
  };

  const clearFiles = () => {
    setFileUploads([]);
  };

  const removeFile = (index: number) => {
    setFileUploads(prev => prev.filter((_, i) => i !== index));
  };

  return {
    fileUploads,
    addFiles,
    clearFiles,
    removeFile
  };
};

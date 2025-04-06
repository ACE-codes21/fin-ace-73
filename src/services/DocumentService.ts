
import { Message } from "@/types/chat";

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string | ArrayBuffer;
}

export class DocumentService {
  // Process uploaded files and prepare them for the AI
  static async processFiles(files: File[]): Promise<FileInfo[]> {
    const filePromises = Array.from(files).map(async (file) => {
      const fileInfo: FileInfo = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        content: ""
      };

      // Read file content based on file type
      if (file.type.includes("text") || 
          file.type.includes("application/pdf") || 
          file.type.includes("application/json") ||
          file.name.endsWith(".csv") ||
          file.name.endsWith(".xls") ||
          file.name.endsWith(".xlsx")) {
        fileInfo.content = await this.readTextFile(file);
      } else if (file.type.includes("image")) {
        fileInfo.content = await this.readBinaryFile(file);
      } else {
        // Default to binary for other types
        fileInfo.content = await this.readBinaryFile(file);
      }

      return fileInfo;
    });

    return Promise.all(filePromises);
  }

  // Extract text content from uploaded files
  static async readTextFile(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string || "");
      };
      reader.readAsText(file);
    });
  }

  // Read binary files (images, etc)
  static async readBinaryFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as ArrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // Format file content for the AI prompt
  static formatFileContentForAI(files: FileInfo[]): string {
    return files.map(file => {
      if (typeof file.content === 'string') {
        return `Document: ${file.name}\nContent: ${file.content}\n\n`;
      } else {
        return `[Binary file: ${file.name} (${file.type}, ${file.size} bytes)]\n`;
      }
    }).join('\n');
  }
}

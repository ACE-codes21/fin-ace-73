
import { Shield, LockKeyhole, Eye, Server } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SecurityInfo = () => {
  return (
    <div className="border rounded-lg bg-gray-50 shadow-sm p-4">
      <div className="flex items-center mb-4">
        <Shield className="h-5 w-5 mr-2 text-finance-primary" />
        <h3 className="text-lg font-semibold text-finance-primary">Security & Privacy</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="local-storage">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <div className="flex items-center">
              <LockKeyhole className="h-4 w-4 mr-2 text-finance-secondary" />
              Local Storage Security
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600">
            Your API key is stored locally in your browser and never transmitted to our servers. 
            It's only used to make direct requests to OpenAI from your browser.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="data-privacy">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-finance-secondary" />
              Data Privacy
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600">
            We don't store your conversations or financial information. All data exchanged with 
            the AI remains between your browser and OpenAI's servers.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compliance">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <div className="flex items-center">
              <Server className="h-4 w-4 mr-2 text-finance-secondary" />
              Compliance & Best Practices
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600">
            Our application follows industry best practices for web security. We use HTTPS for all 
            connections and implement proper authentication for any sensitive operations.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

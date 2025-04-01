
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Shield, LockKeyhole, Eye, Server } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SecurityInfo = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Shield className="h-8 w-8 mr-3 text-finance-primary" />
            <h1 className="text-3xl font-bold text-finance-primary">Security & Privacy</h1>
          </div>
          
          <Card className="mb-8 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Our Commitment to Your Privacy</CardTitle>
              <CardDescription>
                At FinAce, we prioritize the security and privacy of your information. Our platform 
                is designed with security best practices and user privacy as core principles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-full max-h-[800px] overflow-auto pr-4">
                <div className="space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="local-storage" className="border-b border-gray-200">
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex items-center">
                          <LockKeyhole className="h-5 w-5 mr-3 text-finance-secondary flex-shrink-0" />
                          <span className="text-lg font-medium">Local Storage Security</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 py-3 px-2">
                        <p className="mb-3">
                          Your API key is stored locally in your browser's local storage and is never transmitted to our servers. 
                          This approach ensures that:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                          <li>We never have access to your API credentials</li>
                          <li>Your requests go directly from your browser to OpenAI's servers</li>
                          <li>Your API key is isolated to your device and browser</li>
                          <li>If you clear your browser data, your API key will be removed</li>
                        </ul>
                        <p className="mt-3">
                          While local storage is separate from cookies, it's still recommended to only use this application 
                          on trusted devices and to clear your browser data when using shared computers.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="data-privacy" className="border-b border-gray-200">
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex items-center">
                          <Eye className="h-5 w-5 mr-3 text-finance-secondary flex-shrink-0" />
                          <span className="text-lg font-medium">Data Privacy</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 py-3 px-2">
                        <p className="mb-3">
                          We've designed our application to maximize your privacy:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                          <li>No server-side storage of your conversations</li>
                          <li>No tracking of your financial information or questions</li>
                          <li>All data exchanged with the AI remains between your browser and OpenAI's servers</li>
                          <li>Minimal analytics that don't identify individual users or their queries</li>
                        </ul>
                        <p className="mt-3">
                          For information about how OpenAI handles data sent through their API, please refer to 
                          <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-finance-primary hover:underline ml-1">
                            OpenAI's Privacy Policy
                          </a>.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="compliance" className="border-b border-gray-200">
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex items-center">
                          <Server className="h-5 w-5 mr-3 text-finance-secondary flex-shrink-0" />
                          <span className="text-lg font-medium">Compliance & Best Practices</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 py-3 px-2">
                        <p className="mb-3">
                          Our application adheres to industry standards for web security:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                          <li>HTTPS encryption for all connections</li>
                          <li>Regular security audits and updates</li>
                          <li>Content Security Policy (CSP) implementation</li>
                          <li>Protection against common web vulnerabilities (XSS, CSRF)</li>
                          <li>Regular code reviews with security in mind</li>
                        </ul>
                        <p className="mt-3">
                          We continuously monitor security standards and update our practices to maintain 
                          the highest level of protection for our users.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                    <h3 className="text-lg font-medium text-amber-800 mb-2 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Financial Information Security
                    </h3>
                    <p className="text-amber-700">
                      While our AI advisor provides financial guidance, we recommend exercising caution when discussing 
                      specific personal financial details. For personalized financial advice, consider consulting with 
                      a registered financial advisor.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityInfo;

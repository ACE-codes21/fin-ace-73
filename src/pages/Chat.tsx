
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// This would normally come from your backend or API
const getAIResponse = (message: string) => {
  // For demo purposes, we'll return predefined responses based on keywords
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('mutual fund') || lowerMessage.includes('funds')) {
    return "Mutual funds are a popular investment option in India. They pool money from multiple investors to invest in stocks, bonds, or other assets. For beginners, index funds like those tracking Nifty 50 or Sensex are good starting points with lower fees. Look for funds with consistent performance over 5+ years and reasonable expense ratios.";
  } else if (lowerMessage.includes('stock') || lowerMessage.includes('shares')) {
    return "When investing in Indian stocks, consider starting with blue-chip companies listed on NSE or BSE. Diversify across sectors like IT, banking, consumer goods, and pharmaceuticals. Research companies' financial health, management quality, and growth prospects before investing. For beginners, systematic investment through SIPs might be less risky than lump-sum investments.";
  } else if (lowerMessage.includes('crypto') || lowerMessage.includes('bitcoin')) {
    return "Cryptocurrency investments in India exist in a regulatory gray area. While not illegal, they come with significant risks including high volatility and potential regulatory changes. If considering crypto, only invest what you can afford to lose, and consider it as a small portion (5% or less) of your overall portfolio. Make sure to use reputable exchanges that follow KYC procedures.";
  } else if (lowerMessage.includes('tax') || lowerMessage.includes('taxes')) {
    return "In India, different investments have different tax implications. Equity investments held for over a year have LTCG tax of 10% for gains above ₹1 lakh. Debt mutual funds are now taxed at your income tax slab rate regardless of holding period. ELSS funds offer tax deductions under Section 80C up to ₹1.5 lakh. Consider consulting a tax advisor for your specific situation.";
  } else if (lowerMessage.includes('retirement') || lowerMessage.includes('pension')) {
    return "For retirement planning in India, consider a mix of EPF/PPF, NPS, and equity mutual funds. The National Pension System (NPS) offers tax benefits and portfolio diversification. Aim to save at least 15% of your income for retirement. Your retirement corpus should ideally be 25-30 times your annual expenses at retirement age.";
  } else {
    return "Thanks for your question about Indian financial markets. To provide you with more accurate guidance, could you specify which investment type you're interested in learning about? I can help with mutual funds, stocks, tax planning, retirement planning, or general investment strategies tailored to Indian markets.";
  }
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI financial assistant. How can I help you with your investment or financial planning questions today? I'm specialized in Indian financial markets.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isAITyping, setIsAITyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsAITyping(true);
    
    // Simulate AI response with delay for natural feeling
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsAITyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Finance AI Assistant</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5 text-finance-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>Ask me anything about investments, financial planning, or the Indian financial market. I can help with mutual funds, stocks, tax planning, and more.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Card className="mb-4 border border-gray-200">
            <CardContent className="p-0">
              <div className="h-[600px] overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-finance-primary ml-2' 
                          : 'bg-finance-accent mr-2'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-finance-primary text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-finance-primary-foreground/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isAITyping && (
                  <div className="flex mb-4 justify-start">
                    <div className="flex">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-finance-accent mr-2">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me about investing in the Indian market..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow input-field"
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-finance-primary hover:bg-finance-primary/90"
              disabled={inputMessage.trim() === '' || isAITyping}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

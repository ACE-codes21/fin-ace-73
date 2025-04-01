
import React from 'react';
import Layout from '../components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is FinAce?",
      answer: "FinAce is an AI-powered financial guidance platform that helps you make smarter investment decisions. Our platform provides personalized financial forecasting, risk assessment, investment suggestions, and an AI finance chat to answer your specific questions."
    },
    {
      question: "How does the AI Finance Chat work?",
      answer: "Our AI Finance Chat uses advanced natural language processing to understand your financial questions and provide tailored answers. It can explain financial concepts, provide investment insights, help with budgeting decisions, and offer general financial education. The AI is continuously learning and improving to provide more accurate and helpful responses."
    },
    {
      question: "Is my financial data secure with FinAce?",
      answer: "Yes, security is our top priority. We use enterprise-grade encryption and secure protocols to protect your data. We never share your personal financial information with third parties without your explicit consent. Our platform is designed with privacy at its core, and we comply with all relevant financial data protection regulations."
    },
    {
      question: "How accurate are the financial forecasts?",
      answer: "Our financial forecasting tools use advanced algorithms and historical data to provide projections. While no forecast can predict the future with 100% accuracy, our models incorporate multiple variables and scenarios to give you a range of potential outcomes. We continuously refine our models based on new data and market conditions to improve accuracy over time."
    },
    {
      question: "What investment assets does FinAce provide suggestions for?",
      answer: "FinAce provides investment suggestions across various asset classes including stocks, bonds, ETFs, mutual funds, and alternative investments. Our recommendations are based on your risk profile, financial goals, time horizon, and current market conditions."
    },
    {
      question: "How is my risk tolerance assessed?",
      answer: "Our risk assessment tool uses a comprehensive questionnaire that evaluates your financial situation, investment timeline, financial goals, and psychological comfort with different types of market volatility. This multi-dimensional approach helps us understand not just your capacity for risk, but also your willingness to take on risk."
    },
    {
      question: "Can FinAce help me with retirement planning?",
      answer: "Yes, FinAce provides tools and guidance for retirement planning. Our platform can help you determine how much you need to save, suggest appropriate investment allocations based on your age and retirement timeline, and provide projections of potential retirement income scenarios."
    },
    {
      question: "Is FinAce suitable for beginners in investing?",
      answer: "Absolutely! FinAce is designed to be accessible for investors of all experience levels. For beginners, we provide educational resources, simplified explanations, and beginner-friendly investment suggestions. Our AI chat can also answer basic questions and help you understand fundamental concepts."
    },
    {
      question: "How often are investment suggestions updated?",
      answer: "Our investment suggestions are updated regularly based on changing market conditions, new data, and evolving investment opportunities. While we provide real-time market data, our core investment suggestions are designed for long-term strategies and aren't meant to encourage frequent trading."
    },
    {
      question: "Does FinAce offer human financial advisory services?",
      answer: "Currently, FinAce is focused on providing AI-powered guidance. While our platform doesn't include human financial advisors, our sophisticated AI tools are designed to provide personalized, high-quality financial guidance. For specific legal, tax, or complex financial planning needs, we recommend consulting with qualified professionals."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-10 max-w-3xl">
          Find answers to common questions about FinAce, our services, and how we can help you achieve your financial goals.
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="mb-10">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-finance-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-finance-primary/5 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our AI assistant can answer your specific questions in real-time or you can contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/chat" 
                className="bg-finance-primary text-white px-6 py-3 rounded-md hover:bg-finance-primary/90 transition-colors"
              >
                Chat with AI Assistant
              </a>
              <a 
                href="mailto:support@finace.example.com" 
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;

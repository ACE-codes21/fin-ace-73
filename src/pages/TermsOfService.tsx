
import React from 'react';
import Layout from '../components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const TermsOfService = () => {
  // Get current date in format like "June 15, 2024"
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-6">
            Last Updated: {currentDate}
          </p>
          
          <div className="prose prose-gray max-w-none">
            <p>
              Welcome to FinAce. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using the FinAce platform, you agree to comply with and be bound by these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using FinAce, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Services</h2>
            <p className="mb-4">
              FinAce provides AI-powered financial guidance services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Financial forecasting and analysis</li>
              <li>Risk assessment tools</li>
              <li>Investment suggestions</li>
              <li>AI-powered financial chat assistance</li>
            </ul>
            <p>
              Our services are provided for informational and educational purposes only and should not be construed as professional financial advice, investment recommendations, or tax advice.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To access certain features of the platform, you may be required to create an account. When creating an account, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide accurate, current, and complete information.</li>
              <li>Maintain and promptly update your account information.</li>
              <li>Keep your password secure and confidential.</li>
              <li>Be solely responsible for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Responsibilities and Conduct</h2>
            <p className="mb-4">
              When using FinAce, you agree not to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Violate any applicable laws or regulations.</li>
              <li>Infringe on the rights of others, including intellectual property rights.</li>
              <li>Use the platform for any illegal or unauthorized purpose.</li>
              <li>Interfere with or disrupt the operation of the platform.</li>
              <li>Attempt to gain unauthorized access to any portion of the platform.</li>
              <li>Use any automated system, software, or process to access, extract, or download content from the platform.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Disclaimer of Financial Advice</h2>
            <p>
              FinAce does not provide personal financial planning, tax, or investment advice. The information provided through our platform is for informational and educational purposes only. FinAce is not a registered investment advisor, broker-dealer, or tax advisor. You should consult with qualified professionals before making any financial or investment decisions based on information obtained from our platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the FinAce platform, including but not limited to text, graphics, logos, icons, and software, are owned by FinAce or its licensors and are protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our platform without our written permission.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, FinAce and its affiliates, officers, employees, agents, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We may revise these Terms from time to time. The most current version will always be posted on our platform. By continuing to access or use FinAce after revisions become effective, you agree to be bound by the revised Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@finace.ai<br />
              <strong>Address:</strong> Coming Soon
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;

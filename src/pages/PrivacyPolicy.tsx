
import React from 'react';
import Layout from '../components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">
            Last Updated: May 20, 2023
          </p>
          
          <div className="prose prose-gray max-w-none">
            <p>
              At FinAce, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered financial guidance platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our platform, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Personal identifiers (name, email address, etc.) that you provide when creating an account.</li>
              <li>Financial information that you explicitly share when using our services, such as investment preferences, risk tolerance, and financial goals.</li>
              <li>Usage data such as how you interact with our platform, features you use, and time spent on the platform.</li>
              <li>Device information including IP address, browser type, and operating system.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services.</li>
              <li>Personalize your experience with tailored financial guidance and investment suggestions.</li>
              <li>Develop new features, products, and services.</li>
              <li>Communicate with you about updates, security alerts, and support messages.</li>
              <li>Prevent fraudulent activity and enhance the security of our platform.</li>
              <li>Analyze usage patterns to improve user experience and platform performance.</li>
            </ul>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>With Service Providers:</strong> We may share information with third-party vendors who provide services on our behalf, such as hosting, data analysis, and customer service. These providers are contractually obligated to use your information only for providing their services to us.</li>
              <li><strong>For Legal Compliance:</strong> We may disclose information if required by law, regulation, or legal process.</li>
              <li><strong>Business Transfers:</strong> If FinAce is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>With Your Consent:</strong> We may share information with third parties when you have given explicit consent to do so.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights and Choices</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Accessing and receiving a copy of your personal information.</li>
              <li>Requesting correction of inaccurate personal information.</li>
              <li>Requesting deletion of your personal information.</li>
              <li>Objecting to processing of your personal information.</li>
              <li>Restricting the processing of your personal information.</li>
              <li>Data portability rights.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@finace.example.com<br />
              <strong>Address:</strong> 123 Financial District, Suite 500, San Francisco, CA 94111
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;

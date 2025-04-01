
import React from 'react';
import Layout from '../components/layout/Layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Disclaimer = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
          <p className="text-gray-600 mb-8">
            Last Updated: May 20, 2023
          </p>
          
          <Alert className="bg-amber-50 border-amber-200 mb-8">
            <Info className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800">Important Notice</AlertTitle>
            <AlertDescription className="text-amber-700">
              This disclaimer is an important legal document. Please read it carefully before using any of our services.
            </AlertDescription>
          </Alert>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">Not Financial Advice</h2>
            <p>
              The information provided by FinAce is for general informational and educational purposes only. It is not intended to be and does not constitute financial advice, investment advice, trading advice, or any other type of advice. The content and materials available on this platform should not be construed as professional financial advice.
            </p>
            <p className="mt-4">
              You should not make any financial, investment, trading or otherwise decisions based solely on the information presented on our platform without undertaking independent due diligence and consultation with a professional financial advisor.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">No Guarantee of Results</h2>
            <p>
              We do not guarantee or promise any specific results from using our services. Financial markets are inherently volatile and unpredictable. Past performance is not indicative of future results. Any examples, forecasts, projections, or other forward-looking statements regarding potential returns on investments are provided for illustrative purposes only and should not be construed as guarantees of future results.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Third-Party Content</h2>
            <p>
              Our platform may contain information and content from third-party sources. We do not endorse, guarantee, or warrant the accuracy or reliability of any third-party content. We are not responsible for any loss or damage that may arise from your reliance on third-party information.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">AI-Generated Content</h2>
            <p>
              FinAce uses artificial intelligence to generate financial information, forecasts, and recommendations. While we strive for accuracy and relevance, AI-generated content may contain errors, inaccuracies, or limitations. The quality of AI-generated information depends on the data it has been trained on and may not account for all market circumstances, individual financial situations, or recent developments.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Risk Warning</h2>
            <p>
              All investments involve risk and may result in financial loss. The value of your investments can go down as well as up, and you may not recover the amount of your original investment. Certain financial products and investments are particularly high-risk and may not be suitable for all investors.
            </p>
            <p className="mt-4">
              Before making any investment decision, you should carefully consider your investment objectives, level of experience, and risk appetite. If necessary, seek independent financial advice.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">No Fiduciary Relationship</h2>
            <p>
              Use of FinAce does not create a fiduciary relationship between you and FinAce. We are not acting as your financial advisor, broker, or fiduciary in providing our services. You are solely responsible for evaluating the merits and risks associated with the use of our platform and any information contained therein.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, FinAce and its employees, officers, directors, affiliates, and partners shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of or inability to use our services or from any investment decisions made based on information obtained through our platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Jurisdiction and Regulatory Compliance</h2>
            <p>
              FinAce's services are not directed at residents of any particular country or jurisdiction where such distribution or use would be contrary to local law or regulation. It is your responsibility to ensure that your use of our platform complies with the laws and regulations applicable in your jurisdiction.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Disclaimer</h2>
            <p>
              We may update this disclaimer from time to time to reflect changes in our practices, services, or legal requirements. The most current version will always be posted on our platform. Your continued use of FinAce after any changes indicates your acceptance of the updated disclaimer.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;

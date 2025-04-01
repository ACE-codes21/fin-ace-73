
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const SocialRedirect = () => {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let redirectUrl = '';
    let platformName = '';

    switch (platform) {
      case 'twitter':
        redirectUrl = 'https://twitter.com/finace_example';
        platformName = 'Twitter';
        break;
      case 'linkedin':
        redirectUrl = 'https://linkedin.com/company/finace-example';
        platformName = 'LinkedIn';
        break;
      case 'github':
        redirectUrl = 'https://github.com/finace-example';
        platformName = 'GitHub';
        break;
      default:
        // Redirect to home page if platform is not recognized
        navigate('/');
        toast({
          title: "Invalid platform",
          description: "The requested social media platform doesn't exist.",
          variant: "destructive",
        });
        return;
    }

    // Show toast notification
    toast({
      title: `Redirecting to ${platformName}`,
      description: "You'll be redirected to our social media page.",
    });

    // Redirect to the external URL after a short delay
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);

    return () => clearTimeout(timer);
  }, [platform, navigate, toast]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-20 h-20 bg-gradient-to-br from-finance-primary via-finance-accent to-finance-secondary rounded-md flex items-center justify-center text-white font-bold shadow-md mb-6">
        FA
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Redirecting you to our {platform} page...</h1>
      <p className="text-gray-600">Please wait a moment</p>
      <div className="mt-8 w-16 h-16 border-4 border-finance-primary/30 border-t-finance-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default SocialRedirect;

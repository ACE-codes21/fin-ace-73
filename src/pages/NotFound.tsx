
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import NotFoundScene from "@/components/effects/NotFoundScene";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="lg:w-1/2 h-64 sm:h-80 md:h-96 relative">
            <NotFoundScene />
          </div>
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center justify-center gap-2 bg-red-500/10 text-red-500 rounded-full px-4 py-2 mb-4">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">404 Error</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Page Not Found
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>
            
            <Link to="/">
              <Button size="lg" className="gap-2 px-6 py-6 rounded-xl">
                <Home className="h-5 w-5" />
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

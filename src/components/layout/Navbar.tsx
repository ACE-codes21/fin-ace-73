
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-finance-primary via-finance-accent to-finance-secondary rounded-lg flex items-center justify-center text-white font-bold shadow-md transition-all duration-300 group-hover:scale-110">
              FA
            </div>
            <span className="font-bold text-xl hidden sm:inline-block group-hover:text-finance-primary transition-colors duration-300">FinAce</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-base nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/forecast" 
            className={`text-base nav-link ${isActive('/forecast') ? 'nav-link-active' : ''}`}
          >
            Forecast
          </Link>
          <Link 
            to="/risk-assessment" 
            className={`text-base nav-link ${isActive('/risk-assessment') ? 'nav-link-active' : ''}`}
          >
            Risk Assessment
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-gray-700 hover:text-finance-primary transition-all">
                Resources <ChevronDown size={16} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white animate-fade-in shadow-soft border border-gray-100 rounded-lg" align="end">
              <DropdownMenuItem className="transition-colors hover:bg-finance-primary/10 rounded-md">
                <Link to="/chat" className="w-full">FinAce AI Chat</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors hover:bg-finance-primary/10 rounded-md">
                <Link to="/investments" className="w-full">Investment Suggestions</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/chat">
            <Button className="modern-button">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[250px] sm:w-[300px]">
              <div className="flex items-center gap-2 mb-8 mt-4">
                <div className="w-8 h-8 bg-gradient-to-br from-finance-primary via-finance-accent to-finance-secondary rounded-lg flex items-center justify-center text-white font-bold">
                  FA
                </div>
                <span className="font-bold text-lg">FinAce</span>
              </div>
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`text-lg font-medium py-2 ${isActive('/') ? 'text-finance-primary' : 'text-gray-700 hover:text-finance-primary'} transition-colors`}
                >
                  Home
                </Link>
                <Link 
                  to="/forecast" 
                  className={`text-lg font-medium py-2 ${isActive('/forecast') ? 'text-finance-primary' : 'text-gray-700 hover:text-finance-primary'} transition-colors`}
                >
                  Forecast
                </Link>
                <Link 
                  to="/risk-assessment" 
                  className={`text-lg font-medium py-2 ${isActive('/risk-assessment') ? 'text-finance-primary' : 'text-gray-700 hover:text-finance-primary'} transition-colors`}
                >
                  Risk Assessment
                </Link>
                <Link 
                  to="/chat" 
                  className={`text-lg font-medium py-2 ${isActive('/chat') ? 'text-finance-primary' : 'text-gray-700 hover:text-finance-primary'} transition-colors`}
                >
                  FinAce AI Chat
                </Link>
                <Link 
                  to="/investments" 
                  className={`text-lg font-medium py-2 ${isActive('/investments') ? 'text-finance-primary' : 'text-gray-700 hover:text-finance-primary'} transition-colors`}
                >
                  Investment Suggestions
                </Link>
                <Link to="/chat" className="mt-4">
                  <Button className="w-full modern-button">
                    Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

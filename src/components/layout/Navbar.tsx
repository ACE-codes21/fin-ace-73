
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-finance-primary via-finance-accent to-finance-secondary rounded-md flex items-center justify-center text-white font-bold shadow-md transition-all duration-300 group-hover:scale-110">
              FA
            </div>
            <span className="font-bold text-xl hidden sm:inline-block group-hover:text-finance-primary transition-colors duration-300">FinAce</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/forecast" className="text-gray-700 hover:text-finance-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-finance-primary after:transition-all hover:after:w-full">
            Forecast
          </Link>
          <Link to="/risk-assessment" className="text-gray-700 hover:text-finance-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-finance-primary after:transition-all hover:after:w-full">
            Risk Assessment
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-gray-700 hover:text-finance-primary transition-all">
                Resources <ChevronDown size={16} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white animate-fade-in" align="end">
              <DropdownMenuItem className="transition-colors hover:bg-finance-primary/10">
                <Link to="/chat" className="w-full">Finance AI Chat</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors hover:bg-finance-primary/10">
                <Link to="/investments" className="w-full">Investment Suggestions</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/chat">
            <Button className="bg-finance-primary hover:bg-finance-primary/90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">Get Started</Button>
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
                <div className="w-8 h-8 bg-gradient-to-br from-finance-primary via-finance-accent to-finance-secondary rounded-md flex items-center justify-center text-white font-bold">
                  FA
                </div>
                <span className="font-bold text-lg">FinAce</span>
              </div>
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-lg font-medium py-2 hover:text-finance-primary transition-colors">
                  Home
                </Link>
                <Link to="/forecast" className="text-lg font-medium py-2 hover:text-finance-primary transition-colors">
                  Forecast
                </Link>
                <Link to="/risk-assessment" className="text-lg font-medium py-2 hover:text-finance-primary transition-colors">
                  Risk Assessment
                </Link>
                <Link to="/chat" className="text-lg font-medium py-2 hover:text-finance-primary transition-colors">
                  Finance AI Chat
                </Link>
                <Link to="/investments" className="text-lg font-medium py-2 hover:text-finance-primary transition-colors">
                  Investment Suggestions
                </Link>
                <Link to="/chat">
                  <Button className="w-full mt-4 bg-finance-primary hover:bg-finance-primary/90 transition-all duration-300">
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


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
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-finance-primary to-finance-accent rounded-md flex items-center justify-center text-white font-bold">
              FM
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">FinModeler</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/forecast" className="text-gray-700 hover:text-finance-primary transition-colors">
            Forecast
          </Link>
          <Link to="/risk-assessment" className="text-gray-700 hover:text-finance-primary transition-colors">
            Risk Assessment
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-gray-700 hover:text-finance-primary">
                Resources <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end">
              <DropdownMenuItem>
                <Link to="/chat" className="w-full">Finance AI Chat</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/investments" className="w-full">Investment Suggestions</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/chat">
            <Button className="bg-finance-primary hover:bg-finance-primary/90">Get Started</Button>
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
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-lg font-medium py-2 hover:text-finance-primary">
                  Home
                </Link>
                <Link to="/forecast" className="text-lg font-medium py-2 hover:text-finance-primary">
                  Forecast
                </Link>
                <Link to="/risk-assessment" className="text-lg font-medium py-2 hover:text-finance-primary">
                  Risk Assessment
                </Link>
                <Link to="/chat" className="text-lg font-medium py-2 hover:text-finance-primary">
                  Finance AI Chat
                </Link>
                <Link to="/investments" className="text-lg font-medium py-2 hover:text-finance-primary">
                  Investment Suggestions
                </Link>
                <Link to="/chat">
                  <Button className="w-full mt-4 bg-finance-primary hover:bg-finance-primary/90">
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

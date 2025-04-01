
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCcw, AlertCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatErrorProps {
  title: string;
  description: string;
  retryAction?: () => void;
  variant?: "rate-limit" | "auth" | "general";
  icon?: React.ReactNode;
  className?: string;
}

export const ChatError = ({ 
  title, 
  description, 
  retryAction, 
  variant = "general",
  icon,
  className = ""
}: ChatErrorProps) => {
  return (
    <Alert 
      className={`mb-4 animate-fade-in border-l-4 shadow-md ${
        variant === "rate-limit" 
          ? "border-amber-500 bg-amber-50/80 dark:bg-amber-950/10" 
          : variant === "auth" 
          ? "border-blue-500 bg-blue-50/80 dark:bg-blue-950/10"
          : "border-destructive bg-destructive/5"
      } ${className}`}
    >
      <div className="flex items-start">
        {icon || (variant === "rate-limit" ? (
          <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
        ) : variant === "auth" ? (
          <ShieldAlert className="h-5 w-5 mr-2 text-blue-600" />
        ) : (
          <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
        ))}
        <div className="flex-1">
          <AlertTitle className="font-semibold text-base">{title}</AlertTitle>
          <AlertDescription className="mt-2 text-sm">
            {description}
          </AlertDescription>
          {retryAction && (
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={retryAction}
                className={`hover:bg-white/30 transition-colors ${
                  variant === "rate-limit" 
                    ? "border-amber-400 text-amber-700 hover:text-amber-800" 
                    : variant === "auth" 
                    ? "border-blue-400 text-blue-700 hover:text-blue-800"
                    : "border-destructive/30 text-destructive hover:text-destructive/80"
                }`}
              >
                <RefreshCcw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
};

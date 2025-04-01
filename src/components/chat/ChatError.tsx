
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatErrorProps {
  title: string;
  description: string;
  retryAction?: () => void;
}

export const ChatError = ({ title, description, retryAction }: ChatErrorProps) => {
  return (
    <Alert className="mb-4 animate-fade-in border-l-4 border-destructive shadow-sm" variant="destructive">
      <AlertCircle className="h-5 w-5 mr-2" />
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription className="mt-2 flex items-center justify-between text-sm">
        <span>{description}</span>
        {retryAction && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={retryAction}
            className="ml-4 hover:bg-destructive/10 transition-colors"
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

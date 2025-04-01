
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatErrorProps {
  title: string;
  description: string;
  retryAction?: () => void;
}

export const ChatError = ({ title, description, retryAction }: ChatErrorProps) => {
  return (
    <Alert className="mb-4" variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{description}</span>
        {retryAction && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={retryAction}
            className="ml-4"
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

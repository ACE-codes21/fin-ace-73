
import React from 'react';
import { ChatError } from './ChatError';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ChatError
          title="Something went wrong"
          description="We're experiencing some technical issues. Please try refreshing the page."
          retryAction={() => {
            this.setState({ hasError: false });
            window.location.reload();
          }}
          icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

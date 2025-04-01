
import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FeedbackRatingProps {
  messageId: number;
  onFeedbackSubmit?: (rating: number, feedback: string, messageId: number) => void;
}

export const FeedbackRating = ({ messageId, onFeedbackSubmit }: FeedbackRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    if (newRating <= 3) {
      setIsExpanded(true);
    } else if (onFeedbackSubmit) {
      onFeedbackSubmit(newRating, "", messageId);
      setSubmitted(true);
      toast({
        title: "Feedback submitted",
        description: "Thank you for rating this response!",
      });
    }
  };

  const handleSubmitFeedback = () => {
    if (rating !== null && onFeedbackSubmit) {
      onFeedbackSubmit(rating, feedback, messageId);
      setSubmitted(true);
      setIsExpanded(false);
      toast({
        title: "Feedback submitted",
        description: "Thank you for helping us improve!",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <Award className="h-3 w-3 mr-1 text-amber-500" />
        <span>Feedback submitted</span>
      </div>
    );
  }

  return (
    <div className="mt-2 pt-2 border-t border-gray-100">
      {!isExpanded ? (
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Was this helpful?</span>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 rounded-full"
              onClick={() => handleRatingClick(5)}
            >
              <ThumbsUp className="h-3.5 w-3.5 text-gray-500 hover:text-green-500" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 rounded-full"
              onClick={() => handleRatingClick(2)}
            >
              <ThumbsDown className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleRatingClick(star)}
              >
                <Star
                  className={`h-4 w-4 ${
                    star <= (rating || 0)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            ))}
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How can we improve this response?"
            className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-finance-primary"
            rows={2}
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-finance-primary text-finance-primary hover:bg-finance-primary/5"
              onClick={handleSubmitFeedback}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

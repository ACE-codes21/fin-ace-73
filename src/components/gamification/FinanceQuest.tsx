
import { useState, useEffect } from "react";
import { Trophy, Award, Target, Star, TrendingUp, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: string;
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  unlocked: boolean;
}

export const FinanceQuest = () => {
  const { toast } = useToast();
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "quest-1",
      title: "Market Explorer",
      description: "Ask 5 questions about the Indian market",
      icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
      progress: 0,
      maxProgress: 5,
      completed: false,
      reward: "Market Savvy Badge"
    },
    {
      id: "quest-2",
      title: "Investment Planner",
      description: "View 3 different investment options",
      icon: <Target className="h-5 w-5 text-emerald-500" />,
      progress: 0,
      maxProgress: 3,
      completed: false,
      reward: "Strategic Investor Badge"
    },
    {
      id: "quest-3",
      title: "Finance Scholar",
      description: "Complete risk assessment quiz",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      progress: 0,
      maxProgress: 1,
      completed: false,
      reward: "Financial Wisdom Badge"
    }
  ]);

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "badge-1",
      title: "Market Savvy",
      description: "Knowledge of Indian market trends",
      icon: <TrendingUp className="h-8 w-8 text-amber-500" />,
      unlocked: false
    },
    {
      id: "badge-2",
      title: "Strategic Investor",
      description: "Research multiple investment options",
      icon: <Target className="h-8 w-8 text-emerald-500" />,
      unlocked: false
    },
    {
      id: "badge-3",
      title: "Financial Wisdom",
      description: "Understand your risk profile",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      unlocked: false
    }
  ]);

  // Simulate quest progress update (in a real app, this would be triggered by user actions)
  const updateQuestProgress = (questId: string, progressIncrement: number = 1) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => {
        if (quest.id === questId && !quest.completed) {
          const newProgress = Math.min(quest.progress + progressIncrement, quest.maxProgress);
          const newCompleted = newProgress >= quest.maxProgress;
          
          // If newly completed, unlock the corresponding badge
          if (newCompleted && !quest.completed) {
            const badgeToUnlock = quest.reward.split(" ")[0].toLowerCase() + "-" + quest.reward.split(" ")[1].toLowerCase();
            unlockBadge(badgeToUnlock);
            
            toast({
              title: "Quest Completed!",
              description: `You've completed "${quest.title}" and earned a new badge!`,
            });
          }
          
          return {
            ...quest,
            progress: newProgress,
            completed: newCompleted
          };
        }
        return quest;
      })
    );
  };

  const unlockBadge = (badgeTitle: string) => {
    setBadges(prevBadges => 
      prevBadges.map(badge => {
        if (badge.title.toLowerCase().includes(badgeTitle) && !badge.unlocked) {
          return {
            ...badge,
            unlocked: true
          };
        }
        return badge;
      })
    );
  };

  // Function to simulate progress for demo purposes
  const simulateProgress = (questId: string) => {
    updateQuestProgress(questId);
  };

  // Load saved progress from localStorage (would be server in production)
  useEffect(() => {
    const savedQuests = localStorage.getItem('finance_quests');
    const savedBadges = localStorage.getItem('finance_badges');
    
    if (savedQuests) {
      setQuests(JSON.parse(savedQuests));
    }
    
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('finance_quests', JSON.stringify(quests));
    localStorage.setItem('finance_badges', JSON.stringify(badges));
  }, [quests, badges]);

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-finance-primary/20 to-finance-accent/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-finance-primary" />
            <h3 className="font-semibold text-lg">Finance Quests</h3>
          </div>
          <Badge variant="outline" className="bg-white bg-opacity-50">
            Level 1
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Active Quests</h4>
        <div className="space-y-4">
          {quests.map(quest => (
            <div key={quest.id} className="border rounded-md p-3">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  {quest.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-sm">{quest.title}</h5>
                      <p className="text-xs text-gray-500 mt-0.5">{quest.description}</p>
                    </div>
                    {quest.completed && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Completed
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{quest.progress}/{quest.maxProgress}</span>
                    </div>
                    <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                  </div>

                  {/* Demo button - in a real app this would happen from user actions */}
                  {!quest.completed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs text-finance-primary hover:text-finance-primary/80 hover:bg-finance-primary/5"
                      onClick={() => simulateProgress(quest.id)}
                    >
                      Simulate Progress
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Your Badges</h4>
          <div className="flex flex-wrap gap-3">
            {badges.map(badge => (
              <TooltipProvider key={badge.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className={`border rounded-full p-2 transition-all ${
                        badge.unlocked 
                          ? "bg-white shadow-md" 
                          : "bg-gray-200 opacity-50"
                      }`}
                    >
                      {badge.icon}
                      {badge.unlocked && (
                        <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full p-0.5 border border-white">
                          <Star className="h-3 w-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-center">
                      <p className="font-medium">{badge.title}</p>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                      <p className="text-xs mt-1">
                        {badge.unlocked ? "Unlocked!" : "Complete quests to unlock"}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

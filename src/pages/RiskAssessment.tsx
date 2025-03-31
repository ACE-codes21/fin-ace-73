import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, ArrowRight, Shield, BarChart3, PieChart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
    points: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How long do you plan to keep your money invested before you need it?",
    options: [
      { value: "a", label: "Less than 1 year", points: 1 },
      { value: "b", label: "1-3 years", points: 2 },
      { value: "c", label: "3-7 years", points: 3 },
      { value: "d", label: "7+ years", points: 4 },
    ],
  },
  {
    id: 2,
    text: "How would you react if your investment lost 20% of its value in a year?",
    options: [
      { value: "a", label: "Panic and sell everything", points: 1 },
      { value: "b", label: "Sell some investments to cut losses", points: 2 },
      { value: "c", label: "Do nothing and wait for recovery", points: 3 },
      { value: "d", label: "Buy more at lower prices", points: 4 },
    ],
  },
  {
    id: 3,
    text: "Which statement best describes your investment experience?",
    options: [
      { value: "a", label: "I'm new to investing and not very comfortable with it", points: 1 },
      { value: "b", label: "I have some experience with basic investments like mutual funds", points: 2 },
      { value: "c", label: "I'm familiar with various investment types and markets", points: 3 },
      { value: "d", label: "I'm an experienced investor who understands market dynamics well", points: 4 },
    ],
  },
  {
    id: 4,
    text: "Which investment approach sounds most appealing to you?",
    options: [
      { value: "a", label: "Guaranteed returns with minimal risk", points: 1 },
      { value: "b", label: "Mostly stable investments with some growth potential", points: 2 },
      { value: "c", label: "Balance between growth and stability", points: 3 },
      { value: "d", label: "Maximum growth potential even with significant fluctuations", points: 4 },
    ],
  },
  {
    id: 5,
    text: "Which type of investment would you be most comfortable with?",
    options: [
      { value: "a", label: "Fixed deposits and government securities", points: 1 },
      { value: "b", label: "Corporate bonds and balanced mutual funds", points: 2 },
      { value: "c", label: "Blue-chip stocks and equity mutual funds", points: 3 },
      { value: "d", label: "Growth stocks, sectoral funds, and some alternative investments", points: 4 },
    ],
  },
  {
    id: 6,
    text: "What is your primary financial goal?",
    options: [
      { value: "a", label: "Preserving my capital and avoiding losses", points: 1 },
      { value: "b", label: "Generating stable income from my investments", points: 2 },
      { value: "c", label: "Growing my wealth over time with moderate risk", points: 3 },
      { value: "d", label: "Maximizing long-term growth potential", points: 4 },
    ],
  },
  {
    id: 7,
    text: "How important is liquidity (ability to access your money quickly) to you?",
    options: [
      { value: "a", label: "Extremely important - I might need the money anytime", points: 1 },
      { value: "b", label: "Important - I prefer having easy access to my investments", points: 2 },
      { value: "c", label: "Somewhat important - I can lock some money for better returns", points: 3 },
      { value: "d", label: "Less important - I'm investing for the long term", points: 4 },
    ],
  },
];

const RISK_PROFILES = {
  CONSERVATIVE: {
    title: "Conservative Investor",
    description: "You prioritize capital preservation and steady returns over growth potential. You prefer stability and are uncomfortable with significant fluctuations in your investment value.",
    allocation: {
      equity: 20,
      debt: 60,
      gold: 15,
      cash: 5,
    },
    recommendations: [
      "Fixed Deposits with reputable banks (5-7% returns)",
      "Government bonds and Treasury Bills",
      "AAA-rated corporate bonds",
      "Debt mutual funds (especially Banking & PSU and Corporate Bond funds)",
      "Senior Citizen Savings Scheme (if applicable)",
      "A small allocation to large-cap equity funds (10-15%)"
    ],
    icon: Shield,
  },
  MODERATE_CONSERVATIVE: {
    title: "Moderately Conservative Investor",
    description: "You seek a balance but lean toward safety. You're willing to accept some market fluctuations for improved returns but still prioritize protecting your capital.",
    allocation: {
      equity: 40,
      debt: 40,
      gold: 15,
      cash: 5,
    },
    recommendations: [
      "Balanced advantage funds that adjust equity/debt based on market valuations",
      "Large-cap equity mutual funds (25-30%)",
      "Corporate bond funds and Banking & PSU debt funds",
      "Short to medium duration debt funds",
      "Multi-asset funds that include equity, debt, and gold",
      "Government securities and high-quality corporate bonds"
    ],
    icon: PieChart,
  },
  MODERATE: {
    title: "Moderate Investor",
    description: "You seek balance between growth and capital preservation. You understand market fluctuations are normal and are comfortable with moderate volatility for better long-term returns.",
    allocation: {
      equity: 60,
      debt: 30,
      gold: 5,
      alternatives: 5,
    },
    recommendations: [
      "Diversified equity mutual funds (40-50%)",
      "Flexi-cap and multi-cap mutual funds",
      "Index funds tracking Nifty 50/Sensex",
      "Medium to long-duration debt funds",
      "Corporate bond funds for stable income",
      "REITs for real estate exposure",
      "A small allocation to international equity funds (5-10%)"
    ],
    icon: BarChart3,
  },
  AGGRESSIVE: {
    title: "Aggressive Investor",
    description: "You prioritize growth potential and can tolerate significant market fluctuations. You have a long-term horizon and understand that higher returns come with higher volatility.",
    allocation: {
      equity: 80,
      debt: 10,
      alternatives: 10,
    },
    recommendations: [
      "Diversified equity funds with mid and small-cap exposure",
      "Sectoral and thematic funds in promising areas (IT, healthcare, consumption)",
      "Focused equity funds (concentrated portfolios of 20-30 stocks)",
      "International equity funds for global exposure",
      "A small allocation to direct stocks if you have the knowledge",
      "Alternative investments like REITs and InvITs",
      "Small allocation to debt funds for emergency requirements"
    ],
    icon: Target,
  },
};

const getRiskProfile = (score: number) => {
  if (score <= 14) return RISK_PROFILES.CONSERVATIVE;
  if (score <= 19) return RISK_PROFILES.MODERATE_CONSERVATIVE;
  if (score <= 24) return RISK_PROFILES.MODERATE;
  return RISK_PROFILES.AGGRESSIVE;
};

const RiskAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [riskScore, setRiskScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [riskProfile, setRiskProfile] = useState<any>(null);

  const handleAnswer = (questionId: number, optionValue: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionValue };
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRiskScore = () => {
    let score = 0;
    questions.forEach(question => {
      const selectedOption = question.options.find(
        option => option.value === answers[question.id]
      );
      if (selectedOption) {
        score += selectedOption.points;
      }
    });
    setRiskScore(score);
    setRiskProfile(getRiskProfile(score));
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setRiskScore(0);
    setShowResults(false);
    setRiskProfile(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Investment Risk Assessment</h1>
            <p className="text-gray-600">
              Determine your investor risk profile to receive personalized investment recommendations.
            </p>
          </div>

          {!showResults ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-1">
                  <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                  <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].text}</h3>
                  <RadioGroup
                    value={answers[questions[currentQuestion].id] || ""}
                    onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
                    className="space-y-4"
                  >
                    {questions[currentQuestion].options.map((option) => (
                      <div key={option.value} className="flex items-start space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`option-${option.value}`} className="mt-1" />
                        <Label
                          htmlFor={`option-${option.value}`}
                          className="cursor-pointer flex-grow"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="bg-finance-primary hover:bg-finance-primary/90"
                  >
                    {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card className="border-t-4 border-t-finance-primary">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle2 className="h-6 w-6 text-finance-secondary mr-2" />
                    Your Risk Profile Assessment Results
                  </CardTitle>
                  <CardDescription>
                    Based on your answers, we've determined your investor profile:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-finance-primary/20 to-finance-accent/20">
                      {riskProfile && <riskProfile.icon className="h-12 w-12 text-finance-primary" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 gradient-text">
                        {riskProfile?.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {riskProfile?.description}
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 flex items-center">
                          <AlertCircle className="h-4 w-4 text-finance-warning mr-2" />
                          Your risk tolerance score: {riskScore} out of 28
                        </h4>
                        <p className="text-sm text-gray-600">
                          This score reflects your comfort with investment risk, financial timeline, and investment goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Asset Allocation</CardTitle>
                  <CardDescription>
                    Based on your risk profile, here's our suggested asset allocation:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="space-y-4">
                        {riskProfile && Object.entries(riskProfile.allocation).map(([asset, percentage]: [string, any]) => (
                          <div key={asset}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium capitalize">{asset}</span>
                              <span className="text-sm text-gray-500">{percentage}%</span>
                            </div>
                            <Progress 
                              value={percentage} 
                              className={
                                asset === 'equity' ? 'h-2 bg-secondary [&>div]:bg-finance-primary' :
                                asset === 'debt' ? 'h-2 bg-secondary [&>div]:bg-finance-secondary' :
                                asset === 'gold' ? 'h-2 bg-secondary [&>div]:bg-amber-400' :
                                asset === 'alternatives' ? 'h-2 bg-secondary [&>div]:bg-finance-accent' :
                                'h-2 bg-secondary [&>div]:bg-gray-400'
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">What this means:</h4>
                        <p className="text-sm text-gray-600">
                          This allocation aims to balance risk and return based on your comfort level with market fluctuations and investment timeline. Adjust based on your specific goals and circumstances.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Recommended Investments:</h4>
                      <ul className="space-y-2">
                        {riskProfile?.recommendations.map((recommendation: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-5 h-5 rounded-full bg-finance-primary/10 text-finance-primary text-xs flex items-center justify-center mr-2 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button 
                  onClick={resetAssessment}
                  variant="outline" 
                  className="mr-4"
                >
                  Retake Assessment
                </Button>
                <Link to="/investments">
                  <Button className="bg-finance-primary hover:bg-finance-primary/90">
                    View Investment Suggestions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RiskAssessment;

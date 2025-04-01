
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, PiggyBank, Wallet } from 'lucide-react';

interface CountUpProps {
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = Date.now();
          const endTime = startTime + duration;
          
          const updateCount = () => {
            const now = Date.now();
            if (now >= endTime) {
              setCount(end);
              return;
            }
            
            const progress = (now - startTime) / duration;
            setCount(Math.floor(progress * end));
            requestAnimationFrame(updateCount);
          };
          
          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration]);

  return <div ref={countRef}>{prefix}{count}{suffix}</div>;
};

const StatCard = ({ 
  icon, 
  iconClass, 
  iconBgClass, 
  value, 
  prefix, 
  suffix, 
  description, 
  delay 
}: { 
  icon: React.ReactNode;
  iconClass: string;
  iconBgClass: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
  delay: string;
}) => {
  return (
    <div 
      className="glass-card bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] animate-fade-in" 
      style={{ animationDelay: delay }}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 ${iconBgClass} rounded-xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-4xl font-bold mb-2 text-gray-800">
        <CountUp end={value} duration={2000} prefix={prefix} suffix={suffix} />
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-finance-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-finance-accent/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how we've helped thousands of investors make better financial decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            icon={<TrendingUp className="h-8 w-8 text-finance-primary" />}
            iconClass="text-finance-primary"
            iconBgClass="bg-finance-primary/10"
            value={94}
            suffix="%"
            description="Users reporting improved financial decisions"
            delay="0.1s"
          />
          
          <StatCard 
            icon={<PiggyBank className="h-8 w-8 text-finance-secondary" />}
            iconClass="text-finance-secondary"
            iconBgClass="bg-finance-secondary/10"
            value={25}
            prefix="₹"
            suffix="L+"
            description="Average wealth growth by our premium users"
            delay="0.2s"
          />
          
          <StatCard 
            icon={<Wallet className="h-8 w-8 text-finance-accent" />}
            iconClass="text-finance-accent"
            iconBgClass="bg-finance-accent/10"
            value={10000}
            suffix="+"
            description="Financial plans created and optimized"
            delay="0.3s"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

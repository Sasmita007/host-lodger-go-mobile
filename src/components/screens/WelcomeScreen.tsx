import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Home, Shield, Heart, Users } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Safe & Verified', desc: 'All members are verified for your peace of mind' },
  { icon: Heart, title: 'Compatibility First', desc: 'AI-powered matching for lifestyle fit' },
  { icon: Users, title: 'Community Focus', desc: 'Boarder & lodger model, not real estate' },
];

export function WelcomeScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <MobileLayout className="justify-between">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-soft mb-6 animate-fade-in">
          <Home className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-3 animate-fade-in [animation-delay:100ms]">
          Welcome to<br />Abode Match
        </h1>
        
        <p className="text-muted-foreground text-base max-w-xs animate-fade-in [animation-delay:200ms]">
          Find your perfect home-share match with people who truly fit your lifestyle.
        </p>

        <div className="mt-10 space-y-4 w-full animate-fade-up [animation-delay:300ms]">
          {features.map((feature, i) => (
            <div 
              key={feature.title}
              className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-card"
              style={{ animationDelay: `${400 + i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <feature.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-8 animate-fade-up [animation-delay:600ms]">
        <Button 
          size="xl" 
          className="w-full"
          onClick={() => setCurrentScreen('role-selection')}
        >
          Get Started
        </Button>
        <Button 
          variant="ghost" 
          size="lg" 
          className="w-full"
          onClick={() => setCurrentScreen('login')}
        >
          Already have an account? Log In
        </Button>
      </div>
    </MobileLayout>
  );
}

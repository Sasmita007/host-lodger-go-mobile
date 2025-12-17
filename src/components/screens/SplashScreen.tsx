import React, { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Home } from 'lucide-react';

export function SplashScreen() {
  const { setCurrentScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [setCurrentScreen]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-8">
      <div className="animate-scale-in flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-elevated mb-6">
          <Home className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">
          Abode Match
        </h1>
        <p className="text-muted-foreground text-center">
          Find your perfect shared home
        </p>
      </div>
      
      <div className="absolute bottom-12 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-soft [animation-delay:200ms]" />
        <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse-soft [animation-delay:400ms]" />
      </div>
    </div>
  );
}

import React from 'react';
import { Home, Search, MessageCircle, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'matches', icon: Search, label: 'Matches' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'notifications', icon: Bell, label: 'Alerts' },
  { id: 'settings', icon: User, label: 'Profile' },
] as const;

export function BottomNav() {
  const { currentScreen, setCurrentScreen } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border safe-bottom z-50 max-w-md mx-auto">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id as any)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive 
                  ? "text-primary bg-accent" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "stroke-[2.5px]")} />
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

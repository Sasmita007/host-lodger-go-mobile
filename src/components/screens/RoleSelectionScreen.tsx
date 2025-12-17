import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Home, Search, ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/user';

const roles = [
  {
    id: 'host' as UserRole,
    icon: Home,
    title: 'I\'m offering a home',
    subtitle: 'Host',
    description: 'Share your space with a compatible lodger who fits your lifestyle.',
  },
  {
    id: 'lodger' as UserRole,
    icon: Search,
    title: 'I\'m looking for a home',
    subtitle: 'Lodger',
    description: 'Find your ideal shared living situation with the right host.',
  },
];

export function RoleSelectionScreen() {
  const { setCurrentScreen, selectedRole, setSelectedRole } = useApp();

  const handleContinue = () => {
    if (selectedRole) {
      setCurrentScreen('trust-surface');
    }
  };

  return (
    <MobileLayout>
      <button 
        onClick={() => setCurrentScreen('welcome')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="animate-fade-in">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          How can we help you?
        </h1>
        <p className="text-muted-foreground mb-8">
          Choose the option that best describes your situation.
        </p>
      </div>

      <div className="space-y-4 flex-1 animate-fade-up [animation-delay:100ms]">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          const Icon = role.icon;
          
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={cn(
                "w-full p-5 rounded-2xl border-2 text-left transition-all duration-200",
                isSelected 
                  ? "border-primary bg-accent shadow-soft" 
                  : "border-border bg-card hover:border-primary/30 hover:shadow-card"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6",
                      isSelected ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <span className={cn(
                      "text-xs font-medium uppercase tracking-wider",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}>
                      {role.subtitle}
                    </span>
                    <h3 className="font-semibold text-foreground mt-0.5">{role.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{role.description}</p>
                  </div>
                </div>
                
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                  isSelected 
                    ? "border-primary bg-primary" 
                    : "border-muted-foreground/30"
                )}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-6 animate-fade-up [animation-delay:200ms]">
        <Button 
          size="xl" 
          className="w-full"
          disabled={!selectedRole}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </MobileLayout>
  );
}

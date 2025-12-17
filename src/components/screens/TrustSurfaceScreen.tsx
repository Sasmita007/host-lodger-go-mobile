import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, Shield, CheckCircle2, Lock, Users, AlertTriangle } from 'lucide-react';

const commitments = [
  { icon: CheckCircle2, title: 'Verified Members', desc: 'ID, address, and background checks required' },
  { icon: Lock, title: 'Privacy Protected', desc: 'Your data is encrypted and never sold' },
  { icon: Users, title: 'Moderated Messaging', desc: 'AI monitors for safety and respect' },
  { icon: AlertTriangle, title: 'Easy Reporting', desc: 'Flag issues and get franchisee support' },
];

const whatWeAreNot = [
  'A real estate or tenancy platform',
  'A place to handle rent or bond money',
  'A service that shares your details without consent',
];

export function TrustSurfaceScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <MobileLayout>
      <button 
        onClick={() => setCurrentScreen('role-selection')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="animate-fade-in">
        <div className="w-14 h-14 rounded-2xl gradient-trust flex items-center justify-center mb-4">
          <Shield className="w-7 h-7 text-trust" />
        </div>
        
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Your safety is our priority
        </h1>
        <p className="text-muted-foreground">
          Here's how we protect you every step of the way.
        </p>
      </div>

      <div className="mt-8 space-y-3 animate-fade-up [animation-delay:100ms]">
        {commitments.map((item) => (
          <div 
            key={item.title}
            className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-card"
          >
            <div className="w-9 h-9 rounded-lg bg-trust-light flex items-center justify-center shrink-0">
              <item.icon className="w-4.5 h-4.5 text-trust" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
              <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-warm animate-fade-up [animation-delay:200ms]">
        <h3 className="font-semibold text-warm-foreground text-sm mb-2">
          What we're not
        </h3>
        <ul className="space-y-2">
          {whatWeAreNot.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-warm-foreground/80">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-warm-foreground/60 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6 space-y-3 animate-fade-up [animation-delay:300ms]">
        <Button 
          size="xl" 
          className="w-full"
          onClick={() => setCurrentScreen('register')}
        >
          Continue
        </Button>
        <Button 
          variant="ghost" 
          className="w-full text-sm"
          onClick={() => setCurrentScreen('resources')}
        >
          Learn More About Safety
        </Button>
      </div>
    </MobileLayout>
  );
}

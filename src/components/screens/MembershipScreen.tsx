import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, Check, CreditCard, Shield, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const benefits = [
  { icon: Sparkles, text: 'AI-powered compatibility matching' },
  { icon: Shield, text: 'Full verification status' },
  { icon: Heart, text: 'Unlimited matches & messaging' },
];

export function MembershipScreen() {
  const { setCurrentScreen, user, setUser } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (user) {
      setUser({ ...user, membershipStatus: 'active' });
    }
    
    toast.success('Membership activated!');
    setIsProcessing(false);
    setCurrentScreen('verification');
  };

  return (
    <MobileLayout>
      <button 
        onClick={() => setCurrentScreen('register')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="animate-fade-in">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Activate your membership
        </h1>
        <p className="text-muted-foreground">
          Get full access to find your perfect home match.
        </p>
      </div>

      <div className="mt-8 animate-fade-up [animation-delay:100ms]">
        <div className="p-6 rounded-2xl bg-card border-2 border-primary shadow-elevated">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-accent px-3 py-1 rounded-full">
              Recommended
            </span>
          </div>
          
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {user?.role === 'host' ? 'Host' : 'Lodger'} Membership
          </h2>
          
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-heading font-bold text-foreground">$49</span>
            <span className="text-muted-foreground">/month</span>
          </div>

          <div className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <benefit.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-muted animate-fade-up [animation-delay:200ms]">
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Secure Payment</p>
            <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 animate-fade-up [animation-delay:300ms]">
        <Button 
          size="xl" 
          className="w-full"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            'Pay & Activate Membership'
          )}
        </Button>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          Cancel anytime. 7-day money-back guarantee.
        </p>
      </div>
    </MobileLayout>
  );
}

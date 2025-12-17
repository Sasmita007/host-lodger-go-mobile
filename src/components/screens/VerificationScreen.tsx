import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, CheckCircle2, Clock, ExternalLink, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const verificationSteps = [
  { id: 'id', title: 'ID Verification', status: 'pending' },
  { id: 'address', title: 'Address Verification', status: 'pending' },
  { id: 'police', title: 'Police Check', status: 'pending' },
  { id: 'references', title: 'Reference Check', status: 'pending' },
];

export function VerificationScreen() {
  const { setCurrentScreen, user, setUser } = useApp();

  const handleStartVerification = () => {
    // In real app, this would redirect to external verification service
    // For demo, we'll just mark as verified
    if (user) {
      setUser({ ...user, verificationStatus: 'verified' });
    }
    setCurrentScreen('profile-setup');
  };

  const handleSkipForNow = () => {
    setCurrentScreen('profile-setup');
  };

  return (
    <MobileLayout>
      <button 
        onClick={() => setCurrentScreen('membership')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warm text-warm-foreground text-xs font-medium mb-4">
          <Clock className="w-3.5 h-3.5" />
          Verification Required
        </div>
        
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Verify your identity
        </h1>
        <p className="text-muted-foreground">
          For everyone's safety, we require verification before you can match and message.
        </p>
      </div>

      <div className="mt-8 space-y-3 animate-fade-up [animation-delay:100ms]">
        {verificationSteps.map((step) => (
          <div 
            key={step.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card"
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              step.status === 'complete' ? "bg-primary" : "bg-muted"
            )}>
              {step.status === 'complete' ? (
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              ) : (
                <Clock className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">{step.title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{step.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl border border-border bg-card animate-fade-up [animation-delay:200ms]">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground text-sm">How it works</h3>
            <p className="text-xs text-muted-foreground mt-1">
              You'll be redirected to our secure verification partner. The process takes about 5-10 minutes and your data is protected.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 space-y-3 animate-fade-up [animation-delay:300ms]">
        <Button 
          size="xl" 
          className="w-full"
          onClick={handleStartVerification}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Start Verification
        </Button>
        
        <Button 
          variant="ghost"
          className="w-full"
          onClick={handleSkipForNow}
        >
          Complete Profile First
        </Button>
      </div>
    </MobileLayout>
  );
}

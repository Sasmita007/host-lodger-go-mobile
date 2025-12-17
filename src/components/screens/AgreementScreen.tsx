import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, Handshake, CheckCircle2, FileText, Users, Shield } from 'lucide-react';
import { toast } from 'sonner';

const agreementTerms = [
  {
    id: 'respect',
    title: 'Mutual Respect',
    description: 'Both parties agree to treat each other with respect, dignity, and courtesy throughout the arrangement.',
  },
  {
    id: 'communication',
    title: 'Open Communication',
    description: 'Both parties commit to maintaining open and honest communication about any concerns or issues that may arise.',
  },
  {
    id: 'privacy',
    title: 'Privacy & Boundaries',
    description: 'Both parties agree to respect each other\'s privacy and personal boundaries within the shared living space.',
  },
  {
    id: 'terms',
    title: 'Agreed Terms',
    description: 'Both parties acknowledge and agree to the rental terms, including rent amount, payment schedule, and house rules.',
  },
  {
    id: 'notice',
    title: 'Notice Period',
    description: 'Both parties agree to provide reasonable notice (minimum 2 weeks) before ending the arrangement.',
  },
  {
    id: 'safety',
    title: 'Safety Commitment',
    description: 'Both parties commit to maintaining a safe living environment and reporting any safety concerns promptly.',
  },
];

export function AgreementScreen() {
  const { setCurrentScreen, selectedRole } = useApp();
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAgree = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setHasAgreed(true);
    setIsProcessing(false);
    toast.success('Agreement submitted! Waiting for the other party to agree.');
  };

  return (
    <MobileLayout noPadding className="flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-3 sticky top-0 z-10">
        <button 
          onClick={() => setCurrentScreen('chat')}
          className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">Mutual Agreement</h1>
          <p className="text-xs text-muted-foreground">Review and accept terms</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
          <Handshake className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Info Banner */}
        <div className="px-4 py-4 bg-accent/30 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">What is this agreement?</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                This mutual agreement helps establish trust between {selectedRole === 'host' ? 'you and your potential lodger' : 'you and your potential host'}. 
                Both parties must agree to these terms before contact details are shared.
              </p>
            </div>
          </div>
        </div>

        {/* Agreement Terms */}
        <div className="p-4 space-y-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Agreement Terms
          </h2>
          
          <div className="space-y-3">
            {agreementTerms.map((term, index) => (
              <div 
                key={term.id}
                className="bg-card rounded-xl p-4 border border-border shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{term.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {term.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Note */}
        <div className="px-4 pb-4">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground text-sm">Your Safety Matters</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  This agreement is a good-faith commitment between both parties. 
                  Abode Match recommends meeting in public first and taking all necessary precautions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 py-4 bg-card border-t border-border safe-bottom">
        {hasAgreed ? (
          <div className="flex items-center justify-center gap-2 py-3 bg-primary/10 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">You have agreed</span>
          </div>
        ) : (
          <Button 
            onClick={handleAgree}
            disabled={isProcessing}
            className="w-full h-12 text-base font-semibold"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Handshake className="w-5 h-5" />
                I Agree to These Terms
              </span>
            )}
          </Button>
        )}
        
        <p className="text-center text-xs text-muted-foreground mt-3">
          By agreeing, you confirm that you have read and understood all terms above.
        </p>
      </div>
    </MobileLayout>
  );
}

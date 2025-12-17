import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, Shield, HelpCircle, FileText, AlertTriangle, MessageCircle, ExternalLink } from 'lucide-react';

const resources = [
  {
    id: 'safety',
    icon: Shield,
    title: 'Safety & Commitments',
    description: 'How we protect you and your data',
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 'how-it-works',
    icon: HelpCircle,
    title: 'How It Works',
    description: 'Understanding the matching process',
    color: 'bg-accent text-accent-foreground',
  },
  {
    id: 'what-we-dont-do',
    icon: AlertTriangle,
    title: 'What We Don\'t Do',
    description: 'Our boundaries and limitations',
    color: 'bg-warm text-warm-foreground',
  },
  {
    id: 'agreements',
    icon: FileText,
    title: 'Agreements & Terms',
    description: 'Understanding occupancy agreements',
    color: 'bg-sage text-sage-foreground',
  },
  {
    id: 'contact',
    icon: MessageCircle,
    title: 'Contact Support',
    description: 'Get help from our team',
    color: 'bg-trust-light text-trust',
  },
];

export function ResourcesScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <MobileLayout>
      <button 
        onClick={() => setCurrentScreen('dashboard')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="animate-fade-in">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Help & Resources
        </h1>
        <p className="text-muted-foreground">
          Everything you need to know about using Abode Match safely.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <button
              key={resource.id}
              className="w-full p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all text-left animate-fade-up flex items-start gap-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${resource.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{resource.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-accent animate-fade-up [animation-delay:300ms]">
        <h3 className="font-semibold text-foreground mb-2">Need immediate help?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our support team is here to assist you with any concerns or questions.
        </p>
        <div className="flex items-center gap-2 text-sm text-primary font-medium">
          <MessageCircle className="w-4 h-4" />
          <span>Start a conversation with support</span>
        </div>
      </div>
    </MobileLayout>
  );
}

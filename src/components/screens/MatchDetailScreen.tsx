import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, MapPin, Sparkles, Sun, Users, Coffee, Home, MessageCircle, X, Heart, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockMatchDetail = {
  id: '1',
  name: 'Sarah Mitchell',
  score: 94,
  location: 'Newtown',
  bio: 'Early riser who loves cooking and keeping a tidy space. Looking for a compatible housemate who respects quiet time.',
  logistical: 95,
  lifestyle: 92,
  personality: 94,
  whyItWorks: [
    'Both prefer early morning routines',
    'Similar cleanliness expectations',
    'Compatible social energy levels',
    'Aligned communication styles',
  ],
  preferences: {
    dailyRhythm: 'Early Bird',
    cleanliness: 'Very Tidy',
    guests: 'Occasionally',
    social: 'Balanced',
    communication: 'Casual',
  },
  roomDetails: {
    type: 'Private Room',
    rent: '$280/week',
    available: 'Jan 15, 2025',
  },
};

export function MatchDetailScreen() {
  const { setCurrentScreen, selectedMatchId, setSelectedChatId } = useApp();

  const handleStartChat = () => {
    setSelectedChatId(selectedMatchId);
    setCurrentScreen('chat');
  };

  return (
    <MobileLayout noPadding>
      {/* Header Image/Avatar */}
      <div className="relative h-56 bg-gradient-to-br from-primary/20 via-accent to-trust-light">
        <button 
          onClick={() => setCurrentScreen('matches')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow-soft"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-2xl bg-card shadow-elevated flex items-center justify-center border-4 border-background">
          <span className="text-4xl font-heading font-bold text-primary">
            {mockMatchDetail.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-16 pb-32">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            {mockMatchDetail.name}
          </h1>
          <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>{mockMatchDetail.location}</span>
          </div>
        </div>

        {/* Match Score */}
        <div className="p-4 rounded-2xl bg-card shadow-card mb-6 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Compatibility Score</span>
            </div>
            <div className={cn(
              "px-3 py-1.5 rounded-full text-sm font-bold",
              "bg-primary text-primary-foreground"
            )}>
              {mockMatchDetail.score}%
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Logistical Fit', value: mockMatchDetail.logistical },
              { label: 'Lifestyle Fit', value: mockMatchDetail.lifestyle },
              { label: 'Personality Fit', value: mockMatchDetail.personality },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.value}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Works */}
        <div className="mb-6 animate-fade-up [animation-delay:100ms]">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-3">
            Why this match works
          </h2>
          <div className="space-y-2">
            {mockMatchDetail.whyItWorks.map((reason) => (
              <div key={reason} className="flex items-start gap-3 p-3 rounded-xl bg-accent">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6 animate-fade-up [animation-delay:150ms]">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-3">
            About {mockMatchDetail.name.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{mockMatchDetail.bio}</p>
        </div>

        {/* Preferences */}
        <div className="mb-6 animate-fade-up [animation-delay:200ms]">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-3">
            Lifestyle Preferences
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Sun, label: 'Daily Rhythm', value: mockMatchDetail.preferences.dailyRhythm },
              { icon: Sparkles, label: 'Cleanliness', value: mockMatchDetail.preferences.cleanliness },
              { icon: Users, label: 'Guests', value: mockMatchDetail.preferences.guests },
              { icon: Coffee, label: 'Social Energy', value: mockMatchDetail.preferences.social },
            ].map((pref) => (
              <div key={pref.label} className="p-3 rounded-xl bg-card shadow-card">
                <div className="flex items-center gap-2 mb-1">
                  <pref.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{pref.label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{pref.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Details */}
        <div className="p-4 rounded-2xl bg-warm animate-fade-up [animation-delay:250ms]">
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5 text-warm-foreground" />
            <span className="font-semibold text-warm-foreground">Room Details</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-warm-foreground/70">Type</p>
              <p className="text-sm font-medium text-warm-foreground">{mockMatchDetail.roomDetails.type}</p>
            </div>
            <div>
              <p className="text-xs text-warm-foreground/70">Rent</p>
              <p className="text-sm font-medium text-warm-foreground">{mockMatchDetail.roomDetails.rent}</p>
            </div>
            <div>
              <p className="text-xs text-warm-foreground/70">Available</p>
              <p className="text-sm font-medium text-warm-foreground">{mockMatchDetail.roomDetails.available}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-background/95 backdrop-blur-md border-t border-border max-w-md mx-auto safe-bottom">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => setCurrentScreen('matches')}
          >
            <X className="w-4 h-4 mr-2" />
            Not Interested
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={handleStartChat}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Start Chat
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}

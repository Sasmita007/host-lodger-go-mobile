import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Shield, CheckCircle2, AlertCircle, ChevronRight, Sparkles, MessageCircle, Heart, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockMatches = [
  { id: '1', name: 'Sarah M.', score: 94, location: 'Newtown', image: null },
  { id: '2', name: 'James K.', score: 89, location: 'Marrickville', image: null },
  { id: '3', name: 'Emma L.', score: 87, location: 'Petersham', image: null },
];

export function DashboardScreen() {
  const { user, setCurrentScreen, setSelectedMatchId, selectedRole } = useApp();
  const isHost = selectedRole === 'host';

  const handleViewMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setCurrentScreen('match-detail');
  };

  return (
    <MobileLayout noPadding className="pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 gradient-hero">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="font-heading text-xl font-semibold text-foreground">
              {user?.fullName?.split(' ')[0] || 'Friend'}
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {user?.fullName?.charAt(0) || 'U'}
            </span>
          </div>
        </div>

        {/* Verification Banner */}
        {user?.verificationStatus !== 'verified' && (
          <div className="p-3 rounded-xl bg-warm flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-warm-foreground/10 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-warm-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-warm-foreground">Complete verification</p>
              <p className="text-xs text-warm-foreground/70">Required to message matches</p>
            </div>
            <ChevronRight className="w-5 h-5 text-warm-foreground/50" />
          </div>
        )}

        {user?.verificationStatus === 'verified' && (
          <div className="p-3 rounded-xl bg-accent flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Fully verified</p>
              <p className="text-xs text-muted-foreground">You're ready to match!</p>
            </div>
            <Shield className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="px-5 py-4 grid grid-cols-3 gap-3">
        {[
          { icon: Heart, label: 'Matches', value: '12' },
          { icon: MessageCircle, label: 'Chats', value: '3' },
          { icon: Clock, label: 'Check-ins', value: '0' },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-xl bg-card shadow-card text-center">
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Top Matches */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Top Matches
          </h2>
          <button 
            onClick={() => setCurrentScreen('matches')}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {mockMatches.map((match, index) => (
            <button
              key={match.id}
              onClick={() => handleViewMatch(match.id)}
              className="w-full p-4 rounded-2xl bg-card shadow-card flex items-center gap-4 hover:shadow-elevated transition-all animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
                <span className="text-xl font-semibold text-primary">
                  {match.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">{match.name}</h3>
                <p className="text-sm text-muted-foreground">{match.location}</p>
              </div>

              <div className="text-right">
                <div className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
                  match.score >= 90 ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
                )}>
                  {match.score}% match
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 pt-6 pb-4">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="soft" 
            className="h-auto py-4 flex-col gap-2"
            onClick={() => setCurrentScreen('settings')}
          >
            <span className="text-sm font-medium">Edit Profile</span>
            <span className="text-xs text-muted-foreground">Update preferences</span>
          </Button>
          <Button 
            variant="soft" 
            className="h-auto py-4 flex-col gap-2"
            onClick={() => setCurrentScreen('resources')}
          >
            <span className="text-sm font-medium">Help & Safety</span>
            <span className="text-xs text-muted-foreground">Resources & guides</span>
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

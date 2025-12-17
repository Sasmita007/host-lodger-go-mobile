import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Search, Filter, Sparkles, MapPin, Heart, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const mockMatches = [
  { id: '1', name: 'Sarah Mitchell', score: 94, location: 'Newtown', bio: 'Early riser, loves cooking', logistical: 95, lifestyle: 92, personality: 94 },
  { id: '2', name: 'James Kennedy', score: 89, location: 'Marrickville', bio: 'Work from home, tidy', logistical: 88, lifestyle: 91, personality: 88 },
  { id: '3', name: 'Emma Liu', score: 87, location: 'Petersham', bio: 'Student, quiet lifestyle', logistical: 90, lifestyle: 85, personality: 86 },
  { id: '4', name: 'Michael Chen', score: 85, location: 'Stanmore', bio: 'Professional, organised', logistical: 82, lifestyle: 88, personality: 85 },
  { id: '5', name: 'Sophie Brown', score: 82, location: 'Enmore', bio: 'Creative, flexible hours', logistical: 80, lifestyle: 84, personality: 82 },
];

type TabType = 'all' | 'shortlisted';

export function MatchesScreen() {
  const { setCurrentScreen, setSelectedMatchId, selectedRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const isHost = selectedRole === 'host';

  const filteredMatches = mockMatches.filter(match => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || shortlisted.includes(match.id);
    return matchesSearch && matchesTab;
  });

  const handleViewMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setCurrentScreen('match-detail');
  };

  const toggleShortlist = (e: React.MouseEvent, matchId: string) => {
    e.stopPropagation();
    setShortlisted(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  return (
    <MobileLayout noPadding className="pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-background sticky top-0 z-10">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-4">
          Your Matches
        </h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['all', 'shortlisted'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {tab === 'all' ? 'All Matches' : `Shortlisted (${shortlisted.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="px-5 space-y-3">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No matches found</h3>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'shortlisted' 
                ? "You haven't shortlisted anyone yet" 
                : "Try adjusting your search"}
            </p>
          </div>
        ) : (
          filteredMatches.map((match, index) => (
            <button
              key={match.id}
              onClick={() => handleViewMatch(match.id)}
              className="w-full p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all animate-fade-up text-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center shrink-0">
                  <span className="text-2xl font-semibold text-primary">
                    {match.name.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{match.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {match.location}
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleShortlist(e, match.id)}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        shortlisted.includes(match.id)
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      )}
                    >
                      <Heart className={cn(
                        "w-4 h-4",
                        shortlisted.includes(match.id) && "fill-current"
                      )} />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 truncate">{match.bio}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <div className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
                      match.score >= 90 ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
                    )}>
                      <Sparkles className="w-3 h-3" />
                      {match.score}% match
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { User, Shield, Home, Bell, HelpCircle, LogOut, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const settingsGroups = [
  {
    title: 'Account',
    items: [
      { id: 'profile', icon: User, label: 'Edit Profile', subtitle: 'Update your preferences' },
      { id: 'home', icon: Home, label: 'Home Details', subtitle: 'Room and location settings' },
    ],
  },
  {
    title: 'Security',
    items: [
      { id: 'verification', icon: Shield, label: 'Verification Status', subtitle: 'View your verification' },
      { id: 'notifications', icon: Bell, label: 'Notification Settings', subtitle: 'Manage alerts' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', icon: HelpCircle, label: 'Help & Resources', subtitle: 'Safety guides and FAQ' },
    ],
  },
];

export function SettingsScreen() {
  const { user, setUser, setCurrentScreen, setSelectedRole } = useApp();

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    toast.success('Logged out successfully');
    setCurrentScreen('welcome');
  };

  const handleItemClick = (itemId: string) => {
    switch (itemId) {
      case 'profile':
      case 'home':
        toast.info('Profile editing coming soon');
        break;
      case 'verification':
        setCurrentScreen('verification');
        break;
      case 'notifications':
        toast.info('Notification settings coming soon');
        break;
      case 'help':
        setCurrentScreen('resources');
        break;
    }
  };

  return (
    <MobileLayout noPadding className="pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-background">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-6">
          Settings
        </h1>

        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-card shadow-card flex items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
            <span className="text-2xl font-semibold text-primary">
              {user?.fullName?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">{user?.fullName || 'User'}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex items-center gap-2 mt-1">
              {user?.verificationStatus === 'verified' ? (
                <span className="inline-flex items-center gap-1 text-xs text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-warm-foreground">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Pending Verification
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="px-5 py-4 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={group.title} className="animate-fade-up" style={{ animationDelay: `${groupIndex * 100}ms` }}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {group.title}
            </h3>
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === group.items.length - 1;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left",
                      !isLast && "border-b border-border"
                    )}
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="pt-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <Button
            variant="outline"
            size="lg"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground">
          Abode Match v1.0.0
        </p>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

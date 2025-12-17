import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Bell, Heart, MessageCircle, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockNotifications = [
  {
    id: '1',
    type: 'match',
    icon: Heart,
    title: 'New Match!',
    message: 'You have a new 92% match with Emma L.',
    time: '5m ago',
    read: false,
  },
  {
    id: '2',
    type: 'message',
    icon: MessageCircle,
    title: 'New Message',
    message: 'Sarah M. sent you a message',
    time: '1h ago',
    read: false,
  },
  {
    id: '3',
    type: 'verification',
    icon: Shield,
    title: 'Verification Complete',
    message: 'Your ID verification has been approved',
    time: '2h ago',
    read: true,
  },
  {
    id: '4',
    type: 'checkin',
    icon: Clock,
    title: '48-hour Check-in',
    message: 'How is everything going with Sarah?',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    icon: CheckCircle2,
    title: 'Profile Updated',
    message: 'Your preferences have been saved',
    time: '2 days ago',
    read: true,
  },
];

export function NotificationsScreen() {
  const { setCurrentScreen, setSelectedMatchId, setSelectedChatId } = useApp();

  const handleNotificationClick = (notification: typeof mockNotifications[0]) => {
    switch (notification.type) {
      case 'match':
        setSelectedMatchId('1');
        setCurrentScreen('match-detail');
        break;
      case 'message':
        setSelectedChatId('1');
        setCurrentScreen('chat');
        break;
      case 'verification':
        setCurrentScreen('settings');
        break;
      default:
        break;
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <MobileLayout noPadding className="pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-background sticky top-0 z-10 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-5 py-4">
        {mockNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {mockNotifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left transition-all animate-fade-up",
                    notification.read 
                      ? "bg-card hover:bg-muted" 
                      : "bg-accent shadow-card hover:shadow-elevated"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      notification.read ? "bg-muted" : "bg-primary/10"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        notification.read ? "text-muted-foreground" : "text-primary"
                      )} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={cn(
                          "font-semibold truncate",
                          notification.read ? "text-muted-foreground" : "text-foreground"
                        )}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm mt-0.5",
                        notification.read ? "text-muted-foreground/70" : "text-muted-foreground"
                      )}>
                        {notification.message}
                      </p>
                    </div>

                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

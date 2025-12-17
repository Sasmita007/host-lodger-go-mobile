import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { MessageCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockConversations = [
  { 
    id: '1', 
    name: 'Sarah Mitchell', 
    lastMessage: 'That sounds perfect! When would you like to meet?', 
    time: '2m ago',
    unread: 2,
    location: 'Newtown'
  },
  { 
    id: '2', 
    name: 'James Kennedy', 
    lastMessage: 'Thanks for the info about the room.', 
    time: '1h ago',
    unread: 0,
    location: 'Marrickville'
  },
  { 
    id: '3', 
    name: 'Emma Liu', 
    lastMessage: 'Hi! I saw your profile and think we might be a good match.', 
    time: 'Yesterday',
    unread: 0,
    location: 'Petersham'
  },
];

export function MessagesScreen() {
  const { setCurrentScreen, setSelectedChatId } = useApp();

  const handleOpenChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setCurrentScreen('chat');
  };

  return (
    <MobileLayout noPadding className="pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-background sticky top-0 z-10 border-b border-border">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Messages
        </h1>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5" />
          <span>All conversations are monitored for safety</span>
        </div>
      </div>

      {/* Conversations List */}
      <div className="px-5 py-4">
        {mockConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No messages yet</h3>
            <p className="text-sm text-muted-foreground">
              Start chatting with your matches
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {mockConversations.map((chat, index) => (
              <button
                key={chat.id}
                onClick={() => handleOpenChat(chat.id)}
                className="w-full p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all animate-fade-up text-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
                      <span className="text-xl font-semibold text-primary">
                        {chat.name.charAt(0)}
                      </span>
                    </div>
                    {chat.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary-foreground">{chat.unread}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={cn(
                        "font-semibold text-foreground truncate",
                        chat.unread > 0 && "text-foreground"
                      )}>
                        {chat.name}
                      </h3>
                      <span className={cn(
                        "text-xs shrink-0",
                        chat.unread > 0 ? "text-primary font-medium" : "text-muted-foreground"
                      )}>
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{chat.location}</p>
                    <p className={cn(
                      "text-sm mt-1 truncate",
                      chat.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

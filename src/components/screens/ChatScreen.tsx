import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, Shield, Send, Flag, MoreVertical, Phone, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const mockMessages = [
  { id: '1', senderId: 'other', content: 'Hi! I saw your profile and I think we could be a great match!', time: '10:30 AM' },
  { id: '2', senderId: 'me', content: 'Hello! Thanks for reaching out. Your place looks lovely.', time: '10:32 AM' },
  { id: '3', senderId: 'other', content: 'Thank you! It\'s a really nice area. Do you have any questions about the room or the area?', time: '10:33 AM' },
  { id: '4', senderId: 'me', content: 'Yes, I was wondering about the daily routine. What time do you usually get up?', time: '10:35 AM' },
  { id: '5', senderId: 'other', content: 'I\'m usually up around 6:30am for work. I try to keep the mornings quiet. How about you?', time: '10:36 AM' },
];

const mockContact = {
  id: '1',
  name: 'Sarah Mitchell',
  location: 'Newtown',
};

export function ChatScreen() {
  const { setCurrentScreen, selectedChatId } = useApp();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: String(messages.length + 1),
      senderId: 'me',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleReport = () => {
    toast.info('Report submitted. Our team will review this conversation.');
  };

  return (
    <MobileLayout noPadding className="flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-3 sticky top-0 z-10">
        <button 
          onClick={() => setCurrentScreen('messages')}
          className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
          <span className="text-lg font-semibold text-primary">
            {mockContact.name.charAt(0)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground truncate">{mockContact.name}</h2>
          <p className="text-xs text-muted-foreground">{mockContact.location}</p>
        </div>

        <button 
          onClick={handleReport}
          className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
        >
          <Flag className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Safety Banner */}
      <div className="px-4 py-2 bg-accent/50 flex items-center gap-2 text-xs">
        <Shield className="w-3.5 h-3.5 text-primary" />
        <span className="text-muted-foreground">
          In-app only • Phone numbers hidden until agreement
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.senderId === 'me' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5",
                message.senderId === 'me'
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card shadow-card text-foreground rounded-bl-md"
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={cn(
                "text-[10px] mt-1",
                message.senderId === 'me' 
                  ? "text-primary-foreground/70" 
                  : "text-muted-foreground"
              )}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-card border-t border-border safe-bottom">
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 h-11"
          />
          <Button 
            size="icon" 
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="h-11 w-11 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}

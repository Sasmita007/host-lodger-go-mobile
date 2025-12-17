import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  headerContent?: ReactNode;
  noPadding?: boolean;
}

export function MobileLayout({ 
  children, 
  className,
  showHeader = false,
  headerContent,
  noPadding = false 
}: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-top">
          {headerContent}
        </header>
      )}
      <main className={cn(
        "flex-1 flex flex-col",
        !noPadding && "px-5 py-6",
        className
      )}>
        {children}
      </main>
    </div>
  );
}

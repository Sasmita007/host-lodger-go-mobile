import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, User, VerificationStatus, MembershipStatus } from '@/types/user';

type AppScreen = 
  | 'splash'
  | 'welcome'
  | 'role-selection'
  | 'trust-surface'
  | 'register'
  | 'login'
  | 'membership'
  | 'verification'
  | 'profile-setup'
  | 'dashboard'
  | 'matches'
  | 'match-detail'
  | 'messages'
  | 'chat'
  | 'notifications'
  | 'settings'
  | 'resources';

interface AppContextType {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  profileStep: number;
  setProfileStep: (step: number) => void;
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string | null) => void;
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profileStep, setProfileStep] = useState(1);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const isAuthenticated = user !== null;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedRole,
        setSelectedRole,
        user,
        setUser,
        isAuthenticated,
        profileStep,
        setProfileStep,
        selectedMatchId,
        setSelectedMatchId,
        selectedChatId,
        setSelectedChatId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

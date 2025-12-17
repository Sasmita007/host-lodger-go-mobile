import React from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { RoleSelectionScreen } from '@/components/screens/RoleSelectionScreen';
import { TrustSurfaceScreen } from '@/components/screens/TrustSurfaceScreen';
import { RegisterScreen } from '@/components/screens/RegisterScreen';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { MembershipScreen } from '@/components/screens/MembershipScreen';
import { VerificationScreen } from '@/components/screens/VerificationScreen';
import { ProfileSetupScreen } from '@/components/screens/ProfileSetupScreen';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { MatchesScreen } from '@/components/screens/MatchesScreen';
import { MatchDetailScreen } from '@/components/screens/MatchDetailScreen';
import { MessagesScreen } from '@/components/screens/MessagesScreen';
import { ChatScreen } from '@/components/screens/ChatScreen';
import { NotificationsScreen } from '@/components/screens/NotificationsScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { ResourcesScreen } from '@/components/screens/ResourcesScreen';
import { AgreementScreen } from '@/components/screens/AgreementScreen';

function AppContent() {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'welcome':
        return <WelcomeScreen />;
      case 'role-selection':
        return <RoleSelectionScreen />;
      case 'trust-surface':
        return <TrustSurfaceScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'login':
        return <LoginScreen />;
      case 'membership':
        return <MembershipScreen />;
      case 'verification':
        return <VerificationScreen />;
      case 'profile-setup':
        return <ProfileSetupScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'matches':
        return <MatchesScreen />;
      case 'match-detail':
        return <MatchDetailScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'resources':
        return <ResourcesScreen />;
      case 'agreement':
        return <AgreementScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;

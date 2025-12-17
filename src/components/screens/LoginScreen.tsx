import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, Eye, EyeOff, Home } from 'lucide-react';
import { toast } from 'sonner';

export function LoginScreen() {
  const { setCurrentScreen, setUser, setSelectedRole } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isValid = formData.email && formData.password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // Mock login - create user with completed profile
    setSelectedRole('lodger');
    setUser({
      id: '1',
      fullName: 'Demo User',
      email: formData.email,
      role: 'lodger',
      membershipStatus: 'active',
      verificationStatus: 'verified',
      profileComplete: true,
      createdAt: new Date(),
    });

    toast.success('Welcome back!');
    setCurrentScreen('dashboard');
  };

  return (
    <MobileLayout>
      <button 
        onClick={() => setCurrentScreen('welcome')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="flex-1 flex flex-col">
        <div className="animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <Home className="w-7 h-7 text-primary-foreground" />
          </div>
          
          <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Log in to continue finding your perfect match.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 animate-fade-up [animation-delay:100ms]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
              <button 
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit"
            size="xl" 
            className="w-full mt-6"
            disabled={!isValid}
          >
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-up [animation-delay:200ms]">
          Don't have an account?{' '}
          <button 
            onClick={() => setCurrentScreen('role-selection')}
            className="text-primary font-medium hover:underline"
          >
            Get Started
          </button>
        </p>
      </div>
    </MobileLayout>
  );
}

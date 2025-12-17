import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export function RegisterScreen() {
  const { setCurrentScreen, selectedRole, setUser } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const isValid = formData.fullName && formData.email && formData.password.length >= 8 && formData.acceptTerms && formData.acceptPrivacy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // Create mock user
    setUser({
      id: '1',
      fullName: formData.fullName,
      email: formData.email,
      role: selectedRole!,
      membershipStatus: 'inactive',
      verificationStatus: 'pending',
      profileComplete: false,
      createdAt: new Date(),
    });

    toast.success('Account created successfully!');
    setCurrentScreen('membership');
  };

  return (
    <MobileLayout>
      <button 
        onClick={() => setCurrentScreen('trust-surface')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="animate-fade-in">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Join as a {selectedRole === 'host' ? 'Host' : 'Lodger'} and find your match.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 animate-fade-up [animation-delay:100ms]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="h-12"
          />
        </div>

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
          <label className="text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
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

        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              I agree to the <span className="text-primary underline">Terms of Service</span>
            </label>
          </div>
          
          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              checked={formData.acceptPrivacy}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
              className="mt-0.5"
            />
            <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
              I consent to the <span className="text-primary underline">Privacy Policy</span>
            </label>
          </div>
        </div>

        <Button 
          type="submit"
          size="xl" 
          className="w-full mt-6"
          disabled={!isValid}
        >
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-up [animation-delay:200ms]">
        Already have an account?{' '}
        <button 
          onClick={() => setCurrentScreen('login')}
          className="text-primary font-medium hover:underline"
        >
          Log In
        </button>
      </p>
    </MobileLayout>
  );
}

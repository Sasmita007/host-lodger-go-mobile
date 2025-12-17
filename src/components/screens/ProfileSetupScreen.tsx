import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Home, Sun, Sparkles, Users, Coffee } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

const totalSteps = 3;

export function ProfileSetupScreen() {
  const { setCurrentScreen, user, setUser, selectedRole, profileStep, setProfileStep } = useApp();
  const [formData, setFormData] = useState({
    location: '',
    availableFrom: '',
    roomType: '',
    dailyRhythm: 'early',
    cleanliness: 3,
    guestsPolicy: 'occasional',
    socialEnergy: 3,
    communicationStyle: 'casual',
  });

  const isHost = selectedRole === 'host';

  const handleNext = () => {
    if (profileStep < totalSteps) {
      setProfileStep(profileStep + 1);
    } else {
      // Complete profile
      if (user) {
        setUser({ ...user, profileComplete: true });
      }
      toast.success('Profile complete!');
      setCurrentScreen('dashboard');
    }
  };

  const handleBack = () => {
    if (profileStep > 1) {
      setProfileStep(profileStep - 1);
    } else {
      setCurrentScreen('verification');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          {isHost ? 'Where is your home?' : 'Preferred area'}
        </label>
        <Input
          type="text"
          placeholder="e.g., Sydney Inner West"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          {isHost ? 'Available from' : 'Move-in date'}
        </label>
        <Input
          type="date"
          value={formData.availableFrom}
          onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
          className="h-12"
        />
      </div>

      {isHost && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            Room type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Private Room', 'Shared Room', 'Whole Unit', 'Granny Flat'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, roomType: type })}
                className={cn(
                  "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                  formData.roomType === type
                    ? "border-primary bg-accent text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Sun className="w-4 h-4 text-primary" />
          Daily rhythm
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'early', label: 'Early Bird' },
            { id: 'regular', label: 'Regular' },
            { id: 'night', label: 'Night Owl' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFormData({ ...formData, dailyRhythm: option.id })}
              className={cn(
                "p-3 rounded-xl border-2 text-xs font-medium transition-all",
                formData.dailyRhythm === option.id
                  ? "border-primary bg-accent text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Cleanliness level
        </label>
        <div className="px-2">
          <Slider
            value={[formData.cleanliness]}
            onValueChange={(v) => setFormData({ ...formData, cleanliness: v[0] })}
            min={1}
            max={5}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Relaxed</span>
            <span>Very Tidy</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Guests policy
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'rarely', label: 'Rarely' },
            { id: 'occasional', label: 'Sometimes' },
            { id: 'often', label: 'Often' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFormData({ ...formData, guestsPolicy: option.id })}
              className={cn(
                "p-3 rounded-xl border-2 text-xs font-medium transition-all",
                formData.guestsPolicy === option.id
                  ? "border-primary bg-accent text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Coffee className="w-4 h-4 text-primary" />
          Social energy
        </label>
        <div className="px-2">
          <Slider
            value={[formData.socialEnergy]}
            onValueChange={(v) => setFormData({ ...formData, socialEnergy: v[0] })}
            min={1}
            max={5}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Private</span>
            <span>Very Social</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Communication style</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'casual', label: 'Casual', desc: 'Friendly chat when we cross paths' },
            { id: 'planned', label: 'Planned', desc: 'Prefer scheduled catch-ups' },
            { id: 'minimal', label: 'Minimal', desc: 'Keep to ourselves mostly' },
            { id: 'open', label: 'Open', desc: 'Love a good yarn anytime' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFormData({ ...formData, communicationStyle: option.id })}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                formData.communicationStyle === option.id
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              <span className="text-sm font-medium text-foreground">{option.label}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            Step {profileStep} of {totalSteps}
          </span>
          <span className="text-xs font-medium text-primary">
            {Math.round((profileStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(profileStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          {profileStep === 1 && (isHost ? 'About your space' : 'Where are you looking?')}
          {profileStep === 2 && 'Your lifestyle preferences'}
          {profileStep === 3 && 'Communication & social'}
        </h1>
        <p className="text-muted-foreground text-sm">
          {profileStep === 1 && 'Help us find the right match for you.'}
          {profileStep === 2 && 'These help us match compatible lifestyles.'}
          {profileStep === 3 && "Almost done! Tell us how you like to connect."}
        </p>
      </div>

      <div className="flex-1">
        {profileStep === 1 && renderStep1()}
        {profileStep === 2 && renderStep2()}
        {profileStep === 3 && renderStep3()}
      </div>

      <div className="pt-6">
        <Button 
          size="xl" 
          className="w-full"
          onClick={handleNext}
        >
          {profileStep === totalSteps ? 'Complete Profile' : 'Continue'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </MobileLayout>
  );
}

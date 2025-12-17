export type UserRole = 'host' | 'lodger';

export type VerificationStatus = 'pending' | 'verified' | 'failed';

export type MembershipStatus = 'inactive' | 'active';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  membershipStatus: MembershipStatus;
  verificationStatus: VerificationStatus;
  profileComplete: boolean;
  createdAt: Date;
}

export interface HostProfile {
  userId: string;
  locationArea: string;
  roomDescription: string;
  availabilityStart: Date;
  availabilityEnd?: Date;
  dailyRhythms: string;
  cleanlinessLevel: number;
  guestsPolicy: string;
  foodPreparation: string;
  communicationStyle: string;
  socialEnergy: number;
  boundaryNotes: string;
}

export interface LodgerProfile {
  userId: string;
  preferredAreas: string[];
  budgetRange: { min: number; max: number };
  moveInDate: Date;
  stayDuration: string;
  dailyRhythms: string;
  cleanlinessLevel: number;
  guestsPolicy: string;
  foodPreparation: string;
  communicationStyle: string;
  socialEnergy: number;
  boundaryNotes: string;
}

export interface Match {
  id: string;
  hostId: string;
  lodgerId: string;
  compatibilityScore: number;
  whyItWorks: string;
  logisticalFit: number;
  lifestyleFit: number;
  personalityFit: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  flagged: boolean;
}

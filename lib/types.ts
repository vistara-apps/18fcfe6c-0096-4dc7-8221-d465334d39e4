export interface User {
  userId: string;
  username?: string;
  moodState: MoodType;
  associatedNFTs: string[];
  followerCount: number;
  followingCount: number;
  createdAt: Date;
}

export interface Post {
  postId: string;
  authorId: string;
  content: string;
  moodTag: MoodType;
  timestamp: Date;
  likes: number;
  comments: number;
  isAnonymous: boolean;
}

export interface Subscription {
  subscriptionId: string;
  creatorId: string;
  subscriberId: string;
  tierName: string;
  startDate: Date;
  endDate?: Date;
  paymentToken: string;
}

export interface NFTCollection {
  contractAddress: string;
  name: string;
  description: string;
  perkType: 'exclusive_access' | 'governance_role' | 'cosmetic';
}

export type MoodType = 'happy' | 'sad' | 'focused' | 'excited' | 'calm' | 'neutral';

export interface MoodConfig {
  emoji: string;
  color: string;
  glowClass: string;
  description: string;
}

export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  happy: {
    emoji: '😊',
    color: 'text-yellow-400',
    glowClass: 'mood-glow-happy',
    description: 'Feeling positive and optimistic'
  },
  sad: {
    emoji: '😢',
    color: 'text-blue-400',
    glowClass: 'mood-glow-sad',
    description: 'Feeling down or contemplative'
  },
  focused: {
    emoji: '🎯',
    color: 'text-green-400',
    glowClass: 'mood-glow-focused',
    description: 'In the zone and productive'
  },
  excited: {
    emoji: '🚀',
    color: 'text-pink-400',
    glowClass: 'mood-glow-excited',
    description: 'High energy and enthusiastic'
  },
  calm: {
    emoji: '🧘',
    color: 'text-purple-400',
    glowClass: 'mood-glow-calm',
    description: 'Peaceful and centered'
  },
  neutral: {
    emoji: '😐',
    color: 'text-gray-400',
    glowClass: '',
    description: 'Balanced and steady'
  }
};

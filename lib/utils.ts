import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

export function generateMockData() {
  const mockPosts = [
    {
      postId: '1',
      authorId: 'anon1',
      content: 'Just deployed my first smart contract on Base! The gas fees are so much better than mainnet. Feeling bullish on L2s 🚀',
      moodTag: 'excited' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      likes: 24,
      comments: 8,
      isAnonymous: true
    },
    {
      postId: '2',
      authorId: 'anon2',
      content: 'Market is bleeding again... but this is when the real builders keep building. Diamond hands 💎',
      moodTag: 'focused' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      likes: 156,
      comments: 42,
      isAnonymous: true
    },
    {
      postId: '3',
      authorId: 'anon3',
      content: 'Anyone else feeling overwhelmed by all the new protocols launching? Sometimes I miss the simple DeFi summer days...',
      moodTag: 'sad' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      likes: 89,
      comments: 23,
      isAnonymous: true
    },
    {
      postId: '4',
      authorId: 'anon4',
      content: 'Meditation before trading has changed my game completely. Staying calm in this volatility is key 🧘‍♂️',
      moodTag: 'calm' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      likes: 67,
      comments: 15,
      isAnonymous: true
    },
    {
      postId: '5',
      authorId: 'anon5',
      content: 'GM Web3 fam! Coffee brewing, charts loading, ready to build the future ☕️',
      moodTag: 'happy' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      likes: 203,
      comments: 56,
      isAnonymous: true
    }
  ]

  return { posts: mockPosts }
}

'use client'

import { User } from '@/lib/types'
import { MoodIndicator } from './MoodIndicator'
import { cn } from '@/lib/utils'
import { Settings, Bell, Share } from 'lucide-react'

interface ProfileHeaderProps {
  user?: User
  variant?: 'withNFTs' | 'minimal'
  className?: string
}

export function ProfileHeader({ user, variant = 'minimal', className }: ProfileHeaderProps) {
  if (!user) {
    return (
      <div className={cn(
        'glass-effect rounded-lg p-6 text-center',
        className
      )}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">?</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Anonymous User</h2>
        <p className="text-text-secondary">Connect your wallet to personalize your experience</p>
      </div>
    )
  }

  return (
    <div className={cn(
      'glass-effect rounded-lg p-6',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xl font-bold">
              {user.username?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold">
              {user.username || 'Anonymous Builder'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <MoodIndicator 
                mood={user.moodState} 
                variant="expressive" 
                size="sm" 
                showLabel 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-white/10 transition-colors">
            <Bell size={16} />
          </button>
          <button className="p-2 rounded-md hover:bg-white/10 transition-colors">
            <Share size={16} />
          </button>
          <button className="p-2 rounded-md hover:bg-white/10 transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm text-text-secondary">
        <span>{user.followerCount} followers</span>
        <span>{user.followingCount} following</span>
        {variant === 'withNFTs' && (
          <span>{user.associatedNFTs.length} NFTs</span>
        )}
      </div>

      {variant === 'withNFTs' && user.associatedNFTs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-medium mb-2">NFT Collection</h3>
          <div className="flex gap-2">
            {user.associatedNFTs.slice(0, 3).map((nft, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded bg-gradient-to-br from-accent to-primary"
              />
            ))}
            {user.associatedNFTs.length > 3 && (
              <div className="w-8 h-8 rounded bg-surface border border-white/20 flex items-center justify-center text-xs">
                +{user.associatedNFTs.length - 3}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

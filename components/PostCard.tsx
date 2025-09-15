'use client'

import { Post } from '@/lib/types'
import { MoodIndicator } from './MoodIndicator'
import { formatTimeAgo, cn } from '@/lib/utils'
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react'

interface PostCardProps {
  post: Post
  variant?: 'default' | 'anonymous'
  className?: string
}

export function PostCard({ post, variant = 'default', className }: PostCardProps) {
  return (
    <div className={cn(
      'glass-effect rounded-lg p-6 transition-all duration-300 hover:glow-effect',
      'border border-white/10 hover:border-white/20',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {variant === 'anonymous' ? (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-semibold">?</span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface border border-white/20" />
          )}
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary text-sm">
                {variant === 'anonymous' ? 'Anonymous' : 'Web3 Builder'}
              </span>
              <MoodIndicator mood={post.moodTag} variant="expressive" size="sm" />
            </div>
            <span className="text-text-secondary text-xs">
              {formatTimeAgo(post.timestamp)}
            </span>
          </div>
        </div>
        
        <button className="text-text-secondary hover:text-text-primary transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-text-primary leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors group">
            <Heart size={16} className="group-hover:fill-current" />
            <span className="text-sm">{post.likes}</span>
          </button>
          
          <button className="flex items-center gap-2 text-text-secondary hover:text-blue-400 transition-colors">
            <MessageCircle size={16} />
            <span className="text-sm">{post.comments}</span>
          </button>
          
          <button className="flex items-center gap-2 text-text-secondary hover:text-green-400 transition-colors">
            <Share size={16} />
          </button>
        </div>
        
        <MoodIndicator 
          mood={post.moodTag} 
          variant="minimal" 
          size="sm" 
          showLabel 
        />
      </div>
    </div>
  )
}

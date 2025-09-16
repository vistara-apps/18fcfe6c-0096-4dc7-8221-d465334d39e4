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
      'glass-effect rounded-xl p-6 transition-all duration-500 group',
      'border border-white/10 hover:border-white/20',
      'hover:glass-effect-elevated hover:transform hover:-translate-y-1',
      'interactive animate-fade-in-up',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {variant === 'anonymous' ? (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-lg font-bold">?</span>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-surface to-surface-elevated border border-white/20 shadow-md group-hover:shadow-lg transition-all duration-300" />
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
        
        <button className="text-text-secondary hover:text-text-primary transition-all duration-300 p-2 rounded-lg hover:bg-white/10 group-hover:scale-110">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-text-primary leading-relaxed text-base group-hover:text-opacity-90 transition-all duration-300">
          {post.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-text-secondary hover:text-red-400 transition-all duration-300 p-2 rounded-lg hover:bg-red-400/10 group/like">
            <Heart size={18} className="group-hover/like:fill-current group-hover/like:scale-110 transition-all duration-300" />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          
          <button className="flex items-center gap-2 text-text-secondary hover:text-blue-400 transition-all duration-300 p-2 rounded-lg hover:bg-blue-400/10 group/comment">
            <MessageCircle size={18} className="group-hover/comment:scale-110 transition-all duration-300" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          
          <button className="flex items-center gap-2 text-text-secondary hover:text-green-400 transition-all duration-300 p-2 rounded-lg hover:bg-green-400/10 group/share">
            <Share size={18} className="group-hover/share:scale-110 transition-all duration-300" />
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

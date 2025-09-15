'use client'

import { MoodType, MOOD_CONFIGS } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MoodIndicatorProps {
  mood: MoodType
  variant?: 'minimal' | 'expressive'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function MoodIndicator({ 
  mood, 
  variant = 'minimal', 
  size = 'md',
  showLabel = false,
  className 
}: MoodIndicatorProps) {
  const config = MOOD_CONFIGS[mood]
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-12 h-12 text-xl'
  }

  return (
    <div className={cn(
      'flex items-center gap-2',
      className
    )}>
      <div className={cn(
        'rounded-full flex items-center justify-center transition-all duration-300',
        sizeClasses[size],
        variant === 'expressive' && config.glowClass,
        variant === 'expressive' && 'animate-pulse-glow'
      )}>
        <span className={cn(
          'select-none',
          config.color
        )}>
          {config.emoji}
        </span>
      </div>
      
      {showLabel && (
        <span className={cn(
          'text-sm capitalize',
          config.color
        )}>
          {mood}
        </span>
      )}
    </div>
  )
}

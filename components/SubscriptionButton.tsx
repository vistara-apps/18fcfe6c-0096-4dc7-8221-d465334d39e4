'use client'

import { cn } from '@/lib/utils'
import { Crown, Zap } from 'lucide-react'

interface SubscriptionButtonProps {
  variant?: 'primary' | 'secondary'
  tier?: string
  price?: string
  isSubscribed?: boolean
  onClick?: () => void
  className?: string
}

export function SubscriptionButton({ 
  variant = 'primary',
  tier = 'Premium',
  price = '0.01 ETH',
  isSubscribed = false,
  onClick,
  className 
}: SubscriptionButtonProps) {
  if (isSubscribed) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
          'bg-green-600/20 border border-green-500/30 text-green-400',
          'hover:bg-green-600/30 hover:border-green-500/50',
          className
        )}
      >
        <Crown size={16} />
        <span className="text-sm font-medium">Subscribed</span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
        'hover:scale-105 active:scale-95',
        variant === 'primary' && [
          'bg-gradient-to-r from-primary to-accent',
          'hover:from-primary/80 hover:to-accent/80',
          'text-white font-medium shadow-lg'
        ],
        variant === 'secondary' && [
          'glass-effect border border-white/20',
          'hover:border-white/40 text-text-primary'
        ],
        className
      )}
    >
      <Zap size={16} />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">{tier}</span>
        <span className="text-xs opacity-80">{price}/month</span>
      </div>
    </button>
  )
}

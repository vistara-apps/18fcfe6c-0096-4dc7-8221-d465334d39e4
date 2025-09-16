'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'pulse' | 'dots'
  className?: string
}

export function LoadingSpinner({ size = 'md', variant = 'default', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              'rounded-full bg-primary animate-bounce',
              size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
            )}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn(
        'rounded-full bg-gradient-to-r from-primary to-accent animate-pulse',
        sizeClasses[size],
        className
      )} />
    )
  }

  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-primary/20 border-t-primary',
      sizeClasses[size],
      className
    )} />
  )
}
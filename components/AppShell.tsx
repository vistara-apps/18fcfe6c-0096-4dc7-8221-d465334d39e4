'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: ReactNode
  variant?: 'default' | 'glass'
  className?: string
}

export function AppShell({ children, variant = 'default', className }: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen w-full',
      variant === 'glass' && 'glass-effect',
      className
    )}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        {children}
      </div>
    </div>
  )
}

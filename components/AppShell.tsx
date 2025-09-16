'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { WalletConnect } from './WalletConnect'

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
        {/* Header with wallet connection */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">MoodNet</h1>
            <p className="text-sm text-gray-400">Anonymous Web3 Conversations</p>
          </div>
          <WalletConnect />
        </header>
        
        {children}
      </div>
    </div>
  )
}

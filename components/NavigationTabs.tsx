'use client'

import { cn } from '@/lib/utils'
import { Home, Compass, User, Plus } from 'lucide-react'

interface NavigationTabsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  variant?: 'default'
  className?: string
}

export function NavigationTabs({ 
  activeTab = 'feed',
  onTabChange,
  variant = 'default',
  className 
}: NavigationTabsProps) {
  const tabs = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'create', label: 'Create', icon: Plus },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className={cn(
      'glass-effect-elevated rounded-xl p-3',
      'border border-white/10 shadow-lg',
      'animate-fade-in-up',
      className
    )}>
      <div className="flex items-center justify-between gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300',
                'hover:bg-white/10 hover:scale-105 active:scale-95',
                'relative overflow-hidden group',
                isActive && [
                  'bg-gradient-to-r from-primary/20 to-accent/20',
                  'border border-primary/30 text-primary shadow-lg',
                  'glow-effect'
                ],
                !isActive && 'text-text-secondary hover:text-text-primary'
              )}
            >
              {/* Shimmer effect for active tab */}
              {isActive && (
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
                </div>
              )}
              
              <Icon size={18} className={cn(
                'transition-all duration-300',
                isActive && 'animate-bounce-subtle'
              )} />
              <span className="text-sm font-semibold hidden sm:inline relative z-10">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

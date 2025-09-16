'use client'

import { cn } from '@/lib/utils'
import { Home, Compass, User, Plus, CreditCard } from 'lucide-react'

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
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className={cn(
      'glass-effect rounded-lg p-2',
      'border border-white/10',
      className
    )}>
      <div className="flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
                'hover:bg-white/10',
                isActive && [
                  'bg-gradient-to-r from-primary/20 to-accent/20',
                  'border border-primary/30 text-primary'
                ],
                !isActive && 'text-text-secondary hover:text-text-primary'
              )}
            >
              <Icon size={16} />
              <span className="text-sm font-medium hidden sm:inline">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'

export interface ToastProps {
  id: string
  title: string
  description?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onRemove: (id: string) => void
}

export function Toast({ id, title, description, type = 'info', duration = 5000, onRemove }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true)

    // Auto-remove after duration
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(id), 300) // Wait for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onRemove])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: 'border-green-500/30 bg-green-500/10 text-green-400',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
    warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    info: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  }

  const Icon = icons[type]

  return (
    <div className={cn(
      'glass-effect-elevated rounded-xl p-4 border shadow-lg',
      'transition-all duration-300 transform',
      'max-w-sm w-full',
      colors[type],
      isVisible 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-full opacity-0 scale-95'
    )}>
      <div className="flex items-start gap-3">
        <Icon size={20} className="flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-text-primary">{title}</h4>
          {description && (
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onRemove(id), 300)
          }}
          className="flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors p-1 rounded-md hover:bg-white/10"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastProps[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  )
}
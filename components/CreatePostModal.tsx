'use client'

import { useState } from 'react'
import { MoodType } from '@/lib/types'
import { MoodSelector } from './MoodSelector'
import { cn } from '@/lib/utils'
import { X, Send } from 'lucide-react'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string, mood: MoodType, isAnonymous: boolean) => void
  className?: string
}

export function CreatePostModal({ isOpen, onClose, onSubmit, className }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [selectedMood, setSelectedMood] = useState<MoodType>('neutral')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(content, selectedMood, isAnonymous)
      setContent('')
      setSelectedMood('neutral')
      onClose()
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className={cn(
        'relative w-full max-w-lg glass-effect rounded-lg p-6',
        'border border-white/20 shadow-2xl',
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Input */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts with the Web3 community..."
              className={cn(
                'w-full h-32 p-4 rounded-md resize-none',
                'glass-effect border border-white/20',
                'bg-transparent text-text-primary placeholder-text-secondary',
                'focus:outline-none focus:border-primary/50'
              )}
              maxLength={280}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-text-secondary">
                {content.length}/280
              </span>
            </div>
          </div>

          {/* Mood Selector */}
          <MoodSelector
            selectedMood={selectedMood}
            onMoodChange={setSelectedMood}
          />

          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between p-4 glass-effect rounded-md border border-white/10">
            <div>
              <h4 className="text-sm font-medium">Post Anonymously</h4>
              <p className="text-xs text-text-secondary">
                Hide your identity for this post
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={cn(
                'w-12 h-6 rounded-full transition-all duration-300',
                'relative flex items-center',
                isAnonymous ? 'bg-primary' : 'bg-surface border border-white/20'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-full bg-white transition-transform duration-300',
                isAnonymous ? 'translate-x-6' : 'translate-x-0.5'
              )} />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 rounded-md',
              'bg-gradient-to-r from-primary to-accent text-white font-medium',
              'hover:from-primary/80 hover:to-accent/80 transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:scale-105 active:scale-95'
            )}
          >
            <Send size={16} />
            {isSubmitting ? 'Posting...' : 'Post to MoodNet'}
          </button>
        </form>
      </div>
    </div>
  )
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className={cn(
        'relative w-full max-w-lg glass-effect-elevated rounded-2xl p-8',
        'border border-white/20 shadow-2xl animate-scale-in',
        'max-h-[90vh] overflow-y-auto',
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Create Post
            </h2>
            <p className="text-text-secondary text-sm mt-1">Share your thoughts with the Web3 community</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-primary">What's on your mind?</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts with the Web3 community..."
              className={cn(
                'w-full h-36 p-4 rounded-xl resize-none',
                'glass-effect border border-white/20',
                'bg-transparent text-text-primary placeholder-text-secondary',
                'focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
                'transition-all duration-300'
              )}
              maxLength={280}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={cn(
                  'w-2 h-2 rounded-full transition-colors duration-300',
                  content.length < 200 ? 'bg-green-400' : 
                  content.length < 260 ? 'bg-yellow-400' : 'bg-red-400'
                )} />
                <span className="text-xs text-text-secondary">
                  {content.length}/280 characters
                </span>
              </div>
            </div>
          </div>

          {/* Mood Selector */}
          <MoodSelector
            selectedMood={selectedMood}
            onMoodChange={setSelectedMood}
          />

          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between p-5 glass-effect rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-lg">🎭</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Post Anonymously</h4>
                <p className="text-xs text-text-secondary">
                  Hide your identity for this post
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={cn(
                'w-14 h-7 rounded-full transition-all duration-300 relative',
                'hover:scale-105 active:scale-95',
                isAnonymous ? 'bg-gradient-to-r from-primary to-accent shadow-lg' : 'bg-surface border border-white/20'
              )}
            >
              <div className={cn(
                'w-6 h-6 rounded-full bg-white transition-all duration-300 shadow-md',
                'flex items-center justify-center',
                isAnonymous ? 'translate-x-7' : 'translate-x-0.5'
              )}>
                {isAnonymous ? '✓' : '○'}
              </div>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className={cn(
              'w-full flex items-center justify-center gap-3 py-4 rounded-xl',
              'bg-gradient-to-r from-primary to-accent text-white font-semibold text-base',
              'hover:from-primary/90 hover:to-accent/90 transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
              'relative overflow-hidden group',
              !content.trim() || isSubmitting ? '' : 'glow-effect'
            )}
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
            </div>
            
            <Send size={18} className={cn(
              'transition-all duration-300 relative z-10',
              isSubmitting && 'animate-pulse'
            )} />
            <span className="relative z-10">
              {isSubmitting ? 'Posting...' : 'Post to MoodNet'}
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}

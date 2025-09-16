'use client'

import { MoodType, MOOD_CONFIGS } from '@/lib/types'
import { MoodIndicator } from './MoodIndicator'
import { cn } from '@/lib/utils'

interface MoodSelectorProps {
  selectedMood: MoodType
  onMoodChange: (mood: MoodType) => void
  className?: string
}

export function MoodSelector({ selectedMood, onMoodChange, className }: MoodSelectorProps) {
  const moods = Object.keys(MOOD_CONFIGS) as MoodType[]

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <span className="text-lg">💭</span>
        <h3 className="text-sm font-semibold text-text-primary">How are you feeling?</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodChange(mood)}
            className={cn(
              'p-4 rounded-xl transition-all duration-300 group',
              'glass-effect border hover:border-white/30',
              'hover:scale-105 active:scale-95',
              'hover:glass-effect-elevated',
              selectedMood === mood 
                ? 'border-primary/50 bg-primary/10 glow-effect scale-105' 
                : 'border-white/10'
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <MoodIndicator 
                mood={mood} 
                variant={selectedMood === mood ? 'expressive' : 'minimal'}
                size="md"
                className={cn(
                  'transition-all duration-300',
                  selectedMood === mood && 'animate-bounce-subtle'
                )}
              />
              <span className={cn(
                'text-xs capitalize font-medium transition-all duration-300',
                selectedMood === mood ? 'text-primary' : 'text-text-secondary'
              )}>
                {mood}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

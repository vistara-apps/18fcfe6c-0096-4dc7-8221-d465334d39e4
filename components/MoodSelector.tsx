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
    <div className={cn('space-y-3', className)}>
      <h3 className="text-sm font-medium text-text-primary">How are you feeling?</h3>
      <div className="grid grid-cols-3 gap-2">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodChange(mood)}
            className={cn(
              'p-3 rounded-md transition-all duration-300',
              'glass-effect border hover:border-white/30',
              selectedMood === mood 
                ? 'border-primary/50 bg-primary/10' 
                : 'border-white/10'
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <MoodIndicator 
                mood={mood} 
                variant={selectedMood === mood ? 'expressive' : 'minimal'}
                size="md"
              />
              <span className="text-xs capitalize text-text-secondary">
                {mood}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

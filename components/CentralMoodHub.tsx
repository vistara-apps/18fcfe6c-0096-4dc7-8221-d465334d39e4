'use client'

import { MoodType, MOOD_CONFIGS } from '@/lib/types'
import { MoodIndicator } from './MoodIndicator'
import { cn } from '@/lib/utils'

interface CentralMoodHubProps {
  currentMood: MoodType
  onMoodChange: (mood: MoodType) => void
  className?: string
}

export function CentralMoodHub({ currentMood, onMoodChange, className }: CentralMoodHubProps) {
  const moods = Object.keys(MOOD_CONFIGS) as MoodType[]

  return (
    <div className={cn(
      'relative flex items-center justify-center',
      'w-80 h-80 mx-auto',
      className
    )}>
      {/* Central Hub */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-44 h-44 rounded-full border-2 border-primary/30 animate-pulse-glow shadow-2xl" />
        
        {/* Middle Ring */}
        <div className="absolute inset-4 rounded-full border border-accent/40 animate-spin shadow-lg" 
             style={{ animationDuration: '25s' }} />
        
        {/* Inner Core */}
        <div className="absolute inset-8 rounded-full glass-effect-elevated border border-white/20 flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <MoodIndicator 
            mood={currentMood} 
            variant="expressive" 
            size="lg"
            className="relative z-10 group-hover:scale-110 transition-all duration-300"
          />
        </div>
      </div>

      {/* Orbiting Mood Nodes */}
      {moods.map((mood, index) => {
        const angle = (index * 360) / moods.length
        const isActive = mood === currentMood
        
        return (
          <button
            key={mood}
            onClick={() => onMoodChange(mood)}
            className={cn(
              'absolute w-14 h-14 rounded-full transition-all duration-500',
              'glass-effect-elevated border hover:scale-125 active:scale-110',
              'shadow-lg hover:shadow-xl',
              isActive 
                ? 'border-primary/50 bg-primary/20 scale-125 glow-effect' 
                : 'border-white/20 hover:border-white/40',
              'animate-orbit group'
            )}
            style={{
              transform: `rotate(${angle}deg) translateX(130px) rotate(-${angle}deg)`,
              animationDelay: `${index * -4}s`
            }}
          >
            <MoodIndicator 
              mood={mood} 
              variant={isActive ? 'expressive' : 'minimal'}
              size="sm"
              className={cn(
                'group-hover:scale-110 transition-all duration-300',
                isActive && 'animate-bounce-subtle'
              )}
            />
          </button>
        )
      })}

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {moods.map((mood, index) => {
          const angle = (index * 360) / moods.length
          const x1 = 160 + Math.cos((angle * Math.PI) / 180) * 60
          const y1 = 160 + Math.sin((angle * Math.PI) / 180) * 60
          const x2 = 160 + Math.cos((angle * Math.PI) / 180) * 120
          const y2 = 160 + Math.sin((angle * Math.PI) / 180) * 120
          
          return (
            <line
              key={mood}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
              className="animate-pulse"
            />
          )
        })}
      </svg>
    </div>
  )
}

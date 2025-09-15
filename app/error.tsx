'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto">
          <span className="text-red-400 text-2xl">!</span>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">
            Something went wrong!
          </h2>
          <p className="text-text-secondary">
            We encountered an error while loading MoodNet. Please try again.
          </p>
        </div>

        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-md hover:from-primary/80 hover:to-accent/80 transition-all duration-300 hover:scale-105"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">Loading MoodNet</h2>
          <p className="text-text-secondary">Connecting to the Web3 mood network...</p>
        </div>
      </div>
    </div>
  )
}

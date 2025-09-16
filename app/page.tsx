'use client'

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/AppShell'
import { NavigationTabs } from '@/components/NavigationTabs'
import { PostCard } from '@/components/PostCard'
import { ProfileHeader } from '@/components/ProfileHeader'
import { CreatePostModal } from '@/components/CreatePostModal'
import { CentralMoodHub } from '@/components/CentralMoodHub'
import { MoodType, Post } from '@/lib/types'
import { generateMockData } from '@/lib/utils'
import { Plus, Sparkles } from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('feed')
  const [currentMood, setCurrentMood] = useState<MoodType>('neutral')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const { posts: mockPosts } = generateMockData()
    setPosts(mockPosts)
  }, [])

  const handleCreatePost = async (content: string, mood: MoodType, isAnonymous: boolean) => {
    const newPost: Post = {
      postId: Date.now().toString(),
      authorId: isAnonymous ? 'anon' : 'user',
      content,
      moodTag: mood,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isAnonymous
    }
    
    setPosts(prev => [newPost, ...prev])
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="text-center py-12 animate-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="text-accent animate-float" size={28} />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
                  MoodNet
                </h1>
                <Sparkles className="text-accent animate-float" size={28} style={{ animationDelay: '1s' }} />
              </div>
              <p className="text-text-secondary max-w-lg mx-auto text-lg leading-relaxed">
                Anonymous, mood-driven conversations for Web3 insiders
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Live Community</span>
                </div>
                <div className="w-1 h-4 bg-text-muted/20" />
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <span>{posts.length} Active Posts</span>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <div 
                  key={post.postId}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard 
                    post={post} 
                    variant="anonymous"
                  />
                </div>
              ))}
              
              {posts.length === 0 && (
                <div className="text-center py-16 animate-fade-in-up">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">💭</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                  <p className="text-text-secondary mb-6">Be the first to share your thoughts with the community!</p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Create First Post
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      case 'discover':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold mb-4">Discover Moods</h2>
              <p className="text-text-secondary">
                Explore the collective mood of the Web3 community
              </p>
            </div>
            
            <CentralMoodHub 
              currentMood={currentMood}
              onMoodChange={setCurrentMood}
            />
            
            <div className="text-center">
              <p className="text-text-secondary text-sm">
                Current community mood: <span className="capitalize text-primary">{currentMood}</span>
              </p>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <ProfileHeader variant="withNFTs" />
            
            <div className="glass-effect rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Posts</h3>
              <div className="space-y-4">
                {posts.filter(post => !post.isAnonymous).map((post) => (
                  <PostCard 
                    key={post.postId} 
                    post={post} 
                    variant="default"
                  />
                ))}
                {posts.filter(post => !post.isAnonymous).length === 0 && (
                  <p className="text-text-secondary text-center py-8">
                    No public posts yet. Share your thoughts with the community!
                  </p>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AppShell variant="glass">
      <div className="space-y-6">
        {/* Navigation */}
        <NavigationTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content */}
        <main className="min-h-screen">
          {renderContent()}
        </main>

        {/* Floating Create Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 group glow-effect-strong animate-float"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 animate-pulse-glow" />
          <Plus size={24} className="relative z-10 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      </div>
    </AppShell>
  )
}

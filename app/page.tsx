'use client'

import { useState, useEffect } from 'react'
import { useMiniKit } from '@coinbase/minikit'
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
  const { context } = useMiniKit()
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
      authorId: isAnonymous ? 'anon' : context?.user?.fid?.toString() || 'user',
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
            <div className="text-center py-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-accent" size={24} />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  MoodNet
                </h1>
                <Sparkles className="text-accent" size={24} />
              </div>
              <p className="text-text-secondary max-w-md mx-auto">
                Anonymous, mood-driven conversations for Web3 insiders
              </p>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard 
                  key={post.postId} 
                  post={post} 
                  variant="anonymous"
                />
              ))}
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
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
        >
          <Plus size={24} />
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

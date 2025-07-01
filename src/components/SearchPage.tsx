import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, TrendingUp, Clock, Users, Hash, Heart, MessageCircle, MapPin, Flame, User, Type } from 'lucide-react';

interface Post {
  id: number;
  text: string;
  image: string;
  likes: number;
  comments: number;
  timeAgo: string;
  category: 'groups' | 'popular' | 'nearby' | 'latest';
  groupId?: string;
  groupName?: string;
}

interface SearchPageProps {
  onBack: () => void;
  posts: Post[];
  userData: { username: string } | null;
}

interface SearchUser {
  username: string;
  bio?: string;
  isOnline: boolean;
  followers: number;
  posts: number;
}

interface TrendingTopic {
  tag: string;
  posts: number;
  category: string;
}

const StatusBar = () => (
  <div className="flex justify-between items-center px-4 py-2 text-xs font-medium bg-gray-900 text-white">
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
      </div>
      <span className="ml-2">BELL</span>
      <div className="flex ml-2 space-x-0.5">
        <div className="w-1 h-3 bg-white rounded-full"></div>
        <div className="w-1 h-3 bg-white rounded-full"></div>
        <div className="w-1 h-2 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
      </div>
    </div>
    <div className="text-center font-semibold">4:21 PM</div>
    <div className="flex items-center space-x-1">
      <span>100%</span>
      <div className="w-6 h-3 border border-white rounded-sm relative">
        <div className="w-full h-full bg-white rounded-sm"></div>
        <div className="absolute -right-0.5 top-0.5 w-0.5 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  </div>
);

// Mock trending topics
const trendingTopics: TrendingTopic[] = [
  { tag: 'mentalhealth', posts: 1247, category: 'Health' },
  { tag: 'relationships', posts: 892, category: 'Life' },
  { tag: 'college', posts: 756, category: 'Education' },
  { tag: 'worklife', posts: 634, category: 'Career' },
  { tag: 'coffee', posts: 523, category: 'Lifestyle' },
  { tag: 'music', posts: 445, category: 'Entertainment' },
  { tag: 'travel', posts: 387, category: 'Adventure' },
  { tag: 'food', posts: 298, category: 'Lifestyle' }
];

// Mock users
const mockUsers: SearchUser[] = [
  { username: 'ALEX9876', bio: 'Coffee lover and dreamer ☕', isOnline: true, followers: 234, posts: 45 },
  { username: 'SARAH123', bio: 'Artist exploring life 🎨', isOnline: false, followers: 567, posts: 89 },
  { username: 'MIKE4567', bio: 'Tech enthusiast & gamer 🎮', isOnline: true, followers: 123, posts: 67 },
  { username: 'EMMA8901', bio: 'Nature photographer 📸', isOnline: false, followers: 789, posts: 156 },
  { username: 'JOHN2345', bio: 'Music producer & DJ 🎵', isOnline: true, followers: 345, posts: 78 },
  { username: 'LISA6789', bio: 'Yoga instructor & wellness coach 🧘', isOnline: false, followers: 456, posts: 234 },
  { username: 'DAVID1234', bio: 'Travel blogger ✈️', isOnline: true, followers: 678, posts: 123 },
  { username: 'ANNA5678', bio: 'Book lover & writer 📚', isOnline: false, followers: 234, posts: 89 }
];

const PostCard = ({ post }: { post: Post }) => (
  <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800 border border-gray-700">
    <div className="aspect-[3/4] relative">
      <img 
        src={post.image} 
        alt="" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {post.groupName && (
            <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full border border-white/30">
              {post.groupName}
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          <p className="text-white font-medium text-sm leading-relaxed drop-shadow-lg">
            {post.text}
          </p>
          
          <div className="flex items-center justify-between text-white/80 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 hover:text-white transition-colors">
                <Heart className="w-4 h-4" />
                <span>{post.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
            </div>
            <span className="text-white/60">{post.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserCard = ({ user }: { user: SearchUser }) => (
  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
          <Type className="w-6 h-6 text-gray-800" />
        </div>
        {user.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-white text-sm font-mono">@{user.username}</h3>
        {user.bio && <p className="text-xs text-gray-400 mt-1">{user.bio}</p>}
        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
          <span>{user.followers} followers</span>
          <span>{user.posts} posts</span>
        </div>
      </div>
    </div>
    <button className="px-3 py-1.5 bg-white text-gray-800 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors">
      Follow
    </button>
  </div>
);

const TrendingTopicCard = ({ topic }: { topic: TrendingTopic }) => (
  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <Hash className="w-4 h-4 text-blue-400" />
        <h3 className="font-semibold text-white text-sm">#{topic.tag}</h3>
      </div>
      <TrendingUp className="w-4 h-4 text-green-400" />
    </div>
    <p className="text-xs text-gray-400 mb-1">{topic.category}</p>
    <p className="text-xs text-gray-500">{topic.posts.toLocaleString()} posts</p>
  </div>
);

export const SearchPage: React.FC<SearchPageProps> = ({ onBack, posts, userData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'trending'>('posts');
  const [searchResults, setSearchResults] = useState<{
    posts: Post[];
    users: SearchUser[];
    trending: TrendingTopic[];
  }>({
    posts: [],
    users: [],
    trending: trendingTopics
  });
  const [isSearching, setIsSearching] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      
      // Simulate search delay
      const searchTimeout = setTimeout(() => {
        const query = searchQuery.toLowerCase();
        
        // Search posts
        const filteredPosts = posts.filter(post => 
          post.text.toLowerCase().includes(query) ||
          (post.groupName && post.groupName.toLowerCase().includes(query))
        );
        
        // Search users
        const filteredUsers = mockUsers.filter(user =>
          user.username.toLowerCase().includes(query) ||
          (user.bio && user.bio.toLowerCase().includes(query))
        );
        
        // Search trending topics
        const filteredTrending = trendingTopics.filter(topic =>
          topic.tag.toLowerCase().includes(query) ||
          topic.category.toLowerCase().includes(query)
        );
        
        setSearchResults({
          posts: filteredPosts,
          users: filteredUsers,
          trending: filteredTrending
        });
        
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(searchTimeout);
    } else {
      setSearchResults({
        posts: [],
        users: [],
        trending: trendingTopics
      });
      setIsSearching(false);
    }
  }, [searchQuery, posts]);

  const getTabCount = (tab: 'posts' | 'users' | 'trending') => {
    switch (tab) {
      case 'posts': return searchResults.posts.length;
      case 'users': return searchResults.users.length;
      case 'trending': return searchResults.trending.length;
      default: return 0;
    }
  };

  const tabs = [
    { key: 'posts' as const, label: 'Posts', icon: Hash },
    { key: 'users' as const, label: 'Users', icon: User },
    { key: 'trending' as const, label: 'Trending', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 py-4 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Search className="w-5 h-5 text-blue-400" />
              <span>Search</span>
            </h1>
            <p className="text-sm text-gray-400">Discover posts, users, and trends</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search posts, users, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
            autoFocus
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Search Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const count = getTabCount(tab.key);
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-800'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {searchQuery && count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {!searchQuery ? (
          // Default state - show trending topics
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-semibold text-white">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {trendingTopics.slice(0, 8).map((topic) => (
                <TrendingTopicCard key={topic.tag} topic={topic} />
              ))}
            </div>
          </div>
        ) : (
          // Search results
          <div>
            {activeTab === 'posts' && (
              <div>
                {searchResults.posts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {searchResults.posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hash className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Posts Found</h3>
                    <p className="text-gray-400 text-sm">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                {searchResults.users.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.users.map((user) => (
                      <UserCard key={user.username} user={user} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Users Found</h3>
                    <p className="text-gray-400 text-sm">
                      Try searching for different usernames
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trending' && (
              <div>
                {searchResults.trending.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {searchResults.trending.map((topic) => (
                      <TrendingTopicCard key={topic.tag} topic={topic} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Trending Topics Found</h3>
                    <p className="text-gray-400 text-sm">
                      Try searching for different topics or hashtags
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { AuthPages } from './components/AuthPages';
import { CreatePostModal } from './components/CreatePostModal';
import { CreateGroupModal } from './components/CreateGroupModal';
import { GroupsPage } from './components/GroupsPage';
import { PopularPage } from './components/PopularPage';
import { NearbyPage } from './components/NearbyPage';
import { MyPostsPage } from './components/MyPostsPage';
import { Plus, Home, Users, MapPin, Flame, Hash, User, Settings, Search, Bell, Type, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';

interface UserData {
  username: string;
  registrationDate: string;
}

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
  engagementScore?: number;
  trendingVelocity?: number;
  isPostOfTheDay?: boolean;
  isTrendingFast?: boolean;
  hoursOld?: number;
  distance?: string;
  location?: string;
  isLocalTrending?: boolean;
  nearbyUsers?: number;
}

interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  isPrivate: boolean;
  invitedMembers: string[];
  image: string;
  tags: string[];
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

const mockPosts: Post[] = [
  {
    id: 1,
    text: "Do you think it's okay to have a 'man of honor' instead of 'maid of honor' at your wedding if your best friend for 5 years is a guy?",
    image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 4821,
    comments: 892,
    timeAgo: "3h",
    category: 'popular',
    engagementScore: 5713,
    trendingVelocity: 95,
    isTrendingFast: true,
    hoursOld: 3,
    isPostOfTheDay: true
  },
  {
    id: 2,
    text: "Coffee shop on Main Street has the best vibes for studying! Anyone else here right now?",
    image: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 234,
    comments: 45,
    timeAgo: "15m",
    category: 'nearby',
    distance: "0.2 mi",
    location: "Downtown Coffee Co.",
    isLocalTrending: true,
    nearbyUsers: 12
  },
  {
    id: 3,
    text: "Mental health support group meeting tonight. Remember, you're not alone in this journey 💚",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1456,
    comments: 234,
    timeAgo: "2h",
    category: 'groups',
    groupName: "Mental Health Support"
  },
  {
    id: 4,
    text: "Just discovered this amazing indie band! Music really does heal the soul 🎵",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2156,
    comments: 345,
    timeAgo: "1h",
    category: 'latest'
  },
  {
    id: 5,
    text: "Sometimes the smallest gestures mean the most",
    image: "https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 5432,
    comments: 789,
    timeAgo: "4h",
    category: 'popular'
  },
  {
    id: 6,
    text: "Late night study session at the 24/7 diner. Their pie is keeping me going! 🥧",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 67,
    comments: 12,
    timeAgo: "30m",
    category: 'nearby',
    distance: "1.5 mi",
    location: "Mel's All-Night Diner",
    nearbyUsers: 4
  }
];

const PostCard = ({ post }: { post: Post }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'popular': return 'text-blue-400 bg-blue-900/20';
      case 'groups': return 'text-green-400 bg-green-900/20';
      case 'nearby': return 'text-purple-400 bg-purple-900/20';
      case 'latest': return 'text-white bg-white/20';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  return (
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
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
              {post.category.toUpperCase()}
            </span>
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
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'groups' | 'popular' | 'nearby' | 'latest' | 'profile' | 'my-posts'>('home');
  const [activeTab, setActiveTab] = useState<'popular' | 'groups' | 'nearby' | 'latest'>('popular');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [groups, setGroups] = useState<Group[]>([]);

  const handleLogin = (user?: UserData) => {
    setIsAuthenticated(true);
    if (user) {
      setUserData(user);
    }
  };

  const handleCreatePost = (newPost: {
    text: string;
    image: string;
    category: 'groups' | 'popular' | 'nearby' | 'latest';
    privacy: 'public' | 'friends' | 'private';
  }) => {
    const post: Post = {
      id: posts.length + 1,
      text: newPost.text,
      image: newPost.image,
      likes: 0,
      comments: 0,
      timeAgo: 'now',
      category: newPost.category
    };
    setPosts([post, ...posts]);
  };

  const handleCreateGroup = (newGroup: Group) => {
    setGroups([newGroup, ...groups]);
  };

  const handleFollowGroup = (groupId: string) => {
    console.log('Following group:', groupId);
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const filteredPosts = posts.filter(post => {
    if (currentPage === 'home') {
      return activeTab === 'latest' ? true : post.category === activeTab;
    }
    return post.category === currentPage;
  });

  if (!isAuthenticated) {
    return <AuthPages onLogin={handleLogin} />;
  }

  if (currentPage === 'groups') {
    return (
      <GroupsPage
        onBack={() => setCurrentPage('home')}
        posts={posts}
        onFollowGroup={handleFollowGroup}
        onCreateGroup={() => setIsCreateGroupModalOpen(true)}
      />
    );
  }

  if (currentPage === 'popular') {
    return (
      <PopularPage
        onBack={() => setCurrentPage('home')}
        posts={posts}
      />
    );
  }

  if (currentPage === 'nearby') {
    return (
      <NearbyPage
        onBack={() => setCurrentPage('home')}
        posts={posts}
      />
    );
  }

  if (currentPage === 'my-posts') {
    return (
      <MyPostsPage
        onBack={() => setCurrentPage('home')}
        userData={userData}
        posts={posts}
        onDeletePost={handleDeletePost}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/whitepostsylogo.PNG" 
              alt="Postsy Logo" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-lg font-semibold text-white">Postsy</h1>
              <p className="text-sm text-gray-400">@{userData?.username || 'GUEST'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
          {[
            { key: 'popular', label: 'Popular', icon: Flame },
            { key: 'groups', label: 'Groups', icon: Users },
            { key: 'nearby', label: 'Nearby', icon: MapPin },
            { key: 'latest', label: 'Latest', icon: Hash }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-800'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Type className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Posts Yet</h3>
            <p className="text-gray-400 text-sm mb-6">
              Be the first to share something in this category!
            </p>
            <button
              onClick={() => setIsCreatePostModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Create Post
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-900 border-t border-gray-700 px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === 'home' ? 'text-white' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setCurrentPage('groups')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === 'groups' ? 'text-white' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Groups</span>
          </button>

          {/* Create Post Button */}
          <button
            onClick={() => setIsCreatePostModalOpen(true)}
            className="w-12 h-12 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
          >
            <Plus className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={() => setCurrentPage('nearby')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === 'nearby' ? 'text-white' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-xs font-medium">Nearby</span>
          </button>

          <button
            onClick={() => setCurrentPage('my-posts')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === 'my-posts' ? 'text-white' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onCreatePost={handleCreatePost}
        userData={userData}
      />

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onCreateGroup={handleCreateGroup}
        userData={userData}
      />
    </div>
  );
}

export default App;
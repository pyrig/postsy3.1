import React, { useState } from 'react';
import { AuthPages } from './components/AuthPages';
import { CreatePostModal } from './components/CreatePostModal';
import { CreateGroupModal } from './components/CreateGroupModal';
import { GroupsPage } from './components/GroupsPage';
import { PopularPage } from './components/PopularPage';
import { NearbyPage } from './components/NearbyPage';
import { MyPostsPage } from './components/MyPostsPage';
import { MessagesPage } from './components/MessagesPage';
import { Plus, Home, Users, MapPin, Flame, MessageCircle, User, Settings, Search, Heart, Type, MoreVertical, Edit3 } from 'lucide-react';

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
    category: 'popular'
  },
  {
    id: 2,
    text: "When I heard about Pokemon GO",
    image: "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 3456,
    comments: 567,
    timeAgo: "5h",
    category: 'popular'
  },
  {
    id: 3,
    text: "My girlfriend bought me cheese for our anniversary 😂",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2987,
    comments: 423,
    timeAgo: "8h",
    category: 'popular'
  },
  {
    id: 4,
    text: "Coffee shop vibes hit different when you're working on your dreams",
    image: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1876,
    comments: 234,
    timeAgo: "2h",
    category: 'groups',
    groupName: 'Coffee Lovers'
  },
  {
    id: 5,
    text: "The sunset tonight reminded me why I love this place",
    image: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 3245,
    comments: 456,
    timeAgo: "1h",
    category: 'nearby'
  },
  {
    id: 6,
    text: "Sometimes the smallest gestures mean the most",
    image: "https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 5432,
    comments: 789,
    timeAgo: "4h",
    category: 'latest'
  }
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
          <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 text-white" />
          </button>
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

const MainFeed = ({ 
  activeTab, 
  posts, 
  onCreatePost,
  onProfileClick,
  userData 
}: { 
  activeTab: string;
  posts: Post[];
  onCreatePost: () => void;
  onProfileClick: () => void;
  userData: UserData | null;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'home' || post.category === activeTab;
    return matchesSearch && matchesTab;
  });

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
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCreatePost}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Edit3 className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={onProfileClick}
              className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Type className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Posts Found</h3>
            <p className="text-gray-400 text-sm mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'No posts available in this category'}
            </p>
            <button
              onClick={onCreatePost}
              className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Create First Post
            </button>
          </div>
        )}
      </div>

      {/* Create Post FAB */}
      <button
        onClick={onCreatePost}
        className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-white to-gray-200 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center z-30"
      >
        <Plus className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

const BottomNavigation = ({ 
  activeTab, 
  onTabChange,
  unreadMessageCount = 0
}: { 
  activeTab: string; 
  onTabChange: (tab: string) => void;
  unreadMessageCount?: number;
}) => {
  const tabs = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'popular', icon: Flame, label: 'Popular' },
    { key: 'groups', icon: Users, label: 'Groups' },
    { key: 'nearby', icon: MapPin, label: 'Nearby' },
    { key: 'messages', icon: MessageCircle, label: 'Messages', badge: unreadMessageCount }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-900 border-t border-gray-700 px-4 py-2 shadow-2xl">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState<'main' | 'groups' | 'popular' | 'nearby' | 'messages' | 'profile'>('main');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(3); // Mock unread count

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

  const handleCreateGroup = (group: Group) => {
    console.log('Group created:', group);
    // In a real app, this would save to database
  };

  const handleFollowGroup = (groupId: string) => {
    console.log('Following group:', groupId);
    // In a real app, this would update user's followed groups
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'groups') {
      setCurrentPage('groups');
    } else if (tab === 'popular') {
      setCurrentPage('popular');
    } else if (tab === 'nearby') {
      setCurrentPage('nearby');
    } else if (tab === 'messages') {
      setCurrentPage('messages');
      setUnreadMessageCount(0); // Clear unread count when viewing messages
    } else {
      setCurrentPage('main');
    }
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
    setActiveTab('home');
  };

  if (!isAuthenticated) {
    return <AuthPages onLogin={handleLogin} />;
  }

  if (currentPage === 'groups') {
    return (
      <>
        <GroupsPage
          onBack={handleBackToMain}
          posts={posts}
          onFollowGroup={handleFollowGroup}
          onCreateGroup={() => setIsCreateGroupModalOpen(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          unreadMessageCount={unreadMessageCount}
        />
        <CreateGroupModal
          isOpen={isCreateGroupModalOpen}
          onClose={() => setIsCreateGroupModalOpen(false)}
          onCreateGroup={handleCreateGroup}
          userData={userData}
        />
      </>
    );
  }

  if (currentPage === 'popular') {
    return (
      <>
        <PopularPage
          onBack={handleBackToMain}
          posts={posts}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          unreadMessageCount={unreadMessageCount}
        />
      </>
    );
  }

  if (currentPage === 'nearby') {
    return (
      <>
        <NearbyPage
          onBack={handleBackToMain}
          posts={posts}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          unreadMessageCount={unreadMessageCount}
        />
      </>
    );
  }

  if (currentPage === 'messages') {
    return (
      <>
        <MessagesPage
          onBack={handleBackToMain}
          userData={userData}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          unreadMessageCount={unreadMessageCount}
        />
      </>
    );
  }

  if (currentPage === 'profile') {
    return (
      <>
        <MyPostsPage
          onBack={handleBackToMain}
          userData={userData}
          posts={posts}
          onDeletePost={handleDeletePost}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          unreadMessageCount={unreadMessageCount}
        />
      </>
    );
  }

  return (
    <>
      <MainFeed
        activeTab={activeTab}
        posts={posts}
        onCreatePost={() => setIsCreatePostModalOpen(true)}
        onProfileClick={() => setCurrentPage('profile')}
        userData={userData}
      />
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        unreadMessageCount={unreadMessageCount}
      />
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onCreatePost={handleCreatePost}
        userData={userData}
      />
    </>
  );
}

export default App;
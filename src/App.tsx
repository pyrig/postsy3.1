import React, { useState } from 'react';
import { AuthPages } from './components/AuthPages';
import { CreatePostModal } from './components/CreatePostModal';
import { CreateGroupModal } from './components/CreateGroupModal';
import { GroupsPage } from './components/GroupsPage';
import { PopularPage } from './components/PopularPage';
import { NearbyPage } from './components/NearbyPage';
import { MyPostsPage } from './components/MyPostsPage';
import { MessagesPage } from './components/MessagesPage';
import { SearchPage } from './components/SearchPage';
import { NotificationModal } from './components/NotificationModal';
import { Plus, Home, Users, MapPin, Flame, MessageCircle, User, Settings, Search, Heart, Type, MoreVertical, Edit3, Bell, UserCircle } from 'lucide-react';

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

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'group_invite' | 'mention';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  avatar?: string;
  username?: string;
  postId?: string;
  groupId?: string;
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

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Like',
    message: 'ALEX9876 liked your post about coffee shop vibes',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isRead: false,
    username: 'ALEX9876',
    postId: '4'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: 'SARAH123 commented on your post: "I totally agree! That place has amazing energy"',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    isRead: false,
    username: 'SARAH123',
    postId: '4'
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: 'MIKE4567 started following you',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    username: 'MIKE4567'
  },
  {
    id: '4',
    type: 'group_invite',
    title: 'Group Invitation',
    message: 'You were invited to join "Mental Health Support" group',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    groupId: 'mental-health'
  },
  {
    id: '5',
    type: 'like',
    title: 'New Like',
    message: 'EMMA8901 liked your post about sunset views',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true,
    username: 'EMMA8901',
    postId: '5'
  },
  {
    id: '6',
    type: 'mention',
    title: 'You were mentioned',
    message: 'JOHN2345 mentioned you in a comment',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    isRead: true,
    username: 'JOHN2345'
  },
  {
    id: '7',
    type: 'comment',
    title: 'New Comment',
    message: 'LISA6789 commented on your post: "This is so inspiring! Thank you for sharing"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    username: 'LISA6789',
    postId: '6'
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
  onMessagesClick,
  onNotificationsClick,
  userData,
  unreadMessageCount,
  unreadNotificationCount
}: { 
  activeTab: string;
  posts: Post[];
  onMessagesClick: () => void;
  onNotificationsClick: () => void;
  userData: UserData | null;
  unreadMessageCount: number;
  unreadNotificationCount: number;
}) => {
  const [feedFilter, setFeedFilter] = useState<'all' | 'popular' | 'nearby'>('all');

  const filteredPosts = posts.filter(post => {
    if (feedFilter === 'popular') {
      return post.category === 'popular';
    } else if (feedFilter === 'nearby') {
      return post.category === 'nearby';
    }
    return true; // 'all' shows everything
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
              onClick={onNotificationsClick}
              className="relative p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Bell className="w-6 h-6 text-white" />
              {unreadNotificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                  </span>
                </div>
              )}
            </button>
            <button
              onClick={onMessagesClick}
              className="relative p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {unreadMessageCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {unreadMessageCount > 9 ? '9+' : unreadMessageCount}
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Feed Filter Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setFeedFilter('all')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              feedFilter === 'all'
                ? 'bg-white text-gray-800'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>All</span>
          </button>
          <button
            onClick={() => setFeedFilter('popular')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              feedFilter === 'popular'
                ? 'bg-white text-gray-800'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Popular</span>
          </button>
          <button
            onClick={() => setFeedFilter('nearby')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              feedFilter === 'nearby'
                ? 'bg-white text-gray-800'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Nearby</span>
          </button>
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
              <Home className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Posts Found</h3>
            <p className="text-gray-400 text-sm mb-6">
              No {feedFilter === 'all' ? '' : feedFilter + ' '}posts available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const BottomNavigation = ({ 
  activeTab, 
  onTabChange,
  onProfileClick,
  onSearchClick,
  onCreatePostClick
}: { 
  activeTab: string; 
  onTabChange: (tab: string) => void;
  onProfileClick: () => void;
  onSearchClick: () => void;
  onCreatePostClick: () => void;
}) => {
  const tabs = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'search', icon: Search, label: 'Search', isSearch: true },
    { key: 'create', icon: Plus, label: 'Create', isCreate: true },
    { key: 'groups', icon: Users, label: 'Groups' },
    { key: 'profile', icon: UserCircle, label: 'Profile', isProfile: true }
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
              onClick={() => {
                if (tab.isProfile) {
                  onProfileClick();
                } else if (tab.isSearch) {
                  onSearchClick();
                } else if (tab.isCreate) {
                  onCreatePostClick();
                } else {
                  onTabChange(tab.key);
                }
              }}
              className={`relative flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.isCreate ? (
                <div className={`w-8 h-8 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-200 ${
                  isActive ? 'scale-110' : 'hover:scale-105'
                }`}>
                  <Icon className="w-5 h-5 text-gray-800" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              )}
              <span className={`text-xs font-medium ${tab.isCreate ? 'text-white' : ''}`}>
                {tab.label}
              </span>
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
  const [currentPage, setCurrentPage] = useState<'main' | 'groups' | 'messages' | 'profile' | 'search'>('main');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(3); // Mock unread count
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

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
    } else {
      setCurrentPage('main');
    }
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
    setActiveTab('home');
  };

  const handleMessagesClick = () => {
    setCurrentPage('messages');
    setUnreadMessageCount(0); // Clear unread count when viewing messages
  };

  const handleNotificationsClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleProfileClick = () => {
    setCurrentPage('profile');
    setActiveTab('profile');
  };

  const handleSearchClick = () => {
    setCurrentPage('search');
    setActiveTab('search');
  };

  const handleCreatePostClick = () => {
    setIsCreatePostModalOpen(true);
    setActiveTab('create');
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  if (!isAuthenticated) {
    return <AuthPages onLogin={handleLogin} />;
  }

  if (currentPage === 'search') {
    return (
      <>
        <SearchPage
          onBack={handleBackToMain}
          posts={posts}
          userData={userData}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          onProfileClick={handleProfileClick}
          onSearchClick={handleSearchClick}
          onCreatePostClick={handleCreatePostClick}
        />
      </>
    );
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
          onProfileClick={handleProfileClick}
          onSearchClick={handleSearchClick}
          onCreatePostClick={handleCreatePostClick}
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
          onProfileClick={handleProfileClick}
          onSearchClick={handleSearchClick}
          onCreatePostClick={handleCreatePostClick}
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
          onProfileClick={handleProfileClick}
          onSearchClick={handleSearchClick}
          onCreatePostClick={handleCreatePostClick}
        />
      </>
    );
  }

  return (
    <>
      <MainFeed
        activeTab={activeTab}
        posts={posts}
        onMessagesClick={handleMessagesClick}
        onNotificationsClick={handleNotificationsClick}
        userData={userData}
        unreadMessageCount={unreadMessageCount}
        unreadNotificationCount={unreadNotificationCount}
      />
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onProfileClick={handleProfileClick}
        onSearchClick={handleSearchClick}
        onCreatePostClick={handleCreatePostClick}
      />
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onCreatePost={handleCreatePost}
        userData={userData}
      />
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationAsRead}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onDeleteNotification={handleDeleteNotification}
      />
    </>
  );
}

export default App;
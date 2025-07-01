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
import { Plus, Home, Users, MapPin, Flame, MessageCircle, User, Settings, Search, ChevronUp, ChevronDown, Type, MoreVertical, Edit3, Bell, UserCircle } from 'lucide-react';

interface UserData {
  username: string;
  registrationDate: string;
}

interface Post {
  id: number;
  text: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  timeAgo: string;
  category: 'groups' | 'popular' | 'nearby' | 'latest';
  groupId?: string;
  groupName?: string;
  userVote?: 'up' | 'down' | null;
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
    upvotes: 3821,
    downvotes: 1000,
    comments: 892,
    timeAgo: "3h",
    category: 'popular',
    userVote: null
  },
  {
    id: 2,
    text: "When I heard about Pokemon GO, I thought it was just another mobile game. Boy was I wrong! It completely changed how I see my neighborhood and got me walking again.",
    upvotes: 2956,
    downvotes: 500,
    comments: 567,
    timeAgo: "5h",
    category: 'popular',
    userVote: null
  },
  {
    id: 3,
    text: "My girlfriend bought me cheese for our anniversary 😂 Not just any cheese - she got me a whole selection from this fancy cheese shop. Honestly, it was the most thoughtful gift ever!",
    upvotes: 2487,
    downvotes: 500,
    comments: 423,
    timeAgo: "8h",
    category: 'popular',
    userVote: null
  },
  {
    id: 4,
    text: "Coffee shop vibes hit different when you're working on your dreams. There's something about the ambient noise and caffeine that just makes everything click.",
    upvotes: 1576,
    downvotes: 300,
    comments: 234,
    timeAgo: "2h",
    category: 'groups',
    groupName: 'Coffee Lovers',
    userVote: null
  },
  {
    id: 5,
    text: "The sunset tonight reminded me why I love this place. Sometimes you need to stop and appreciate the simple beauty around you.",
    upvotes: 2745,
    downvotes: 500,
    comments: 456,
    timeAgo: "1h",
    category: 'nearby',
    userVote: null
  },
  {
    id: 6,
    text: "Sometimes the smallest gestures mean the most. A stranger held the door for me today and it completely turned my mood around. Kindness is contagious.",
    upvotes: 4932,
    downvotes: 500,
    comments: 789,
    timeAgo: "4h",
    category: 'latest',
    userVote: null
  },
  {
    id: 7,
    text: "I wish people understood my depression. I can go from happy to sad in a blink of an eye because it all builds up inside. Wish I could handle it better.",
    upvotes: 5734,
    downvotes: 500,
    comments: 1456,
    timeAgo: "12h",
    category: 'popular',
    userVote: null
  },
  {
    id: 8,
    text: "Late night study session at the 24/7 diner. Their pie is keeping me going! 🥧 Sometimes the best productivity happens when the world is quiet.",
    upvotes: 467,
    downvotes: 100,
    comments: 89,
    timeAgo: "6h",
    category: 'nearby',
    userVote: null
  }
];

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Upvote',
    message: 'ALEX9876 upvoted your post about coffee shop vibes',
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
    title: 'New Upvote',
    message: 'EMMA8901 upvoted your post about sunset views',
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

const PostCard = ({ post, onVote }: { post: Post; onVote: (postId: number, voteType: 'up' | 'down') => void }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'popular': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'groups': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'nearby': return 'text-purple-400 bg-purple-900/20 border-purple-700';
      case 'latest': return 'text-blue-400 bg-blue-900/20 border-blue-700';
      default: return 'text-gray-400 bg-gray-800 border-gray-600';
    }
  };

  const getNetScore = () => post.upvotes - post.downvotes;

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer group">
      <div className="flex space-x-4">
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {post.groupName && (
                <span className="px-2 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
                  {post.groupName}
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                {post.category.toUpperCase()}
              </span>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors opacity-0 group-hover:opacity-100">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div>
            <p className="text-white text-base leading-relaxed">
              {post.text}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group/comment">
                <MessageCircle className="w-5 h-5 group-hover/comment:scale-110 transition-transform" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
            </div>
            <span className="text-sm text-gray-500">{post.timeAgo}</span>
          </div>
        </div>

        {/* Voting Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
          <button
            onClick={() => onVote(post.id, 'up')}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              post.userVote === 'up'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-400 hover:bg-green-500 hover:text-white'
            }`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className={`text-lg font-bold ${
              getNetScore() > 0 ? 'text-green-400' : 
              getNetScore() < 0 ? 'text-red-400' : 'text-gray-400'
            }`}>
              {getNetScore() > 0 ? '+' : ''}{getNetScore().toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              {post.upvotes.toLocaleString()}↑ {post.downvotes.toLocaleString()}↓
            </div>
          </div>
          
          <button
            onClick={() => onVote(post.id, 'down')}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              post.userVote === 'down'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MainFeed = ({ 
  activeTab, 
  posts, 
  onMessagesClick,
  onNotificationsClick,
  userData,
  unreadMessageCount,
  unreadNotificationCount,
  onVote
}: { 
  activeTab: string;
  posts: Post[];
  onMessagesClick: () => void;
  onNotificationsClick: () => void;
  userData: UserData | null;
  unreadMessageCount: number;
  unreadNotificationCount: number;
  onVote: (postId: number, voteType: 'up' | 'down') => void;
}) => {
  const [feedFilter, setFeedFilter] = useState<'nearby' | 'popular' | 'all'>('nearby');

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
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onVote={onVote} />
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

  const handleVote = (postId: number, voteType: 'up' | 'down') => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const currentVote = post.userVote;
        let newUpvotes = post.upvotes;
        let newDownvotes = post.downvotes;
        let newUserVote: 'up' | 'down' | null = voteType;

        // Remove previous vote if exists
        if (currentVote === 'up') {
          newUpvotes -= 1;
        } else if (currentVote === 'down') {
          newDownvotes -= 1;
        }

        // Apply new vote or remove if clicking same vote
        if (currentVote === voteType) {
          // Clicking same vote removes it
          newUserVote = null;
        } else {
          // Apply new vote
          if (voteType === 'up') {
            newUpvotes += 1;
          } else {
            newDownvotes += 1;
          }
        }

        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (newPost: {
    text: string;
    category: 'groups' | 'popular' | 'nearby' | 'latest';
    privacy: 'public' | 'friends' | 'private';
  }) => {
    const post: Post = {
      id: posts.length + 1,
      text: newPost.text,
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      timeAgo: 'now',
      category: newPost.category,
      userVote: null
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
        onVote={handleVote}
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
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Plus, Home, Users, MapPin, Hash, Search, Bell, User, ChevronUp, ChevronDown, Type } from 'lucide-react';
import { AuthPages } from './components/AuthPages';
import { CreatePostModal } from './components/CreatePostModal';
import { CreateGroupModal } from './components/CreateGroupModal';
import { GroupsPage } from './components/GroupsPage';
import { NearbyPage } from './components/NearbyPage';
import { PopularPage } from './components/PopularPage';
import { SearchPage } from './components/SearchPage';
import { MessagesPage } from './components/MessagesPage';
import { MyPostsPage } from './components/MyPostsPage';
import { NotificationModal } from './components/NotificationModal';

interface Post {
  id: number;
  text: string;
  image: string;
  likes: number;
  comments: number;
  timeAgo: string;
  category: 'groups' | 'popular' | 'nearby' | 'latest';
  userVote?: 'up' | 'down' | null;
  upvotes?: number;
  downvotes?: number;
  groupId?: string;
  groupName?: string;
}

interface UserData {
  username: string;
  registrationDate: string;
  email?: string;
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

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Like',
    message: 'Someone liked your post about coffee shops',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    username: 'ALEX9876'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: 'Someone replied to your post about work-life balance',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    username: 'SARAH123'
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: 'MIKE4567 started following you',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: true,
    username: 'MIKE4567'
  },
  {
    id: '4',
    type: 'group_invite',
    title: 'Group Invitation',
    message: 'You were invited to join "Mental Health Support"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    username: 'EMMA8901'
  }
];

const mockPosts: Post[] = [
  {
    id: 1,
    text: "Do you think it's okay to have a 'man of honor' instead of 'maid of honor' at your wedding if your best friend for 5 years is a guy?",
    image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 4821,
    comments: 892,
    timeAgo: "3h",
    category: 'popular',
    upvotes: 5234,
    downvotes: 413
  },
  {
    id: 2,
    text: "When I heard about Pokemon GO",
    image: "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 3456,
    comments: 567,
    timeAgo: "5h",
    category: 'popular',
    upvotes: 3789,
    downvotes: 333
  },
  {
    id: 3,
    text: "My girlfriend bought me cheese for our anniversary 😂",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2987,
    comments: 423,
    timeAgo: "8h",
    category: 'popular',
    upvotes: 3234,
    downvotes: 247
  },
  {
    id: 4,
    text: "I wish people understood my depression. I can go from happy to sad in a blink of an eye because it all builds up inside. Wish I could handle it.",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 6234,
    comments: 1456,
    timeAgo: "12h",
    category: 'popular',
    upvotes: 6789,
    downvotes: 555
  },
  {
    id: 5,
    text: "Sometimes the smallest gestures mean the most",
    image: "https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 5432,
    comments: 789,
    timeAgo: "1d",
    category: 'popular',
    upvotes: 5876,
    downvotes: 444
  },
  {
    id: 6,
    text: "Coffee shop vibes hit different when you're working on your dreams",
    image: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1876,
    comments: 234,
    timeAgo: "2d",
    category: 'latest',
    upvotes: 2012,
    downvotes: 136
  },
  {
    id: 7,
    text: "The sunset tonight reminded me why I love this place",
    image: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 3245,
    comments: 456,
    timeAgo: "3d",
    category: 'nearby',
    upvotes: 3567,
    downvotes: 322
  },
  {
    id: 8,
    text: "Just discovered this amazing indie band! Music really does heal the soul 🎵",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2156,
    comments: 345,
    timeAgo: "1w",
    category: 'groups',
    groupName: 'Music Vibes',
    upvotes: 2345,
    downvotes: 189
  }
];

const PostCard = ({ 
  post, 
  onVote 
}: { 
  post: Post; 
  onVote: (postId: number, voteType: 'up' | 'down') => void;
}) => {
  const getNetScore = () => (post.upvotes || 0) - (post.downvotes || 0);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex space-x-4">
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                <Type className="w-4 h-4 text-gray-800" />
              </div>
              <span className="text-sm text-gray-400 font-mono">Anonymous</span>
            </div>
            <span className="text-sm text-gray-500">{post.timeAgo}</span>
          </div>

          {/* Content */}
          <div>
            <p className="text-white text-base leading-relaxed mb-4">
              {post.text}
            </p>
            <div className="aspect-video rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
            </div>
            {post.groupName && (
              <span className="px-2 py-1 bg-green-900/20 text-green-400 text-xs font-medium rounded-full border border-green-700">
                {post.groupName}
              </span>
            )}
          </div>
        </div>

        {/* Voting Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
          <button
            onClick={() => onVote(post.id, 'up')}
            className={`p-2 rounded-full transition-colors ${
              post.userVote === 'up' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
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
          </div>
          
          <button
            onClick={() => onVote(post.id, 'down')}
            className={`p-2 rounded-full transition-colors ${
              post.userVote === 'down' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'groups' | 'nearby' | 'popular' | 'search' | 'messages' | 'profile'>('home');
  const [activeCategory, setActiveCategory] = useState<'groups' | 'popular' | 'nearby' | 'latest'>('popular');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleLogin = (user?: UserData) => {
    setIsAuthenticated(true);
    if (user) {
      setUserData(user);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setCurrentPage('home');
    setActiveCategory('popular');
  };

  const handleCreatePost = (newPost: {
    text: string;
    category: 'groups' | 'popular' | 'nearby' | 'latest';
    privacy: 'public' | 'friends' | 'private';
    tags?: string[];
  }) => {
    const post: Post = {
      id: posts.length + 1,
      text: newPost.text,
      image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      likes: 0,
      comments: 0,
      timeAgo: "now",
      category: newPost.category,
      upvotes: 0,
      downvotes: 0
    };
    setPosts([post, ...posts]);
    setActiveCategory(newPost.category);
  };

  const handleCreateGroup = (newGroup: {
    name: string;
    description: string;
    category: string;
    isPrivate: boolean;
    invitedMembers: string[];
    image: string;
    tags: string[];
  }) => {
    console.log('New group created:', newGroup);
    // In a real app, this would make an API call to create the group
  };

  const handleVote = (postId: number, voteType: 'up' | 'down') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const currentVote = post.userVote;
        let newUpvotes = post.upvotes || 0;
        let newDownvotes = post.downvotes || 0;
        let newUserVote: 'up' | 'down' | null = voteType;

        // Remove previous vote if exists
        if (currentVote === 'up') {
          newUpvotes--;
        } else if (currentVote === 'down') {
          newDownvotes--;
        }

        // Add new vote or remove if clicking same vote
        if (currentVote === voteType) {
          newUserVote = null; // Remove vote if clicking same button
        } else {
          if (voteType === 'up') {
            newUpvotes++;
          } else {
            newDownvotes++;
          }
        }

        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote,
          likes: newUpvotes // Update likes for display consistency
        };
      }
      return post;
    }));
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleFollowGroup = (groupId: string) => {
    console.log('Following group:', groupId);
    // In a real app, this would make an API call
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const filteredPosts = posts.filter(post => post.category === activeCategory);
  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  if (!isAuthenticated) {
    return <AuthPages onLogin={handleLogin} />;
  }

  // Page routing
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

  if (currentPage === 'nearby') {
    return (
      <NearbyPage
        onBack={() => setCurrentPage('home')}
        posts={posts}
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

  if (currentPage === 'search') {
    return (
      <SearchPage
        onBack={() => setCurrentPage('home')}
        posts={posts}
        userData={userData}
      />
    );
  }

  if (currentPage === 'messages') {
    return (
      <MessagesPage
        onBack={() => setCurrentPage('home')}
        userData={userData}
      />
    );
  }

  if (currentPage === 'profile') {
    return (
      <MyPostsPage
        onBack={() => setCurrentPage('home')}
        userData={userData}
        posts={posts}
        onDeletePost={handleDeletePost}
        onLogout={handleLogout}
      />
    );
  }

  // Main home page
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <img 
            src="/whitepostsylogo.PNG" 
            alt="Postsy Logo" 
            className="h-8 w-auto"
          />
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {unreadNotificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                  </span>
                </div>
              )}
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <User className="w-4 h-4 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
          {[
            { key: 'popular', label: 'Popular', icon: Hash },
            { key: 'groups', label: 'Groups', icon: Users },
            { key: 'nearby', label: 'Nearby', icon: MapPin },
            { key: 'latest', label: 'Latest', icon: Home }
          ].map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key as any)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === category.key
                    ? 'bg-white text-gray-800'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24 space-y-6">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onVote={handleVote}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-900 border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentPage('home')}
            className={`p-3 rounded-full transition-colors ${
              currentPage === 'home' ? 'bg-white text-gray-800' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage('search')}
            className={`p-3 rounded-full transition-colors ${
              currentPage === 'search' ? 'bg-white text-gray-800' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsCreatePostModalOpen(true)}
            className="p-3 bg-gradient-to-r from-white to-gray-200 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={() => setCurrentPage('messages')}
            className={`p-3 rounded-full transition-colors ${
              currentPage === 'messages' ? 'bg-white text-gray-800' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage('groups')}
            className={`p-3 rounded-full transition-colors ${
              currentPage === 'groups' ? 'bg-white text-gray-800' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Users className="w-5 h-5" />
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

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationAsRead}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onDeleteNotification={handleDeleteNotification}
      />
    </div>
  );
}

export default App;
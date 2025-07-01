import React, { useState } from 'react';
import { Heart, MessageCircle, Search, Plus, User, Menu, Home, X, Save, Eye, EyeOff, Send, ArrowLeft } from 'lucide-react';
import { AuthPages } from './components/AuthPages';
import { CreatePostModal } from './components/CreatePostModal';
import { CreateGroupModal } from './components/CreateGroupModal';
import { MyPostsPage } from './components/MyPostsPage';

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

interface UserData {
  username: string;
  registrationDate: string;
  bio?: string;
  email?: string;
}

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantUsername: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface SearchUser {
  username: string;
  bio?: string;
  isOnline: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isFollowing: boolean;
  isPrivate: boolean;
  color: string;
  icon: string;
  tags: string[];
  image: string;
  createdBy: string;
}

const mockUsers: SearchUser[] = [
  { username: 'ALEX9876', bio: 'Coffee lover and dreamer', isOnline: true },
  { username: 'SARAH123', bio: 'Artist exploring life', isOnline: false },
  { username: 'MIKE4567', bio: 'Tech enthusiast', isOnline: true },
  { username: 'EMMA8901', bio: 'Nature photographer', isOnline: false },
  { username: 'JOHN2345', bio: 'Music producer', isOnline: true },
  { username: 'LISA6789', bio: 'Yoga instructor', isOnline: false },
  { username: 'DAVID1234', bio: 'Travel blogger', isOnline: true },
  { username: 'ANNA5678', bio: 'Book lover', isOnline: false }
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'ALEX9876',
    participantUsername: 'ALEX9876',
    lastMessage: 'Hey! How are you doing?',
    lastMessageTime: '2m',
    unreadCount: 2
  },
  {
    id: '2',
    participantId: 'SARAH123',
    participantUsername: 'SARAH123',
    lastMessage: 'Thanks for sharing that post!',
    lastMessageTime: '1h',
    unreadCount: 0
  },
  {
    id: '3',
    participantId: 'MIKE4567',
    participantUsername: 'MIKE4567',
    lastMessage: 'See you later!',
    lastMessageTime: '3h',
    unreadCount: 1
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 'ALEX9876',
    receiverId: 'current_user',
    content: 'Hey! How are you doing?',
    timestamp: '2024-01-15T10:30:00Z',
    read: false
  },
  {
    id: 2,
    senderId: 'current_user',
    receiverId: 'ALEX9876',
    content: 'I\'m doing great! Thanks for asking. How about you?',
    timestamp: '2024-01-15T10:32:00Z',
    read: true
  },
  {
    id: 3,
    senderId: 'ALEX9876',
    receiverId: 'current_user',
    content: 'Pretty good! Just saw your latest post, really inspiring stuff.',
    timestamp: '2024-01-15T10:35:00Z',
    read: false
  }
];

const initialMockPosts: Post[] = [
  {
    id: 1,
    text: "Do you think it's okay to have a 'man of honor' instead of 'maid of honor' at your wedding if your best friend for 5 years is a guy?",
    image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1816,
    comments: 343,
    timeAgo: "3h",
    category: 'popular'
  },
  {
    id: 2,
    text: "When I heard about Pokemon GO",
    image: "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1816,
    comments: 343,
    timeAgo: "3h",
    category: 'popular'
  },
  {
    id: 3,
    text: "My girlfriend bought me cheese for our anniversary 😂",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 892,
    comments: 156,
    timeAgo: "5h",
    category: 'popular'
  },
  {
    id: 4,
    text: "I wish people understood my depression. I can go from happy to sad in a blink of an eye because it all builds up inside. Wish I could handle it.",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2341,
    comments: 567,
    timeAgo: "2h",
    category: 'popular'
  },
  {
    id: 5,
    text: "I miss the city",
    image: "https://images.pexels.com/photos/1484759/pexels-photo-1484759.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1245,
    comments: 234,
    timeAgo: "4h",
    category: 'nearby'
  },
  {
    id: 6,
    text: "Sometimes the smallest gestures mean the most",
    image: "https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 3421,
    comments: 789,
    timeAgo: "1h",
    category: 'latest'
  },
  {
    id: 7,
    text: "Coffee shop vibes hit different when you're working on your dreams",
    image: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 567,
    comments: 89,
    timeAgo: "6h",
    category: 'groups',
    groupId: 'student-life',
    groupName: 'Student Life'
  },
  {
    id: 8,
    text: "The sunset tonight reminded me why I love this place",
    image: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2156,
    comments: 432,
    timeAgo: "3h",
    category: 'nearby'
  },
  {
    id: 9,
    text: "Struggling with anxiety today but trying to stay positive. Anyone else feel like this sometimes?",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1234,
    comments: 298,
    timeAgo: "2h",
    category: 'groups',
    groupId: 'mental-health',
    groupName: 'Mental Health Support'
  },
  {
    id: 10,
    text: "Just discovered this amazing indie band! Music really does heal the soul 🎵",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 876,
    comments: 145,
    timeAgo: "4h",
    category: 'groups',
    groupId: 'music-vibes',
    groupName: 'Music Vibes'
  }
];

const initialMockGroups: Group[] = [
  {
    id: 'mental-health',
    name: 'Mental Health Support',
    description: 'A safe space to share experiences and support each other through mental health journeys',
    category: 'Health & Wellness',
    memberCount: 12847,
    isFollowing: true,
    isPrivate: false,
    color: 'from-green-500 to-emerald-500',
    icon: '💚',
    tags: ['support', 'wellness', 'mindfulness', 'therapy'],
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    createdBy: 'SYSTEM'
  },
  {
    id: 'relationships',
    name: 'Relationship Advice',
    description: 'Anonymous discussions about dating, friendships, and family relationships',
    category: 'Relationships',
    memberCount: 8923,
    isFollowing: false,
    isPrivate: false,
    color: 'from-pink-500 to-rose-500',
    icon: '💕',
    tags: ['dating', 'friendship', 'family', 'advice'],
    image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    createdBy: 'SYSTEM'
  },
  {
    id: 'student-life',
    name: 'Student Life',
    description: 'Share your college experiences, study tips, and academic struggles',
    category: 'Education',
    memberCount: 15632,
    isFollowing: true,
    isPrivate: false,
    color: 'from-blue-500 to-indigo-500',
    icon: '📚',
    tags: ['college', 'study', 'exams', 'campus'],
    image: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    createdBy: 'SYSTEM'
  },
  {
    id: 'music-vibes',
    name: 'Music Vibes',
    description: 'Discover new music, share your favorite songs, and connect through melodies',
    category: 'Entertainment',
    memberCount: 6754,
    isFollowing: false,
    isPrivate: false,
    color: 'from-purple-500 to-violet-500',
    icon: '🎵',
    tags: ['music', 'playlist', 'concerts', 'artists'],
    image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    createdBy: 'SYSTEM'
  }
];

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
        <div className="flex justify-start">
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

const GroupsContent = ({ 
  groups, 
  onFollowGroup, 
  onCreateGroup 
}: { 
  groups: Group[]; 
  onFollowGroup: (groupId: string) => void;
  onCreateGroup: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Groups</h2>
          <p className="text-sm text-gray-400">Find your community</p>
        </div>
        <button
          onClick={onCreateGroup}
          className="p-2 bg-gradient-to-r from-white to-gray-200 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search groups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
        />
      </div>

      {/* Groups List */}
      <div className="space-y-4">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-gray-800 rounded-2xl p-4 border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white text-sm">{group.name}</h3>
                    {group.isPrivate && (
                      <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{group.category}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{group.memberCount.toLocaleString()} members</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onFollowGroup(group.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  group.isFollowing
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                }`}
              >
                {group.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            
            <p className="text-gray-300 text-xs mb-3 line-clamp-2 leading-relaxed">
              {group.description}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {group.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                  #{tag}
                </span>
              ))}
              {group.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                  +{group.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">No Groups Found</h3>
          <p className="text-gray-400 text-sm">
            Try adjusting your search or create a new group
          </p>
        </div>
      )}
    </div>
  );
};

const SearchModal = ({ isOpen, onClose, posts }: { isOpen: boolean; onClose: () => void; posts: Post[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = posts.filter(post => 
        post.text.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16">
      <div className="bg-gray-900 w-full max-w-md mx-4 rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Search Posts</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-96">
          {searchQuery && searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>No posts found for "{searchQuery}"</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-4 space-y-3">
              {searchResults.map((post) => (
                <div key={post.id} className="flex space-x-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                  <img 
                    src={post.image} 
                    alt="" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">
                      {post.text}
                    </p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.likes.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !searchQuery ? (
            <div className="p-8 text-center text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>Start typing to search posts</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const ChatPage = ({ 
  selectedUser, 
  userData,
  onBack
}: { 
  selectedUser: string;
  userData: UserData | null;
  onBack: () => void;
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 'current_user',
      receiverId: selectedUser,
      content: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const conversationMessages = messages.filter(
    msg => 
      (msg.senderId === selectedUser && msg.receiverId === 'current_user') ||
      (msg.senderId === 'current_user' && msg.receiverId === selectedUser)
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex items-center space-x-3 bg-gray-900">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-800" />
          </div>
          <div>
            <h3 className="font-semibold text-white font-mono tracking-wider">
              @{selectedUser}
            </h3>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {conversationMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.senderId === 'current_user'
                  ? 'bg-gradient-to-r from-white to-gray-200 text-gray-800'
                  : 'bg-gray-800 text-gray-200 border border-gray-700'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.senderId === 'current_user' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

const MessagingPage = ({ 
  userData,
  onBack,
  onSelectUser
}: { 
  userData: UserData | null;
  onBack: () => void;
  onSelectUser: (username: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);

  const handleUserSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = mockUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleStartConversation = (username: string) => {
    onSelectUser(username);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleOpenConversation = (username: string) => {
    onSelectUser(username);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center space-x-3 mb-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h2 className="text-lg font-semibold text-white">Messages</h2>
        </div>
        
        {/* Search Users */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search users by username..."
            value={searchQuery}
            onChange={(e) => handleUserSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        {/* Search Results */}
        {searchQuery && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Search Results</h3>
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((user) => (
                  <div
                    key={user.username}
                    onClick={() => handleStartConversation(user.username)}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-800" />
                      </div>
                      {user.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white font-mono tracking-wider">
                        @{user.username}
                      </p>
                      {user.bio && (
                        <p className="text-xs text-gray-400 truncate">{user.bio}</p>
                      )}
                    </div>
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">
                <User className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm">No users found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {/* Conversations */}
        {!searchQuery && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Conversations</h3>
            {conversations.length > 0 ? (
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleOpenConversation(conversation.participantUsername)}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-800" />
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white font-mono tracking-wider">
                          @{conversation.participantUsername}
                        </p>
                        <span className="text-xs text-gray-400">{conversation.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p>No conversations yet</p>
                <p className="text-sm mt-1">Search for users to start chatting!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  userData,
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  userData: UserData | null;
  onSave: (updatedData: Partial<UserData>) => void;
}) => {
  const [formData, setFormData] = useState({
    bio: userData?.bio || '',
    email: userData?.email || 'user@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        bio: userData.bio || '',
        email: userData.email || 'user@example.com'
      }));
    }
  }, [userData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const updatedData: Partial<UserData> = {
        bio: formData.bio,
        email: formData.email
      };
      onSave(updatedData);
      onClose();
    }, 1000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-8">
      <div className="bg-gray-900 w-full max-w-md mx-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Edit Profile</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-800" />
            </div>
            <h3 className="text-lg font-semibold text-white font-mono tracking-wider">
              @{userData?.username || 'GUEST'}
            </h3>
            <p className="text-gray-400 text-sm">Handle Name</p>
          </div>
        </div>
        
        <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none bg-gray-800 text-white placeholder-gray-400"
                placeholder="Tell us about yourself..."
                rows={3}
                maxLength={150}
              />
              <p className="text-xs text-gray-400 mt-1 text-right">
                {formData.bio.length}/150 characters
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                placeholder="Enter your email"
              />
              <p className="text-xs text-gray-400 mt-1">
                Current email: {userData?.email || 'user@example.com'}
              </p>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-4">Change Password</h4>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="currentPassword"
                      value={formData.currentPassword}
                      onChange={(e) => updateFormData('currentPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={(e) => updateFormData('newPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileModal = ({ 
  isOpen, 
  onClose, 
  onLogout, 
  userData,
  onEditProfile,
  onViewMyPosts
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onLogout: () => void; 
  userData: UserData | null;
  onEditProfile: () => void;
  onViewMyPosts: () => void;
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16">
      <div className="bg-gray-900 w-full max-w-md mx-4 rounded-2xl shadow-2xl border border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Profile</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-800" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-1 font-mono tracking-wider">
              @{userData?.username || 'GUEST'}
            </h3>
            <p className="text-gray-400 text-sm">
              Sharing thoughts since {userData?.registrationDate ? formatDate(userData.registrationDate) : 'today'}
            </p>
            {userData?.bio && (
              <p className="text-gray-300 text-sm mt-2 italic">
                "{userData.bio}"
              </p>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-white" />
                <span className="text-gray-300">Total Likes Received</span>
              </div>
              <span className="font-semibold text-white">2,847</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="text-gray-300">Postys Shared</span>
              </div>
              <span className="font-semibold text-white">23</span>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={onEditProfile}
              className="w-full p-3 text-left hover:bg-gray-800 rounded-xl transition-colors flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">Edit Profile</span>
            </button>
            
            <button 
              onClick={onViewMyPosts}
              className="w-full p-3 text-left hover:bg-gray-800 rounded-xl transition-colors flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">My Postys</span>
            </button>
            
            <button 
              onClick={onLogout}
              className="w-full p-3 text-left hover:bg-gray-800 rounded-xl transition-colors flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-red-900 rounded-lg flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-red-400">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainApp = ({ onLogout, userData, onUpdateUserData }: { 
  onLogout: () => void; 
  userData: UserData | null;
  onUpdateUserData: (updatedData: Partial<UserData>) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'groups' | 'popular' | 'nearby' | 'latest'>('popular');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'messaging' | 'chat' | 'my-posts'>('home');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);
  const [groups, setGroups] = useState<Group[]>(initialMockGroups);

  const tabs = [
    { key: 'groups' as const, label: 'GROUPS' },
    { key: 'popular' as const, label: 'POPULAR' },
    { key: 'nearby' as const, label: 'NEARBY' },
    { key: 'latest' as const, label: 'LATEST' }
  ];

  const filteredPosts = posts.filter(post => 
    activeTab === 'popular' ? true : post.category === activeTab
  );

  const handleEditProfile = () => {
    setIsProfileOpen(false);
    setIsEditProfileOpen(true);
  };

  const handleViewMyPosts = () => {
    setIsProfileOpen(false);
    setCurrentView('my-posts');
  };

  const handleSaveProfile = (updatedData: Partial<UserData>) => {
    onUpdateUserData(updatedData);
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
    
    // Switch to the category where the post was created
    setActiveTab(newPost.category);
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
    const group: Group = {
      id: newGroup.name.toLowerCase().replace(/\s+/g, '-'),
      name: newGroup.name,
      description: newGroup.description,
      category: newGroup.category,
      memberCount: 1, // Creator is the first member
      isFollowing: true, // Creator automatically follows
      isPrivate: newGroup.isPrivate,
      color: 'from-white to-gray-300',
      icon: '👥',
      tags: newGroup.tags,
      image: newGroup.image,
      createdBy: userData?.username || 'GUEST'
    };
    
    setGroups([group, ...groups]);
    setActiveTab('groups'); // Switch to groups tab to show the new group
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleOpenMessaging = () => {
    setCurrentView('messaging');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedUser(null);
  };

  const handleSelectUser = (username: string) => {
    setSelectedUser(username);
    setCurrentView('chat');
  };

  const handleBackToMessaging = () => {
    setCurrentView('messaging');
    setSelectedUser(null);
  };

  const handleFollowGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { 
            ...group, 
            isFollowing: !group.isFollowing,
            memberCount: group.isFollowing ? group.memberCount - 1 : group.memberCount + 1
          }
        : group
    ));
  };

  if (currentView === 'my-posts') {
    return (
      <MyPostsPage
        onBack={handleBackToHome}
        userData={userData}
        posts={posts}
        onDeletePost={handleDeletePost}
      />
    );
  }

  if (currentView === 'messaging') {
    return (
      <MessagingPage
        userData={userData}
        onBack={handleBackToHome}
        onSelectUser={handleSelectUser}
      />
    );
  }

  if (currentView === 'chat' && selectedUser) {
    return (
      <ChatPage
        selectedUser={selectedUser}
        userData={userData}
        onBack={handleBackToMessaging}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Sticky App Header with Logo */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 py-3 shadow-lg">
        <div className="flex items-center">
          <img 
            src="/whitepostsylogo.PNG" 
            alt="Postsy" 
            className="h-8 w-auto"
          />
        </div>
      </div>
      
      {/* Sticky Top Navigation */}
      <div className="sticky top-[52px] z-30 bg-gray-900 border-b border-gray-700 shadow-md">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tab.key
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-24 bg-gray-900">
        {activeTab === 'groups' ? (
          <GroupsContent 
            groups={groups}
            onFollowGroup={handleFollowGroup}
            onCreateGroup={() => setIsCreateGroupOpen(true)}
          />
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-900 border-t border-gray-700 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Home className="w-6 h-6 text-white" />
          </button>
          
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Search className="w-6 h-6 text-gray-400" />
          </button>
          
          <button 
            onClick={() => setIsCreatePostOpen(true)}
            className="p-3 bg-gradient-to-r from-white to-gray-200 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-6 h-6 text-gray-800" />
          </button>
          
          <button 
            onClick={handleOpenMessaging}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-gray-400" />
          </button>
          
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <User className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} posts={posts} />
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onLogout={onLogout}
        userData={userData}
        onEditProfile={handleEditProfile}
        onViewMyPosts={handleViewMyPosts}
      />
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
        userData={userData}
      />
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreateGroup={handleCreateGroup}
        userData={userData}
      />
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLogin = (user?: UserData) => {
    setIsAuthenticated(true);
    if (user) {
      const userWithEmail = {
        ...user,
        email: user.email || 'user@example.com'
      };
      setUserData(userWithEmail);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  const handleUpdateUserData = (updatedData: Partial<UserData>) => {
    if (userData) {
      setUserData({ ...userData, ...updatedData });
    }
  };

  if (!isAuthenticated) {
    return <AuthPages onLogin={handleLogin} />;
  }

  return (
    <MainApp 
      onLogout={handleLogout} 
      userData={userData} 
      onUpdateUserData={handleUpdateUserData}
    />
  );
}

export default App;
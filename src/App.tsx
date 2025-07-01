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
import { Plus, Home, Users, MapPin, Flame, MessageCircle, User, Settings, Search, ChevronUp, ChevronDown, Type, MoreVertical, Edit3, Bell, UserCircle, Hash, Heart, Share2, Copy, Check, X, Reply } from 'lucide-react';

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
  tags?: string[];
  views?: number;
  topComment?: string;
  authorType?: 'you' | 'op' | 'anonymous';
  authorName?: string;
}

interface Reply {
  id: number;
  postId: number;
  text: string;
  authorName: string;
  authorType: 'you' | 'op' | 'anonymous';
  upvotes: number;
  downvotes: number;
  timeAgo: string;
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

// Generate random username function
const generateRandomUsername = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const mockPosts: Post[] = [
  {
    id: 1,
    text: "Do you think it's okay to have a 'man of honor' instead of 'maid of honor' at your wedding if your best friend for 5 years is a guy? I've been thinking about this a lot lately and I'm not sure what the traditional expectations are versus what feels right for me personally. Would love to hear different perspectives on this!",
    upvotes: 3821,
    downvotes: 1000,
    comments: 892,
    timeAgo: "3h",
    category: 'popular',
    userVote: null,
    tags: ['wedding', 'relationships', 'traditions'],
    views: 15420,
    authorType: 'anonymous',
    authorName: generateRandomUsername()
  },
  {
    id: 2,
    text: "When I heard about Pokemon GO, I thought it was just another mobile game. Boy was I wrong! It completely changed how I see my neighborhood and got me walking again. Sometimes the simplest ideas have the biggest impact on our daily lives.",
    upvotes: 2956,
    downvotes: 500,
    comments: 567,
    timeAgo: "5h",
    category: 'popular',
    userVote: null,
    tags: ['gaming', 'health', 'nostalgia'],
    views: 8934,
    authorType: 'anonymous',
    authorName: generateRandomUsername()
  },
  {
    id: 3,
    text: "My girlfriend bought me cheese for our anniversary 😂 Not just any cheese - she got me a whole selection from this fancy cheese shop. Honestly, it was the most thoughtful gift ever! She knows me so well.",
    upvotes: 2487,
    downvotes: 500,
    comments: 423,
    timeAgo: "8h",
    category: 'popular',
    userVote: null,
    tags: ['relationships', 'funny', 'food'],
    views: 6721,
    authorType: 'you'
  },
  {
    id: 4,
    text: "Coffee shop vibes hit different when you're working on your dreams. There's something about the ambient noise and caffeine that just makes everything click. Currently working on my startup idea and feeling inspired!",
    upvotes: 1576,
    downvotes: 300,
    comments: 234,
    timeAgo: "2h",
    category: 'groups',
    groupName: 'Coffee Lovers',
    userVote: null,
    tags: ['coffee', 'productivity', 'startup'],
    views: 4532,
    authorType: 'anonymous',
    authorName: generateRandomUsername()
  },
  {
    id: 5,
    text: "The sunset tonight reminded me why I love this place. Sometimes you need to stop and appreciate the simple beauty around you. Taking a moment to be grateful for where life has brought me.",
    upvotes: 2745,
    downvotes: 500,
    comments: 456,
    timeAgo: "1h",
    category: 'nearby',
    userVote: null,
    tags: ['nature', 'gratitude', 'mindfulness'],
    views: 7823,
    authorType: 'anonymous',
    authorName: generateRandomUsername()
  },
  {
    id: 6,
    text: "Sometimes the smallest gestures mean the most. A stranger held the door for me today and it completely turned my mood around. Kindness is contagious and we all have the power to make someone's day better.",
    upvotes: 4932,
    downvotes: 500,
    comments: 789,
    timeAgo: "4h",
    category: 'latest',
    userVote: null,
    tags: ['kindness', 'positivity', 'humanity'],
    views: 12456,
    authorType: 'anonymous',
    authorName: generateRandomUsername()
  },
  {
    id: 7,
    text: "I wish people understood my depression. I can go from happy to sad in a blink of an eye because it all builds up inside. Wish I could handle it better. Some days are harder than others, but I'm trying to take it one step at a time.",
    upvotes: 5734,
    downvotes: 500,
    comments: 1456,
    timeAgo: "12h",
    category: 'popular',
    userVote: null,
    tags: ['mentalhealth', 'depression', 'support'],
    views: 18923,
    authorType: 'anonymous',
    authorName: generateRandomUsername()
  },
  {
    id: 8,
    text: "Late night study session at the 24/7 diner. Their pie is keeping me going! 🥧 Sometimes the best productivity happens when the world is quiet and you can really focus on what matters.",
    upvotes: 467,
    downvotes: 100,
    comments: 89,
    timeAgo: "6h",
    category: 'nearby',
    userVote: null,
    tags: ['studying', 'food', 'latenight'],
    views: 1234,
    authorType: 'anonymous',
    authorName: generateRandomUsername()
  }
];

// Mock replies data
const mockReplies: { [postId: number]: Reply[] } = {
  1: [
    {
      id: 1,
      postId: 1,
      text: "Absolutely! Your wedding, your rules. Friendship matters more than gender roles. I had a man of honor at my wedding and it was perfect!",
      authorName: generateRandomUsername(),
      authorType: 'anonymous',
      upvotes: 234,
      downvotes: 12,
      timeAgo: "2h",
      userVote: null
    },
    {
      id: 2,
      postId: 1,
      text: "I think it's beautiful when people break traditional norms for what feels authentic to them. Your best friend should be by your side regardless of gender.",
      authorName: generateRandomUsername(),
      authorType: 'anonymous',
      upvotes: 189,
      downvotes: 8,
      timeAgo: "1h",
      userVote: null
    },
    {
      id: 3,
      postId: 1,
      text: "Did this at my sister's wedding and it was amazing! The photos turned out great and everyone loved the authenticity.",
      authorName: generateRandomUsername(),
      authorType: 'anonymous',
      upvotes: 156,
      downvotes: 5,
      timeAgo: "45m",
      userVote: null
    }
  ],
  2: [
    {
      id: 4,
      postId: 2,
      text: "Pokemon GO was a game changer for so many people! It got me exploring parts of my city I never knew existed.",
      authorName: generateRandomUsername(),
      authorType: 'anonymous',
      upvotes: 145,
      downvotes: 7,
      timeAgo: "3h",
      userVote: null
    },
    {
      id: 5,
      postId: 2,
      text: "Same here! I lost 20 pounds just from walking around catching Pokemon. Sometimes the best exercise doesn't feel like exercise.",
      authorName: generateRandomUsername(),
      authorType: 'anonymous',
      upvotes: 198,
      downvotes: 4,
      timeAgo: "2h",
      userVote: null
    }
  ],
  3: [
    {
      id: 6,
      postId: 3,
      text: "That's true love right there! 🧀❤️ She really knows what makes you happy.",
      authorName: generateRandomUsername(),
      authorType: 'anonymous',
      upvotes: 267,
      downvotes: 3,
      timeAgo: "6h",
      userVote: null
    },
    {
      id: 7,
      postId: 3,
      text: "Cheese is the way to anyone's heart! What kind of cheese did she get you?",
      authorName: generateRandomUsername(),
      authorType: 'anonymous',
      upvotes: 89,
      downvotes: 2,
      timeAgo: "4h",
      userVote: null
    }
  ]
};

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Upvote',
    message: `${generateRandomUsername()} upvoted your post about coffee shop vibes`,
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isRead: false,
    username: generateRandomUsername(),
    postId: '4'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: `${generateRandomUsername()} commented on your post: "I totally agree! That place has amazing energy"`,
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    isRead: false,
    username: generateRandomUsername(),
    postId: '4'
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: `${generateRandomUsername()} started following you`,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    username: generateRandomUsername()
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
    message: `${generateRandomUsername()} upvoted your post about sunset views`,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true,
    username: generateRandomUsername(),
    postId: '5'
  },
  {
    id: '6',
    type: 'mention',
    title: 'You were mentioned',
    message: `${generateRandomUsername()} mentioned you in a comment`,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    isRead: true,
    username: generateRandomUsername()
  },
  {
    id: '7',
    type: 'comment',
    title: 'New Comment',
    message: `${generateRandomUsername()} commented on your post: "This is so inspiring! Thank you for sharing"`,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    username: generateRandomUsername(),
    postId: '6'
  }
];

// Share Modal Component
const ShareModal = ({ 
  isOpen, 
  onClose, 
  post 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  post: Post | null;
}) => {
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<'link' | 'text'>('link');

  if (!isOpen || !post) return null;

  const shareUrl = `https://postsy.app/post/${post.id}`;
  const shareText = `Check out this anonymous post: "${post.text.substring(0, 100)}${post.text.length > 100 ? '...' : ''}"`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Anonymous Post from Postsy',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-sm rounded-2xl shadow-2xl border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Share Post</h3>
              <p className="text-sm text-gray-400">Spread the word anonymously</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          {/* Post Preview */}
          <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm">👤</span>
              <span className="text-sm font-medium text-gray-400 font-mono">
                @{post.authorType === 'you' ? 'You' : post.authorName}
              </span>
            </div>
            <p className="text-sm text-gray-300 line-clamp-3">
              {post.text}
            </p>
            <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
              <span>{post.upvotes - post.downvotes} votes</span>
              <span>{post.comments} comments</span>
              <span>{post.timeAgo}</span>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            {/* Native Share (if supported) */}
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <Share2 className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Share via...</p>
                  <p className="text-xs text-gray-400">Use your device's share menu</p>
                </div>
              </button>
            )}

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  {copied && shareMethod === 'link' ? 
                    <Check className="w-5 h-5 text-green-400" /> : 
                    <Copy className="w-5 h-5 text-gray-400" />
                  }
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Copy Link</p>
                  <p className="text-xs text-gray-400">Share the direct link to this post</p>
                </div>
              </div>
              {copied && shareMethod === 'link' && (
                <span className="text-xs text-green-400 font-medium">Copied!</span>
              )}
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopyText}
              className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  {copied && shareMethod === 'text' ? 
                    <Check className="w-5 h-5 text-green-400" /> : 
                    <Type className="w-5 h-5 text-gray-400" />
                  }
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Copy Text</p>
                  <p className="text-xs text-gray-400">Copy post text with link</p>
                </div>
              </div>
              {copied && shareMethod === 'text' && (
                <span className="text-xs text-green-400 font-medium">Copied!</span>
              )}
            </button>
          </div>

          {/* Share URL Preview */}
          <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Share URL:</p>
            <p className="text-xs text-gray-300 font-mono break-all">{shareUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Replies Modal Component
const RepliesModal = ({ 
  isOpen, 
  onClose, 
  post,
  replies 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  post: Post | null;
  replies: Reply[];
}) => {
  const [replyVotes, setReplyVotes] = useState<{ [replyId: number]: { userVote: 'up' | 'down' | null; upvotes: number; downvotes: number } }>({});

  if (!isOpen || !post) return null;

  const handleReplyVote = (replyId: number, voteType: 'up' | 'down') => {
    const reply = replies.find(r => r.id === replyId);
    if (!reply) return;

    setReplyVotes(prev => {
      const currentVote = prev[replyId]?.userVote || reply.userVote;
      const currentUpvotes = prev[replyId]?.upvotes ?? reply.upvotes;
      const currentDownvotes = prev[replyId]?.downvotes ?? reply.downvotes;
      
      let newUpvotes = currentUpvotes;
      let newDownvotes = currentDownvotes;
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
        ...prev,
        [replyId]: {
          userVote: newUserVote,
          upvotes: newUpvotes,
          downvotes: newDownvotes
        }
      };
    });
  };

  const getReplyVoteData = (reply: Reply) => {
    const voteData = replyVotes[reply.id];
    return {
      userVote: voteData?.userVote ?? reply.userVote,
      upvotes: voteData?.upvotes ?? reply.upvotes,
      downvotes: voteData?.downvotes ?? reply.downvotes
    };
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Reply className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">All Replies</h3>
              <p className="text-sm text-gray-400">{replies.length} replies</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Original Post Preview */}
        <div className="p-4 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm">👤</span>
            <span className="text-sm font-medium text-gray-400 font-mono">
              @{post.authorType === 'you' ? 'You' : post.authorName}
            </span>
            <span className="text-xs text-gray-500">{post.timeAgo}</span>
          </div>
          <p className="text-sm text-gray-300 line-clamp-3">
            {post.text}
          </p>
          <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
            <span>{post.upvotes - post.downvotes} votes</span>
            <span>{post.comments} replies</span>
          </div>
        </div>

        {/* Replies List */}
        <div className="overflow-y-auto max-h-[calc(80vh-200px)]">
          {replies.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {replies.map((reply) => {
                const voteData = getReplyVoteData(reply);
                const netScore = voteData.upvotes - voteData.downvotes;
                
                return (
                  <div key={reply.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                    <div className="flex space-x-3">
                      {/* Reply Content */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm">👤</span>
                          <span className="text-sm font-medium text-gray-400 font-mono">
                            @{reply.authorType === 'you' ? 'You' : reply.authorName}
                          </span>
                          {reply.authorType === 'op' && (
                            <span className="px-2 py-0.5 bg-yellow-600 text-yellow-100 text-xs font-medium rounded-full">
                              OP
                            </span>
                          )}
                          <span className="text-xs text-gray-500">{reply.timeAgo}</span>
                        </div>
                        <p className="text-sm text-white leading-relaxed mb-2">
                          {reply.text}
                        </p>
                      </div>

                      {/* Reply Voting */}
                      <div className="flex flex-col items-center space-y-1 min-w-[50px]">
                        <button
                          onClick={() => handleReplyVote(reply.id, 'up')}
                          className={`p-1.5 rounded-full transition-all duration-200 hover:scale-110 ${
                            voteData.userVote === 'up'
                              ? 'bg-green-500 text-white shadow-lg'
                              : 'bg-gray-700 text-gray-400 hover:bg-green-500 hover:text-white'
                          }`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        
                        <div className="text-center">
                          <div className={`text-sm font-bold ${
                            netScore > 0 ? 'text-green-400' : 
                            netScore < 0 ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {netScore > 0 ? '+' : ''}{netScore}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleReplyVote(reply.id, 'down')}
                          className={`p-1.5 rounded-full transition-all duration-200 hover:scale-110 ${
                            voteData.userVote === 'down'
                              ? 'bg-red-500 text-white shadow-lg'
                              : 'bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Reply className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">No Replies Yet</h3>
              <p className="text-gray-400 text-sm">
                Be the first to share your thoughts on this post!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ post, onVote, onTagClick, onShare, onShowReplies }: { 
  post: Post; 
  onVote: (postId: number, voteType: 'up' | 'down') => void;
  onTagClick?: (tag: string) => void;
  onShare: (post: Post) => void;
  onShowReplies: (post: Post) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voteAnimation, setVoteAnimation] = useState<'up' | 'down' | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'popular': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'groups': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'nearby': return 'text-purple-400 bg-purple-900/20 border-purple-700';
      case 'latest': return 'text-blue-400 bg-blue-900/20 border-blue-700';
      default: return 'text-gray-400 bg-gray-800 border-gray-600';
    }
  };

  const getAuthorInfo = () => {
    if (post.authorType === 'you') {
      return { icon: '👤', label: 'You', color: 'text-blue-400' };
    } else if (post.authorType === 'op') {
      return { icon: '⭐', label: 'OP', color: 'text-yellow-400' };
    } else {
      return { icon: '👤', label: post.authorName || generateRandomUsername(), color: 'text-gray-400' };
    }
  };

  const getNetScore = () => post.upvotes - post.downvotes;

  const shouldTruncate = post.text.length > 200;
  const displayText = shouldTruncate && !isExpanded 
    ? post.text.substring(0, 200) + '...' 
    : post.text;

  const handleVote = (voteType: 'up' | 'down') => {
    setVoteAnimation(voteType);
    onVote(post.id, voteType);
    
    // Clear animation after a short delay
    setTimeout(() => setVoteAnimation(null), 300);
  };

  const authorInfo = getAuthorInfo();

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer group">
      <div className="flex space-x-4">
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Author Identity */}
              <div className="flex items-center space-x-2">
                <span className="text-sm">{authorInfo.icon}</span>
                <span className={`text-sm font-medium ${authorInfo.color} font-mono`}>
                  @{authorInfo.label}
                </span>
              </div>
              
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
              {displayText}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-2 transition-colors"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick?.(tag)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs rounded-full transition-colors flex items-center space-x-1"
                >
                  <Hash className="w-3 h-3" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500">
              {post.timeAgo}
              {post.views && (
                <span className="ml-3">
                  {post.views.toLocaleString()} views
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => onShowReplies(post)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group/replies"
                >
                  <Reply className="w-5 h-5 group-hover/replies:scale-110 transition-transform" />
                  <span className="text-sm font-medium">
                    {post.comments > 0 ? `Show all ${post.comments} replies` : 'Show replies'}
                  </span>
                </button>
                <button 
                  onClick={() => onShare(post)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors group/share"
                >
                  <Share2 className="w-5 h-5 group-hover/share:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Voting Section - Centered Vertically */}
        <div className="flex flex-col justify-center items-center space-y-3 min-w-[60px]">
          <button
            onClick={() => handleVote('up')}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 relative ${
              post.userVote === 'up'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-400 hover:bg-green-500 hover:text-white'
            } ${voteAnimation === 'up' ? 'animate-pulse bg-green-400' : ''}`}
          >
            <ChevronUp className="w-5 h-5" />
            {voteAnimation === 'up' && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-green-400 text-xs font-bold animate-bounce">
                +1
              </div>
            )}
          </button>
          
          <div className="text-center">
            <div className={`text-lg font-bold transition-colors ${
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
            onClick={() => handleVote('down')}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 relative ${
              post.userVote === 'down'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white'
            } ${voteAnimation === 'down' ? 'animate-pulse bg-red-400' : ''}`}
          >
            <ChevronDown className="w-5 h-5" />
            {voteAnimation === 'down' && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-400 text-xs font-bold animate-bounce">
                -1
              </div>
            )}
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
  onVote,
  onTagClick,
  onShare,
  onShowReplies
}: { 
  activeTab: string;
  posts: Post[];
  onMessagesClick: () => void;
  onNotificationsClick: () => void;
  userData: UserData | null;
  unreadMessageCount: number;
  unreadNotificationCount: number;
  onVote: (postId: number, voteType: 'up' | 'down') => void;
  onTagClick: (tag: string) => void;
  onShare: (post: Post) => void;
  onShowReplies: (post: Post) => void;
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

        {/* Call to Action */}
        <div className="mb-4 text-center">
          <p className="text-gray-400 text-sm">
            {feedFilter === 'nearby' ? 'See what people nearby are thinking' : 
             feedFilter === 'popular' ? 'Discover what\'s trending right now' :
             'Share what\'s on your mind anonymously'}
          </p>
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
              <PostCard 
                key={post.id} 
                post={post} 
                onVote={onVote}
                onTagClick={onTagClick}
                onShare={onShare}
                onShowReplies={onShowReplies}
              />
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
    { key: 'profile', icon: User, label: 'Profile', isProfile: true }
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRepliesModalOpen, setIsRepliesModalOpen] = useState(false);
  const [postToShare, setPostToShare] = useState<Post | null>(null);
  const [postToShowReplies, setPostToShowReplies] = useState<Post | null>(null);
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

  const handleTagClick = (tag: string) => {
    // In a real app, this would filter posts by tag or navigate to tag page
    console.log('Tag clicked:', tag);
  };

  const handleShare = (post: Post) => {
    setPostToShare(post);
    setIsShareModalOpen(true);
  };

  const handleShowReplies = (post: Post) => {
    setPostToShowReplies(post);
    setIsRepliesModalOpen(true);
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
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      timeAgo: 'now',
      category: newPost.category,
      userVote: null,
      tags: newPost.tags || [],
      views: 0,
      authorType: 'you'
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
        onTagClick={handleTagClick}
        onShare={handleShare}
        onShowReplies={handleShowReplies}
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
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        post={postToShare}
      />
      <RepliesModal
        isOpen={isRepliesModalOpen}
        onClose={() => setIsRepliesModalOpen(false)}
        post={postToShowReplies}
        replies={postToShowReplies ? (mockReplies[postToShowReplies.id] || []) : []}
      />
    </>
  );
}

export default App;
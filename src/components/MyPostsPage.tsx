import React, { useState } from 'react';
import { ArrowLeft, Trash2, Heart, MessageCircle, MoreVertical, AlertTriangle, User, Calendar, Hash, Reply, Settings } from 'lucide-react';
import { ProfileSettingsModal } from './ProfileSettingsModal';

interface Post {
  id: number;
  text: string;
  image: string;
  likes: number;
  comments: number;
  timeAgo: string;
  category: 'groups' | 'popular' | 'nearby' | 'latest';
}

interface Reply {
  id: number;
  postId: number;
  originalPostText: string;
  replyText: string;
  likes: number;
  timeAgo: string;
  originalAuthor: string;
}

interface MyPostsPageProps {
  onBack: () => void;
  userData: { username: string; registrationDate: string; email?: string } | null;
  posts: Post[];
  onDeletePost: (postId: number) => void;
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

// Mock replies data
const mockReplies: Reply[] = [
  {
    id: 1,
    postId: 101,
    originalPostText: "What's your favorite coffee shop in the city?",
    replyText: "Definitely the one on Main Street! Their lattes are incredible and the atmosphere is perfect for studying.",
    likes: 23,
    timeAgo: "2h",
    originalAuthor: "COFFEE_LOVER"
  },
  {
    id: 2,
    postId: 102,
    originalPostText: "Anyone else struggling with work-life balance?",
    replyText: "I feel you! I started setting strict boundaries with work hours and it's helped a lot. Also meditation apps are game changers.",
    likes: 45,
    timeAgo: "5h",
    originalAuthor: "BUSY_BEE"
  },
  {
    id: 3,
    postId: 103,
    originalPostText: "Best study spots near campus?",
    replyText: "The library's third floor is usually quiet, and there's a great cafe called 'Bean There' just off campus with good wifi!",
    likes: 12,
    timeAgo: "1d",
    originalAuthor: "STUDENT_LIFE"
  },
  {
    id: 4,
    postId: 104,
    originalPostText: "Feeling overwhelmed with everything lately...",
    replyText: "You're not alone in feeling this way. Take it one day at a time and don't be afraid to reach out for support when you need it. 💙",
    likes: 67,
    timeAgo: "2d",
    originalAuthor: "ANONYMOUS_USER"
  }
];

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  post 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  post: Post | null;
}) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-sm rounded-2xl shadow-2xl border border-gray-700">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Delete Post</h3>
              <p className="text-sm text-gray-400">This action cannot be undone</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300 line-clamp-3">
                {post.text}
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{post.likes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{post.comments}</span>
                </span>
                <span>{post.timeAgo}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ 
  post, 
  onDelete 
}: { 
  post: Post; 
  onDelete: (post: Post) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);

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
    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
      <div className="aspect-[3/4] relative">
        <img 
          src={post.image} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Post Menu */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-white" />
            </button>
            
            {showMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-10">
                <button
                  onClick={() => {
                    onDelete(post);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete Post</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex justify-start">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
              {post.category.toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-3">
            <p className="text-white font-medium text-sm leading-relaxed drop-shadow-lg">
              {post.text}
            </p>
            
            <div className="flex items-center justify-between text-white/80 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
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

const ReplyCard = ({ reply }: { reply: Reply }) => (
  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
    <div className="mb-3">
      <div className="flex items-center space-x-2 mb-2">
        <Reply className="w-4 h-4 text-gray-400" />
        <span className="text-xs text-gray-400">Replying to @{reply.originalAuthor}</span>
      </div>
      <p className="text-sm text-gray-400 italic line-clamp-2">
        "{reply.originalPostText}"
      </p>
    </div>
    
    <p className="text-white text-sm leading-relaxed mb-3">
      {reply.replyText}
    </p>
    
    <div className="flex items-center justify-between text-xs text-gray-400">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <Heart className="w-3 h-3" />
          <span>{reply.likes}</span>
        </div>
      </div>
      <span>{reply.timeAgo}</span>
    </div>
  </div>
);

export const MyPostsPage: React.FC<MyPostsPageProps> = ({
  onBack,
  userData,
  posts,
  onDeletePost
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies'>('posts');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(userData);

  // Filter posts that belong to the current user (in a real app, this would be based on user ID)
  // For demo purposes, we'll show the first few posts as user's posts
  const userPosts = posts.slice(0, 3);

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      onDeletePost(postToDelete.id);
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleUpdateProfile = (updates: { email?: string; password?: string }) => {
    if (currentUserData) {
      setCurrentUserData({
        ...currentUserData,
        ...(updates.email && { email: updates.email })
      });
    }
    console.log('Profile updated:', updates);
    // In a real app, this would make an API call to update the user's profile
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">Profile</h1>
              <p className="text-sm text-gray-400">Your anonymous identity</p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-8">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-800" />
          </div>
          
          {/* Handle Name */}
          <h2 className="text-2xl font-bold text-white font-mono tracking-wider mb-2">
            @{currentUserData?.username || 'GUEST'}
          </h2>
          
          {/* Join Date */}
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mb-4">
            <Calendar className="w-4 h-4" />
            <span>Joined {currentUserData?.registrationDate ? formatJoinDate(currentUserData.registrationDate) : 'Recently'}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-800 rounded-xl border border-gray-700">
              <p className="text-xl font-bold text-white">{userPosts.length}</p>
              <p className="text-xs text-gray-400">Posts</p>
            </div>
            <div className="text-center p-3 bg-gray-800 rounded-xl border border-gray-700">
              <p className="text-xl font-bold text-white">
                {userPosts.reduce((sum, post) => sum + post.likes, 0)}
              </p>
              <p className="text-xs text-gray-400">Likes</p>
            </div>
            <div className="text-center p-3 bg-gray-800 rounded-xl border border-gray-700">
              <p className="text-xl font-bold text-white">{mockReplies.length}</p>
              <p className="text-xs text-gray-400">Replies</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'posts'
                ? 'bg-white text-gray-800'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Hash className="w-4 h-4" />
            <span>Recent Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('replies')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'replies'
                ? 'bg-white text-gray-800'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Reply className="w-4 h-4" />
            <span>Replies</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'posts' && (
          <div>
            {userPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {userPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hash className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Posts Yet</h3>
                <p className="text-gray-400 text-sm mb-6">
                  You haven't shared any thoughts yet. Start creating posts to see them here!
                </p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Create Your First Post
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'replies' && (
          <div>
            {mockReplies.length > 0 ? (
              <div className="space-y-4">
                {mockReplies.map((reply) => (
                  <ReplyCard key={reply.id} reply={reply} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Reply className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Replies Yet</h3>
                <p className="text-gray-400 text-sm mb-6">
                  You haven't replied to any posts yet. Start engaging with the community!
                </p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Explore Posts
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        post={postToDelete}
      />

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userData={currentUserData}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};
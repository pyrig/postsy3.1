import React, { useState } from 'react';
import { X, Globe, Lock, Send, Loader2, Users, MapPin, Hash, Type, Plus } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: {
    text: string;
    category: 'groups' | 'popular' | 'nearby' | 'latest';
    privacy: 'public' | 'friends' | 'private';
    tags?: string[];
  }) => void;
  userData: { username: string } | null;
}

const predefinedTags = [
  'mentalhealth', 'relationships', 'college', 'worklife', 'coffee', 'music',
  'travel', 'food', 'gaming', 'fitness', 'art', 'books', 'movies', 'tech',
  'nature', 'photography', 'cooking', 'fashion', 'sports', 'pets'
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost,
  userData
}) => {
  const [postText, setPostText] = useState('');
  const [category, setCategory] = useState<'groups' | 'popular' | 'nearby' | 'latest'>('popular');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const resetModal = () => {
    setPostText('');
    setCategory('popular');
    setPrivacy('public');
    setTags([]);
    setNewTag('');
    setIsPosting(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 3) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCreatePost = async () => {
    if (!postText.trim()) return;
    
    setIsPosting(true);
    
    setTimeout(() => {
      onCreatePost({
        text: postText,
        category,
        privacy,
        tags
      });
      setIsPosting(false);
      handleClose();
    }, 1000);
  };

  const categories = [
    { key: 'popular' as const, label: 'Popular', icon: Globe, color: 'text-blue-400' },
    { key: 'groups' as const, label: 'Groups', icon: Users, color: 'text-green-400' },
    { key: 'nearby' as const, label: 'Nearby', icon: MapPin, color: 'text-purple-400' },
    { key: 'latest' as const, label: 'Latest', icon: Hash, color: 'text-white' }
  ];

  const privacyOptions = [
    { key: 'public' as const, label: 'Public', icon: Globe, description: 'Anyone can see this post' },
    { key: 'friends' as const, label: 'Friends', icon: Users, description: 'Only your connections can see' },
    { key: 'private' as const, label: 'Private', icon: Lock, description: 'Only you can see this post' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-8">
      <div className="bg-gray-900 w-full max-w-md mx-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Create Post</h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-4 space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                <Type className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <p className="font-medium text-white font-mono tracking-wider">
                  @{userData?.username || 'GUEST'}
                </p>
                <p className="text-xs text-gray-400">Sharing anonymously</p>
              </div>
            </div>

            {/* Text Input */}
            <div>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind? Share your thoughts..."
                className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none bg-gray-800 text-white placeholder-gray-400 min-h-[120px]"
                maxLength={500}
                autoFocus
              />
              <p className="text-xs text-gray-400 mt-2 text-right">
                {postText.length}/500 characters
              </p>
            </div>

            {/* Tags Section */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Tags (Optional - up to 3)
              </label>
              
              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full flex items-center space-x-1"
                    >
                      <Hash className="w-3 h-3" />
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-gray-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Add Custom Tag */}
              {tags.length < 3 && (
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag(newTag)}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                    maxLength={20}
                  />
                  <button
                    onClick={() => handleAddTag(newTag)}
                    disabled={!newTag.trim() || tags.length >= 3}
                    className="px-3 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Predefined Tags */}
              {tags.length < 3 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {predefinedTags
                      .filter(tag => !tags.includes(tag))
                      .slice(0, 8)
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleAddTag(tag)}
                          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs rounded-full transition-colors flex items-center space-x-1"
                        >
                          <Hash className="w-3 h-3" />
                          <span>{tag}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className={`flex items-center space-x-2 p-3 rounded-xl border transition-all ${
                        category === cat.key
                          ? 'border-white bg-white/10 text-white'
                          : 'border-gray-600 hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${category === cat.key ? 'text-white' : cat.color}`} />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Privacy Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Privacy
              </label>
              <div className="space-y-2">
                {privacyOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.key}
                      onClick={() => setPrivacy(option.key)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all text-left ${
                        privacy === option.key
                          ? 'border-white bg-white/10'
                          : 'border-gray-600 hover:bg-gray-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${privacy === option.key ? 'text-white' : 'text-gray-400'}`} />
                      <div>
                        <p className={`text-sm font-medium ${privacy === option.key ? 'text-white' : 'text-gray-300'}`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-gray-400">{option.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePost}
            disabled={!postText.trim() || isPosting}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isPosting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Share Post</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
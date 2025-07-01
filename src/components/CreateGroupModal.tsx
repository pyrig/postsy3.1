import React, { useState } from 'react';
import { X, Users, Globe, Lock, Plus, Search, Send, Copy, Check, UserPlus, Image, Hash, Type } from 'lucide-react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (group: {
    name: string;
    description: string;
    category: string;
    isPrivate: boolean;
    invitedMembers: string[];
    image: string;
    tags: string[];
  }) => void;
  userData: { username: string } | null;
}

interface SearchUser {
  username: string;
  bio?: string;
  isOnline: boolean;
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

const stockImages = [
  "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  "https://images.pexels.com/photos/1323592/pexels-photo-1323592.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
];

const categories = [
  'Health & Wellness',
  'Relationships',
  'Education',
  'Entertainment',
  'Professional',
  'Arts & Creativity',
  'Technology',
  'Sports & Fitness',
  'Food & Cooking',
  'Travel',
  'Gaming',
  'Music',
  'Books & Literature',
  'Science',
  'Business'
];

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
  userData
}) => {
  const [step, setStep] = useState<'details' | 'privacy' | 'invite' | 'image'>('details');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    isPrivate: false,
    image: '',
    tags: [] as string[]
  });
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const resetModal = () => {
    setStep('details');
    setFormData({
      name: '',
      description: '',
      category: '',
      isPrivate: false,
      image: '',
      tags: []
    });
    setInvitedMembers([]);
    setSearchQuery('');
    setSearchResults([]);
    setNewTag('');
    setIsCreating(false);
    setInviteLink('');
    setLinkCopied(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleUserSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = mockUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) &&
        !invitedMembers.includes(user.username)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleInviteUser = (username: string) => {
    if (!invitedMembers.includes(username)) {
      setInvitedMembers([...invitedMembers, username]);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleRemoveInvite = (username: string) => {
    setInvitedMembers(invitedMembers.filter(member => member !== username));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const generateInviteLink = () => {
    const groupId = formData.name.toLowerCase().replace(/\s+/g, '-');
    const link = `https://postsy.app/groups/join/${groupId}?invite=${Math.random().toString(36).substr(2, 9)}`;
    setInviteLink(link);
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const handleCreateGroup = async () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.category) return;
    
    setIsCreating(true);
    
    setTimeout(() => {
      onCreateGroup({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        isPrivate: formData.isPrivate,
        invitedMembers,
        image: formData.image || stockImages[0],
        tags: formData.tags
      });
      setIsCreating(false);
      handleClose();
    }, 1500);
  };

  const canProceed = () => {
    switch (step) {
      case 'details':
        return formData.name.trim() && formData.description.trim() && formData.category;
      case 'privacy':
        return true;
      case 'invite':
        return true;
      case 'image':
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-8">
      <div className="bg-gray-900 w-full max-w-md mx-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {step === 'details' ? 'Create Group' :
             step === 'privacy' ? 'Privacy Settings' :
             step === 'invite' ? 'Invite Members' : 'Group Image'}
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 py-2 bg-gray-800">
          <div className="flex space-x-2">
            {['details', 'privacy', 'invite', 'image'].map((stepName, index) => (
              <div
                key={stepName}
                className={`flex-1 h-1 rounded-full transition-all ${
                  ['details', 'privacy', 'invite', 'image'].indexOf(step) >= index
                    ? 'bg-white'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {step === 'details' && (
            <div className="p-4 space-y-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter group name..."
                  className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                  maxLength={50}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {formData.name.length}/50 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what your group is about..."
                  className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none bg-gray-800 text-white placeholder-gray-400 min-h-[100px]"
                  maxLength={200}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {formData.description.length}/200 characters
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (Optional)
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                    maxLength={20}
                  />
                  <button
                    onClick={handleAddTag}
                    disabled={!newTag.trim() || formData.tags.length >= 5}
                    className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full flex items-center space-x-1"
                      >
                        <span>#{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Add up to 5 tags to help people find your group
                </p>
              </div>
            </div>
          )}

          {step === 'privacy' && (
            <div className="p-4 space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Choose Privacy Level</h3>
                <p className="text-gray-400 text-sm">
                  You can change this setting later in group settings
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, isPrivate: false }))}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    !formData.isPrivate
                      ? 'border-white bg-white/10'
                      : 'border-gray-600 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Globe className={`w-5 h-5 mt-0.5 ${!formData.isPrivate ? 'text-white' : 'text-gray-400'}`} />
                    <div>
                      <h4 className={`font-semibold text-sm ${!formData.isPrivate ? 'text-white' : 'text-gray-300'}`}>
                        Public Group
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Anyone can find, join, and see posts in this group
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        • Appears in group discovery
                        • Anyone can join instantly
                        • All posts are visible to members
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setFormData(prev => ({ ...prev, isPrivate: true }))}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    formData.isPrivate
                      ? 'border-white bg-white/10'
                      : 'border-gray-600 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Lock className={`w-5 h-5 mt-0.5 ${formData.isPrivate ? 'text-white' : 'text-gray-400'}`} />
                    <div>
                      <h4 className={`font-semibold text-sm ${formData.isPrivate ? 'text-white' : 'text-gray-300'}`}>
                        Private Group
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Only invited members can see and join this group
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        • Hidden from group discovery
                        • Invite-only membership
                        • Posts only visible to members
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {formData.isPrivate && (
                <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-300 text-sm">Private Group Benefits</h4>
                      <ul className="text-xs text-blue-200 mt-1 space-y-1">
                        <li>• Complete privacy and control over membership</li>
                        <li>• Safe space for sensitive discussions</li>
                        <li>• Invite-only ensures quality community</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'invite' && (
            <div className="p-4 space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Invite Members</h3>
                <p className="text-gray-400 text-sm">
                  {formData.isPrivate 
                    ? 'Add members to your private group' 
                    : 'Invite friends to join your group (optional)'}
                </p>
              </div>

              {/* Search Users */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search Users
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={(e) => handleUserSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user.username}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                          <Type className="w-4 h-4 text-gray-800" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm font-mono">@{user.username}</p>
                          {user.bio && <p className="text-xs text-gray-400">{user.bio}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleInviteUser(user.username)}
                        className="px-3 py-1 bg-white text-gray-800 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Invite
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Invited Members */}
              {invitedMembers.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">
                    Invited Members ({invitedMembers.length})
                  </h4>
                  <div className="space-y-2">
                    {invitedMembers.map((username) => (
                      <div
                        key={username}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                            <Type className="w-4 h-4 text-gray-800" />
                          </div>
                          <p className="font-medium text-white text-sm font-mono">@{username}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveInvite(username)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Invite Link */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-300">Invite Link</h4>
                  {!inviteLink && (
                    <button
                      onClick={generateInviteLink}
                      className="text-xs text-white hover:text-gray-300 underline"
                    >
                      Generate Link
                    </button>
                  )}
                </div>
                {inviteLink && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inviteLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-gray-300"
                    />
                    <button
                      onClick={copyInviteLink}
                      className="px-3 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
                    >
                      {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-sm">{linkCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Share this link to invite people to your group
                </p>
              </div>
            </div>
          )}

          {step === 'image' && (
            <div className="p-4 space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Choose Group Image</h3>
                <p className="text-gray-400 text-sm">
                  Select an image that represents your group
                </p>
              </div>

              {/* Selected Image Preview */}
              {formData.image && (
                <div className="relative mb-4">
                  <img 
                    src={formData.image} 
                    alt="Selected" 
                    className="w-full h-32 object-cover rounded-xl border border-gray-600"
                  />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              {/* Stock Images */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Choose from gallery</h4>
                <div className="grid grid-cols-3 gap-3">
                  {stockImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setFormData(prev => ({ ...prev, image }))}
                      className={`aspect-square rounded-xl overflow-hidden transition-all ${
                        formData.image === image 
                          ? 'ring-2 ring-white' 
                          : 'hover:ring-2 hover:ring-gray-400'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Option ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {!formData.image && (
                <p className="text-center text-gray-400 text-sm">
                  Select an image above or skip to use a default image
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex space-x-3">
          {step !== 'details' && (
            <button
              onClick={() => {
                const steps = ['details', 'privacy', 'invite', 'image'];
                const currentIndex = steps.indexOf(step);
                setStep(steps[currentIndex - 1] as any);
              }}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Back
            </button>
          )}
          
          {step === 'image' ? (
            <button
              onClick={handleCreateGroup}
              disabled={isCreating}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  <span>Create Group</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                const steps = ['details', 'privacy', 'invite', 'image'];
                const currentIndex = steps.indexOf(step);
                setStep(steps[currentIndex + 1] as any);
              }}
              disabled={!canProceed()}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              {step === 'details' ? 'Next: Privacy' :
               step === 'privacy' ? 'Next: Invite' :
               'Next: Image'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
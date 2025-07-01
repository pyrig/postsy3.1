import React, { useState } from 'react';
import { ArrowLeft, Users, Plus, Search, Heart, MessageCircle, UserPlus, UserCheck } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isFollowing: boolean;
  color: string;
  icon: string;
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

interface GroupsPageProps {
  onBack: () => void;
  posts: Post[];
  onFollowGroup: (groupId: string) => void;
  onCreateGroup: () => void;
}

const mockGroups: Group[] = [
  {
    id: 'mental-health',
    name: 'Mental Health Support',
    description: 'A safe space to share experiences and support each other',
    memberCount: 12847,
    isFollowing: true,
    color: 'from-green-500 to-emerald-500',
    icon: '💚'
  },
  {
    id: 'relationships',
    name: 'Relationship Advice',
    description: 'Anonymous discussions about dating and relationships',
    memberCount: 8923,
    isFollowing: false,
    color: 'from-pink-500 to-rose-500',
    icon: '💕'
  },
  {
    id: 'student-life',
    name: 'Student Life',
    description: 'Share your college experiences and study tips',
    memberCount: 15632,
    isFollowing: true,
    color: 'from-blue-500 to-indigo-500',
    icon: '📚'
  },
  {
    id: 'music-vibes',
    name: 'Music Vibes',
    description: 'Discover new music and share your favorite songs',
    memberCount: 6754,
    isFollowing: false,
    color: 'from-purple-500 to-violet-500',
    icon: '🎵'
  },
  {
    id: 'career-growth',
    name: 'Career Growth',
    description: 'Professional development and job hunting tips',
    memberCount: 9876,
    isFollowing: false,
    color: 'from-white to-gray-300',
    icon: '💼'
  },
  {
    id: 'creative-minds',
    name: 'Creative Minds',
    description: 'Share your art, writing, and creative projects',
    memberCount: 4321,
    isFollowing: true,
    color: 'from-teal-500 to-cyan-500',
    icon: '🎨'
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

const GroupCard = ({ 
  group, 
  onFollow 
}: { 
  group: Group; 
  onFollow: (groupId: string) => void;
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center text-xl`}>
            {group.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm">{group.name}</h3>
            <div className="flex items-center space-x-1 mt-1">
              <Users className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{group.memberCount.toLocaleString()} members</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onFollow(group.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            group.isFollowing
              ? 'bg-white/20 text-white border border-white/30'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
          }`}
        >
          {group.isFollowing ? (
            <div className="flex items-center space-x-1">
              <UserCheck className="w-3 h-3" />
              <span>Following</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <UserPlus className="w-3 h-3" />
              <span>Follow</span>
            </div>
          )}
        </button>
      </div>
      
      <p className="text-gray-300 text-xs mb-3 line-clamp-2 leading-relaxed">
        {group.description}
      </p>
    </div>
  );
};

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

export const GroupsPage: React.FC<GroupsPageProps> = ({
  onBack,
  posts,
  onFollowGroup,
  onCreateGroup
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<Group[]>(mockGroups);

  const handleFollowGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isFollowing: !group.isFollowing }
        : group
    ));
    onFollowGroup(groupId);
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupPosts = posts.filter(post => post.category === 'groups');

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">Groups</h1>
              <p className="text-sm text-gray-400">Find your community</p>
            </div>
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
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Groups List */}
        <div className="space-y-4 mb-8">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onFollow={handleFollowGroup}
            />
          ))}
        </div>

        {/* Recent Posts from Groups */}
        {groupPosts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recent Group Posts</h3>
            <div className="grid grid-cols-2 gap-4">
              {groupPosts.slice(0, 4).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">No Groups Found</h3>
            <p className="text-gray-400 text-sm">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
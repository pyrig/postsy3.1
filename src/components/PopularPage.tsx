import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Zap, TrendingUp, Clock, Calendar, Trophy, Heart, MessageCircle, Filter, ChevronDown, Star, Award } from 'lucide-react';

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
  engagementScore?: number;
  trendingVelocity?: number;
  isPostOfTheDay?: boolean;
  isTrendingFast?: boolean;
  hoursOld?: number;
}

interface PopularPageProps {
  onBack: () => void;
  posts: Post[];
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

// Enhanced posts with engagement metrics
const enhancedPosts: Post[] = [
  {
    id: 1,
    text: "Do you think it's okay to have a 'man of honor' instead of 'maid of honor' at your wedding if your best friend for 5 years is a guy?",
    image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 4821,
    comments: 892,
    timeAgo: "3h",
    category: 'popular',
    engagementScore: 5713,
    trendingVelocity: 95,
    isTrendingFast: true,
    hoursOld: 3,
    isPostOfTheDay: true
  },
  {
    id: 2,
    text: "When I heard about Pokemon GO",
    image: "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 3456,
    comments: 567,
    timeAgo: "5h",
    category: 'popular',
    engagementScore: 4023,
    trendingVelocity: 78,
    isTrendingFast: true,
    hoursOld: 5
  },
  {
    id: 3,
    text: "My girlfriend bought me cheese for our anniversary 😂",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2987,
    comments: 423,
    timeAgo: "8h",
    category: 'popular',
    engagementScore: 3410,
    trendingVelocity: 42,
    hoursOld: 8
  },
  {
    id: 4,
    text: "I wish people understood my depression. I can go from happy to sad in a blink of an eye because it all builds up inside. Wish I could handle it.",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 6234,
    comments: 1456,
    timeAgo: "12h",
    category: 'popular',
    engagementScore: 7690,
    trendingVelocity: 64,
    isTrendingFast: true,
    hoursOld: 12
  },
  {
    id: 5,
    text: "Sometimes the smallest gestures mean the most",
    image: "https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 5432,
    comments: 789,
    timeAgo: "1d",
    category: 'popular',
    engagementScore: 6221,
    trendingVelocity: 26,
    hoursOld: 24
  },
  {
    id: 6,
    text: "Coffee shop vibes hit different when you're working on your dreams",
    image: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 1876,
    comments: 234,
    timeAgo: "2d",
    category: 'popular',
    engagementScore: 2110,
    trendingVelocity: 8,
    hoursOld: 48
  },
  {
    id: 7,
    text: "The sunset tonight reminded me why I love this place",
    image: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 3245,
    comments: 456,
    timeAgo: "3d",
    category: 'popular',
    engagementScore: 3701,
    trendingVelocity: 5,
    hoursOld: 72
  },
  {
    id: 8,
    text: "Just discovered this amazing indie band! Music really does heal the soul 🎵",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 2156,
    comments: 345,
    timeAgo: "1w",
    category: 'popular',
    engagementScore: 2501,
    trendingVelocity: 2,
    hoursOld: 168
  }
];

const PostCard = ({ post, rank }: { post: Post; rank?: number }) => {
  const getTrendingIcon = () => {
    if (post.isPostOfTheDay) {
      return <Award className="w-4 h-4 text-yellow-400" />;
    }
    if (post.isTrendingFast) {
      return <Zap className="w-4 h-4 text-blue-400" />;
    }
    if (post.trendingVelocity && post.trendingVelocity > 30) {
      return <Flame className="w-4 h-4 text-red-400" />;
    }
    return null;
  };

  const getTrendingBadge = () => {
    if (post.isPostOfTheDay) {
      return (
        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg">
          <Trophy className="w-3 h-3" />
          <span>POST OF THE DAY</span>
        </div>
      );
    }
    if (post.isTrendingFast) {
      return (
        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg">
          <Zap className="w-3 h-3" />
          <span>TRENDING FAST</span>
        </div>
      );
    }
    if (post.trendingVelocity && post.trendingVelocity > 30) {
      return (
        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg">
          <Flame className="w-3 h-3" />
          <span>HOT</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800 border border-gray-700">
      {rank && rank <= 3 && (
        <div className="absolute top-3 right-3 z-20">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900' :
            rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900' :
            'bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900'
          }`}>
            #{rank}
          </div>
        </div>
      )}
      
      <div className="aspect-[3/4] relative">
        <img 
          src={post.image} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {getTrendingBadge()}
        
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex justify-end">
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
                {getTrendingIcon()}
              </div>
              <span className="text-white/60">{post.timeAgo}</span>
            </div>
            
            {post.engagementScore && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-white to-gray-300 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((post.engagementScore / 8000) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-white/60 text-xs">{post.engagementScore}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PopularPage: React.FC<PopularPageProps> = ({ onBack }) => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'all'>('today');
  const [sortBy, setSortBy] = useState<'engagement' | 'likes' | 'comments' | 'trending'>('engagement');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(enhancedPosts);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Auto-refresh every hour
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // In a real app, this would fetch new data
      console.log('Refreshing popular posts...');
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...enhancedPosts];

    // Apply time filter
    switch (timeFilter) {
      case 'today':
        filtered = filtered.filter(post => (post.hoursOld || 0) <= 24);
        break;
      case 'week':
        filtered = filtered.filter(post => (post.hoursOld || 0) <= 168);
        break;
      case 'all':
        // No filter
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'engagement':
        filtered.sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0));
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'comments':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      case 'trending':
        filtered.sort((a, b) => (b.trendingVelocity || 0) - (a.trendingVelocity || 0));
        break;
    }

    setFilteredPosts(filtered);
  }, [timeFilter, sortBy]);

  const timeFilters = [
    { key: 'today', label: 'Today', icon: Clock },
    { key: 'week', label: 'This Week', icon: Calendar },
    { key: 'all', label: 'All Time', icon: TrendingUp }
  ];

  const sortOptions = [
    { key: 'engagement', label: 'Engagement Score', icon: Star },
    { key: 'likes', label: 'Most Liked', icon: Heart },
    { key: 'comments', label: 'Most Discussed', icon: MessageCircle },
    { key: 'trending', label: 'Trending Fast', icon: Zap }
  ];

  const getFilterStats = () => {
    const totalEngagement = filteredPosts.reduce((sum, post) => sum + (post.engagementScore || 0), 0);
    const avgTrendingVelocity = filteredPosts.reduce((sum, post) => sum + (post.trendingVelocity || 0), 0) / filteredPosts.length;
    
    return {
      totalPosts: filteredPosts.length,
      totalEngagement,
      avgTrendingVelocity: Math.round(avgTrendingVelocity)
    };
  };

  const stats = getFilterStats();

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
              <h1 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Flame className="w-5 h-5 text-red-400" />
                <span>Popular</span>
              </h1>
              <p className="text-sm text-gray-400">
                Viral posts • Updated {lastRefresh.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-white">{stats.totalPosts}</p>
            <p className="text-xs text-gray-400">Posts</p>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-white">{stats.totalEngagement.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Engagement</p>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-white">{stats.avgTrendingVelocity}%</p>
            <p className="text-xs text-gray-400">Avg Velocity</p>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
            {/* Time Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Time Period</h3>
              <div className="flex space-x-2">
                {timeFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.key}
                      onClick={() => setTimeFilter(filter.key as any)}
                      className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        timeFilter === filter.key
                          ? 'bg-white text-gray-800'
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{filter.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Sort By</h3>
              <div className="grid grid-cols-2 gap-2">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.key}
                      onClick={() => setSortBy(option.key as any)}
                      className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        sortBy === option.key
                          ? 'bg-white text-gray-800'
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {/* Post of the Day */}
        {filteredPosts.find(post => post.isPostOfTheDay) && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Post of the Day</h2>
            </div>
            <PostCard post={filteredPosts.find(post => post.isPostOfTheDay)!} />
          </div>
        )}

        {/* Trending Fast Section */}
        {filteredPosts.filter(post => post.isTrendingFast && !post.isPostOfTheDay).length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Trending Fast</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredPosts
                .filter(post => post.isTrendingFast && !post.isPostOfTheDay)
                .slice(0, 4)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          </div>
        )}

        {/* Top Posts */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">
              Top Posts {timeFilter === 'today' ? 'Today' : timeFilter === 'week' ? 'This Week' : 'All Time'}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredPosts
              .filter(post => !post.isPostOfTheDay)
              .slice(0, 8)
              .map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  rank={index + 1}
                />
              ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Flame className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">No Popular Posts</h3>
            <p className="text-gray-400 text-sm">
              No posts match your current filters. Try adjusting the time period or sort options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
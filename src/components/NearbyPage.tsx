import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Radar, Users, Heart, MessageCircle, Filter, ChevronDown, Clock, Zap, Globe } from 'lucide-react';

interface Post {
  id: number;
  text: string;
  image: string;
  likes: number;
  comments: number;
  timeAgo: string;
  category: 'groups' | 'popular' | 'nearby' | 'latest';
  distance?: string;
  location?: string;
  isLocalTrending?: boolean;
  nearbyUsers?: number;
}

interface NearbyPageProps {
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

// Enhanced nearby posts with location data
const nearbyPosts: Post[] = [
  {
    id: 1,
    text: "Coffee shop on Main Street has the best vibes for studying! Anyone else here right now?",
    image: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 234,
    comments: 45,
    timeAgo: "15m",
    category: 'nearby',
    distance: "0.2 mi",
    location: "Downtown Coffee Co.",
    isLocalTrending: true,
    nearbyUsers: 12
  },
  {
    id: 2,
    text: "The sunset from the university library is absolutely stunning tonight 🌅",
    image: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 189,
    comments: 23,
    timeAgo: "32m",
    category: 'nearby',
    distance: "0.5 mi",
    location: "University Campus",
    nearbyUsers: 8
  },
  {
    id: 3,
    text: "Local farmers market has amazing fresh produce today! Supporting small businesses feels good",
    image: "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 156,
    comments: 34,
    timeAgo: "1h",
    category: 'nearby',
    distance: "0.8 mi",
    location: "Central Park Market",
    isLocalTrending: true,
    nearbyUsers: 15
  },
  {
    id: 4,
    text: "New art installation at the community center is thought-provoking. Worth checking out!",
    image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 98,
    comments: 17,
    timeAgo: "2h",
    category: 'nearby',
    distance: "1.2 mi",
    location: "Community Arts Center",
    nearbyUsers: 6
  },
  {
    id: 5,
    text: "Late night study session at the 24/7 diner. Their pie is keeping me going! 🥧",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 67,
    comments: 12,
    timeAgo: "3h",
    category: 'nearby',
    distance: "1.5 mi",
    location: "Mel's All-Night Diner",
    nearbyUsers: 4
  },
  {
    id: 6,
    text: "Morning jog through the park trails. Nature therapy before the day begins 🌳",
    image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 143,
    comments: 28,
    timeAgo: "5h",
    category: 'nearby',
    distance: "2.1 mi",
    location: "Riverside Park",
    nearbyUsers: 9
  },
  {
    id: 7,
    text: "Local bookstore has a cozy reading corner. Perfect rainy day escape with hot chocolate ☕",
    image: "https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 201,
    comments: 41,
    timeAgo: "6h",
    category: 'nearby',
    distance: "2.3 mi",
    location: "Chapter & Verse Books",
    isLocalTrending: true,
    nearbyUsers: 11
  },
  {
    id: 8,
    text: "Street musician playing beautiful jazz outside the metro station. Made my commute magical 🎷",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    likes: 312,
    comments: 56,
    timeAgo: "8h",
    category: 'nearby',
    distance: "2.8 mi",
    location: "Metro Central Station",
    isLocalTrending: true,
    nearbyUsers: 18
  }
];

const PostCard = ({ post }: { post: Post }) => {
  const getDistanceColor = (distance: string) => {
    const miles = parseFloat(distance);
    if (miles <= 0.5) return 'text-green-400 bg-green-900/20';
    if (miles <= 1.0) return 'text-yellow-400 bg-yellow-900/20';
    if (miles <= 2.0) return 'text-orange-400 bg-orange-900/20';
    return 'text-red-400 bg-red-900/20';
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800 border border-gray-700">
      <div className="aspect-[3/4] relative">
        <img 
          src={post.image} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Distance Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${getDistanceColor(post.distance || '0')}`}>
            <MapPin className="w-3 h-3" />
            <span>{post.distance}</span>
          </div>
        </div>

        {/* Local Trending Badge */}
        {post.isLocalTrending && (
          <div className="absolute top-3 right-3">
            <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg">
              <Zap className="w-3 h-3" />
              <span>LOCAL TRENDING</span>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div></div>
          
          <div className="space-y-3">
            <p className="text-white font-medium text-sm leading-relaxed drop-shadow-lg">
              {post.text}
            </p>
            
            {/* Location Info */}
            {post.location && (
              <div className="flex items-center space-x-1 text-white/80 text-xs">
                <MapPin className="w-3 h-3" />
                <span>{post.location}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between text-white/80 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
                {post.nearbyUsers && (
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Users className="w-3 h-3" />
                    <span>{post.nearbyUsers}</span>
                  </div>
                )}
              </div>
              <span className="text-white/60">{post.timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NearbyPage: React.FC<NearbyPageProps> = ({ onBack }) => {
  const [radiusFilter, setRadiusFilter] = useState<'0.5' | '1' | '2' | '5'>('2');
  const [timeFilter, setTimeFilter] = useState<'1h' | '6h' | '24h' | 'week'>('24h');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(nearbyPosts);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [currentLocation] = useState('Downtown District'); // Mock location

  // Filter posts based on distance and time
  useEffect(() => {
    let filtered = [...nearbyPosts];

    // Apply radius filter
    const maxDistance = parseFloat(radiusFilter);
    filtered = filtered.filter(post => {
      const distance = parseFloat(post.distance || '0');
      return distance <= maxDistance;
    });

    // Apply time filter
    const now = new Date();
    filtered = filtered.filter(post => {
      const timeValue = parseInt(post.timeAgo);
      const timeUnit = post.timeAgo.slice(-1);
      
      let hoursAgo = 0;
      if (timeUnit === 'm') hoursAgo = timeValue / 60;
      else if (timeUnit === 'h') hoursAgo = timeValue;
      else if (timeUnit === 'd') hoursAgo = timeValue * 24;
      
      switch (timeFilter) {
        case '1h': return hoursAgo <= 1;
        case '6h': return hoursAgo <= 6;
        case '24h': return hoursAgo <= 24;
        case 'week': return hoursAgo <= 168;
        default: return true;
      }
    });

    setFilteredPosts(filtered);
  }, [radiusFilter, timeFilter]);

  const radiusOptions = [
    { key: '0.5', label: '0.5 mi', description: 'Very close' },
    { key: '1', label: '1 mi', description: 'Walking distance' },
    { key: '2', label: '2 mi', description: 'Short drive' },
    { key: '5', label: '5 mi', description: 'Extended area' }
  ];

  const timeOptions = [
    { key: '1h', label: 'Last Hour', icon: Clock },
    { key: '6h', label: 'Last 6 Hours', icon: Clock },
    { key: '24h', label: 'Today', icon: Clock },
    { key: 'week', label: 'This Week', icon: Clock }
  ];

  const getLocationStats = () => {
    const totalNearbyUsers = filteredPosts.reduce((sum, post) => sum + (post.nearbyUsers || 0), 0);
    const trendingCount = filteredPosts.filter(post => post.isLocalTrending).length;
    
    return {
      totalPosts: filteredPosts.length,
      totalNearbyUsers,
      trendingCount,
      avgDistance: filteredPosts.length > 0 
        ? (filteredPosts.reduce((sum, post) => sum + parseFloat(post.distance || '0'), 0) / filteredPosts.length).toFixed(1)
        : '0'
    };
  };

  const stats = getLocationStats();

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
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>Nearby</span>
              </h1>
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                {locationEnabled ? (
                  <>
                    <Navigation className="w-3 h-3 text-green-400" />
                    <span>{currentLocation}</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3 h-3 text-red-400" />
                    <span>Location disabled</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Location Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <p className="text-sm font-bold text-white">{stats.totalPosts}</p>
            <p className="text-xs text-gray-400">Posts</p>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <p className="text-sm font-bold text-white">{stats.totalNearbyUsers}</p>
            <p className="text-xs text-gray-400">Users</p>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <p className="text-sm font-bold text-white">{stats.trendingCount}</p>
            <p className="text-xs text-gray-400">Trending</p>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <p className="text-sm font-bold text-white">{stats.avgDistance}mi</p>
            <p className="text-xs text-gray-400">Avg Dist</p>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
            {/* Radius Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Search Radius</h3>
              <div className="grid grid-cols-2 gap-2">
                {radiusOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setRadiusFilter(option.key as any)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      radiusFilter === option.key
                        ? 'bg-white text-gray-800'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700 border border-gray-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Time Period</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.key}
                      onClick={() => setTimeFilter(option.key as any)}
                      className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        timeFilter === option.key
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
        {!locationEnabled && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-xl">
            <div className="flex items-start space-x-3">
              <Navigation className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-300 text-sm">Enable Location</h3>
                <p className="text-yellow-400 text-xs mt-1 leading-relaxed">
                  Turn on location services to see posts from people near you and discover what's happening in your area.
                </p>
                <button 
                  onClick={() => setLocationEnabled(true)}
                  className="mt-2 px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Enable Location
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Local Trending Section */}
        {filteredPosts.filter(post => post.isLocalTrending).length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Radar className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Trending Locally</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredPosts
                .filter(post => post.isLocalTrending)
                .slice(0, 4)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          </div>
        )}

        {/* All Nearby Posts */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">
              Near You ({radiusFilter} mile radius)
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">No Nearby Posts</h3>
            <p className="text-gray-400 text-sm mb-4">
              No posts found in your selected area and time range.
            </p>
            <button
              onClick={() => {
                setRadiusFilter('5');
                setTimeFilter('week');
              }}
              className="px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Expand Search Area
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
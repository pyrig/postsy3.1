import React, { useState, useRef } from 'react';
import { X, Image, Sparkles, Upload, Camera, Type, Hash, MapPin, Users, Globe, Lock, Send, Loader2 } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: {
    text: string;
    image: string;
    category: 'groups' | 'popular' | 'nearby' | 'latest';
    privacy: 'public' | 'friends' | 'private';
  }) => void;
  userData: { username: string } | null;
}

const aiImagePrompts = [
  "A serene mountain landscape at sunset",
  "Abstract colorful geometric patterns",
  "Cozy coffee shop interior with warm lighting",
  "Minimalist workspace with plants",
  "City skyline at night with neon lights",
  "Peaceful forest path in autumn",
  "Modern architecture with clean lines",
  "Vintage bookstore with old books",
  "Ocean waves crashing on rocks",
  "Starry night sky over a field",
  "Artistic graffiti on urban wall",
  "Zen garden with stones and sand",
  "Bustling marketplace with colorful stalls",
  "Misty morning in a meadow",
  "Industrial loft with exposed brick"
];

const stockImages = [
  "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1323592/pexels-photo-1323592.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost,
  userData
}) => {
  const [step, setStep] = useState<'compose' | 'image' | 'ai-generate'>('compose');
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [category, setCategory] = useState<'groups' | 'popular' | 'nearby' | 'latest'>('popular');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetModal = () => {
    setStep('compose');
    setPostText('');
    setSelectedImage('');
    setCategory('popular');
    setPrivacy('public');
    setIsGenerating(false);
    setAiPrompt('');
    setIsPosting(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setStep('compose');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStockImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setStep('compose');
  };

  const generateAIImage = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI image generation with a random stock image
    setTimeout(() => {
      const randomImage = stockImages[Math.floor(Math.random() * stockImages.length)];
      setSelectedImage(randomImage);
      setIsGenerating(false);
      setStep('compose');
    }, 2000);
  };

  const handleCreatePost = async () => {
    if (!postText.trim() || !selectedImage) return;
    
    setIsPosting(true);
    
    setTimeout(() => {
      onCreatePost({
        text: postText,
        image: selectedImage,
        category,
        privacy
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
          <h2 className="text-lg font-semibold text-white">
            {step === 'compose' ? 'Create Post' : 
             step === 'image' ? 'Add Image' : 'Generate AI Image'}
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === 'compose' && (
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
                />
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {postText.length}/500 characters
                </p>
              </div>

              {/* Selected Image Preview */}
              {selectedImage && (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-full h-48 object-cover rounded-xl border border-gray-600"
                  />
                  <button
                    onClick={() => setSelectedImage('')}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              {/* Image Options */}
              {!selectedImage && (
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setStep('image')}
                    className="flex flex-col items-center space-y-2 p-4 border border-gray-600 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <Image className="w-6 h-6 text-white" />
                    <span className="text-xs text-gray-300">Gallery</span>
                  </button>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center space-y-2 p-4 border border-gray-600 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-blue-400" />
                    <span className="text-xs text-gray-300">Upload</span>
                  </button>
                  
                  <button
                    onClick={() => setStep('ai-generate')}
                    className="flex flex-col items-center space-y-2 p-4 border border-gray-600 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <span className="text-xs text-gray-300">AI Generate</span>
                  </button>
                </div>
              )}

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
          )}

          {step === 'image' && (
            <div className="p-4">
              <div className="mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-600 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Camera className="w-6 h-6 text-gray-400" />
                  <span className="text-gray-300">Upload from device</span>
                </button>
              </div>
              
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Stock Images</h3>
                <div className="grid grid-cols-2 gap-3">
                  {stockImages.slice(0, 6).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleStockImageSelect(image)}
                      className="aspect-square rounded-xl overflow-hidden hover:ring-2 hover:ring-white transition-all"
                    >
                      <img 
                        src={image} 
                        alt={`Stock ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'ai-generate' && (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Describe your image
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none bg-gray-800 text-white placeholder-gray-400 min-h-[100px]"
                  maxLength={200}
                />
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {aiPrompt.length}/200 characters
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Quick prompts</h3>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {aiImagePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setAiPrompt(prompt)}
                      className="text-left p-3 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateAIImage}
                disabled={!aiPrompt.trim() || isGenerating}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Image</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'compose' && (
          <div className="p-4 border-t border-gray-700 flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePost}
              disabled={!postText.trim() || !selectedImage || isPosting}
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
        )}

        {step !== 'compose' && (
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={() => setStep('compose')}
              className="w-full px-4 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Back to Post
            </button>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
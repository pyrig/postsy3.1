import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft, Heart, MessageCircle, RefreshCw, Shield, Lock, AlertCircle, X, CheckCircle, UserX, Database, Globe, Smartphone } from 'lucide-react';

interface UserData {
  username: string;
  registrationDate: string;
}

interface AuthPagesProps {
  onLogin: (userData?: UserData) => void;
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

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'data' | 'security' | 'rights'>('overview');

  if (!isOpen) return null;

  const sections = [
    { key: 'overview', label: 'Overview', icon: Shield },
    { key: 'data', label: 'Data Collection', icon: Database },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'rights', label: 'Your Rights', icon: UserX }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Privacy & Security</h2>
                <p className="text-sm text-gray-400">How we protect your anonymity</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Section Tabs */}
          <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key as any)}
                  className={`flex-1 flex items-center justify-center space-x-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                    activeSection === section.key
                      ? 'bg-white text-gray-800'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Privacy-First Design</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Postsy is built from the ground up to protect your identity and ensure your thoughts remain truly anonymous.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <UserX className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">True Anonymity</h4>
                    <p className="text-gray-400 text-xs mt-1">No real names, phone numbers, or personal identifiers required. Your randomly generated username is your only identity.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <Database className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">Minimal Data Collection</h4>
                    <p className="text-gray-400 text-xs mt-1">We only collect what's absolutely necessary: your email for account recovery and your posts. No tracking, no profiling.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <Lock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">End-to-End Encryption</h4>
                    <p className="text-gray-400 text-xs mt-1">All your messages and posts are encrypted in transit and at rest. Even we can't read your private conversations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <Globe className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">No Third-Party Tracking</h4>
                    <p className="text-gray-400 text-xs mt-1">No analytics, no advertising networks, no social media pixels. Your activity stays between you and Postsy.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span>What We Collect</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-900/20 border border-green-700 rounded-xl">
                    <h4 className="font-semibold text-green-300 text-sm mb-2">✓ What We DO Collect</h4>
                    <ul className="space-y-2 text-xs text-green-200">
                      <li>• Email address (for account recovery only)</li>
                      <li>• Your posts and comments</li>
                      <li>• Anonymous usage statistics (no personal data)</li>
                      <li>• Device type (mobile/desktop) for optimization</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-900/20 border border-red-700 rounded-xl">
                    <h4 className="font-semibold text-red-300 text-sm mb-2">✗ What We DON'T Collect</h4>
                    <ul className="space-y-2 text-xs text-red-200">
                      <li>• Real names or personal information</li>
                      <li>• Phone numbers or addresses</li>
                      <li>• Location data or GPS coordinates</li>
                      <li>• Browsing history or cookies</li>
                      <li>• Device identifiers or fingerprinting</li>
                      <li>• Social media connections</li>
                      <li>• Contact lists or photos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <span>Data Retention</span>
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Your posts are stored only as long as you keep them. Delete a post, and it's permanently removed from our servers within 24 hours. Account data is deleted within 30 days of account deletion.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <span>Security Measures</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-white text-sm mb-2">🔐 Encryption</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-2">
                      All data is encrypted using industry-standard AES-256 encryption both in transit (HTTPS/TLS 1.3) and at rest.
                    </p>
                    <div className="text-xs text-gray-500">
                      • Messages: End-to-end encrypted
                      • Posts: Encrypted at rest
                      • Passwords: Hashed with bcrypt
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-white text-sm mb-2">🛡️ Infrastructure Security</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-2">
                      Our servers are hosted in secure, SOC 2 compliant data centers with 24/7 monitoring and regular security audits.
                    </p>
                    <div className="text-xs text-gray-500">
                      • Regular security updates
                      • Automated threat detection
                      • DDoS protection
                      • Secure backup systems
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-white text-sm mb-2">👥 Access Control</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Only essential personnel have access to systems, and all access is logged and monitored. No one can view your private messages or link your posts to your identity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'rights' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <UserX className="w-5 h-5 text-green-400" />
                  <span>Your Privacy Rights</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-white text-sm mb-2">📋 Right to Know</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      You can request a copy of all data we have about you at any time. We'll provide it in a readable format within 30 days.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-white text-sm mb-2">🗑️ Right to Delete</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Delete individual posts instantly, or delete your entire account and all associated data permanently. No questions asked.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-white text-sm mb-2">✏️ Right to Correct</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Update your email address or other account information at any time through your profile settings.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-white text-sm mb-2">🚫 Right to Opt-Out</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      We don't sell data or use it for advertising, but you can opt out of anonymous usage analytics in your settings.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-xl">
                    <h4 className="font-semibold text-blue-300 text-sm mb-2">📞 Contact Us</h4>
                    <p className="text-blue-200 text-xs leading-relaxed">
                      Questions about your privacy? Email us at privacy@postsy.app or use the in-app support feature. We respond within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              Last updated: January 2024
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const generateRandomUsername = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const WelcomeScreen = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const features = [
    { icon: Heart, title: "Express Freely", subtitle: "Share without judgment" },
    { icon: MessageCircle, title: "Connect Anonymously", subtitle: "Find your community" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonPress = () => {
    setIsButtonPressed(true);
    setTimeout(() => {
      setIsButtonPressed(false);
      onGetStarted();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="mb-8">
          <div className="mb-8 mx-auto">
            <img 
              src="/whitepostsylogo.PNG" 
              alt="Postsy Logo" 
              className="w-64 h-auto mx-auto drop-shadow-lg"
            />
          </div>
          <p className="text-white text-xl font-semibold leading-relaxed drop-shadow-md">
            Share your thoughts anonymously with the world
          </p>
        </div>

        <div className="space-y-6 mb-12 h-24 flex flex-col justify-center">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`flex items-center space-x-4 text-white/95 transition-all duration-700 ease-in-out ${
                  currentFeature === index 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-4 absolute'
                }`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                  <Icon className="w-7 h-7 drop-shadow-sm text-gray-800" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg drop-shadow-sm">{feature.title}</h3>
                  <p className="text-sm text-gray-300 drop-shadow-sm">{feature.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={handleButtonPress}
            className={`w-full bg-gradient-to-r from-white to-gray-200 text-gray-800 font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-200 ${
              isButtonPressed 
                ? 'scale-95 shadow-lg' 
                : 'hover:scale-105 hover:-translate-y-1'
            } active:scale-95`}
            style={{
              boxShadow: isButtonPressed 
                ? '0 4px 15px rgba(255, 255, 255, 0.3)' 
                : '0 8px 25px rgba(255, 255, 255, 0.4)'
            }}
          >
            Get Started
          </button>
          
          <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
            <Lock className="w-4 h-4" />
            <span>Privacy-first app.</span>
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="underline hover:text-white transition-colors font-medium"
            >
              Learn more
            </button>
          </div>
          
          <div className="text-center pt-2">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button 
                onClick={onGetStarted}
                className="text-white font-semibold underline hover:text-gray-300 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  );
};

const LoginScreen = ({ 
  onSignUp, 
  onLogin, 
  onBack 
}: { 
  onSignUp: () => void; 
  onLogin: () => void; 
  onBack: () => void; 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (Math.random() < 0.2) {
        setError('Email or password is incorrect. Please try again.');
        return;
      }
      
      const mockUserData: UserData = {
        username: generateRandomUsername(),
        registrationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      };
      onLogin(mockUserData);
    }, 1500);
  };

  const handleButtonPress = () => {
    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 150);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 p-3 hover:bg-gray-800 rounded-xl transition-colors group"
            aria-label="Go back to welcome screen"
          >
            <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-300 transition-colors" />
            <span className="text-gray-400 group-hover:text-gray-300 font-medium transition-colors">Back</span>
          </button>
        </div>

        {/* Logo Section */}
        <div className="text-center mb-8">
          <img 
            src="/whitepostsylogo.PNG" 
            alt="Postsy Logo" 
            className="h-16 w-auto mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-white mb-3">Sign in to continue</h1>
          <p className="text-gray-400 text-lg mb-4">Access your anonymous account</p>
          
          <div className="flex items-start space-x-3 p-4 bg-green-900/30 border border-green-700 rounded-xl">
            <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-300 text-sm font-medium">Your identity remains private</p>
              <p className="text-green-400 text-xs mt-1">We don't track names or personal info — only your anonymous username.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-start space-x-3 p-4 bg-red-900/30 border border-red-700 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-sm font-medium">Sign in failed</p>
              <p className="text-red-400 text-xs mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 flex-1">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-5 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-500 ${
                error ? 'border-red-600 bg-red-900/20' : 'border-gray-600 bg-gray-800'
              }`}
              placeholder="Enter your email address"
              required
              aria-describedby={error ? "email-error" : undefined}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-4 pr-14 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-500 ${
                  error ? 'border-red-600 bg-red-900/20' : 'border-gray-600 bg-gray-800'
                }`}
                placeholder="Enter your password"
                required
                aria-describedby={error ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded border-gray-600 text-white focus:ring-white focus:ring-2 bg-gray-800" 
                aria-describedby="remember-me-description"
              />
              <span className="ml-3 text-sm text-gray-400" id="remember-me-description">Remember me</span>
            </label>
            <button 
              type="button" 
              className="text-sm text-white hover:text-gray-300 font-semibold hover:underline transition-all"
              aria-label="Reset your password"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleButtonPress}
              className={`w-full bg-gradient-to-r from-white to-gray-200 text-gray-800 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-200 disabled:opacity-50 disabled:transform-none ${
                isButtonPressed 
                  ? 'scale-95 shadow-md' 
                  : 'hover:scale-105 hover:-translate-y-0.5'
              }`}
              style={{
                boxShadow: isButtonPressed 
                  ? '0 4px 15px rgba(255, 255, 255, 0.3)' 
                  : '0 8px 25px rgba(255, 255, 255, 0.4)'
              }}
              aria-describedby="signin-button-description"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
            <p className="sr-only" id="signin-button-description">
              Sign in to your anonymous account
            </p>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button 
              onClick={onSignUp}
              className="text-white hover:text-gray-300 font-semibold hover:underline transition-all"
              aria-label="Create a new account"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const SignUpScreen = ({ 
  onLogin, 
  onSignUp, 
  onBack 
}: { 
  onLogin: () => void; 
  onSignUp: (userData: UserData) => void; 
  onBack: () => void; 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, username: generateRandomUsername() }));
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const userData: UserData = {
        username: formData.username,
        registrationDate: new Date().toISOString()
      };
      onSignUp(userData);
    }, 1500);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const regenerateUsername = () => {
    setFormData(prev => ({ ...prev, username: generateRandomUsername() }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
      <StatusBar />
      
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 p-3 hover:bg-gray-800 rounded-xl transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-300 transition-colors" />
            <span className="text-gray-400 group-hover:text-gray-300 font-medium transition-colors">Back</span>
          </button>
        </div>

        {/* Logo Section */}
        <div className="text-center mb-8">
          <img 
            src="/whitepostsylogo.PNG" 
            alt="Postsy Logo" 
            className="h-16 w-auto mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-white mb-3">Create account</h1>
          <p className="text-gray-400 text-lg">Join the community and start sharing</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6 flex-1">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Your Anonymous Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={formData.username}
                readOnly
                className="w-full px-4 py-4 pr-12 border border-gray-600 rounded-2xl bg-gray-800 text-gray-200 font-mono text-center text-lg tracking-wider"
              />
              <button
                type="button"
                onClick={regenerateUsername}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                title="Generate new username"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Your randomly generated anonymous username. Click the refresh icon to generate a new one.
            </p>
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full px-4 py-4 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="signup-password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="w-full px-4 py-4 pr-12 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-500"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className="w-full px-4 py-4 pr-12 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-500"
                placeholder="Confirm your password"
                required
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

          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 rounded border-gray-600 text-white focus:ring-white bg-gray-800" 
            />
            <label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
              I agree to the{' '}
              <button 
                type="button" 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-white hover:text-gray-300 font-medium"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button 
                type="button" 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-white hover:text-gray-300 font-medium"
              >
                Privacy Policy
              </button>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-white to-gray-200 text-gray-800 font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button 
              onClick={onLogin}
              className="text-white hover:text-gray-300 font-semibold hover:underline transition-all"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  );
};

export const AuthPages = ({ onLogin }: AuthPagesProps) => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup'>('welcome');

  const handleSuccessfulAuth = (userData?: UserData) => {
    onLogin(userData);
  };

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen onGetStarted={() => setCurrentScreen('login')} />;
    case 'login':
      return (
        <LoginScreen
          onSignUp={() => setCurrentScreen('signup')}
          onLogin={() => handleSuccessfulAuth()}
          onBack={() => setCurrentScreen('welcome')}
        />
      );
    case 'signup':
      return (
        <SignUpScreen
          onLogin={() => setCurrentScreen('login')}
          onSignUp={handleSuccessfulAuth}
          onBack={() => setCurrentScreen('welcome')}
        />
      );
    default:
      return <WelcomeScreen onGetStarted={() => setCurrentScreen('login')} />;
  }
};
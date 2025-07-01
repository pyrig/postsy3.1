import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, Save, AlertCircle, CheckCircle, Shield, User } from 'lucide-react';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: { username: string; email?: string } | null;
  onUpdateProfile: (updates: { email?: string; password?: string }) => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  userData,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email');
  const [formData, setFormData] = useState({
    email: userData?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const resetModal = () => {
    setFormData({
      email: userData?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({ current: false, new: false, confirm: false });
    setIsLoading(false);
    setSuccess('');
    setError('');
    setActiveTab('email');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateProfile({ email: formData.email });
      setSuccess('Email address updated successfully!');
      setIsLoading(false);
      
      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 1000);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.currentPassword) {
      setError('Current password is required');
      return;
    }

    if (!formData.newPassword) {
      setError('New password is required');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate random failure for demo
      if (Math.random() < 0.2) {
        setError('Current password is incorrect');
        setIsLoading(false);
        return;
      }

      onUpdateProfile({ password: formData.newPassword });
      setSuccess('Password updated successfully!');
      setIsLoading(false);
      
      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 1500);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Account Settings</h2>
              <p className="text-sm text-gray-400">@{userData?.username}</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'email'
                  ? 'bg-white text-gray-800'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'password'
                  ? 'bg-white text-gray-800'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Password</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Success/Error Messages */}
          {(success || error) && (
            <div className="p-4">
              {success && (
                <div className="flex items-start space-x-3 p-4 bg-green-900/30 border border-green-700 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Success!</p>
                    <p className="text-green-400 text-xs mt-1">{success}</p>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex items-start space-x-3 p-4 bg-red-900/30 border border-red-700 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Error</p>
                    <p className="text-red-400 text-xs mt-1">{error}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Update Email Address</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Your email is used for account recovery and important notifications.
                </p>
              </div>

              <form onSubmit={handleEmailUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Enter your new email address"
                    required
                  />
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-300 text-sm">Privacy Notice</h4>
                      <p className="text-blue-200 text-xs mt-1 leading-relaxed">
                        Your email address is never shared publicly and is only used for account security and recovery purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.email.trim()}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Update Email</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Change Password</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Choose a strong password to keep your account secure.
                </p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Enter your current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Enter your new password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-purple-900/20 border border-purple-700 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-purple-300 text-sm">Password Security</h4>
                      <ul className="text-purple-200 text-xs mt-1 space-y-1">
                        <li>• Use a mix of letters, numbers, and symbols</li>
                        <li>• Avoid common words or personal information</li>
                        <li>• Don't reuse passwords from other accounts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleClose}
            className="w-full px-4 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
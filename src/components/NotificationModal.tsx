import React, { useState } from 'react';
import { X, Heart, MessageCircle, UserPlus, Users, Bell, Clock, Check, Trash2 } from 'lucide-react';

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

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (notificationId: string) => void;
}

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'like':
      return <Heart className="w-4 h-4 text-red-400" />;
    case 'comment':
      return <MessageCircle className="w-4 h-4 text-blue-400" />;
    case 'follow':
      return <UserPlus className="w-4 h-4 text-green-400" />;
    case 'group_invite':
      return <Users className="w-4 h-4 text-purple-400" />;
    case 'mention':
      return <Bell className="w-4 h-4 text-yellow-400" />;
    default:
      return <Bell className="w-4 h-4 text-gray-400" />;
  }
};

const NotificationCard = ({ 
  notification, 
  onMarkAsRead, 
  onDelete 
}: { 
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className={`p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors ${
      !notification.isRead ? 'bg-blue-900/10 border-l-4 border-l-blue-400' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <NotificationIcon type={notification.type} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`text-sm font-medium ${
                notification.isRead ? 'text-gray-300' : 'text-white'
              }`}>
                {notification.title}
              </h4>
              <p className={`text-sm mt-1 ${
                notification.isRead ? 'text-gray-400' : 'text-gray-300'
              }`}>
                {notification.message}
              </p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs text-gray-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(notification.timestamp)}</span>
                </span>
                {notification.username && (
                  <span className="text-xs text-gray-500 font-mono">
                    @{notification.username}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 ml-2">
              {!notification.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                  title="Mark as read"
                >
                  <Check className="w-3 h-3 text-gray-400" />
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                title="Delete notification"
              >
                <Trash2 className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-8">
      <div className="bg-gray-900 w-full max-w-md mx-4 rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                <p className="text-sm text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white text-gray-800'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>All</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'
              }`}>
                {notifications.length}
              </span>
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-white text-gray-800'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Unread</span>
              {unreadCount > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filter === 'unread' ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="mt-3">
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(80vh-200px)]">
          {filteredNotifications.length > 0 ? (
            <div>
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                  onDelete={onDeleteNotification}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {filter === 'unread' ? 'No Unread Notifications' : 'No Notifications'}
              </h3>
              <p className="text-gray-400 text-sm">
                {filter === 'unread' 
                  ? 'All caught up! Check back later for new updates.'
                  : 'You\'ll see notifications here when people interact with your posts.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-white to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
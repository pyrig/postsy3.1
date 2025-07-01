import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Search, MoreVertical, Phone, Video, Info, Smile, Paperclip, Camera, Type, Circle } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderUsername: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantUsername: string;
  lastMessage: Message | null;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: Date;
}

interface MessagesPageProps {
  onBack: () => void;
  userData: { username: string } | null;
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

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'user1',
    participantUsername: 'ALEX9876',
    lastMessage: {
      id: 'm1',
      senderId: 'user1',
      senderUsername: 'ALEX9876',
      text: 'Hey! Did you see that post about the coffee shop?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false
    },
    unreadCount: 2,
    isOnline: true
  },
  {
    id: '2',
    participantId: 'user2',
    participantUsername: 'SARAH123',
    lastMessage: {
      id: 'm2',
      senderId: 'current_user',
      senderUsername: 'GUEST',
      text: 'Thanks for sharing that! Really helpful 😊',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    unreadCount: 0,
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '3',
    participantId: 'user3',
    participantUsername: 'MIKE4567',
    lastMessage: {
      id: 'm3',
      senderId: 'user3',
      senderUsername: 'MIKE4567',
      text: 'Are you going to that event tomorrow?',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: false
    },
    unreadCount: 1,
    isOnline: true
  },
  {
    id: '4',
    participantId: 'user4',
    participantUsername: 'EMMA8901',
    lastMessage: {
      id: 'm4',
      senderId: 'current_user',
      senderUsername: 'GUEST',
      text: 'Perfect! See you there',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true
    },
    unreadCount: 0,
    isOnline: false,
    lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000)
  }
];

// Mock messages for a conversation
const mockMessages: { [conversationId: string]: Message[] } = {
  '1': [
    {
      id: 'm1-1',
      senderId: 'user1',
      senderUsername: 'ALEX9876',
      text: 'Hey there! How are you doing?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: 'm1-2',
      senderId: 'current_user',
      senderUsername: 'GUEST',
      text: 'Hi! I\'m doing great, thanks for asking! How about you?',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      isRead: true
    },
    {
      id: 'm1-3',
      senderId: 'user1',
      senderUsername: 'ALEX9876',
      text: 'Pretty good! Did you see that post about the coffee shop?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false
    },
    {
      id: 'm1-4',
      senderId: 'user1',
      senderUsername: 'ALEX9876',
      text: 'The one downtown with the amazing vibes?',
      timestamp: new Date(Date.now() - 14 * 60 * 1000),
      isRead: false
    }
  ]
};

const ConversationsList = ({ 
  conversations, 
  onSelectConversation, 
  searchQuery, 
  onSearchChange 
}: {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) => {
  const filteredConversations = conversations.filter(conv =>
    conv.participantUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return `${Math.floor(diffInHours / 24)}d`;
    }
  };

  return (
    <div className="space-y-2">
      {filteredConversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-left border border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                <Type className="w-6 h-6 text-gray-800" />
              </div>
              {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-white text-sm font-mono">
                  @{conversation.participantUsername}
                </h3>
                <div className="flex items-center space-x-2">
                  {conversation.lastMessage && (
                    <span className="text-xs text-gray-400">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  )}
                  {conversation.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">
                        {conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 truncate">
                  {conversation.lastMessage?.text || 'No messages yet'}
                </p>
                {!conversation.isOnline && conversation.lastSeen && (
                  <span className="text-xs text-gray-500 ml-2">
                    {formatTime(conversation.lastSeen)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const ChatView = ({ 
  conversation, 
  messages, 
  onBack, 
  onSendMessage,
  currentUser 
}: {
  conversation: Conversation;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
  currentUser: string;
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
              <Type className="w-5 h-5 text-gray-800" />
            </div>
            {conversation.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            )}
          </div>
          
          <div>
            <h2 className="font-semibold text-white font-mono">@{conversation.participantUsername}</h2>
            <p className="text-xs text-gray-400">
              {conversation.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Phone className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Video className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Info className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUser;
          
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-white to-gray-200 text-gray-800' 
                  : 'bg-gray-800 text-white border border-gray-700'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  isCurrentUser ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {formatMessageTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Paperclip className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Camera className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors">
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-3 bg-gradient-to-r from-white to-gray-200 text-gray-800 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const MessagesPage: React.FC<MessagesPageProps> = ({ onBack, userData }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Mark messages as read
    setConversations(prev => prev.map(conv => 
      conv.id === conversation.id 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const handleSendMessage = (text: string) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      senderId: 'current_user',
      senderUsername: userData?.username || 'GUEST',
      text,
      timestamp: new Date(),
      isRead: false
    };

    // Add message to conversation
    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [
        ...(prev[selectedConversation.id] || []),
        newMessage
      ]
    }));

    // Update conversation's last message
    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: newMessage }
        : conv
    ));
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
  };

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl">
        <StatusBar />
        <ChatView
          conversation={selectedConversation}
          messages={messages[selectedConversation.id] || []}
          onBack={handleBackToConversations}
          onSendMessage={handleSendMessage}
          currentUser="current_user"
        />
      </div>
    );
  }

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
              <h1 className="text-lg font-semibold text-white">Messages</h1>
              <p className="text-sm text-gray-400">
                {totalUnreadCount > 0 ? `${totalUnreadCount} unread` : 'All caught up'}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {conversations.length > 0 ? (
          <ConversationsList
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Type className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Messages Yet</h3>
            <p className="text-gray-400 text-sm mb-6">
              Start a conversation by commenting on posts or connecting with other users
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
    </div>
  );
};
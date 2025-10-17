import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, User } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { Message } from '../types';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex items-start space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          isUser ? 'bg-master-blue' : 'bg-gray-500'
        }`}>
          {isUser ? <User size={12} className="text-white" /> : (
            <img src="/assets/master-logo.png" alt="Master" className="w-4 h-4" />
          )}
        </div>
        <div className={`px-3 py-2 rounded-lg text-sm ${
          isUser 
            ? 'bg-master-blue text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          <p className={`text-xs mt-1 ${
            isUser ? 'text-blue-200' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start mb-3">
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
        <img src="/assets/master-logo.png" alt="Master" className="w-4 h-4" />
      </div>
      <div className="bg-gray-100 px-3 py-2 rounded-lg">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

export const EmbedChat: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      {/* Header - Compact */}
      <div className="bg-master-blue px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/assets/master-logo.png" alt="Master" className="w-6 h-6" />
          <h1 className="text-sm font-semibold text-white">Master Chat</h1>
        </div>
        <button
          onClick={clearChat}
          className="p-1 text-white hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
          title="Clear conversation"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Messages - Compact */}
      <div className="flex-1 overflow-y-auto px-3 py-2" style={{ maxHeight: '300px' }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src="/assets/master-welcome.png" alt="Master" className="h-16 w-auto mb-3" />
            <h2 className="text-sm font-medium mb-1 text-master-blue">Welcome to Master Chat</h2>
            <p className="text-xs text-center max-w-xs">
              Start a conversation by sending a message.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Compact */}
      <div className="bg-white border-t border-gray-200 px-3 py-2">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-master-blue focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-3 py-2 bg-master-blue text-white rounded-lg hover:bg-master-blue-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1 text-sm"
          >
            <Send size={12} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

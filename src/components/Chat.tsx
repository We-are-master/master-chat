import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, User } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { Message } from '../types';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-master-blue' : 'bg-gray-500'
        }`}>
          {isUser ? <User size={16} className="text-white" /> : (
            <img src="/assets/master-logo.png" alt="Master" className="h-5 w-auto" />
          )}
        </div>
        <div className={`px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-master-blue text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
  <div className="flex justify-start mb-4">
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
        <img src="/assets/master-logo.png" alt="Master" className="h-5 w-auto" />
      </div>
      <div className="bg-gray-100 px-4 py-2 rounded-lg">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

export const Chat: React.FC = () => {
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-master-blue border-b border-master-blue px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/assets/master-logo.png" alt="Master" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold text-white">Master Chat</h1>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-white hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
          title="Limpar conversa"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src="/assets/master-logo.png" alt="Master" className="h-16 w-auto mb-4 opacity-50" />
            <h2 className="text-xl font-medium mb-2 text-master-blue">Bem-vindo ao Master Chat</h2>
            <p className="text-center max-w-md">
              Comece uma conversa enviando uma mensagem. Suas mensagens serão enviadas para o webhook do n8n.
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

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-master-blue focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-master-blue text-white rounded-lg hover:bg-master-blue-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            <Send size={16} />
            <span>Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};

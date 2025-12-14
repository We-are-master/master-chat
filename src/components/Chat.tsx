import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, User, Image as ImageIcon, X, Settings } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useOpenAIConfig } from '../contexts/OpenAIContext';
import { OpenAIConfig, OpenAIConfigRef } from './OpenAIConfig';
import { MessageFormatter } from './MessageFormatter';
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
          {/* Exibe imagens se houver */}
          {message.images && message.images.length > 0 && (
            <div className={`mb-2 flex flex-wrap gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {message.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Imagem ${idx + 1}`}
                  className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
                />
              ))}
            </div>
          )}
          {message.content && (
            <div className="text-sm">
              <MessageFormatter content={message.content} />
            </div>
          )}
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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { getApiKey, getSystemPrompt, getModel } = useOpenAIConfig();
  const { messages, isLoading, sendMessage, clearChat } = useChat({
    apiKey: getApiKey(),
    systemPrompt: getSystemPrompt(),
    model: getModel(),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const configModalRef = useRef<OpenAIConfigRef>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = [...selectedImages, ...files];
    setSelectedImages(newImages);

    // Cria previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          setImagePreviews(prev => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || selectedImages.length > 0) && !isLoading) {
      sendMessage(input, selectedImages.length > 0 ? selectedImages : undefined);
      setInput('');
      setSelectedImages([]);
      setImagePreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <OpenAIConfig ref={configModalRef} />
      {/* Header */}
      <div className="bg-master-blue border-b border-master-blue px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/assets/master-logo.png" alt="Master" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold text-white">Master Chat</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => configModalRef.current?.open()}
            className="p-2 text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
            title="Configurações"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={clearChat}
            className="p-2 text-white hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src="/assets/master-welcome.png" alt="Master" className="h-32 w-auto mb-6" />
            <h2 className="text-xl font-medium mb-2 text-master-blue">Welcome to Master Chat</h2>
            <p className="text-center max-w-md">
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

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        {/* Preview de imagens selecionadas */}
        {imagePreviews.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {imagePreviews.map((preview, idx) => (
              <div key={idx} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-center"
            title="Adicionar imagem"
          >
            <ImageIcon size={20} className="text-gray-600" />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-master-blue focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={(!input.trim() && selectedImages.length === 0) || isLoading}
            className="px-4 py-2 bg-master-blue text-white rounded-lg hover:bg-master-blue-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>
        {!getApiKey() && (
          <p className="text-xs text-red-500 mt-2">
            ⚠️ Configure a API Key da OpenAI nas configurações ou no arquivo .env
          </p>
        )}
      </div>
    </div>
  );
};

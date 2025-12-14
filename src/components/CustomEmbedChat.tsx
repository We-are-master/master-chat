import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, User, Image as ImageIcon, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useOpenAIConfig } from '../contexts/OpenAIContext';
import { useEmbedParams } from '../hooks/useEmbedParams';
import { Message } from '../types';

const MessageBubble: React.FC<{ 
  message: Message; 
  accentColor: string; 
  textColor: string; 
  backgroundColor: string;
}> = ({ message, accentColor, textColor, backgroundColor }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex items-start space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div 
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center`}
          style={{ backgroundColor: isUser ? accentColor : '#6b7280' }}
        >
          {isUser ? <User size={12} className="text-white" /> : (
            <img src="/assets/master-logo.png" alt="Master" className="w-4 h-4" />
          )}
        </div>
        <div 
          className={`px-3 py-2 rounded-lg text-sm`}
          style={{
            backgroundColor: isUser ? accentColor : backgroundColor,
            color: isUser ? 'white' : textColor
          }}
        >
          {/* Exibe imagens se houver */}
          {message.images && message.images.length > 0 && (
            <div className={`mb-2 flex flex-wrap gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {message.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Imagem ${idx + 1}`}
                  className="max-w-[150px] max-h-[150px] rounded-lg object-cover"
                />
              ))}
            </div>
          )}
          {message.content && (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
          <p 
            className={`text-xs mt-1`}
            style={{ color: isUser ? 'rgba(255,255,255,0.8)' : '#6b7280' }}
          >
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC<{ 
  accentColor: string; 
  backgroundColor: string; 
  textColor: string;
}> = ({ accentColor, backgroundColor, textColor }) => (
  <div className="flex justify-start mb-3">
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
        <img src="/assets/master-logo.png" alt="Master" className="w-4 h-4" />
      </div>
      <div 
        className="px-3 py-2 rounded-lg"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="flex space-x-1">
          <div 
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{ backgroundColor: accentColor }}
          ></div>
          <div 
            className="w-1.5 h-1.5 rounded-full animate-bounce" 
            style={{ backgroundColor: accentColor, animationDelay: '0.1s' }}
          ></div>
          <div 
            className="w-1.5 h-1.5 rounded-full animate-bounce" 
            style={{ backgroundColor: accentColor, animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export const CustomEmbedChat: React.FC = () => {
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
  const params = useEmbedParams();

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

  const containerStyle = {
    width: params.width ? `${params.width}px` : '100%',
    height: params.height ? `${params.height}px` : '100%',
    backgroundColor: params.backgroundColor,
    color: params.textColor,
    borderRadius: `${params.borderRadius}px`,
    border: `1px solid ${params.accentColor}20`
  };

  const headerStyle = {
    backgroundColor: params.accentColor,
    color: 'white'
  };

  const inputStyle = {
    backgroundColor: params.backgroundColor,
    color: params.textColor,
    borderColor: `${params.accentColor}40`
  };

  const buttonStyle = {
    backgroundColor: params.accentColor,
    color: 'white'
  };

  return (
    <div 
      className="flex flex-col h-full overflow-hidden"
      style={containerStyle}
    >
      {/* Header */}
      {params.showHeader && (
        <div 
          className="px-3 py-2 flex items-center justify-between"
          style={headerStyle}
        >
          <div className="flex items-center space-x-2">
            {params.showLogo && (
              <img src="/assets/master-logo.png" alt="Master" className="w-6 h-6" />
            )}
            {params.showTitle && (
              <h1 className="text-sm font-semibold">{params.title}</h1>
            )}
          </div>
          <button
            onClick={clearChat}
            className="p-1 text-white hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto px-3 py-2" 
        style={{ 
          maxHeight: params.showHeader && params.showFooter ? 'calc(100% - 120px)' : 'calc(100% - 60px)',
          backgroundColor: params.backgroundColor
        }}
      >
        {messages.length === 0 ? (
          <div 
            className="flex flex-col items-center justify-center h-full"
            style={{ color: params.textColor }}
          >
            <img src="/assets/master-welcome.png" alt="Master" className="h-16 w-auto mb-3" />
            <h2 
              className="text-sm font-medium mb-1"
              style={{ color: params.accentColor }}
            >
              Welcome to {params.title}
            </h2>
            <p className="text-xs text-center max-w-xs opacity-75">
              Start a conversation by sending a message.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                accentColor={params.accentColor || '#3b82f6'}
                textColor={params.textColor || '#000000'}
                backgroundColor={params.backgroundColor || '#ffffff'}
              />
            ))}
            {isLoading && (
              <TypingIndicator 
                accentColor={params.accentColor || '#3b82f6'}
                backgroundColor={params.backgroundColor || '#ffffff'}
                textColor={params.textColor || '#000000'}
              />
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {params.showFooter && (
        <div 
          className="border-t px-3 py-2"
          style={{ 
            backgroundColor: params.backgroundColor,
            borderColor: `${params.accentColor}20`
          }}
        >
          {/* Preview de imagens selecionadas */}
          {imagePreviews.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {imagePreviews.map((preview, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${idx + 1}`}
                    className="w-16 h-16 object-cover rounded border"
                    style={{ borderColor: `${params.accentColor}40` }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                  >
                    <X size={10} />
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
              id="custom-embed-image-upload"
            />
            <label
              htmlFor="custom-embed-image-upload"
              className="px-2 py-2 border rounded-lg hover:opacity-80 cursor-pointer flex items-center justify-center"
              style={{
                borderColor: `${params.accentColor || '#3b82f6'}40`,
                color: params.textColor || '#000000'
              }}
              title="Adicionar imagem"
            >
              <ImageIcon size={16} />
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:border-transparent"
              style={{
                ...inputStyle,
                '--tw-ring-color': params.accentColor
              } as any}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={(!input.trim() && selectedImages.length === 0) || isLoading}
              className="px-3 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1 text-sm"
              style={buttonStyle}
            >
              <Send size={12} />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

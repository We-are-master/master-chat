import React, { useState } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface LinkEmbedProps {
  url?: string;
  title?: string;
  buttonText?: string;
  buttonStyle?: 'primary' | 'secondary' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export const LinkEmbed: React.FC<LinkEmbedProps> = ({
  url = window.location.origin + '/embed',
  title = 'Master Chat',
  buttonText = 'Open Chat',
  buttonStyle = 'primary',
  size = 'medium',
  showIcon = true,
  target = '_blank'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (target === '_blank') {
      window.open(url, '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
    } else {
      window.open(url, target);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    };

    const styleClasses = {
      primary: 'bg-master-blue text-white hover:bg-master-blue-hover focus:ring-master-blue shadow-md hover:shadow-lg',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
      minimal: 'text-master-blue hover:text-master-blue-hover hover:bg-blue-50 focus:ring-master-blue'
    };

    return `${baseClasses} ${sizeClasses[size]} ${styleClasses[buttonStyle]}`;
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'medium': return 16;
      case 'large': return 20;
      default: return 16;
    }
  };

  return (
    <div className="inline-block">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={getButtonClasses()}
        title={`${title} - Opens in new window`}
      >
        {showIcon && (
          <MessageCircle 
            size={getIconSize()} 
            className={`mr-2 ${buttonStyle === 'minimal' ? 'text-master-blue' : ''}`}
          />
        )}
        <span>{buttonText}</span>
        {target === '_blank' && (
          <ExternalLink 
            size={getIconSize() - 2} 
            className={`ml-2 transition-transform duration-200 ${
              isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
            }`}
          />
        )}
      </button>
    </div>
  );
};

// Componente para embed direto em HTML
export const LinkEmbedHTML: React.FC<LinkEmbedProps> = (props) => {
  const {
    url = window.location.origin + '/embed',
    title = 'Master Chat',
    buttonText = 'Open Chat',
    buttonStyle = 'primary',
    size = 'medium',
    showIcon = true,
    target = '_blank'
  } = props;

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    };

    const styleClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
      minimal: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 focus:ring-blue-500'
    };

    return `${baseClasses} ${sizeClasses[size]} ${styleClasses[buttonStyle]}`;
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'medium': return 16;
      case 'large': return 20;
      default: return 16;
    }
  };

  return (
    <div className="inline-block">
      <button
        onClick={() => {
          if (target === '_blank') {
            window.open(url, '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
          } else {
            window.open(url, target);
          }
        }}
        className={getButtonClasses()}
        title={`${title} - Opens in new window`}
      >
        {showIcon && (
          <svg 
            width={getIconSize()} 
            height={getIconSize()} 
            className={`mr-2 ${buttonStyle === 'minimal' ? 'text-blue-600' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        <span>{buttonText}</span>
        {target === '_blank' && (
          <svg 
            width={getIconSize() - 2} 
            height={getIconSize() - 2} 
            className="ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </button>
    </div>
  );
};

import { useState, useEffect } from 'react';

export interface EmbedParams {
  title?: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'small' | 'medium' | 'large' | 'full';
  showTitle?: boolean;
  showLogo?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  borderRadius?: number;
  width?: number;
  height?: number;
  language?: string;
  buttonStyle?: 'primary' | 'secondary' | 'minimal';
  buttonText?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

const defaultParams: EmbedParams = {
  title: 'Master Chat',
  theme: 'light',
  size: 'medium',
  showTitle: true,
  showLogo: true,
  showHeader: true,
  showFooter: true,
  borderRadius: 8,
  width: 400,
  height: 600,
  language: 'en',
  buttonStyle: 'primary',
  buttonText: 'Open Chat',
  buttonSize: 'medium',
  showIcon: true,
  backgroundColor: '#ffffff',
  textColor: '#000000',
  accentColor: '#3b82f6'
};

export const useEmbedParams = (): EmbedParams => {
  const [params, setParams] = useState<EmbedParams>(defaultParams);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const newParams: EmbedParams = { ...defaultParams };

    // Parse URL parameters
    if (urlParams.has('title')) newParams.title = urlParams.get('title') || defaultParams.title;
    if (urlParams.has('theme')) newParams.theme = (urlParams.get('theme') as any) || defaultParams.theme;
    if (urlParams.has('size')) newParams.size = (urlParams.get('size') as any) || defaultParams.size;
    if (urlParams.has('showTitle')) newParams.showTitle = urlParams.get('showTitle') === '1';
    if (urlParams.has('showLogo')) newParams.showLogo = urlParams.get('showLogo') === '1';
    if (urlParams.has('showHeader')) newParams.showHeader = urlParams.get('showHeader') === '1';
    if (urlParams.has('showFooter')) newParams.showFooter = urlParams.get('showFooter') === '1';
    if (urlParams.has('borderRadius')) newParams.borderRadius = parseInt(urlParams.get('borderRadius') || '8');
    if (urlParams.has('width')) newParams.width = parseInt(urlParams.get('width') || '400');
    if (urlParams.has('height')) newParams.height = parseInt(urlParams.get('height') || '600');
    if (urlParams.has('language')) newParams.language = urlParams.get('language') || 'en';
    if (urlParams.has('buttonStyle')) newParams.buttonStyle = (urlParams.get('buttonStyle') as any) || defaultParams.buttonStyle;
    if (urlParams.has('buttonText')) newParams.buttonText = urlParams.get('buttonText') || defaultParams.buttonText;
    if (urlParams.has('buttonSize')) newParams.buttonSize = (urlParams.get('buttonSize') as any) || defaultParams.buttonSize;
    if (urlParams.has('showIcon')) newParams.showIcon = urlParams.get('showIcon') === '1';
    if (urlParams.has('backgroundColor')) newParams.backgroundColor = urlParams.get('backgroundColor') || defaultParams.backgroundColor;
    if (urlParams.has('textColor')) newParams.textColor = urlParams.get('textColor') || defaultParams.textColor;
    if (urlParams.has('accentColor')) newParams.accentColor = urlParams.get('accentColor') || defaultParams.accentColor;

    setParams(newParams);
  }, []);

  return params;
};

export const generateEmbedUrl = (params: Partial<EmbedParams>, baseUrl: string = window.location.origin): string => {
  const urlParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.set(key, String(value));
    }
  });

  return `${baseUrl}/embed#${urlParams.toString()}`;
};

export const generateEmbedCode = (params: Partial<EmbedParams>, baseUrl: string = window.location.origin): string => {
  const embedUrl = generateEmbedUrl(params, baseUrl);
  const width = params.width || 400;
  const height = params.height || 600;
  const borderRadius = params.borderRadius || 8;

  return `<iframe 
  src="${embedUrl}" 
  width="${width}" 
  height="${height}" 
  frameborder="0"
  allowtransparency="true"
  style="border-radius: ${borderRadius}px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>`;
};

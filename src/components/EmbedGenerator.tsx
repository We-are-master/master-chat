import React, { useState } from 'react';
import { Copy, ExternalLink, Code, Palette, Settings } from 'lucide-react';
import { EmbedParams, generateEmbedUrl, generateEmbedCode } from '../hooks/useEmbedParams';

interface EmbedGeneratorProps {
  baseUrl?: string;
}

export const EmbedGenerator: React.FC<EmbedGeneratorProps> = ({ 
  baseUrl = window.location.origin 
}) => {
  const [params, setParams] = useState<Partial<EmbedParams>>({
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
  });

  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const handleParamChange = (key: keyof EmbedParams, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const embedUrl = generateEmbedUrl(params, baseUrl);
  const embedCode = generateEmbedCode(params, baseUrl);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Master Chat Embed Generator</h1>
          <p className="text-blue-100">Customize your chat embed and generate the code</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Configuration</h2>
            </div>

            {/* Basic Settings */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Basic Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={params.title || ''}
                    onChange={(e) => handleParamChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    value={params.theme || 'light'}
                    onChange={(e) => handleParamChange('theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <select
                    value={params.size || 'medium'}
                    onChange={(e) => handleParamChange('size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small (300x400)</option>
                    <option value="medium">Medium (400x600)</option>
                    <option value="large">Large (500x700)</option>
                    <option value="full">Full Width</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Display Options */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Display Options</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={params.showTitle || false}
                    onChange={(e) => handleParamChange('showTitle', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Show Title</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={params.showLogo || false}
                    onChange={(e) => handleParamChange('showLogo', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Show Logo</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={params.showHeader || false}
                    onChange={(e) => handleParamChange('showHeader', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Show Header</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={params.showFooter || false}
                    onChange={(e) => handleParamChange('showFooter', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Show Footer</span>
                </label>
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Dimensions</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={params.width || 400}
                    onChange={(e) => handleParamChange('width', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={params.height || 600}
                    onChange={(e) => handleParamChange('height', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius (px)</label>
                  <input
                    type="number"
                    value={params.borderRadius || 8}
                    onChange={(e) => handleParamChange('borderRadius', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Palette className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-gray-700">Colors</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={params.accentColor || '#3b82f6'}
                      onChange={(e) => handleParamChange('accentColor', e.target.value)}
                      className="w-10 h-8 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={params.accentColor || '#3b82f6'}
                      onChange={(e) => handleParamChange('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={params.backgroundColor || '#ffffff'}
                      onChange={(e) => handleParamChange('backgroundColor', e.target.value)}
                      className="w-10 h-8 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={params.backgroundColor || '#ffffff'}
                      onChange={(e) => handleParamChange('backgroundColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={params.textColor || '#000000'}
                      onChange={(e) => handleParamChange('textColor', e.target.value)}
                      className="w-10 h-8 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={params.textColor || '#000000'}
                      onChange={(e) => handleParamChange('textColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview and Code */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'code'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Code
              </button>
            </div>

            {/* Preview */}
            {activeTab === 'preview' && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <h3 className="font-medium text-gray-700">Live Preview</h3>
                </div>
                <div className="bg-white p-4 rounded border" style={{ maxHeight: '500px', overflow: 'auto' }}>
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="400"
                    frameBorder="0"
                    style={{ borderRadius: `${params.borderRadius || 8}px` }}
                    title="Master Chat Preview"
                  />
                </div>
              </div>
            )}

            {/* Code */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-blue-600" />
                      <h3 className="font-medium text-gray-700">Embed URL</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(embedUrl, 'url')}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      <Copy size={14} />
                      <span>{copied === 'url' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>{embedUrl}</code>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-blue-600" />
                      <h3 className="font-medium text-gray-700">HTML Code</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(embedCode, 'html')}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      <Copy size={14} />
                      <span>{copied === 'html' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <pre><code>{embedCode}</code></pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

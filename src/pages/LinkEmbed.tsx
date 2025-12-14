import React from 'react';
import { LinkEmbed } from '../components/LinkEmbed';

const LinkEmbedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Master Chat - Link Embed</h1>
            <p className="text-gray-600">Choose your preferred style and copy the code to embed in your website</p>
          </div>

          {/* Demo Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Live Demo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Primary Style */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-4">Primary Style</h3>
                <div className="space-y-3">
                  <LinkEmbed 
                    buttonStyle="primary" 
                    size="small" 
                    buttonText="Chat Small"
                  />
                  <br />
                  <LinkEmbed 
                    buttonStyle="primary" 
                    size="medium" 
                    buttonText="Chat Medium"
                  />
                  <br />
                  <LinkEmbed 
                    buttonStyle="primary" 
                    size="large" 
                    buttonText="Chat Large"
                  />
                </div>
              </div>

              {/* Secondary Style */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-4">Secondary Style</h3>
                <div className="space-y-3">
                  <LinkEmbed 
                    buttonStyle="secondary" 
                    size="small" 
                    buttonText="Chat Small"
                  />
                  <br />
                  <LinkEmbed 
                    buttonStyle="secondary" 
                    size="medium" 
                    buttonText="Chat Medium"
                  />
                  <br />
                  <LinkEmbed 
                    buttonStyle="secondary" 
                    size="large" 
                    buttonText="Chat Large"
                  />
                </div>
              </div>

              {/* Minimal Style */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-4">Minimal Style</h3>
                <div className="space-y-3">
                  <LinkEmbed 
                    buttonStyle="minimal" 
                    size="small" 
                    buttonText="Chat Small"
                  />
                  <br />
                  <LinkEmbed 
                    buttonStyle="minimal" 
                    size="medium" 
                    buttonText="Chat Medium"
                  />
                  <br />
                  <LinkEmbed 
                    buttonStyle="minimal" 
                    size="large" 
                    buttonText="Chat Large"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Code Examples</h2>
            
            {/* React Component */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">React Component</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`import { LinkEmbed } from './components/LinkEmbed';

// Basic usage
<LinkEmbed />

// Customized
<LinkEmbed 
  buttonText="Open Master Chat"
  buttonStyle="primary"
  size="medium"
  showIcon={true}
  target="_blank"
/>`}
                </pre>
              </div>
            </div>

            {/* HTML/JavaScript */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">HTML/JavaScript</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`<!-- Basic HTML Button -->
<button 
  onclick="window.open('https://master-chat-seven.vercel.app/embed', '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes')"
  style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;"
>
  💬 Open Chat
</button>

<!-- Styled Button -->
<button 
  onclick="window.open('https://master-chat-seven.vercel.app/embed', '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes')"
  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
>
  <svg width="16" height="16" class="mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
  Open Master Chat
</button>`}
                </pre>
              </div>
            </div>

            {/* CSS Styles */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">CSS Styles</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`/* Master Chat Button Styles */
.master-chat-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.master-chat-btn-primary {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
}

.master-chat-btn-primary:hover {
  background: #2563eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.master-chat-btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
}

.master-chat-btn-secondary:hover {
  background: #e5e7eb;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Features</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Opens chat in a new window with optimal size (400x600px)</li>
              <li>• Multiple button styles: Primary, Secondary, Minimal</li>
              <li>• Three sizes: Small, Medium, Large</li>
              <li>• Customizable text and icons</li>
              <li>• Responsive design</li>
              <li>• Easy integration with any website</li>
              <li>• No external dependencies required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkEmbedPage;

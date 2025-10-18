# Master Chat Embed

This document explains how to embed the Master Chat widget into your website.

## Embed URLs

### Full Chat Interface

```
https://master-chat-seven.vercel.app/
```

### Embed Widget (Recommended for iframes)

```
https://master-chat-seven.vercel.app/embed
```

### Link Embed (Opens in new window)

```
https://master-chat-seven.vercel.app/link-embed
```

### Embed Generator (Customizable with URL parameters)

```
https://master-chat-seven.vercel.app/embed-generator
```

## How to Embed

### Option 1: Direct iframe

```html
<iframe 
  src="https://master-chat-seven.vercel.app/embed" 
  width="400" 
  height="500" 
  frameborder="0"
  allowtransparency="true">
</iframe>
```

### Option 2: Responsive iframe

```html
<div style="width: 100%; max-width: 400px; height: 500px;">
  <iframe 
    src="https://master-chat-seven.vercel.app/embed" 
    width="100%" 
    height="100%" 
    frameborder="0"
    allowtransparency="true"
    style="border-radius: 8px;">
  </iframe>
</div>
```

### Option 3: Full-width embed

```html
<iframe 
  src="https://master-chat-seven.vercel.app/embed" 
  width="100%" 
  height="600" 
  frameborder="0"
  allowtransparency="true"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>
```

### Option 4: Link Button (Opens in new window)

```html
<!-- Basic HTML Button -->
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
</button>
```

### Option 5: React Component

```jsx
import { LinkEmbed } from './components/LinkEmbed';

// Basic usage
<LinkEmbed />

// Customized
<LinkEmbed 
  buttonText="Open Master Chat"
  buttonStyle="primary"
  size="medium"
  showIcon={true}
  target="_blank"
/>
```

### Option 6: Customizable Embed with URL Parameters (Zoho Calendar Style)

```html
<!-- Basic customizable embed -->
<iframe 
  src="https://master-chat-seven.vercel.app/embed#title=My%20Chat&theme=dark&width=500&height=700&accentColor=%23ff6b6b" 
  width="500" 
  height="700" 
  frameborder="0"
  allowtransparency="true"
  style="border-radius: 12px;">
</iframe>
```

#### URL Parameters Available

- `title` - Chat title (e.g., `title=Master%20Support`)
- `theme` - Theme: `light`, `dark`, or `auto`
- `size` - Size: `small`, `medium`, `large`, or `full`
- `width` - Width in pixels (e.g., `width=400`)
- `height` - Height in pixels (e.g., `height=600`)
- `borderRadius` - Border radius in pixels (e.g., `borderRadius=12`)
- `showTitle` - Show title: `1` or `0`
- `showLogo` - Show logo: `1` or `0`
- `showHeader` - Show header: `1` or `0`
- `showFooter` - Show footer: `1` or `0`
- `backgroundColor` - Background color (e.g., `backgroundColor=%23ffffff`)
- `textColor` - Text color (e.g., `textColor=%23000000`)
- `accentColor` - Accent color (e.g., `accentColor=%233b82f6`)

#### Example URLs

```
# Light theme with custom colors
https://master-chat-seven.vercel.app/embed#title=Support%20Chat&theme=light&accentColor=%23e74c3c&backgroundColor=%23f8f9fa

# Dark theme with custom size
https://master-chat-seven.vercel.app/embed#title=Help%20Desk&theme=dark&width=450&height=650&borderRadius=16

# Minimal embed without header/footer
https://master-chat-seven.vercel.app/embed#title=Quick%20Chat&showHeader=0&showFooter=0&height=400
```

## Features

- **Multiple Embed Options**: iframe, link button, React component, or URL parameters
- **Zoho Calendar Style**: Customizable embed with URL parameters like Zoho Calendar
- **Live Customization**: Real-time preview with embed generator
- **Compact Design**: Optimised for embedding
- **Responsive**: Works on desktop and mobile
- **Session Management**: Maintains conversation context
- **Master Branding**: Official Master colours and logo
- **Real-time**: Live chat with n8n webhook integration
- **Highly Customizable**: Colors, sizes, themes, and layout options
- **New Window**: Link embed opens chat in optimal popup window
- **URL Parameters**: 15+ customizable parameters for perfect integration

## Customisation

The embed widget automatically adapts to its container size. For best results:

- **Minimum width**: 300px
- **Minimum height**: 400px
- **Recommended aspect ratio**: 4:5 (width:height)

## Security

The embed widget:

- Uses HTTPS for secure communication
- Respects iframe sandbox restrictions
- No external dependencies beyond the Master infrastructure
- All data is processed through the official Master n8n webhook

## Support

For technical support or custom integration requirements, contact the Master development team.

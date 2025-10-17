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

## Features

- **Compact Design**: Optimised for embedding
- **Responsive**: Works on desktop and mobile
- **Session Management**: Maintains conversation context
- **Master Branding**: Official Master colours and logo
- **Real-time**: Live chat with n8n webhook integration

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

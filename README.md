# Master Chat

A modern chat application with OpenAI integration and image support.

## Features

- Modern and responsive chat interface
- OpenAI API integration (GPT-4o with vision support)
- Image upload and processing
- System prompt configuration
- Typing indicator
- Message history
- Clean and intuitive design

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API Key:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_SYSTEM_PROMPT=your_system_prompt_here  # Optional
VITE_OPENAI_MODEL=gpt-4o  # Optional, defaults to gpt-4o
```

3. Run the project in development mode:

```bash
npm run dev
```

4. Open your browser at `http://localhost:3000`

## Configuration

### API Key

The API Key can be configured in two ways:

1. **Environment Variable (Recommended)**: Set `VITE_OPENAI_API_KEY` in the `.env` file
2. **UI Configuration**: Click the settings button (gear icon) in the bottom right corner and enter the API Key

The environment variable takes precedence, but you can override it through the UI settings.

### System Prompt

The system prompt defines the behavior of the AI assistant. You can:

1. Set it via environment variable: `VITE_OPENAI_SYSTEM_PROMPT`
2. Configure it through the UI settings
3. Use the default Master Internal Sales & Pricing Agent prompt (pre-configured)

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom hooks
├── types/         # TypeScript definitions
└── utils/         # Utilities
```

## OpenAI Integration

The application uses the OpenAI Chat Completions API with support for:

- **Text messages**: Standard text conversations
- **Image messages**: Upload and analyze images using GPT-4o vision capabilities
- **System prompts**: Customize AI behavior
- **Conversation history**: Maintains context across messages

### API Configuration

The application automatically uses:
- API Key from `VITE_OPENAI_API_KEY` environment variable (if set)
- Or API Key from UI settings (if configured)
- System prompt from `VITE_OPENAI_SYSTEM_PROMPT` or UI settings
- Model from `VITE_OPENAI_MODEL` or UI settings (defaults to `gpt-4o`)

### Image Support

Users can upload images along with their messages. Images are:
- Converted to base64 format
- Sent to OpenAI API for analysis
- Displayed in the chat interface
- Processed using GPT-4o vision capabilities

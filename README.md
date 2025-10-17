# Master Chat

A modern chat application that connects to the n8n webhook.

## Features

- Modern and responsive chat interface
- n8n webhook integration
- Typing indicator
- Message history
- Clean and intuitive design

## Installation

1. Install dependencies:

```bash
npm install
```

2. Run the project in development mode:

```bash
npm run dev
```

3. Open your browser at `http://localhost:3000`

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

## Webhook

The application sends messages to:
`https://n8n.wearemaster.com/webhook/59c837d9-f61d-4fb5-9fb0-f9531594c6cf`

The request format is:

```json
{
  "message": "Message text",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "sessionId": "session_1704067200000_abc123def"
}
```

The `sessionId` is automatically generated for each chat session and is maintained throughout the conversation, allowing n8n to maintain context of previous messages.

### Expected n8n Response Format

The n8n webhook should return a JSON in the following format:

```json
[
  {
    "output": "AI response here"
  }
]
```

The application automatically extracts the `output` field from the first element of the array to display as the assistant's response.

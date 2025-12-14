export interface ImageContent {
  type: 'image_url';
  image_url: {
    url: string; // base64 data URL or URL
  };
}

export interface TextContent {
  type: 'text';
  text: string;
}

export type ContentItem = TextContent | ImageContent;

export interface Message {
  id: string;
  content: string; // Para compatibilidade com UI existente
  contentItems?: ContentItem[]; // Para suporte a imagens na API
  images?: string[]; // URLs ou base64 das imagens para exibição
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export interface OpenAIConfig {
  apiKey: string;
  systemPrompt?: string;
  model?: string;
}

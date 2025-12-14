import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatState, ContentItem } from '../types';

// Função auxiliar para converter File para base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export interface UseChatOptions {
  apiKey?: string;
  systemPrompt?: string;
  model?: string;
}

export const useChat = (options?: UseChatOptions) => {
  const sessionIdRef = useRef<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesRef = useRef<Message[]>([]);

  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  // Atualiza a ref sempre que as mensagens mudarem
  useEffect(() => {
    messagesRef.current = state.messages;
  }, [state.messages]);

  const sendMessage = useCallback(async (content: string, images?: File[]) => {
    if (!content.trim() && (!images || images.length === 0)) return;

    // Obtém a API Key (prioridade: options > env)
    const apiKey = options?.apiKey || import.meta.env.VITE_OPENAI_API_KEY;
    
    // Verifica se temos configuração da API
    if (!apiKey) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Erro: API Key da OpenAI não configurada. Configure VITE_OPENAI_API_KEY no arquivo .env ou nas configurações.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
        error: 'API Key não configurada',
      }));
      return;
    }

    // Processa imagens para base64
    const imageDataUrls: string[] = [];
    const contentItems: ContentItem[] = [];

    if (content.trim()) {
      contentItems.push({
        type: 'text',
        text: content.trim(),
      });
    }

    if (images && images.length > 0) {
      try {
        for (const image of images) {
          const base64 = await fileToBase64(image);
          imageDataUrls.push(base64);
          contentItems.push({
            type: 'image_url',
            image_url: {
              url: base64,
            },
          });
        }
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Erro ao processar imagens: ${error instanceof Error ? error.message : 'Unknown error'}`,
          role: 'assistant',
          timestamp: new Date(),
        };

        setState(prev => ({
          ...prev,
          messages: [...prev.messages, errorMessage],
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
        return;
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim() || (images && images.length > 0 ? `[${images.length} imagem(ns) enviada(s)]` : ''),
      contentItems,
      images: imageDataUrls,
      role: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Prepara o histórico de mensagens para a API usando a ref atualizada
      const conversationHistory = messagesRef.current.map(msg => {
        if (msg.contentItems && msg.contentItems.length > 0) {
          return {
            role: msg.role,
            content: msg.contentItems,
          };
        }
        return {
          role: msg.role,
          content: msg.content,
        };
      });

      // Adiciona a mensagem atual
      if (contentItems.length > 0) {
        conversationHistory.push({
          role: 'user',
          content: contentItems,
        });
      } else if (content.trim()) {
        conversationHistory.push({
          role: 'user',
          content: content.trim(),
        });
      }

      const systemPrompt = options?.systemPrompt || import.meta.env.VITE_OPENAI_SYSTEM_PROMPT;
      const model = options?.model || import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o';

      const requestBody: any = {
        model,
        messages: [
          ...(systemPrompt ? [{
            role: 'system',
            content: systemPrompt,
          }] : []),
          ...conversationHistory,
        ],
      };

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const responseText = data.choices?.[0]?.message?.content || 'Sem resposta da API';
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        role: 'assistant',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Erro ao enviar mensagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        role: 'assistant',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, [options]);

  const clearChat = useCallback(() => {
    // Gera um novo sessionId quando limpar o chat
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setState({
      messages: [],
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    sendMessage,
    clearChat,
  };
};

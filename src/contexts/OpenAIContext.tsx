import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OpenAIConfig } from '../types';

interface OpenAIContextType {
  config: OpenAIConfig | null;
  getApiKey: () => string | undefined;
  getSystemPrompt: () => string | undefined;
  getModel: () => string;
  setConfig: (config: OpenAIConfig) => void;
  updateApiKey: (apiKey: string) => void;
  updateSystemPrompt: (prompt: string) => void;
  updateModel: (model: string) => void;
}

const OpenAIContext = createContext<OpenAIContextType | undefined>(undefined);

export const OpenAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<OpenAIConfig | null>(null);

  // Função para obter a API Key (prioridade: localStorage > env)
  const getApiKey = (): string | undefined => {
    if (config?.apiKey) {
      return config.apiKey;
    }
    // Fallback para variável de ambiente
    return import.meta.env.VITE_OPENAI_API_KEY;
  };

  // Função para obter o System Prompt (prioridade: localStorage > env > default)
  const getSystemPrompt = (): string | undefined => {
    if (config?.systemPrompt) {
      return config.systemPrompt;
    }
    // Fallback para variável de ambiente
    return import.meta.env.VITE_OPENAI_SYSTEM_PROMPT;
  };

  // Função para obter o Model (prioridade: localStorage > env > default)
  const getModel = (): string => {
    if (config?.model) {
      return config.model;
    }
    // Fallback para variável de ambiente ou padrão
    return import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o';
  };

  const setConfig = (newConfig: OpenAIConfig) => {
    setConfigState(newConfig);
    // Salva no localStorage para persistência
    localStorage.setItem('openai_config', JSON.stringify(newConfig));
  };

  const updateApiKey = (apiKey: string) => {
    setConfigState(prev => {
      const newConfig = { ...prev, apiKey } as OpenAIConfig;
      localStorage.setItem('openai_config', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const updateSystemPrompt = (systemPrompt: string) => {
    setConfigState(prev => {
      if (!prev) return null;
      const newConfig = { ...prev, systemPrompt };
      localStorage.setItem('openai_config', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const updateModel = (model: string) => {
    setConfigState(prev => {
      if (!prev) return null;
      const newConfig = { ...prev, model };
      localStorage.setItem('openai_config', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  // Carrega configuração do localStorage ao inicializar
  React.useEffect(() => {
    const savedConfig = localStorage.getItem('openai_config');
    if (savedConfig) {
      try {
        setConfigState(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Erro ao carregar configuração salva:', e);
      }
    } else {
      // Se não há configuração salva, usa a variável de ambiente se disponível
      const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const envSystemPrompt = import.meta.env.VITE_OPENAI_SYSTEM_PROMPT;
      const envModel = import.meta.env.VITE_OPENAI_MODEL;
      
      if (envApiKey || envSystemPrompt || envModel) {
        setConfigState({
          apiKey: envApiKey || '',
          systemPrompt: envSystemPrompt,
          model: envModel || 'gpt-4o',
        });
      }
    }
  }, []);

  return (
    <OpenAIContext.Provider value={{ 
      config, 
      getApiKey, 
      getSystemPrompt, 
      getModel,
      setConfig, 
      updateApiKey, 
      updateSystemPrompt, 
      updateModel 
    }}>
      {children}
    </OpenAIContext.Provider>
  );
};

export const useOpenAIConfig = () => {
  const context = useContext(OpenAIContext);
  if (context === undefined) {
    throw new Error('useOpenAIConfig must be used within an OpenAIProvider');
  }
  return context;
};


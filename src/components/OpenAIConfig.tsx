import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Save, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useOpenAIConfig } from '../contexts/OpenAIContext';
import { DEFAULT_SYSTEM_PROMPT } from '../utils/defaultPrompt';

export interface OpenAIConfigRef {
  open: () => void;
}

export const OpenAIConfig = forwardRef<OpenAIConfigRef>((_, ref) => {
  const { config, getSystemPrompt, getModel, setConfig } = useOpenAIConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const settingsPassword = import.meta.env.VITE_SETTINGS_PASSWORD;
  const hasEnvApiKey = !!envApiKey;
  
  const [apiKey, setApiKey] = useState(config?.apiKey || envApiKey || '');
  const [systemPrompt, setSystemPrompt] = useState(config?.systemPrompt || getSystemPrompt() || DEFAULT_SYSTEM_PROMPT);
  const [model, setModel] = useState(config?.model || getModel());

  // Expõe a função open para o componente pai
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setIsAuthenticated(false);
      setPassword('');
      setPasswordError('');
    },
  }));

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = settingsPassword || '';
    
    if (!correctPassword) {
      setPasswordError('Senha não configurada no .env (VITE_SETTINGS_PASSWORD)');
      return;
    }

    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setPassword('');
    } else {
      setPasswordError('Senha incorreta');
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
    setPassword('');
    setPasswordError('');
  };

  // Atualiza os estados quando o modal abre e há configuração salva
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setApiKey(config?.apiKey || envApiKey || '');
      setSystemPrompt(config?.systemPrompt || getSystemPrompt() || DEFAULT_SYSTEM_PROMPT);
      setModel(config?.model || getModel());
    }
  }, [isOpen, isAuthenticated, config, envApiKey, getSystemPrompt, getModel]);

  const handleSave = () => {
    // Se não há API Key no input e não há no env, requer input
    if (!apiKey.trim() && !envApiKey) {
      alert('Por favor, insira uma API Key válida ou configure VITE_OPENAI_API_KEY no arquivo .env');
      return;
    }

    setConfig({
      apiKey: apiKey.trim() || envApiKey || '',
      systemPrompt: systemPrompt.trim() || undefined,
      model: model.trim() || 'gpt-4o',
    });

    handleClose();
    alert('Configuração salva com sucesso!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {!isAuthenticated ? (
          // Tela de autenticação
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Acesso às Configurações</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Digite a senha de acesso"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-master-blue focus:border-transparent"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-master-blue text-white rounded-lg hover:bg-master-blue-hover transition-colors"
                >
                  Acessar
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Tela de configurações
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Configuração da OpenAI</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key da OpenAI {hasEnvApiKey && !config?.apiKey && <span className="text-green-600 text-xs">(do .env)</span>}
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={hasEnvApiKey && !config?.apiKey ? "Usando VITE_OPENAI_API_KEY do .env" : "sk-..."}
                    disabled={hasEnvApiKey && !config?.apiKey}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-master-blue focus:border-transparent pr-10 ${hasEnvApiKey && !config?.apiKey ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={hasEnvApiKey && !config?.apiKey}
                  >
                    {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {hasEnvApiKey && !config?.apiKey ? (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Usando API Key do arquivo .env (VITE_OPENAI_API_KEY). Para sobrescrever, insira uma nova chave acima.
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    {config?.apiKey ? 'Sua API Key será salva localmente no navegador' : 'Configure no arquivo .env (VITE_OPENAI_API_KEY) ou insira aqui'}
                  </p>
                )}
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-master-blue focus:border-transparent"
                >
                  <option value="gpt-4o">GPT-4o (recomendado para imagens)</option>
                  <option value="gpt-4o-mini">GPT-4o Mini</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>

              {/* System Prompt */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    System Prompt (opcional)
                  </label>
                  <button
                    type="button"
                    onClick={() => setSystemPrompt(DEFAULT_SYSTEM_PROMPT)}
                    className="text-xs text-master-blue hover:text-master-blue-hover flex items-center space-x-1"
                    title="Restaurar prompt padrão"
                  >
                    <RotateCcw size={14} />
                    <span>Restaurar padrão</span>
                  </button>
                </div>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Ex: Você é um assistente útil e prestativo..."
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-master-blue focus:border-transparent resize-none font-mono text-xs"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Instruções que definem o comportamento do assistente
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-master-blue text-white rounded-lg hover:bg-master-blue-hover transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Salvar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

OpenAIConfig.displayName = 'OpenAIConfig';

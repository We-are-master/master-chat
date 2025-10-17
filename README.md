# Master Chat

Uma aplicação de chat moderna que se conecta ao webhook do n8n.

## Funcionalidades

- Interface de chat moderna e responsiva
- Integração com webhook do n8n
- Indicador de digitação
- Histórico de mensagens
- Design limpo e intuitivo

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

3. Abra o navegador em `http://localhost:3000`

## Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (ícones)

## Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── hooks/         # Hooks personalizados
├── types/         # Definições TypeScript
└── utils/         # Utilitários
```

## Webhook

A aplicação envia mensagens para:
`https://n8n.wearemaster.com/webhook/59c837d9-f61d-4fb5-9fb0-f9531594c6cf`

O formato da requisição é:
```json
{
  "message": "Texto da mensagem",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "sessionId": "session_1704067200000_abc123def"
}
```

O `sessionId` é gerado automaticamente para cada sessão de chat e é mantido durante toda a conversa, permitindo que o n8n mantenha o contexto das mensagens anteriores.

### Formato de Resposta Esperado do n8n:

O webhook do n8n deve retornar um JSON no seguinte formato:
```json
[
  {
    "output": "Resposta da IA aqui"
  }
]
```

A aplicação extrai automaticamente o campo `output` do primeiro elemento do array para exibir como resposta do assistente.

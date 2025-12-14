import React from 'react';

interface MessageFormatterProps {
  content: string;
  className?: string;
}

export const MessageFormatter: React.FC<MessageFormatterProps> = ({ content, className = '' }) => {
  // Função para processar o texto e formatar
  const formatContent = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];
    let listType: 'bullet' | 'numbered' = 'bullet';

    const closeList = () => {
      if (listItems.length > 0) {
        if (listType === 'numbered') {
          elements.push(
            <ol key={`list-${elements.length}`} className="list-decimal list-inside my-2 space-y-1 ml-4">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {formatInlineText(item)}
                </li>
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`list-${elements.length}`} className="list-disc list-inside my-2 space-y-1 ml-4">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {formatInlineText(item)}
                </li>
              ))}
            </ul>
          );
        }
        listItems = [];
        inList = false;
      }
    };

    const formatInlineText = (line: string): React.ReactNode => {
      // Formata negrito **texto** ou __texto__
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let keyCounter = 0;

      // Regex para **negrito** ou __negrito__
      const boldRegex = /(\*\*|__)(.+?)\1/g;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // Adiciona texto antes do match
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Adiciona texto em negrito
        const text = match[2];
        parts.push(<strong key={`bold-${keyCounter++}`} className="font-semibold">{text}</strong>);
        lastIndex = match.index + match[0].length;
      }

      // Adiciona texto restante
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return parts.length > 0 ? <>{parts}</> : line;
    };

    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();

      // Detecta listas com bullets (-, *, •, ou • com tab)
      const listMatch = trimmedLine.match(/^[-*•]\s+(.+)$/) || trimmedLine.match(/^\s*[-*•]\s+(.+)$/);
      if (listMatch) {
        if (!inList) {
          inList = true;
          listType = 'bullet';
        } else if (listType === 'numbered') {
          closeList();
          inList = true;
          listType = 'bullet';
        }
        listItems.push(listMatch[1]);
        return;
      }

      // Detecta listas numeradas (1., 2., etc)
      const numberedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
      if (numberedMatch) {
        if (!inList) {
          inList = true;
          listType = 'numbered';
        } else if (listType === 'bullet') {
          closeList();
          inList = true;
          listType = 'numbered';
        }
        listItems.push(numberedMatch[1]);
        return;
      }

      // Fecha lista se estava em uma
      if (inList) {
        closeList();
      }

      // Linha vazia
      if (trimmedLine === '') {
        elements.push(<br key={`br-${lineIndex}`} />);
        return;
      }

      // Títulos (## ou ###)
      if (trimmedLine.startsWith('###')) {
        elements.push(
          <h3 key={`h3-${lineIndex}`} className="font-semibold text-base mt-3 mb-2">
            {formatInlineText(trimmedLine.replace(/^###\s+/, ''))}
          </h3>
        );
        return;
      }

      if (trimmedLine.startsWith('##')) {
        elements.push(
          <h2 key={`h2-${lineIndex}`} className="font-bold text-lg mt-4 mb-2">
            {formatInlineText(trimmedLine.replace(/^##\s+/, ''))}
          </h2>
        );
        return;
      }

      if (trimmedLine.startsWith('#')) {
        elements.push(
          <h1 key={`h1-${lineIndex}`} className="font-bold text-xl mt-4 mb-2">
            {formatInlineText(trimmedLine.replace(/^#\s+/, ''))}
          </h1>
        );
        return;
      }

      // Detecta linhas que começam com "**" (títulos em negrito)
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const titleText = trimmedLine.replace(/\*\*/g, '').trim();
        elements.push(
          <h3 key={`h3-${lineIndex}`} className="font-semibold text-base mt-3 mb-2">
            {titleText}
          </h3>
        );
        return;
      }

      // Parágrafo normal
      elements.push(
        <p key={`p-${lineIndex}`} className="mb-2 text-sm leading-relaxed">
          {formatInlineText(trimmedLine)}
        </p>
      );
    });

    // Fecha lista se ainda estiver aberta
    closeList();

    return elements;
  };

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      {formatContent(content)}
    </div>
  );
};


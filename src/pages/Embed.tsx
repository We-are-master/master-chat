import React from 'react';
import { EmbedChat } from '../components/EmbedChat';

const Embed: React.FC = () => {
  return (
    <div className="h-screen w-full p-4 bg-gray-100">
      <div className="max-w-md mx-auto h-full">
        <EmbedChat />
      </div>
    </div>
  );
};

export default Embed;

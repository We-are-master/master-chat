import React from 'react';
import { CustomEmbedChat } from '../components/CustomEmbedChat';

const Embed: React.FC = () => {
  return (
    <div className="h-screen w-full bg-gray-100">
      <CustomEmbedChat />
    </div>
  );
};

export default Embed;

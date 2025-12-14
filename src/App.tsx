import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OpenAIProvider } from './contexts/OpenAIContext';
import { Chat } from './components/Chat';
import Embed from './pages/Embed';
import LinkEmbedPage from './pages/LinkEmbed';
import EmbedGeneratorPage from './pages/EmbedGenerator';

function App() {
  return (
    <OpenAIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/embed" element={<Embed />} />
          <Route path="/link-embed" element={<LinkEmbedPage />} />
          <Route path="/embed-generator" element={<EmbedGeneratorPage />} />
        </Routes>
      </Router>
    </OpenAIProvider>
  );
}

export default App;

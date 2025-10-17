import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Chat } from './components/Chat';
import Embed from './pages/Embed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/embed" element={<Embed />} />
      </Routes>
    </Router>
  );
}

export default App;

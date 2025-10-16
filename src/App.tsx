import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DorkingPage from './pages/DorkingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dorking" element={<DorkingPage />} />
        <Route path="/" element={<Navigate to="/dorking" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 
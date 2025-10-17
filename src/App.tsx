import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DorkingPage from './pages/DorkingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DorkingPage />} />
      </Routes>
    </Router>
  );
}

export default App; 
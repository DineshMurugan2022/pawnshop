import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Browse from './pages/Browse';
import BrowseButton from './components/BrowseButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <BrowseButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
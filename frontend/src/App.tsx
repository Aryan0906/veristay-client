import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import HostelDetail from './pages/HostelDetail';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/hostel/:id" element={<HostelDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<div className="p-10 text-center">Login Page Coming Soon</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

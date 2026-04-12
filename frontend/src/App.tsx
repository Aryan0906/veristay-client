import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CollegesPage from './pages/CollegesPage';
import HostelsPage from './pages/HostelsPage';
import HostelDetailPage from './pages/HostelDetailPage';
import FoodPage from './pages/FoodPage';
import FoodDetailPage from './pages/FoodDetailPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/hostels" element={<HostelsPage />} />
          <Route path="/hostels/:id" element={<HostelDetailPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/food/:id" element={<FoodDetailPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

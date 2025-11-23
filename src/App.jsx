import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreatePoster from './pages/CreatePoster';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, login, logout } = useAuth();
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 h-16 flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-white tracking-tight">PosterFlow</Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link to="/create" className="hover:text-white transition">Create</Link>
          <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
              <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-gray-600" />
              <button onClick={logout} className="text-red-400 hover:text-red-300"><LogOut size={18} /></button>
            </div>
          ) : (
            <button onClick={login} className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="pt-16 min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePoster />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
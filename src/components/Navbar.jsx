import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutGrid, BarChart3, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BuyCreditsModal from './BuyCreditsModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showBuyCredits, setShowBuyCredits] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-lg">P</span>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">PosterFlow</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-gray-800/50 p-1 rounded-lg border border-gray-700">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/') ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <PlusCircle size={16} className="inline mr-2" />
              Create
            </Link>
            <Link 
              to="/marketplace" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/marketplace') ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutGrid size={16} className="inline mr-2" />
              Templates
            </Link>
            <Link 
              to="/analytics" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/analytics') ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <BarChart3 size={16} className="inline mr-2" />
              Analytics
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user && (
              <button 
                onClick={() => setShowBuyCredits(true)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-full transition group"
              >
                <div className="bg-yellow-500/20 p-1 rounded-full group-hover:bg-yellow-500/30 transition">
                  <Zap size={14} className="text-yellow-500" />
                </div>
                <span className="font-bold text-white text-sm">{user.credits || 0}</span>
                <span className="text-xs text-gray-400 uppercase font-medium">Credits</span>
              </button>
            )}

            <div className="h-8 w-px bg-gray-800 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-3">
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="w-8 h-8 rounded-full border border-gray-700"
                />
                <button 
                  onClick={logout}
                  className="text-gray-400 hover:text-white transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button className="text-white font-medium">Login</button>
            )}
          </div>
        </div>
      </nav>

      <BuyCreditsModal 
        isOpen={showBuyCredits} 
        onClose={() => setShowBuyCredits(false)} 
      />
    </>
  );
};

export default Navbar;

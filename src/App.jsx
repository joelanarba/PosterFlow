
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreatePoster from './pages/CreatePoster';
import Marketplace from './pages/Marketplace';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }} />
        <main className="pt-16 min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePoster />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, login } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to view saved designs</h2>
        <button onClick={login} className="bg-blue-600 px-6 py-2 rounded-lg font-bold">
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>
          <button className="bg-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-700">New Folder</button>
        </div>
        
        {/* Empty State for now */}
        <div className="border border-dashed border-gray-800 rounded-2xl p-12 text-center">
          <p className="text-gray-500">You haven't saved any posters yet.</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
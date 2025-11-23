import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Loader2, Download, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const { user, login } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Real-time listener for user's designs
    const q = query(
      collection(db, "users", user.uid, "designs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedDesigns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDesigns(fetchedDesigns);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

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
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>
            <p className="text-gray-400 mt-1">Here are your saved masterpieces.</p>
          </div>
          <button className="bg-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-700">New Folder</button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-pink-500"/></div>
        ) : designs.length === 0 ? (
          <div className="border border-dashed border-gray-800 rounded-2xl p-12 text-center">
            <p className="text-gray-500">You haven't saved any posters yet.</p>
            <a href="/create" className="text-pink-500 hover:underline mt-2 inline-block">Create one now</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {designs.map((design) => (
              <div key={design.id} className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition">
                <div className="aspect-[4/5] relative">
                  <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <a href={design.imageUrl} download target="_blank" rel="noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-gray-200">
                      <Download size={20} />
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold truncate">{design.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500 uppercase">{design.type} Event</span>
                    <span className="text-xs text-gray-600">{design.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Zap, Image as ImageIcon, Calendar } from 'lucide-react';

const Analytics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosters: 0,
    recentPosters: [],
    typeDistribution: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      try {
        const designsRef = collection(db, "users", user.uid, "designs");
        const q = query(designsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const posters = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Calculate stats
        const typeDist = {};
        posters.forEach(p => {
          const type = p.type || 'other';
          typeDist[type] = (typeDist[type] || 0) + 1;
        });

        setStats({
          totalPosters: posters.length,
          recentPosters: posters.slice(0, 5),
          typeDistribution: typeDist
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Please login to view analytics.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600/20 p-3 rounded-xl">
            <BarChart3 className="text-blue-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-400">Insights into your creative journey.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <Zap className="text-yellow-500" size={24} />
              </div>
              <span className="text-gray-400 font-medium">Credits Remaining</span>
            </div>
            <div className="text-4xl font-bold">{user.credits || 0}</div>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <ImageIcon className="text-purple-500" size={24} />
              </div>
              <span className="text-gray-400 font-medium">Total Posters</span>
            </div>
            <div className="text-4xl font-bold">{stats.totalPosters}</div>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Calendar className="text-green-500" size={24} />
              </div>
              <span className="text-gray-400 font-medium">Member Since</span>
            </div>
            <div className="text-lg font-bold">
              {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Recent Posters</h2>
            <div className="space-y-4">
              {stats.recentPosters.length > 0 ? (
                stats.recentPosters.map((poster) => (
                  <div key={poster.id} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition">
                    <img src={poster.imageUrl} alt={poster.title} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <div className="font-bold text-sm">{poster.title}</div>
                      <div className="text-xs text-gray-400">{new Date(poster.createdAt?.seconds * 1000).toLocaleDateString()}</div>
                    </div>
                    <div className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded uppercase">
                      {poster.type}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No posters created yet.</p>
              )}
            </div>
          </div>

          {/* Type Distribution */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Design Types</h2>
            <div className="space-y-4">
              {Object.entries(stats.typeDistribution).map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{type}</span>
                    <span className="text-gray-400">{count}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(count / stats.totalPosters) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {stats.totalPosters === 0 && <p className="text-gray-500 text-sm">No data available.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

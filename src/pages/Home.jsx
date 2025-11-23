import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, LayoutTemplate } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-6xl font-extrabold tracking-tight">
          Design Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Event Posters</span> in Seconds.
        </h1>
        <p className="text-xl text-gray-400">
          No design skills needed. Perfect for Churches, Campuses, and Clubs in Ghana.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/create" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition">
            Start Designing
          </Link>
          <Link to="/dashboard" className="border border-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition">
            My Dashboard
          </Link>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl">
        {[
          { icon: Sparkles, title: "AI Powered", desc: "Instantly generates backgrounds." },
          { icon: Zap, title: "Lighting Fast", desc: "Get a PDF in under 30 seconds." },
          { icon: LayoutTemplate, title: "Pro Templates", desc: "Optimized for Instagram & WhatsApp." }
        ].map((f, i) => (
          <div key={i} className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <f.icon className="w-8 h-8 text-pink-500 mb-4 mx-auto" />
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
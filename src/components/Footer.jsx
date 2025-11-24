import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/30 mt-20 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-xl tracking-tight text-white">PosterFlow</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              The AI-powered design tool for churches, events, and businesses in Ghana. 
              Create professional flyers in seconds, not hours.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-pink-500 transition">Templates</a></li>
              <li><a href="#" className="hover:text-pink-500 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-pink-500 transition">Showcase</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-pink-500 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-pink-500 transition">Terms of Service</Link></li>
              <li><a href="#" className="hover:text-pink-500 transition">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} PosterFlow. Built with ❤️
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition"><Twitter size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition"><Instagram size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
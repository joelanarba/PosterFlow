import React from 'react';
import { Upload, Sparkles } from 'lucide-react';

const ControlPanel = ({ details, setDetails, onGenerateAI }) => {
  
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails({ ...details, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase mb-1">Event Type</label>
        <select 
          name="type" 
          value={details.type} 
          onChange={handleChange}
          className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="church">Church / Ministry</option>
          <option value="party">Party / Club</option>
          <option value="business">Business / Seminar</option>
        </select>
      </div>

      <div className="space-y-4">
        <input 
          name="title" 
          placeholder="Event Name (e.g. Sunday Service)" 
          value={details.title}
          onChange={handleChange}
          className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
        />
        <input 
          name="date" 
          placeholder="Date (e.g. Nov 25 @ 9AM)" 
          value={details.date}
          onChange={handleChange}
          className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
        />
        <input 
          name="venue" 
          placeholder="Venue (e.g. KNUST Great Hall)" 
          value={details.venue}
          onChange={handleChange}
          className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Background Image</label>
        <div className="flex gap-2">
          <label className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 transition p-3 rounded-lg flex items-center justify-center gap-2 text-sm text-white">
            <Upload size={16} />
            Upload Photo
            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
          
          <button 
            onClick={onGenerateAI}
            className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 transition p-3 rounded-lg flex items-center justify-center gap-2 text-sm text-white font-medium"
          >
            <Sparkles size={16} />
            AI Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
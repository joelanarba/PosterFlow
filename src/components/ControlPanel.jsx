import React from 'react';
import { Upload, Sparkles } from 'lucide-react';

const ControlPanel = ({ details, setDetails, onGenerateAI, errors = {} }) => {
  
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
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm h-fit">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase mb-1">Event Type</label>
          <select 
            name="type" 
            value={details.type} 
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="church">Church</option>
            <option value="party">Party / Club</option>
            <option value="business">Seminar</option>
            <option value="funeral">Funeral</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase mb-1">Theme Color</label>
          <select 
            name="themeColor" 
            value={details.themeColor} 
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="default">Auto Match</option>
            <option value="gold">Gold & White</option>
            <option value="blue">Corporate Blue</option>
            <option value="red">Red & Black</option>
            <option value="neon">Neon Pink</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <input 
            name="title" 
            placeholder="Event Title (e.g. Sunday Service)" 
            value={details.title}
            onChange={handleChange}
            className={`w-full bg-gray-900 text-white p-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none font-bold`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input 
              name="date" 
              placeholder="Date (e.g. Nov 25)" 
              value={details.date}
              onChange={handleChange}
              className={`w-full bg-gray-900 text-white p-3 rounded-lg border ${errors.date ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <input 
              name="time" 
              placeholder="Time (e.g. 10:00 AM)" 
              value={details.time}
              onChange={(e) => setDetails({...details, time: e.target.value})}
              className={`w-full bg-gray-900 text-white p-3 rounded-lg border ${errors.time ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none`}
            />
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
          </div>
        </div>

        <div>
          <input 
            name="venue" 
            placeholder="Venue (e.g. KNUST Great Hall)" 
            value={details.venue}
            onChange={handleChange}
            className={`w-full bg-gray-900 text-white p-3 rounded-lg border ${errors.venue ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none`}
          />
          {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue}</p>}
        </div>

        <textarea 
          name="description" 
          placeholder="Short Description (e.g. Come and experience the power of God. Dress Code: White)" 
          value={details.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Visuals</label>
        <div className="flex gap-2">
          <label className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 transition p-3 rounded-lg flex items-center justify-center gap-2 text-sm text-white">
            <Upload size={16} />
            Upload
            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
          
          <button 
            onClick={onGenerateAI}
            className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 transition p-3 rounded-lg flex items-center justify-center gap-2 text-sm text-white font-medium"
          >
            <Sparkles size={16} />
            Auto BG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
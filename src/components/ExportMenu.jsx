import React, { useState } from 'react';
import { Download, ChevronDown, FileImage, Image } from 'lucide-react';

const ExportMenu = ({ onExport, isGenerating }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [jpegQuality, setJpegQuality] = useState(0.92); // High quality by default

  const formats = [
    { id: 'png', label: 'PNG', icon: FileImage, desc: 'High quality, larger file' },
    { id: 'jpeg-high', label: 'JPEG (High)', icon: Image, desc: 'Good quality, smaller file', quality: 0.92 },
    { id: 'jpeg-medium', label: 'JPEG (Medium)', icon: Image, desc: 'Balanced quality', quality: 0.75 },
    { id: 'jpeg-low', label: 'JPEG (Low)', icon: Image, desc: 'Smallest file size', quality: 0.5 },
  ];

  const handleExport = (format) => {
    const formatData = formats.find(f => f.id === format);
    onExport({
      format: format.startsWith('jpeg') ? 'jpeg' : format,
      quality: formatData?.quality || 1.0,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isGenerating}
        className="flex-1 bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={20} />
        Download
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown Menu */}
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-20">
            {formats.map((format) => {
              const Icon = format.icon;
              return (
                <button
                  key={format.id}
                  onClick={() => handleExport(format.id)}
                  className="w-full px-4 py-3 hover:bg-gray-700 transition flex items-center gap-3 text-left border-b border-gray-700 last:border-b-0"
                >
                  <div className="bg-gray-900 p-2 rounded-lg">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{format.label}</div>
                    <div className="text-xs text-gray-400">{format.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ExportMenu;

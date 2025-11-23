import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Lock } from 'lucide-react';
import PosterCanvas from '../components/PosterCanvas';
import ControlPanel from '../components/ControlPanel';
import PaymentModal from '../components/PaymentModal';
import Footer from '../components/Footer';

const CreatePoster = () => {
  const posterRef = useRef(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [details, setDetails] = useState({
    type: 'church',
    title: '',
    date: '',
    venue: '',
    image: null
  });

  const handleDownload = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current, { scale: 2, useCORS: true });
      const link = document.createElement('a');
      link.download = `${details.title || 'poster'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Mock AI generation function
  const handleAIGenerate = () => {
    const keywords = details.type === 'church' ? 'church,worship' : 'club,neon,party';
    const randomImg = `https://source.unsplash.com/random/800x1000/?${keywords}&t=${new Date().getTime()}`;
    setDetails({ ...details, image: randomImg });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-pink-500 selection:text-white pb-20">

      <main className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-12 gap-8">
        
        {/* Left: Controls */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Create your design</h2>
            <p className="text-gray-400 text-sm">Fill in the details below to generate your professional flyer.</p>
          </div>
          <ControlPanel 
            details={details} 
            setDetails={setDetails} 
            onGenerateAI={handleAIGenerate} 
          />
          
          <button 
            onClick={handleDownload}
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-white/10"
          >
            <Download size={20} />
            Download Poster
          </button>
        </div>

        {/* Right: Preview */}
        <div className="md:col-span-7 flex items-start justify-center bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
          <div className="w-full max-w-md shadow-2xl rotate-1 hover:rotate-0 transition duration-500">
            <PosterCanvas 
              ref={posterRef} 
              details={details} 
              isPremium={isPremium} 
            />
          </div>
        </div>
      </main>

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        onSuccess={() => setIsPremium(true)}
      />

      <Footer />
    </div>
  );
}

export default CreatePoster;
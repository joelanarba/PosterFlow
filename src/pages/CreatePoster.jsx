import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";

import PosterCanvas from '../components/PosterCanvas';
import ControlPanel from '../components/ControlPanel';
import PaymentModal from '../components/PaymentModal';
import Footer from '../components/Footer';

const CreatePoster = () => {
  const posterRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isPremium, setIsPremium] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // UPDATED STATE with new fields
  const [details, setDetails] = useState({
    type: 'church',
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    themeColor: 'default',
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

  const handleSaveToCloud = async () => {
    if (!user) return alert("Please login to save designs!");
    if (!posterRef.current) return;

    try {
      setIsSaving(true);
      const canvas = await html2canvas(posterRef.current, { scale: 2, useCORS: true });
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));

      const filename = `posters/${user.uid}/${Date.now()}.jpg`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "users", user.uid, "designs"), {
        title: details.title || "Untitled Poster",
        imageUrl: downloadURL,
        createdAt: serverTimestamp(),
        type: details.type,
        venue: details.venue,
        themeColor: details.themeColor // Save theme too
      });

      alert("Saved to Dashboard!");
      navigate('/dashboard');

    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save poster. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIGenerate = () => {
    // Enhanced AI Keywords based on new types
    let keywords = "abstract,art";
    if (details.type === 'church') keywords = "church,cross,holy,light";
    if (details.type === 'party') keywords = "neon,party,nightclub,dj";
    if (details.type === 'business') keywords = "office,corporate,building,minimal";
    if (details.type === 'funeral') keywords = "red rose,candle,sunset,black background";

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
          
          <div className="flex gap-3">
            <button 
              onClick={handleDownload}
              className="flex-1 bg-white text-black hover:bg-gray-200 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
            >
              <Download size={20} />
              Download
            </button>

            <button 
              onClick={handleSaveToCloud}
              disabled={isSaving}
              className="flex-1 border border-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {isSaving ? "Saving..." : "Save to Cloud"}
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="md:col-span-7 flex items-start justify-center bg-gray-900/50 p-8 rounded-2xl border border-gray-800 sticky top-24">
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
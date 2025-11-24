import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";

const useCreatePoster = () => {
  const posterRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isPremium, setIsPremium] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
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
        themeColor: details.themeColor
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

  const handleAIGenerate = async () => {
    if (!user) return alert("Please login to use Premium AI.");

    setIsSaving(true);

    try {
        const prompts = {
        church: "majestic church background, cross, holy light, golden rays, divine atmosphere, 8k, photorealistic, cinematic lighting --no text",
        party: "cyberpunk nightlife background, neon lights, dj, club crowd, vibrant pink and purple, 8k, photorealistic --no text",
        business: "modern corporate background, blue glass building, office seminar, sleek, minimal, professional, 8k --no text",
        funeral: "dignified funeral background, red roses, black silk, candlelight, sunset, peaceful, respectful, 8k --no text"
        };

        const selectedPrompt = prompts[details.type] || "abstract modern art background, colorful, 8k";

        const functions = getFunctions();
        const generateBg = httpsCallable(functions, 'generateBackground');

        const result = await generateBg({ prompt: selectedPrompt });

        setDetails({ ...details, image: result.data.imageUrl });

        } catch (error) {
            console.error("AI Error:", error);
            alert("AI Generation failed. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

  return {
    posterRef,
    details,
    setDetails,
    isPremium,
    setIsPremium,
    showPayment,
    setShowPayment,
    isSaving,
    handleDownload,
    handleSaveToCloud,
    handleAIGenerate
  };
};

export default useCreatePoster;

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

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

  const [errors, setErrors] = useState({});

  const [isGenerating, setIsGenerating] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!details.title.trim()) newErrors.title = "Event title is required";
    if (details.title.length > 50) newErrors.title = "Title must be under 50 characters";
    if (!details.date.trim()) newErrors.date = "Date is required";
    if (!details.time.trim()) newErrors.time = "Time is required";
    if (!details.venue.trim()) newErrors.venue = "Venue is required";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const generatePoster = async () => {
    if (!posterRef.current) return null;
    
    setIsGenerating(true);
    const loadingToast = toast.loading("Rendering poster...");

    // Wrap in promise and setTimeout to unblock main thread and allow UI to update
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const canvas = await html2canvas(posterRef.current, { 
            scale: 2, 
            useCORS: true,
            logging: false, // Disable logging for performance
          });
          
          toast.dismiss(loadingToast);
          resolve(canvas);
        } catch (error) {
          console.error("Generation failed:", error);
          toast.error("Failed to render poster", { id: loadingToast });
          reject(error);
        } finally {
          setIsGenerating(false);
        }
      }, 100);
    });
  };

  const handleDownload = async () => {
    if (!validate()) return;
    
    try {
      const canvas = await generatePoster();
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = `${details.title || 'poster'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      // Cleanup
      canvas.remove();
      toast.success("Downloaded successfully!");
    } catch (error) {
      // Error handled in generatePoster
    }
  };

  const handleSaveToCloud = async () => {
    if (!user) return toast.error("Please login to save designs!");
    if (!validate()) return;

    try {
      setIsSaving(true);
      const canvas = await generatePoster();
      if (!canvas) return;

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
      
      // Cleanup canvas immediately after blob creation
      canvas.remove();

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

      toast.success("Saved to Dashboard!");
      navigate('/dashboard');

    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save poster. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!user) return toast.error("Please login to use Premium AI.");

    setIsSaving(true);
    const loadingToast = toast.loading("Generating AI Background...");

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
        toast.success("Background generated!", { id: loadingToast });

        } catch (error) {
            console.error("AI Error:", error);
            toast.error("AI Generation failed. Please try again.", { id: loadingToast });
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
    isGenerating,
    errors,
    handleDownload,
    handleSaveToCloud,
    handleAIGenerate
  };
};

export default useCreatePoster;

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

import DOMPurify from 'dompurify';

import useUndoRedo from './useUndoRedo';


const useCreatePoster = () => {
  const posterRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isPremium, setIsPremium] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Check for template data
  const initialDetails = location.state?.templateData || {
    type: 'church',
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    themeColor: 'default',
    image: null
  };

  const [details, setDetailsRaw, { undo, redo, canUndo, canRedo }] = useUndoRedo(initialDetails);

  const setDetails = (updates) => {
    if (typeof updates === 'function') {
      setDetailsRaw((prev) => {
        const newDetails = updates(prev);
        return sanitizeDetails(newDetails);
      });
    } else {
      setDetailsRaw(sanitizeDetails(updates));
    }
  };

  const sanitizeDetails = (data) => {
    const sanitized = { ...data };
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string' && key !== 'image') {
        sanitized[key] = DOMPurify.sanitize(sanitized[key]);
      }
    });
    return sanitized;
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input field
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              if (canRedo) redo();
            } else {
              if (canUndo) undo();
            }
            break;
          case 'y':
            e.preventDefault();
            if (canRedo) redo();
            break;
          case 's':
            e.preventDefault();
            handleSaveToCloud();
            break;
          case 'd':
            e.preventDefault();
            handleDownload();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, details]); // Dependencies for shortcuts

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
    if (!user) {
      toast.error("Please login to use AI features");
      return;
    }

    if ((user.credits || 0) < 1) {
      toast.error("Insufficient credits. Please top up.");
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading("Generating AI Background...");

    try {
      const prompts = {
        church: "majestic church background, cross, holy light, golden rays, divine atmosphere, 8k, photorealistic, cinematic lighting --no text",
        party: "cyberpunk nightlife background, neon lights, dj, club crowd, vibrant pink and purple, 8k, photorealistic --no text",
        business: "modern corporate background, blue glass building, office seminar, sleek, minimal, professional, 8k --no text",
        funeral: "dignified funeral background, red roses, black silk, candlelight, sunset, peaceful, respectful, 8k --no text"
      };

      const selectedPrompt = prompts[details.type] || "abstract modern art background, colorful, 8k";

      const generateBg = httpsCallable(getFunctions(), 'generateBackground');
      const result = await generateBg({ prompt: selectedPrompt });

      if (result.data.imageUrl) {
        setDetails(prev => ({ ...prev, image: result.data.imageUrl }));
        
        // Deduct Credit
        const deductCredits = httpsCallable(getFunctions(), 'deductCredits');
        await deductCredits({ amount: 1 });
        
        toast.success("Background generated! (1 Credit used)", { id: loadingToast });
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error(`Generation failed: ${error.message}`, { id: loadingToast });
    } finally {
      setIsGenerating(false);
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
    handleAIGenerate,
    undo,
    redo,
    canUndo,
    canRedo
  };
};

export default useCreatePoster;

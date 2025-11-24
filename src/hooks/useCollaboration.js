import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * Hook to manage real-time collaboration on shared posters
 * @param {string} sharedPosterId - ID of the shared poster (null for local editing)
 * @returns {Object} Collaboration state and methods
 */
const useCollaboration = (sharedPosterId = null) => {
  const { user } = useAuth();
  const [sharedDetails, setSharedDetails] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [isShared, setIsShared] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [lastModifiedBy, setLastModifiedBy] = useState(null);

  // Listen to shared poster updates
  useEffect(() => {
    if (!sharedPosterId || !user) {
      setIsShared(false);
      return;
    }

    const posterRef = doc(db, 'shared_posters', sharedPosterId);
    
    const unsubscribe = onSnapshot(posterRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSharedDetails(data.details);
        setCollaborators(data.collaborators || []);
        setIsOwner(data.owner === user.uid);
        setLastModifiedBy(data.lastModifiedBy);
        setIsShared(true);
      } else {
        setIsShared(false);
        toast.error("Shared poster not found");
      }
    }, (error) => {
      console.error("Error listening to shared poster:", error);
      toast.error("Failed to sync shared poster");
    });

    return () => unsubscribe();
  }, [sharedPosterId, user]);

  // Create a new shared poster
  const createSharedPoster = useCallback(async (details) => {
    if (!user) {
      toast.error("Please login to share posters");
      return null;
    }

    try {
      const posterId = `poster_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const posterRef = doc(db, 'shared_posters', posterId);
      
      await setDoc(posterRef, {
        details,
        owner: user.uid,
        collaborators: [user.uid],
        createdAt: serverTimestamp(),
        lastModified: serverTimestamp(),
        lastModifiedBy: user.uid,
      });

      toast.success("Poster shared successfully!");
      return posterId;
    } catch (error) {
      console.error("Error creating shared poster:", error);
      toast.error("Failed to share poster");
      return null;
    }
  }, [user]);

  // Update shared poster details
  const updateSharedDetails = useCallback(async (updates) => {
    if (!sharedPosterId || !user) return;

    try {
      const posterRef = doc(db, 'shared_posters', sharedPosterId);
      await updateDoc(posterRef, {
        details: updates,
        lastModified: serverTimestamp(),
        lastModifiedBy: user.uid,
      });
    } catch (error) {
      console.error("Error updating shared poster:", error);
      toast.error("Failed to sync changes");
    }
  }, [sharedPosterId, user]);

  // Add collaborator by user ID
  const addCollaborator = useCallback(async (userId) => {
    if (!sharedPosterId || !isOwner || !user) {
      toast.error("Only the owner can add collaborators");
      return;
    }

    try {
      const posterRef = doc(db, 'shared_posters', sharedPosterId);
      const docSnap = await getDoc(posterRef);
      
      if (docSnap.exists()) {
        const currentCollaborators = docSnap.data().collaborators || [];
        if (!currentCollaborators.includes(userId)) {
          await updateDoc(posterRef, {
            collaborators: [...currentCollaborators, userId],
            lastModified: serverTimestamp(),
          });
          toast.success("Collaborator added!");
        }
      }
    } catch (error) {
      console.error("Error adding collaborator:", error);
      toast.error("Failed to add collaborator");
    }
  }, [sharedPosterId, isOwner, user]);

  // Generate shareable link
  const getShareLink = useCallback(() => {
    if (!sharedPosterId) return null;
    const baseUrl = window.location.origin;
    return `${baseUrl}/create?shared=${sharedPosterId}`;
  }, [sharedPosterId]);

  return {
    isShared,
    isOwner,
    sharedDetails,
    collaborators,
    lastModifiedBy,
    createSharedPoster,
    updateSharedDetails,
    addCollaborator,
    getShareLink,
  };
};

export default useCollaboration;

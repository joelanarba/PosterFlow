import React, { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in, set up Firestore listener
        const userRef = doc(db, "users", currentUser.uid);
        
        // Check if user exists, if not create
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            credits: 3, // Free credits for new users
            createdAt: serverTimestamp()
          });
        }

        // Listen for real-time updates
        const unsubscribeSnapshot = onSnapshot(userRef, (doc) => {
          setUser({ ...currentUser, ...doc.data() });
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        // User is signed out
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* FIX: Show a loading text instead of a blank white screen */}
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center bg-gray-950 text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p>Loading App...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
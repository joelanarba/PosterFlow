import React, { useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import useCreatePoster from '../hooks/useCreatePoster';
import useCollaboration from '../hooks/useCollaboration';

import PosterCanvas from '../components/PosterCanvas';
import ControlPanel from '../components/ControlPanel';
import PaymentModal from '../components/PaymentModal';
import Footer from '../components/Footer';
import ExportMenu from '../components/ExportMenu';
import CollaborationPanel from '../components/CollaborationPanel';

const CreatePoster = () => {
  const {
    posterRef,
    details,
    setDetails,
    isPremium,
    setIsPremium,
    showPayment,
    setShowPayment,
    isSaving,
    errors,
    handleDownload,
    handleSaveToCloud,
    handleAIGenerate,
    undo,
    redo,
    canUndo,
    canRedo,
    isGenerating,
    sharedPosterId,
    size,
    setSize,
  } = useCreatePoster();

  // Collaboration
  const {
    isShared,
    isOwner,
    sharedDetails,
    collaborators,
    createSharedPoster,
    updateSharedDetails,
    getShareLink,
  } = useCollaboration(sharedPosterId);

  // Sync shared details to local state
  useEffect(() => {
    if (sharedDetails && isShared) {
      setDetails(sharedDetails);
    }
  }, [sharedDetails, isShared]);

  // Update shared poster when local details change
  useEffect(() => {
    if (isShared && !sharedPosterId) {
      // Don't sync on initial render
      return;
    }
    if (isShared && details) {
      const timeoutId = setTimeout(() => {
        updateSharedDetails(details);
      }, 1000); // Debounce updates
      return () => clearTimeout(timeoutId);
    }
  }, [details, isShared, sharedPosterId]);

  const handleShare = async () => {
    const posterId = await createSharedPoster(details);
    if (posterId) {
      // Update URL without reload
      window.history.pushState({}, '', `/create?shared=${posterId}`);
    }
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
          
          <CollaborationPanel
            isShared={isShared}
            isOwner={isOwner}
            collaborators={collaborators}
            onShare={handleShare}
            shareLink={getShareLink()}
          />
          
          <ControlPanel 
            details={details} 
            setDetails={setDetails} 
            onGenerateAI={handleAIGenerate} 
            errors={errors}
            isLoading={isSaving || isGenerating}
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            size={size}
            setSize={setSize}
          />
          
          <div className="flex gap-3">
            <ExportMenu 
              onExport={handleDownload}
              isGenerating={isGenerating}
            />

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
              size={size}
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
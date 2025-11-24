import React, { useState } from 'react';
import { Share2, Users, Copy, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CollaborationPanel = ({ 
  isShared, 
  isOwner, 
  collaborators = [], 
  onShare, 
  shareLink 
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        {isShared ? (
          <>
            <div className="flex items-center gap-2 flex-1">
              <Users size={18} className="text-blue-400" />
              <span className="text-sm text-gray-300">
                {isOwner ? 'You own this poster' : 'Shared with you'}
              </span>
            </div>
            
            {collaborators.length > 1 && (
              <div className="flex -space-x-2">
                {collaborators.slice(0, 3).map((collab, idx) => (
                  <div 
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {idx + 1}
                  </div>
                ))}
                {collaborators.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-white text-xs">
                    +{collaborators.length - 3}
                  </div>
                )}
              </div>
            )}

            {isOwner && (
              <button 
                onClick={() => setShowShareModal(true)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                title="Share link"
              >
                <Share2 size={16} />
              </button>
            )}
          </>
        ) : (
          <>
            <span className="text-sm text-gray-400 flex-1">Editing locally</span>
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm font-medium"
            >
              <Share2 size={16} />
              Share
            </button>
          </>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl p-6 border border-gray-700 relative">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="bg-blue-500/10 text-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Share Poster</h2>
              <p className="text-gray-400 mt-2">Collaborate in real-time</p>
            </div>

            {!isShared ? (
              <button 
                onClick={() => {
                  onShare();
                  setShowShareModal(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
              >
                Create Share Link
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <label className="text-xs text-gray-400 uppercase mb-2 block">Share Link</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={shareLink || ''} 
                      className="flex-1 bg-gray-900 text-white p-2 rounded text-sm border border-gray-700"
                    />
                    <button 
                      onClick={handleCopyLink}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition"
                    >
                      {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  Anyone with this link can view and edit this poster
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CollaborationPanel;

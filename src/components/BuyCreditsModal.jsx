import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { X, Zap, Loader2, CreditCard } from 'lucide-react';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const BuyCreditsModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  
  if (!isOpen) return null;

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  
  // Packages
  const packages = [
    { id: 'basic', credits: 50, price: 10, label: 'Starter' },
    { id: 'pro', credits: 150, price: 25, label: 'Pro Value' },
    { id: 'max', credits: 500, price: 70, label: 'Power User' },
  ];

  const [selectedPackage, setSelectedPackage] = useState(packages[1]);

  const componentProps = {
    email: user?.email,
    amount: selectedPackage.price * 100, // Convert to pesewas
    currency: 'GHS',
    metadata: { 
      name: user?.displayName, 
      type: 'credits',
      credits: selectedPackage.credits 
    },
    publicKey,
    text: `Pay GHS ${selectedPackage.price}.00`,
    onSuccess: async (reference) => {
      setIsVerifying(true);
      const loadingToast = toast.loading("Verifying payment & adding credits...");
      try {
        const verifyPayment = httpsCallable(functions, 'verifyPayment');
        const result = await verifyPayment({ 
          reference: reference.reference,
          type: 'credits',
          credits: selectedPackage.credits
        });
        
        if (result.data.success) {
          toast.success(`Successfully added ${selectedPackage.credits} credits!`, { id: loadingToast });
          onClose();
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        toast.error("Payment verification failed. Please contact support.", { id: loadingToast });
      } finally {
        setIsVerifying(false);
      }
    },
    onClose: () => toast("Payment cancelled", { icon: 'ℹ️' }),
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 w-full max-w-2xl rounded-2xl p-6 border border-gray-700 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="bg-blue-500/10 text-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Top Up Credits</h2>
          <p className="text-gray-400 mt-2">Purchase credits to generate more stunning posters.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`cursor-pointer p-4 rounded-xl border-2 transition relative ${selectedPackage.id === pkg.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600 bg-gray-800'}`}
            >
              {pkg.id === 'pro' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
              )}
              <div className="text-center">
                <h3 className="font-bold text-white mb-1">{pkg.label}</h3>
                <div className="text-3xl font-bold text-white mb-2">{pkg.credits}</div>
                <div className="text-sm text-gray-400">Credits</div>
                <div className="mt-4 text-xl font-bold text-blue-400">GHS {pkg.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-xl flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-400">Selected Package</div>
            <div className="font-bold text-white">{selectedPackage.label} - {selectedPackage.credits} Credits</div>
          </div>
          <div className="text-xl font-bold text-white">GHS {selectedPackage.price}.00</div>
        </div>

        <PaystackButton {...componentProps} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center shadow-lg shadow-blue-900/20">
          {isVerifying ? <Loader2 className="animate-spin mr-2" /> : <><CreditCard className="mr-2" size={20} /> Pay Now</>}
        </PaystackButton>

        <p className="text-center text-gray-500 text-xs mt-4">
          Secure payment via Paystack. Credits never expire.
        </p>
      </div>
    </div>
  );
};

export default BuyCreditsModal;

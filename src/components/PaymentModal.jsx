import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  if (!isOpen) return null;

  // REPLACE WITH YOUR PUBLIC KEY FROM PAYSTACK DASHBOARD
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const amount = 1000; // GHS 10.00 (in pesewas)

  const componentProps = {
    email,
    amount,
    currency: 'GHS',
    metadata: { name: 'PosterFlow User', phone: '' },
    publicKey,
    text: "Pay GHS 10.00",
    onSuccess: async (reference) => {
      setIsVerifying(true);
      const loadingToast = toast.loading("Verifying payment...");
      try {
        const verifyPayment = httpsCallable(functions, 'verifyPayment');
        const result = await verifyPayment({ reference: reference.reference });
        if (result.data.success) {
          toast.success("Payment verified!", { id: loadingToast });
          onSuccess();
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl p-6 border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="bg-yellow-500/10 text-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Remove Watermark</h2>
          <p className="text-gray-400 mt-2">Get the HD poster without the branding.</p>
        </div>

        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4 border border-gray-600"
        />

        {email ? (
          <PaystackButton {...componentProps} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center">
            {isVerifying ? <Loader2 className="animate-spin mr-2" /> : "Pay Now"}
          </PaystackButton>
import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  if (!isOpen) return null;

  // REPLACE WITH YOUR PUBLIC KEY FROM PAYSTACK DASHBOARD
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const amount = 1000; // GHS 10.00 (in pesewas)

  const componentProps = {
    email,
    amount,
    currency: 'GHS',
    metadata: { name: 'PosterFlow User', phone: '' },
    publicKey,
    text: "Pay GHS 10.00",
    onSuccess: async (reference) => {
      setIsVerifying(true);
      const loadingToast = toast.loading("Verifying payment...");
      try {
        const verifyPayment = httpsCallable(functions, 'verifyPayment');
        const result = await verifyPayment({ reference: reference.reference });
        if (result.data.success) {
          toast.success("Payment verified!", { id: loadingToast });
          onSuccess();
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl p-6 border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="bg-yellow-500/10 text-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Remove Watermark</h2>
          <p className="text-gray-400 mt-2">Get the HD poster without the branding.</p>
        </div>

        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4 border border-gray-600"
        />

        {email ? (
          <PaystackButton {...componentProps} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center">
            {isVerifying ? <Loader2 className="animate-spin mr-2" /> : "Pay Now"}
          </PaystackButton>
        ) : (
          <button disabled className="w-full bg-gray-700 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed">
            Enter Email to Pay
          </button>
        )}


      </div>
    </div>
  );
};

export default PaymentModal;
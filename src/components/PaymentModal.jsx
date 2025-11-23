import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { X, CheckCircle } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  
  if (!isOpen) return null;

  // REPLACE WITH YOUR PUBLIC KEY FROM PAYSTACK DASHBOARD
  const publicKey = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; 
  const amount = 1000; // GHS 10.00 (in pesewas)

  const componentProps = {
    email,
    amount,
    currency: 'GHS',
    metadata: { name: 'PosterFlow User', phone: '' },
    publicKey,
    text: "Pay GHS 10.00",
    onSuccess: () => {
      onSuccess();
      onClose();
    },
    onClose: () => alert("Payment cancelled"),
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
          <PaystackButton {...componentProps} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition" />
        ) : (
          <button disabled className="w-full bg-gray-700 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed">
            Enter Email to Pay
          </button>
        )}

        {/* DEV BYPASS BUTTON - REMOVE IN PRODUCTION */}
        <button onClick={() => { onSuccess(); onClose(); }} className="w-full mt-3 text-xs text-gray-500 underline">
          (Dev Mode) Bypass Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
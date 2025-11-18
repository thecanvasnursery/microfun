import React, { useState, useEffect } from 'react';
import { CreditCard, Coffee, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { CardProvider, DonationFormData, DonationStatus } from '../types';
import { generateImpactMessage } from '../services/geminiService';

interface DonationFormProps {
  onSuccess: (message: string) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onSuccess }) => {
  const [provider, setProvider] = useState<CardProvider>(CardProvider.VISA);
  const [formData, setFormData] = useState<DonationFormData>({
    cardNumber: '',
    securityCode: '',
    expiryDate: '',
    amount: '',
    provider: CardProvider.VISA
  });
  const [status, setStatus] = useState<DonationStatus>(DonationStatus.IDLE);
  const [error, setError] = useState<string>('');

  const handleProviderChange = (newProvider: CardProvider) => {
    setProvider(newProvider);
    setFormData(prev => ({ ...prev, provider: newProvider, cardNumber: '', securityCode: '' }));
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    setStatus(DonationStatus.PROCESSING);

    try {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call Gemini for the success message
      const message = await generateImpactMessage(formData.amount, provider);
      
      setStatus(DonationStatus.SUCCESS);
      onSuccess(message);
    } catch (err) {
      setStatus(DonationStatus.ERROR);
      setError('Something went wrong processing your card. Please try again.');
    }
  };

  const isStoreCard = provider === CardProvider.DUNKIN || provider === CardProvider.STARBUCKS;

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Card Type Selector */}
      <div className="bg-gray-50 p-4 border-b border-gray-100">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Select Card Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleProviderChange(CardProvider.VISA)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
              provider === CardProvider.VISA || provider === CardProvider.MASTERCARD
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CreditCard size={20} className="mb-1" />
            <span className="text-[10px] font-medium">Prepaid</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleProviderChange(CardProvider.DUNKIN)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
              provider === CardProvider.DUNKIN
                ? 'bg-orange-50 border-orange-200 text-orange-700 shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Coffee size={20} className="mb-1" />
            <span className="text-[10px] font-medium">Dunkin'</span>
          </button>

          <button
            type="button"
            onClick={() => handleProviderChange(CardProvider.STARBUCKS)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
              provider === CardProvider.STARBUCKS
                ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Coffee size={20} className="mb-1" />
            <span className="text-[10px] font-medium">Starbucks</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remaining Balance (Amount to Donate)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amount"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">USD</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isStoreCard ? 'Card Number' : 'Card Number (PAN)'}
          </label>
          <input
            type="text"
            name="cardNumber"
            placeholder={isStoreCard ? "6123..." : "4000 0000 0000 0000"}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {!isStoreCard && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.expiryDate}
                onChange={handleChange}
                required={!isStoreCard}
              />
            </div>
          )}
          
          <div className={isStoreCard ? "col-span-2" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isStoreCard ? 'Security Code / PIN' : 'CVV / CVC'}
            </label>
            <div className="relative">
               <input
                type="password"
                name="securityCode"
                placeholder="123"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.securityCode}
                onChange={handleChange}
                required
              />
              <Lock size={16} className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === DonationStatus.PROCESSING}
            className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-semibold shadow-lg transition-all ${
              status === DonationStatus.PROCESSING
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-0.5'
            }`}
          >
            {status === DonationStatus.PROCESSING ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Processing...
              </>
            ) : (
              `Donate $${formData.amount || '0.00'}`
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
            <Lock size={12} />
            Secure 256-bit encrypted transaction
          </p>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
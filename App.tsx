import React, { useState } from 'react';
import Header from './components/Header';
import DonationForm from './components/DonationForm';
import ImpactChart from './components/ImpactChart';
import { Heart, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFlow = () => {
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <Header />

      <main className="container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              <span>Empty those drawers, fill a heart.</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Turn your <span className="text-indigo-600">leftover cents</span> into meaningful change.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Have a prepaid Visa with $0.34? A Starbucks card with $1.02? 
              Don't let them expire. Pool your micro-balances to fund clean water, 
              meals, and education projects worldwide.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src={`https://picsum.photos/100/100?random=${i}`}
                    alt="Donor"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                Join <span className="font-bold text-gray-900">14,203</span> micro-donors today.
              </div>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg relative">
            {successMessage ? (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 text-center space-y-6 animate-fade-in-up">
                <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Heart size={40} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Contribution Received!</h2>
                  <p className="text-gray-600 italic">"{successMessage}"</p>
                </div>
                <button 
                  onClick={resetFlow}
                  className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Donate Another Card <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <DonationForm onSuccess={handleSuccess} />
            )}
          </div>
        </div>

        {/* Stats & Trust Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 border-t border-gray-200 pt-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-4">Goal Progress</h3>
            <ImpactChart />
          </div>
          
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Bank-Grade Security</h3>
              <p className="text-gray-600 text-sm">
                We use Stripe Connect encryption. We never store your full card details. Your privacy is our vault.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Transparency</h3>
              <p className="text-gray-600 text-sm">
                Every cent is tracked. See exactly how your $0.42 contributes to buying a textbook or a meal.
              </p>
            </div>
          </div>
        </div>

      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} microfund.me. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Disclaimer: This is a demo application. No real funds are processed. Please do not enter real sensitive financial information.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
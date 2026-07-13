import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { UploadCloud, CheckCircle, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Quote() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-green-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">Request Submitted Successfully</h1>
        <p className="text-zinc-500 text-lg mb-8">Our engineering sales team will review your requirements and get back to you within 24 hours.</p>
        <p className="text-sm text-zinc-400">Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <button 
        onClick={() => navigate('/cart')}
        className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ChevronLeft size={16} className="mr-1" /> Back to Cart
      </button>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Request Custom Quote</h1>
          <p className="text-zinc-500 mb-8">Please provide your company details and any specific engineering requirements.</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
            <div className="space-y-8">
              {/* Company Info */}
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 border-b border-zinc-100 pb-2">Company Information</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Company Name *</label>
                    <input required type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">GST Number</label>
                    <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Contact Person *</label>
                    <input required type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email Address *</label>
                    <input required type="email" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Delivery Address *</label>
                    <textarea required rows={3} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow resize-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Technical Requirements */}
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 border-b border-zinc-100 pb-2">Technical Requirements & Uploads</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Additional Notes / Specifications</label>
                    <textarea rows={4} placeholder="Material preferences, tolerance requirements, expected delivery timeline..." className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow resize-none"></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Upload Drawings (CAD/PDF)</label>
                    <div className="border-2 border-dashed border-zinc-300 rounded-xl p-8 text-center hover:bg-zinc-50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D81F26] group-hover:text-white transition-colors">
                        <UploadCloud size={20} className="text-zinc-500 group-hover:text-white" />
                      </div>
                      <div className="text-sm font-medium text-zinc-900 mb-1">Click to upload or drag and drop</div>
                      <div className="text-xs text-zinc-500">PDF, STEP, IGES, DXF up to 50MB</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#D81F26] hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Submitting Request...</span>
                  ) : (
                    "Submit Quote Request"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6">
            <h3 className="font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-4">Request Summary</h3>
            <ul className="space-y-4 mb-6">
              {cart.map(item => (
                <li key={item.product.id} className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="font-medium text-zinc-900 text-sm line-clamp-2">{item.product.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">Qty: {item.quantity} • {item.product.leadTime}</div>
                  </div>
                  <div className="font-semibold text-sm text-zinc-900 shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-zinc-200 pt-4 flex justify-between items-center">
              <span className="font-bold text-zinc-900">Total Est.</span>
              <span className="font-bold text-lg text-[#D81F26]">₹{total.toLocaleString()}</span>
            </div>
            <div className="mt-4 text-xs text-zinc-500 bg-white p-3 rounded-lg border border-zinc-100 flex items-start">
              <CheckCircle size={14} className="text-green-600 mr-2 shrink-0 mt-0.5" />
              <span>No payment required now. A formal quote with shipping and taxes will be sent for your approval.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const gst = total * 0.18; // 18% GST assumption
  const finalTotal = total + gst;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={40} className="text-zinc-400" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Your Quote Cart is Empty</h2>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">Browse our catalog to add industrial components and request a custom manufacturing quote.</p>
        <Link to="/products" className="inline-flex items-center justify-center bg-[#D81F26] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">Request Quote Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <motion.div 
              layout
              key={item.product.id} 
              className="flex flex-col sm:flex-row bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm gap-6"
            >
              <div className="w-32 h-32 bg-zinc-50 rounded-xl overflow-hidden shrink-0 border border-zinc-100 p-2">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-widest">{item.product.category}</div>
                    <Link to={`/product/${item.product.slug}`}>
                      <h3 className="font-bold text-lg text-zinc-900 hover:text-[#D81F26] transition-colors">{item.product.name}</h3>
                    </Link>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="text-sm text-zinc-500 mb-4">
                  MOQ: {item.product.moq} | Lead Time: {item.product.leadTime}
                </div>

                <div className="mt-auto flex items-end justify-between">
                  <div className="flex items-center border border-zinc-300 bg-white rounded-lg h-10">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 text-zinc-500 hover:text-zinc-900 transition-colors h-full flex items-center"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center font-semibold text-sm text-zinc-900 border-x border-zinc-200 h-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 text-zinc-500 hover:text-zinc-900 transition-colors h-full flex items-center"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-400 mb-0.5">Est. Price (ex. GST)</div>
                    <div className="font-bold text-xl text-zinc-900">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Quote Summary</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal (Estimated)</span>
                <span className="font-medium text-zinc-900">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Estimated GST (18%)</span>
                <span className="font-medium text-zinc-900">₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span className="font-medium text-zinc-900">Calculated upon request</span>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-zinc-900">Estimated Total</span>
                <span className="text-2xl font-bold text-[#D81F26]">₹{finalTotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">Final pricing will be confirmed by our engineering sales team.</p>
            </div>

            <button 
              onClick={() => navigate('/quote')}
              className="w-full bg-zinc-900 hover:bg-[#D81F26] text-white py-4 rounded-xl font-bold flex items-center justify-center transition-colors shadow-lg shadow-zinc-900/10 group"
            >
              Proceed to Request Quote
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

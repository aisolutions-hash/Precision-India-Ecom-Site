import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-zinc-400 border-t border-zinc-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="text-[#D81F26]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="flex flex-col border-l-2 border-zinc-800 pl-3">
                <span className="text-xl font-black tracking-tight text-white leading-none uppercase">Precision</span>
                <span className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase mt-0.5">Engineering</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-sm">
              Engineering excellence since 2010. We manufacture and distribute premium precision components, shafts, and jigs for global industrial applications.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin size={16} className="text-[#D81F26] mt-0.5 mr-3 shrink-0" />
                <span>4MVR+VMG MIDC, Nagapur, Ahilyanagar, Maharashtra - 414111</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-[#D81F26] mr-3 shrink-0" />
                <span>+91 98222 93688</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="text-[#D81F26] mr-3 shrink-0" />
                <span>rfq@precisionengg.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products?category=shafts" className="hover:text-white transition-colors">Precision Shafts</Link></li>
              <li><Link to="/products?category=pins" className="hover:text-white transition-colors">Guide Pins</Link></li>
              <li><Link to="/products?category=bushes" className="hover:text-white transition-colors">Industrial Bushes</Link></li>
              <li><Link to="/products?category=jigs" className="hover:text-white transition-colors">Drill Jigs</Link></li>
              <li><Link to="/products?category=custom" className="hover:text-white transition-colors">Custom Machining</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/quality" className="hover:text-white transition-colors">Quality Control</Link></li>
              <li><Link to="/capabilities" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-xs mb-4">Subscribe to our newsletter for engineering insights and product updates.</p>
            <form className="flex flex-col space-y-2" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D81F26] transition-colors"
              />
              <button className="bg-zinc-800 hover:bg-[#D81F26] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center group">
                Subscribe <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Precision Engineering Works. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/iso" className="hover:text-white transition-colors">ISO 9001:2015 Certified</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

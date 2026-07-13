import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart, ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-white/90 backdrop-blur-md border-zinc-200 py-3 shadow-sm" : "bg-white border-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="text-[#D81F26] group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="hidden sm:flex flex-col border-l-2 border-zinc-200 pl-3">
                <span className="text-xl font-black tracking-tight text-zinc-900 leading-none uppercase">Precision</span>
                <span className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase mt-0.5">Engineering</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group py-5 -my-5">
                <Link to="/products" className="text-sm font-medium text-zinc-600 group-hover:text-[#D81F26] transition-colors flex items-center h-full">
                  Products <ChevronDown size={14} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-56 bg-white border border-zinc-200 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 py-2">
                  <Link to="/products" className="block px-4 py-2 text-sm text-zinc-900 font-bold border-b border-zinc-100 hover:bg-zinc-50 hover:text-[#D81F26]">View All Products</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-[#D81F26] hover:bg-red-50/50 transition-colors">Shafts</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-[#D81F26] hover:bg-red-50/50 transition-colors">Pins & Rods</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-[#D81F26] hover:bg-red-50/50 transition-colors">Jigs & Fixtures</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-[#D81F26] hover:bg-red-50/50 transition-colors">Dies</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-[#D81F26] hover:bg-red-50/50 transition-colors">Bushes</Link>
                </div>
              </div>
              <Link to="/industries" className="text-sm font-medium text-zinc-600 hover:text-[#D81F26] transition-colors">
                Industries
              </Link>
              <Link to="/services" className="text-sm font-medium text-zinc-600 hover:text-[#D81F26] transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-sm font-medium text-zinc-600 hover:text-[#D81F26] transition-colors">
                About Us
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-zinc-600 hover:text-[#D81F26] transition-colors">
                <Search size={20} />
              </button>
              
              <Link to={user ? "/account" : "/login"} className="hidden sm:flex text-zinc-600 hover:text-[#D81F26] transition-colors">
                <User size={20} />
              </Link>

              <Link to="/cart" className="relative text-zinc-600 hover:text-[#D81F26] transition-colors group">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#D81F26] text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/quote" className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 bg-zinc-900 hover:bg-[#D81F26] text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                Request Quote
              </Link>

              <button className="md:hidden text-zinc-900" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-4 shadow-lg"
            >
              <div className="max-w-3xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input 
                  type="text" 
                  autoFocus
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && searchTerm.trim()) { navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`); setIsSearchOpen(false); setSearchTerm(''); } }}
                  placeholder="Search products, materials, or part numbers..." 
                  className="w-full bg-zinc-100 border-none rounded-xl py-4 pl-12 pr-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 transition-shadow"
                />
                <button onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer to prevent layout shift from fixed header */}
      <div className="h-[80px]" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-zinc-100 flex justify-between items-center">
                <span className="font-bold text-lg text-zinc-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-5 space-y-1">
                  <Link to="/" className="block py-3 text-zinc-700 font-medium border-b border-zinc-100">Home</Link>
                  <Link to="/products" className="block py-3 text-zinc-700 font-medium border-b border-zinc-100">Products</Link>
                  <Link to="/industries" className="block py-3 text-zinc-700 font-medium border-b border-zinc-100">Industries</Link>
                  <Link to="/about" className="block py-3 text-zinc-700 font-medium border-b border-zinc-100">About Us</Link>
                  <Link to="/quote" className="block py-3 text-[#D81F26] font-bold border-b border-zinc-100">Request Quote</Link>
                </div>
              </div>
              <div className="p-5 border-t border-zinc-100 bg-zinc-50">
                <Link to={user ? "/account" : "/login"} className="flex items-center space-x-3 text-zinc-700 font-medium mb-4">
                  <User size={20} />
                  <span>{user ? 'My Account' : 'Sign In / Register'}</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

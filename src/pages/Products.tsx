import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Check, SlidersHorizontal, Plus } from 'lucide-react';
import { products, Product } from '../data/products';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const CATEGORIES = ["All", "Shafts", "Pins & Rods", "Jigs & Fixtures", "Dies", "Bushes"];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [showMadeToOrder, setShowMadeToOrder] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");
  const addToCart = useStore(state => state.addToCart);
  const showToast = useStore(state => state.showToast);

  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
    }

    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    if (showInStock && !showMadeToOrder) {
      result = result.filter(p => p.inStock);
    } else if (!showInStock && showMadeToOrder) {
      result = result.filter(p => !p.inStock);
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, showInStock, showMadeToOrder, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-2">Industrial Components</h1>
          <p className="text-zinc-500 text-lg">Browse our catalog of high-precision engineering parts.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center space-x-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
          <div className="hidden md:flex items-center space-x-2 text-sm text-zinc-600 bg-white border border-zinc-200 rounded-lg px-3 py-2 shadow-sm">
            <span>Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent font-medium text-zinc-900 focus:outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className={cn(
          "lg:w-64 shrink-0 space-y-8",
          isFilterOpen ? "block" : "hidden lg:block"
        )}>
          <div>
            <h3 className="font-bold text-zinc-900 mb-4 text-sm tracking-widest uppercase">Categories</h3>
            <ul className="space-y-1">
              {CATEGORIES.map(category => (
                <li key={category}>
                  <button 
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                      activeCategory === category 
                        ? "bg-zinc-100 font-semibold text-zinc-900" 
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    )}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-zinc-200">
            <h3 className="font-bold text-zinc-900 mb-4 text-sm tracking-widest uppercase">Availability</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group" onClick={() => setShowInStock(!showInStock)}>
                <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", showInStock ? "bg-[#D81F26] border-[#D81F26]" : "border-zinc-300 group-hover:border-[#D81F26]")}>
                  {showInStock && <Check size={14} className="text-white" />}
                </div>
                <span className="text-sm text-zinc-600 group-hover:text-zinc-900">In Stock</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group" onClick={() => setShowMadeToOrder(!showMadeToOrder)}>
                <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", showMadeToOrder ? "bg-[#D81F26] border-[#D81F26]" : "border-zinc-300 group-hover:border-[#D81F26]")}>
                  {showMadeToOrder && <Check size={14} className="text-white" />}
                </div>
                <span className="text-sm text-zinc-600 group-hover:text-zinc-900">Made to Order</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={product.id}
                  className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:border-zinc-300 transition-all flex flex-col"
                >
                  <Link to={`/product/${product.slug}`} className="relative aspect-square bg-zinc-50 p-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                    {!product.inStock && (
                      <div className="absolute top-4 left-4 bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border border-zinc-200 backdrop-blur-sm">
                        Made to Order
                      </div>
                    )}
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">{product.category}</div>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-bold text-zinc-900 text-lg leading-snug mb-3 group-hover:text-[#D81F26] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="text-sm text-zinc-500 mb-6 flex-1 line-clamp-2">
                      {product.description}
                    </div>
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-zinc-100">
                      <div>
                        <div className="text-xs text-zinc-400 mb-1">Starting from</div>
                        <div className="font-bold text-xl text-zinc-900">₹{product.price.toLocaleString()}</div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product, 1);
                          showToast(`Added ${product.name} to cart`);
                        }}
                        className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#D81F26] hover:text-white transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter size={24} className="text-zinc-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">No products found</h3>
              <p className="text-zinc-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../data/products';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { ShoppingCart, FileText, Download, ShieldCheck, ChevronRight, Truck, Info, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const addToCart = useStore(state => state.addToCart);
  const showToast = useStore(state => state.showToast);
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const [activeTab, setActiveTab] = useState("overview");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="text-[#D81F26] mt-4 inline-block hover:underline">Return to products</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} × ${product.name} to cart`);
  };

  return (
    <div className="bg-zinc-50 w-full pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center text-sm text-zinc-500">
          <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/products" className="hover:text-zinc-900 transition-colors">Products</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-zinc-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Gallery */}
            <div className="p-8 lg:border-r border-zinc-200 bg-zinc-50/50 flex flex-col">
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square bg-white rounded-2xl border border-zinc-200 p-8 flex items-center justify-center mb-6 relative overflow-hidden"
              >
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4 mt-auto">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-square rounded-xl border bg-white p-2 flex items-center justify-center transition-all",
                      activeImage === idx ? "border-[#D81F26] ring-1 ring-[#D81F26]" : "border-zinc-200 hover:border-zinc-300"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-zinc-200 text-zinc-200"} />
                  ))}
                  <span className="text-sm font-medium text-zinc-600 ml-2">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="text-sm text-zinc-400 border-l border-zinc-300 pl-4">
                  SKU: PR-{product.id.toUpperCase()}
                </div>
              </div>

              <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 mb-8">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Unit Price (ex. GST)</div>
                    <div className="text-3xl font-bold text-zinc-900">₹{product.price.toLocaleString()}</div>
                  </div>
                  {product.inStock ? (
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200">
                      In Stock
                    </div>
                  ) : (
                    <div className="bg-zinc-200 text-zinc-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Made to Order
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-zinc-300 bg-white rounded-lg h-12">
                    <button 
                      onClick={() => setQuantity(Math.max(product.moq, quantity - 1))}
                      className="px-4 text-zinc-500 hover:text-zinc-900 transition-colors h-full flex items-center"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                      className="w-16 text-center font-bold text-zinc-900 border-none focus:outline-none h-full"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 text-zinc-500 hover:text-zinc-900 transition-colors h-full flex items-center"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleAdd}
                    className="flex-1 h-12 bg-[#D81F26] hover:bg-red-700 text-white rounded-lg font-bold flex items-center justify-center transition-colors shadow-lg shadow-red-900/20"
                  >
                    <ShoppingCart size={18} className="mr-2" /> Add to Cart
                  </button>
                </div>
                <div className="mt-3 text-xs text-zinc-500 flex items-center">
                  <Info size={14} className="mr-1" /> Minimum Order Quantity: {product.moq} units
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto border-t border-zinc-200 pt-8">
                <div className="flex items-start">
                  <Truck size={20} className="text-zinc-400 mr-3 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm">Lead Time</div>
                    <div className="text-zinc-500 text-sm">{product.leadTime}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck size={20} className="text-zinc-400 mr-3 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm">Quality Assurance</div>
                    <div className="text-zinc-500 text-sm">ISO 9001:2015</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-zinc-200 scrollbar-hide whitespace-nowrap">
            {["overview", "specifications", "downloads"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-5 text-sm font-semibold uppercase tracking-wider transition-colors",
                  activeTab === tab 
                    ? "border-b-2 border-[#D81F26] text-[#D81F26] bg-red-50/30" 
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8 lg:p-12">
            {activeTab === "overview" && (
              <div className="prose prose-zinc max-w-none">
                <h3 className="text-xl font-bold text-zinc-900 mb-4">Product Overview</h3>
                <p className="text-zinc-600 mb-6">{product.description}</p>
                <h4 className="font-bold text-zinc-900 mb-3">Key Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                  {product.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Technical Specifications</h3>
                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-zinc-200">
                      {Object.entries(product.specs).map(([key, val], i) => (
                        <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
                          <td className="py-4 px-6 font-semibold text-zinc-900 w-1/3">{key}</td>
                          <td className="py-4 px-6 text-zinc-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === "downloads" && (
              <div>
                 <h3 className="text-xl font-bold text-zinc-900 mb-6">Resources & Downloads</h3>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <a href="#" className="flex items-center p-4 border border-zinc-200 rounded-xl hover:border-[#D81F26] hover:bg-red-50/10 transition-colors group">
                      <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-500 group-hover:bg-[#D81F26] group-hover:text-white transition-colors mr-4">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-zinc-900 text-sm">Technical Datasheet</div>
                        <div className="text-xs text-zinc-500">PDF • 2.4 MB</div>
                      </div>
                      <Download size={18} className="text-zinc-400 group-hover:text-[#D81F26]" />
                    </a>
                    <a href="#" className="flex items-center p-4 border border-zinc-200 rounded-xl hover:border-[#D81F26] hover:bg-red-50/10 transition-colors group">
                      <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-500 group-hover:bg-[#D81F26] group-hover:text-white transition-colors mr-4">
                        <span className="font-bold text-sm">CAD</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-zinc-900 text-sm">3D CAD Model</div>
                        <div className="text-xs text-zinc-500">STEP / IGES • 5.1 MB</div>
                      </div>
                      <Download size={18} className="text-zinc-400 group-hover:text-[#D81F26]" />
                    </a>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award, Users, Target, CheckCircle2 } from 'lucide-react';
import { products } from '../data/products';
import { motion } from 'motion/react';
import extrusionDieImg from '../assets/images/extrusion-die.jpeg';
import shaftVaryingImg from '../assets/images/shaft-varying-size.jpeg';
import shaft2Img from '../assets/images/shaft-2.jpeg';
import forgingDieImg from '../assets/images/forging-die.jpeg';

export default function Home() {
  const bestSellers = products.filter(p => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-[#0A0A0A] text-white min-h-[90vh] flex items-center pt-10">
        <div className="absolute inset-0">
          <img 
            src={extrusionDieImg} 
            alt="Engineering Hero" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-700/50 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#D81F26] animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">ISO 9001:2015 Certified Manufacturing</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Precision Components <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D81F26] to-red-400">
                  Engineered for Performance
                </span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
                We manufacture and distribute high-tolerance shafts, guide pins, and jigs for the aerospace, automotive, and manufacturing industries. Built to exact specifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pb-12 sm:pb-0">
                <Link to="/products" className="inline-flex items-center justify-center bg-[#D81F26] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-[0_0_40px_-10px_rgba(216,31,38,0.5)]">
                  Explore Products
                </Link>
                <Link to="/quote" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-md transition-all">
                  Request Custom Quote <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-100">
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-zinc-900 mb-2">15+</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-zinc-900 mb-2">1,200+</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Global Clients</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-zinc-900 mb-2">5,000+</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Products Delivered</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-[#D81F26] mb-2">99.8%</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Quality Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Featured Categories</h2>
              <p className="text-zinc-500 text-lg">Browse our premium industrial components</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center font-medium text-[#D81F26] hover:text-red-700 transition-colors">
              View All Categories <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Precision Shafts", img: shaftVaryingImg },
              { title: "Guide Pins & Rods", img: shaft2Img },
              { title: "Drill Jigs & Fixtures", img: forgingDieImg }
            ].map((cat, i) => (
              <Link key={i} to="/products" className="group relative h-80 rounded-2xl overflow-hidden bg-zinc-900">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                  <div className="flex items-center text-zinc-300 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore products <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Best Sellers</h2>
            <p className="text-zinc-500 text-lg">Highly rated parts trusted by top manufacturers</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <Link key={product.id} to={`/product/${product.slug}`} className="group border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                <div className="aspect-square bg-zinc-100 relative overflow-hidden p-6 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                  {product.isBestSeller && (
                    <div className="absolute top-4 left-4 bg-zinc-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                      Best Seller
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">{product.category}</div>
                  <h3 className="font-bold text-lg text-zinc-900 mb-2 leading-tight group-hover:text-[#D81F26] transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="font-bold text-xl text-zinc-900">₹{product.price.toLocaleString()}</span>
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[#D81F26] group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Why Industry Leaders Choose Us</h2>
            <p className="text-zinc-400 text-lg">We deliver uncompromising quality, strict tolerances, and exceptional engineering support for your most critical applications.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Shield size={32} />, title: "ISO Certified Quality", desc: "Every component undergoes strict CMM inspection to ensure it meets exact drawing specifications." },
              { icon: <Target size={32} />, title: "High Precision Tolerance", desc: "We machine parts to micron-level accuracy, ensuring perfect fitment in complex assemblies." },
              { icon: <Users size={32} />, title: "Engineering Support", desc: "Our technical team provides material selection and design optimization guidance." }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-2xl flex items-center justify-center text-[#D81F26] mb-6 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}

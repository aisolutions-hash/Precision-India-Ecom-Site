import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((email === 'admin@precision.com' || email === 'user@precision.com') && password === 'password123') {
      login({ email, role: email.startsWith('admin') ? 'admin' : 'user', name: email.split('@')[0] });
      navigate('/account');
    } else {
      setError('Invalid email or password. Use user@precision.com / password123');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 bg-zinc-50 w-full">
      <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200 shadow-xl p-8 sm:p-12">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#D81F26] rounded-xl mx-auto flex items-center justify-center text-white font-bold text-2xl mb-4">
            P
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Sign in to your account</h1>
          <p className="text-sm text-zinc-500 mt-2">Manage orders, track RFQs, and access technical documents.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow" 
                placeholder="user@precision.com"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-zinc-700">Password</label>
              <a href="#" className="text-xs font-medium text-[#D81F26] hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D81F26]/20 focus:border-[#D81F26] transition-shadow" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-zinc-900 hover:bg-[#D81F26] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-zinc-900/10 flex items-center justify-center group mt-2"
          >
            Sign In <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Don't have an account? <a href="#" className="font-semibold text-zinc-900 hover:text-[#D81F26] transition-colors">Apply for a trade account</a>
        </div>
      </div>
      
      <div className="mt-8 text-xs text-zinc-400 text-center max-w-sm">
        For demo purposes, use: <br/>
        <strong>user@precision.com</strong> / <strong>password123</strong>
      </div>
    </div>
  );
}

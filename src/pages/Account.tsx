import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, Package, FileText, Settings, LogOut, ChevronRight } from 'lucide-react';

export default function Account() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 font-bold uppercase text-xl">
                {user.name?.[0]}
              </div>
              <div>
                <div className="font-bold text-zinc-900 capitalize">{user.name}</div>
                <div className="text-xs text-zinc-500">{user.email}</div>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 bg-zinc-50 text-[#D81F26] font-medium rounded-lg">
                <div className="flex items-center"><User size={18} className="mr-3" /> Profile</div>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg transition-colors">
                <div className="flex items-center"><Package size={18} className="mr-3" /> Orders</div>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg transition-colors">
                <div className="flex items-center"><FileText size={18} className="mr-3" /> Quotes</div>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg transition-colors">
                <div className="flex items-center"><Settings size={18} className="mr-3" /> Settings</div>
              </button>
            </nav>
          </div>
          
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center justify-center px-4 py-3 border border-zinc-200 text-zinc-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={18} className="mr-2" /> Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Account Overview</h1>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
              <div className="text-zinc-500 text-sm mb-2">Active Orders</div>
              <div className="text-3xl font-bold text-zinc-900">0</div>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
              <div className="text-zinc-500 text-sm mb-2">Pending Quotes</div>
              <div className="text-3xl font-bold text-zinc-900">1</div>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
              <div className="text-zinc-500 text-sm mb-2">Account Type</div>
              <div className="text-xl font-bold text-zinc-900 capitalize">{user.role}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200">
              <h2 className="font-bold text-zinc-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-zinc-100">
              <div className="px-6 py-4 flex justify-between items-center hover:bg-zinc-50 transition-colors cursor-pointer group">
                <div>
                  <div className="font-medium text-zinc-900">RFQ-2023-1102</div>
                  <div className="text-sm text-zinc-500">Requested on {new Date().toLocaleDateString()}</div>
                </div>
                <div className="flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mr-4">Pending Review</span>
                  <ChevronRight size={18} className="text-zinc-400 group-hover:text-zinc-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

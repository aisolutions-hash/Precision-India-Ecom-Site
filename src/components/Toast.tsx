import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { CheckCircle } from 'lucide-react';

export default function Toast() {
  const toast = useStore(s => s.toast);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => useStore.setState({ toast: null }), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium"
        >
          <CheckCircle size={18} className="text-green-400 shrink-0" />
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

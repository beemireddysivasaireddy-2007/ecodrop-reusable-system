import React from 'react';
import { Leaf, Heart, Sparkles, Terminal } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="mt-20 border-t-2 border-[#2D2A26] bg-[#FAF6ED] pt-12 pb-16 px-4 sm:px-8 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Brand */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#2D5A27] text-white rounded-xl flex items-center justify-center border-2 border-[#2D2A26] shadow-[2px_2px_0px_#2D2A26]">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-craft text-2xl font-bold text-[#2D2A26]">EcoDrop</span>
            <span className="text-xs font-code font-bold uppercase bg-[#E5A93C] text-[#2D2A26] px-2 py-0.5 rounded border border-[#2D2A26]">
              Problem 5
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#615B52] max-w-sm leading-relaxed">
            A handcrafted, non-overengineered solution for universities and local cafeterias to replace single-use plastics through habit redesign and instant micro-rewards.
          </p>

          <div className="pt-2">
            <span className="font-hand text-lg text-[#7A5B18] font-bold block">
              "Simple systems get adopted. Complex systems get abandoned."
            </span>
          </div>
        </div>

        {/* Pillars */}
        <div className="md:col-span-4 space-y-2 text-xs text-[#524B41]">
          <span className="font-code font-bold uppercase text-[#7A5B18] block mb-2">Methodology Pillars</span>
          <div className="space-y-1.5">
            <p>1. <strong>Habit Mind Mapping:</strong> Identified time-of-day campus waste drivers.</p>
            <p>2. <strong>SCAMPER Redesign:</strong> Replaced disposables with stainless & library checkout model.</p>
            <p>3. <strong>Working Prototype:</strong> Digital pass, camera QR scan & reward redemption.</p>
            <p>4. <strong>Clean Database:</strong> 3 simple normalized tables (<code className="font-code bg-white px-1">users</code>, <code className="font-code bg-white px-1">rewards</code>, <code className="font-code bg-white px-1">transactions</code>).</p>
          </div>
        </div>

        {/* Deployment Info */}
        <div className="md:col-span-3 space-y-3">
          <div className="paper-card-sm p-3.5 rounded-xl bg-white">
            <span className="text-[10px] font-code font-bold uppercase text-[#2D5A27] block">Deployment Status</span>
            <span className="font-craft font-bold text-sm text-[#2D2A26] block mt-0.5">Vercel Ready</span>
            <p className="text-[11px] text-[#7A6C58] mt-1">
              Static production build packaged with Vite, React 19 & Tailwind CSS v4.
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t-2 border-dashed border-[#DDD5C5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7265]">
        <p className="flex items-center gap-1 font-craft">
          Handcrafted with care for Problem 5 • Zero Single-Use Plastic Movement
        </p>
        <button
          onClick={onScrollTop}
          className="font-code underline hover:text-[#2D2A26] cursor-pointer"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}

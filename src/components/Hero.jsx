import React from 'react';
import { ArrowDownRight, Sparkles, CheckCircle2, QrCode, Tag, Database } from 'lucide-react';

export default function Hero({ onExplorePrototype, onOpenPrintTag, onOpenDatabase }) {
  return (
    <section className="relative pt-8 pb-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background craft accents */}
      <div className="absolute top-2 right-8 hidden lg:block rotate-3 pointer-events-none">
        <div className="rubber-stamp">
          ZERO-WASTE PROTOCOL
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Mission & Problem Brief */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          {/* Handwritten Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBE4D5] border-2 border-[#2D2A26] rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2D2A26]">
            <span className="w-2 h-2 rounded-full bg-[#C85A32]"></span>
            <span>Design Challenge • Problem 5</span>
          </div>

          <h1 className="font-craft text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D2A26] leading-[1.1] tracking-tight">
            Stop Throwing Away 
            <span className="relative inline-block mx-2 text-[#C85A32]">
              Single-Use
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="#C85A32" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            Campus Cups.
          </h1>

          <p className="text-base sm:text-lg text-[#554F47] leading-relaxed max-w-2xl font-normal">
            A handcrafted, reward-powered reusable packaging system for universities and local cafeterias. 
            Students borrow double-wall tumblers and bento boxes with their student ID, drop them in smart return bins, and earn instant points for free chai, warm lunches, and eco-perks.
          </p>

          {/* Key Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="paper-card-sm p-3 rounded-xl bg-[#FAF0D7]/60">
              <span className="font-hand text-lg text-[#7A5B18] font-bold block">1. Borrow Free</span>
              <p className="text-xs text-[#524B40] mt-0.5">Zero deposit, just flash student ID at the canteen counter.</p>
            </div>
            <div className="paper-card-sm p-3 rounded-xl bg-[#E8EFE5]/70">
              <span className="font-hand text-lg text-[#2D5A27] font-bold block">2. Drop & Scan</span>
              <p className="text-xs text-[#455242] mt-0.5">Return unwashed at any bin across 8 campus buildings.</p>
            </div>
            <div className="paper-card-sm p-3 rounded-xl bg-[#F8E5DF]/70">
              <span className="font-hand text-lg text-[#C85A32] font-bold block">3. Earn Rewards</span>
              <p className="text-xs text-[#5C453E] mt-0.5">Earn +15 points per drop. Redeem for canteen meals & chai.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onExplorePrototype}
              className="paper-btn bg-[#2D5A27] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#2D2A26]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Test Live Prototype</span>
            </button>

            <button
              onClick={onOpenDatabase}
              className="paper-btn bg-[#FFFFFF] text-[#2D2A26] font-bold text-sm sm:text-base px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#2D2A26]"
            >
              <Database className="w-4 h-4 text-[#7A5B18]" />
              <span>View 3-Table Database</span>
            </button>

            <button
              onClick={onOpenPrintTag}
              className="paper-btn bg-[#FAF0D7] text-[#2D2A26] font-bold text-sm px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#2D2A26]"
            >
              <Tag className="w-4 h-4 text-[#C85A32]" />
              <span>Print Container QR Tag</span>
            </button>
          </div>

        </div>

        {/* Right Column: Handcrafted Blueprint Card */}
        <div className="lg:col-span-5">
          <div className="relative paper-card rounded-2xl p-6 bg-[#FFFFFF] text-left transform rotate-1 hover:rotate-0 transition-transform">
            
            {/* Washi tape decoration */}
            <div className="washi-tape washi-tape-green"></div>

            <div className="flex items-center justify-between border-b-2 border-dashed border-[#DDD5C5] pb-3 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5B18] bg-[#FAF0D7] px-2 py-0.5 rounded border border-[#7A5B18]/30">
                  Design Engineering Brief
                </span>
                <h3 className="font-craft text-xl font-bold text-[#2D2A26] mt-1">Problem 5 Blueprint</h3>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#2D2A26] bg-[#2D5A27]/10 flex items-center justify-center">
                <span className="text-xl">⚗️</span>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-[#4A453E]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2D2A26]">Mind Mapping Habits:</span>
                  <p className="text-xs text-[#6B6358] mt-0.5">Identified 4 campus friction zones (morning caffeine, lunch trays, PET bottles, hostel deliveries).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2D2A26]">SCAMPER Redesign:</span>
                  <p className="text-xs text-[#6B6358] mt-0.5">Substituted paper cups with 304 stainless; adapted the library book return checkout model.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2D2A26]">Simplicity Guarantee:</span>
                  <p className="text-xs text-[#6B6358] mt-0.5">Zero overengineering. Just 3 clean tables: <code className="bg-[#F0ECE1] px-1 py-0.5 rounded text-[11px] font-code">users</code>, <code className="bg-[#F0ECE1] px-1 py-0.5 rounded text-[11px] font-code">rewards</code>, <code className="bg-[#F0ECE1] px-1 py-0.5 rounded text-[11px] font-code">transactions</code>.</p>
                </div>
              </div>
            </div>

            {/* Sticky Note Footer inside Card */}
            <div className="mt-5 p-3.5 bg-[#FFF9D6] border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26] -rotate-1">
              <span className="font-hand text-base text-[#6B521E] font-bold block leading-snug">
                "Students don't hate sustainability — they hate inconvenience. Make returning a cup faster and more rewarding than binning it."
              </span>
              <span className="text-[11px] font-code text-[#8C7030] block mt-1 text-right">— Campus Design Sprint 2026</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

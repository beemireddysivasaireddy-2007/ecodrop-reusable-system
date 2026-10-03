import React from 'react';
import { Leaf, Award, QrCode, Database, Sparkles, Compass } from 'lucide-react';

export default function Navbar({ pointsBalance, onOpenScanner, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6ED]/90 backdrop-blur-md border-b-2 border-[#2D2A26] px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand Stamp */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#2D5A27] text-[#FAF6ED] rounded-xl flex items-center justify-center border-2 border-[#2D2A26] shadow-[2px_2px_0px_#2D2A26] transform -rotate-2">
            <Leaf className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-craft text-2xl font-bold tracking-tight text-[#2D2A26]">EcoDrop</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E5A93C] text-[#2D2A26] px-2 py-0.5 rounded border border-[#2D2A26] shadow-[1px_1px_0px_#2D2A26]">
                Problem 5
              </span>
            </div>
            <p className="font-hand text-sm text-[#6B6358] -mt-1">
              Handcrafted Campus Reusable & Reward Network
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Artisanal Notebook Tabs) */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {[
            { id: 'prototype', label: 'Live Prototype', icon: QrCode },
            { id: 'mindmap', label: 'Mind Map', icon: Compass },
            { id: 'scamper', label: 'SCAMPER Lab', icon: Sparkles },
            { id: 'database', label: '3-Table Database', icon: Database },
            { id: 'impact', label: 'Campus Impact', icon: Award },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-[#2D2A26] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2D5A27] text-[#FAF6ED] shadow-[2px_2px_0px_#2D2A26] -translate-y-0.5'
                    : 'bg-[#FFFFFF] text-[#2D2A26] hover:bg-[#F2ECE0] shadow-[1px_1px_0px_#2D2A26]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Points & Action */}
        <div className="flex items-center gap-3">
          <div className="bg-[#FAF0D7] border-2 border-[#2D2A26] rounded-xl px-3 py-1 shadow-[2px_2px_0px_#2D2A26] flex items-center gap-2">
            <span className="text-xs font-bold text-[#7A5B18] uppercase tracking-wide">Points</span>
            <div className="flex items-center gap-1 font-code font-bold text-[#2D2A26] text-base">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse"></span>
              {pointsBalance} pts
            </div>
          </div>

          <button
            onClick={onOpenScanner}
            className="paper-btn bg-[#C85A32] text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#2D2A26]"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Station</span>
          </button>
        </div>

      </div>
    </header>
  );
}

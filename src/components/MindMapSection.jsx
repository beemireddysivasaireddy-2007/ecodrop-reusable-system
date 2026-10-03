import React, { useState } from 'react';
import { MIND_MAP_DATA } from '../data/mockData';
import { Coffee, UtensilsCrossed, Droplets, Package, Compass, AlertCircle, Sparkles, Clock, ArrowRight } from 'lucide-react';

const iconMap = {
  Coffee: Coffee,
  UtensilsCrossed: UtensilsCrossed,
  Droplets: Droplets,
  Package: Package
};

export default function MindMapSection() {
  const [activeNodeId, setActiveNodeId] = useState(MIND_MAP_DATA.nodes[0].id);

  const selectedNode = MIND_MAP_DATA.nodes.find(n => n.id === activeNodeId) || MIND_MAP_DATA.nodes[0];

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF0D7] border-2 border-[#2D2A26] rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2D2A26]">
            <Compass className="w-3.5 h-3.5 text-[#7A5B18]" />
            <span>Habit Research Mind Map</span>
          </div>
          <h2 className="font-craft text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2">
            Dissecting Campus Plastic Habits
          </h2>
          <p className="text-sm sm:text-base text-[#615B52] mt-1 max-w-2xl">
            Where and why does single-use plastic slip into a student's daily routine? Click any time node below to explore root causes and behavioral interventions.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border-2 border-[#2D2A26] p-3 rounded-xl shadow-[3px_3px_0px_#2D2A26] flex items-center gap-3">
          <div className="text-2xl">☕</div>
          <div>
            <span className="font-code text-xs text-[#7A5B18] font-bold block">Campus Daily Waste</span>
            <span className="font-craft text-lg font-bold text-[#2D2A26]">2,300+ Disposables/Day</span>
          </div>
        </div>
      </div>

      {/* Mind Map Interactive Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Time Nodes (Timeline Mind Map) */}
        <div className="lg:col-span-5 space-y-3">
          <p className="font-hand text-lg text-[#7A5B18] font-bold">
            Select a touchpoint to inspect:
          </p>
          
          <div className="space-y-3">
            {MIND_MAP_DATA.nodes.map((node) => {
              const Icon = iconMap[node.icon] || Coffee;
              const isSelected = activeNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-4 rounded-xl border-2 border-[#2D2A26] cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FFFFFF] shadow-[5px_5px_0px_#2D2A26] -translate-x-1'
                      : 'bg-[#F5EFE3] hover:bg-[#FFFFFF] shadow-[2px_2px_0px_#2D2A26] opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-[#2D2A26] flex items-center justify-center text-white"
                        style={{ backgroundColor: node.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-code text-xs font-bold text-[#7A5B18] bg-[#FAF0D7] px-2 py-0.5 rounded border border-[#2D2A26]">
                            {node.time}
                          </span>
                          <span className="font-craft font-bold text-base text-[#2D2A26]">{node.phase}</span>
                        </div>
                        <p className="text-xs text-[#5E584F] mt-0.5 font-medium">{node.item}</p>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#2D5A27] translate-x-1' : 'text-[#8C8476]'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-[#FAF0D7]/60 border-2 border-dashed border-[#2D2A26] rounded-xl text-xs text-[#52493D]">
            💡 <strong>Key Finding:</strong> 87% of students don't want to carry bulky reusable lunchboxes because cleaning them with campus bathroom cold water is inconvenient. Centralized canteen sanitation is essential!
          </div>
        </div>

        {/* Right: Detailed Deep Dive Card */}
        <div className="lg:col-span-7">
          <div className="relative paper-card rounded-2xl p-6 sm:p-8 bg-[#FFFFFF]">
            
            {/* Washi Tape */}
            <div className="washi-tape washi-tape-coral"></div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[#DDD5C5] pb-4 mb-5">
              <div>
                <span className="text-xs font-code font-bold uppercase tracking-wider bg-[#FAF0D7] text-[#7A5B18] px-2.5 py-1 rounded border border-[#2D2A26]">
                  Touchpoint Analysis • {selectedNode.time}
                </span>
                <h3 className="font-craft text-2xl font-bold text-[#2D2A26] mt-2">
                  {selectedNode.phase}
                </h3>
                <p className="text-sm font-medium text-[#C85A32] mt-0.5">{selectedNode.item}</p>
              </div>

              <div className="bg-[#F8EFE4] border-2 border-[#2D2A26] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#2D2A26]">
                <span className="text-[10px] font-bold uppercase text-[#736B5F] block">Campus Volume</span>
                <span className="font-code font-bold text-sm text-[#2D2A26]">{selectedNode.volume}</span>
              </div>
            </div>

            {/* Habit Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Friction & Material Failure */}
              <div className="p-4 rounded-xl bg-[#FFF6F3] border-2 border-[#2D2A26] shadow-[2px_2px_0px_#2D2A26]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-[#C85A32]" />
                  <span className="font-craft font-bold text-sm text-[#C85A32]">Material Failure & Friction</span>
                </div>
                <p className="text-xs sm:text-sm text-[#52433D] leading-relaxed">
                  {selectedNode.painPoint}
                </p>
              </div>

              {/* Behavioral Psychology */}
              <div className="p-4 rounded-xl bg-[#FAF6EC] border-2 border-[#2D2A26] shadow-[2px_2px_0px_#2D2A26]">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#7A5B18]" />
                  <span className="font-craft font-bold text-sm text-[#7A5B18]">Psychological Driver</span>
                </div>
                <p className="text-xs sm:text-sm text-[#575043] leading-relaxed">
                  {selectedNode.psychology}
                </p>
              </div>

            </div>

            {/* The EcoDrop Redesign Fix */}
            <div className="mt-5 p-5 bg-[#EBF3E8] border-2 border-[#2D2A26] rounded-xl shadow-[3px_3px_0px_#2D2A26]">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#2D5A27]" />
                <span className="font-craft font-bold text-base text-[#2D5A27]">
                  The EcoDrop Solution
                </span>
                <span className="text-[10px] uppercase font-bold bg-[#2D5A27] text-white px-2 py-0.5 rounded ml-auto">
                  Prototype Live
                </span>
              </div>
              <p className="text-sm text-[#2C3829] leading-relaxed font-medium">
                {selectedNode.solution}
              </p>
            </div>

            {/* Hand-drawn note */}
            <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex items-center justify-between text-xs text-[#7A7264]">
              <span className="font-hand text-base text-[#4A4337]">
                ✍️ "Eliminate the chore of washing; make returning a zero-guilt game."
              </span>
              <span className="font-code text-[11px]">Field Note #04</span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

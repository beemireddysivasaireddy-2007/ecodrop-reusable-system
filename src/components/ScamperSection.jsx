import React, { useState } from 'react';
import { SCAMPER_ITEMS } from '../data/mockData';
import { Sparkles, CheckCircle2, ChevronRight, Layers, Lightbulb } from 'lucide-react';

export default function ScamperSection() {
  const [selectedLetter, setSelectedLetter] = useState(SCAMPER_ITEMS[0].letter);

  const activeItem = SCAMPER_ITEMS.find(item => item.letter === selectedLetter) || SCAMPER_ITEMS[0];

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8E5DF] border-2 border-[#2D2A26] rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2D2A26]">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Design Thinking Framework</span>
          </div>
          <h2 className="font-craft text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2">
            The SCAMPER Redesign Lab
          </h2>
          <p className="text-sm sm:text-base text-[#615B52] mt-1 max-w-2xl">
            Applying the 7 creative triggers to transform flimsy disposable packaging into a beloved, circular campus service.
          </p>
        </div>

        <div className="bg-[#FAF0D7] border-2 border-[#2D2A26] px-4 py-2 rounded-xl shadow-[3px_3px_0px_#2D2A26] flex items-center gap-2">
          <span className="font-hand text-xl font-bold text-[#7A5B18]">7 Creative Levers</span>
        </div>
      </div>

      {/* SCAMPER Letter Selector Tabs */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
        {SCAMPER_ITEMS.map((item) => {
          const isSelected = selectedLetter === item.letter;
          return (
            <button
              key={item.letter}
              onClick={() => setSelectedLetter(item.letter)}
              className={`p-3 rounded-xl border-2 border-[#2D2A26] flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2D5A27] text-white shadow-[4px_4px_0px_#2D2A26] -translate-y-1'
                  : 'bg-[#FFFFFF] text-[#2D2A26] hover:bg-[#F2ECE0] shadow-[2px_2px_0px_#2D2A26]'
              }`}
            >
              <span className="font-craft font-black text-2xl sm:text-3xl leading-none">
                {item.letter}
              </span>
              <span className={`text-[10px] sm:text-xs font-bold mt-1 tracking-tight truncate max-w-full ${isSelected ? 'text-[#FAF6ED]' : 'text-[#6E6659]'}`}>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main SCAMPER Feature Card */}
      <div className="paper-card rounded-2xl p-6 sm:p-10 bg-[#FFFFFF] relative">
        <div className="washi-tape washi-tape-green"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Big Letter & Category */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-[#FAF6ED] border-2 border-[#2D2A26] rounded-2xl shadow-[3px_3px_0px_#2D2A26]">
            <div className="w-20 h-20 bg-[#C85A32] text-white rounded-2xl border-2 border-[#2D2A26] shadow-[3px_3px_0px_#2D2A26] flex items-center justify-center font-craft font-black text-5xl">
              {activeItem.letter}
            </div>
            <h3 className="font-craft text-2xl font-bold text-[#2D2A26] mt-3">
              {activeItem.title}
            </h3>
            <span className="inline-block mt-1 text-xs font-code font-bold uppercase bg-[#EAE2D2] text-[#594E3F] px-2.5 py-0.5 rounded border border-[#2D2A26]">
              {activeItem.tag}
            </span>
            <div className="mt-4 pt-4 border-t-2 border-dashed border-[#DCD3C1] w-full text-xs text-[#6B6152] font-medium">
              Trigger Strategy: How can this axis eliminate single-use waste?
            </div>
          </div>

          {/* Details & Innovation Angle */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase text-[#7A5B18] tracking-wider block">
                The Core Intervention
              </span>
              <h4 className="font-craft text-2xl sm:text-3xl font-bold text-[#2D2A26] mt-1 leading-snug">
                {activeItem.concept}
              </h4>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F2E7] border-2 border-[#2D2A26]">
              <p className="text-sm sm:text-base text-[#474034] leading-relaxed">
                {activeItem.details}
              </p>
            </div>

            {/* Measurable Impact Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#EAF2E7] border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0" />
                <div>
                  <span className="text-xs font-bold uppercase text-[#2D5A27] block">Design Outcome</span>
                  <span className="text-sm font-bold text-[#1E3F20]">{activeItem.impact}</span>
                </div>
              </div>
              <div className="rubber-stamp-green text-[10px] shrink-0 self-start sm:self-center">
                CAMPUS TESTED
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-hand text-lg text-[#6E6352]">
                Tip: Combine with the student wallet for automatic loyalty points!
              </span>
              <span className="text-xs font-code text-[#877E70]">SCAMPER Method #5</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

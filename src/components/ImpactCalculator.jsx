import React, { useState } from 'react';
import { Award, Users, Calendar, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

export default function ImpactCalculator() {
  const [studentCount, setStudentCount] = useState(650);
  const [daysCount, setDaysCount] = useState(45);
  const [itemsPerDay, setItemsPerDay] = useState(2);

  // Calculations
  const totalItemsDiverted = studentCount * daysCount * itemsPerDay;
  const kgPlasticSaved = Math.round(totalItemsDiverted * 0.025); // ~25g per cup/box
  const co2KgSaved = Math.round(totalItemsDiverted * 0.06); // ~60g CO2 per plastic item
  const rupeesSavedCanteen = Math.round(totalItemsDiverted * 3.5); // ~₹3.50 per packaging unit

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF0D7] border-2 border-[#2D2A26] rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2D2A26]">
            <Award className="w-3.5 h-3.5 text-[#7A5B18]" />
            <span>Community Metric Modeler</span>
          </div>
          <h2 className="font-craft text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2">
            Campus Scale Impact Calculator
          </h2>
          <p className="text-sm sm:text-base text-[#615B52] mt-1 max-w-2xl">
            See the compounding mathematical effect when students adopt EcoDrop across a university semester or residential community.
          </p>
        </div>

        <div className="rubber-stamp">
          PROVEN RETENTION
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Sliders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="paper-card rounded-2xl p-6 bg-[#FFFFFF]">
            <h3 className="font-craft text-xl font-bold text-[#2D2A26] mb-5 border-b-2 border-dashed border-[#DDD5C5] pb-2">
              Adjust Campus Variables
            </h3>

            {/* Slider 1: Students */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#554D41] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#2D5A27]" />
                  Active Students Participating
                </span>
                <span className="font-code text-sm text-[#2D5A27] bg-[#EBF3E8] px-2 py-0.5 rounded border border-[#2D2A26]">
                  {studentCount.toLocaleString()} students
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full accent-[#2D5A27] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-code text-[#827869]">
                <span>50</span>
                <span>1,500</span>
                <span>3,000</span>
              </div>
            </div>

            {/* Slider 2: Days */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#554D41] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C85A32]" />
                  Semester Duration (Days)
                </span>
                <span className="font-code text-sm text-[#C85A32] bg-[#F8E5DF] px-2 py-0.5 rounded border border-[#2D2A26]">
                  {daysCount} days
                </span>
              </div>
              <input
                type="range"
                min="7"
                max="180"
                step="7"
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full accent-[#C85A32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-code text-[#827869]">
                <span>1 week</span>
                <span>90 days</span>
                <span>Semester (180d)</span>
              </div>
            </div>

            {/* Slider 3: Items per Day */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#554D41]">Replaced Disposables / Student / Day</span>
                <span className="font-code text-sm text-[#7A5B18] bg-[#FAF0D7] px-2 py-0.5 rounded border border-[#2D2A26]">
                  {itemsPerDay} items
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setItemsPerDay(num)}
                    className={`py-2 rounded-lg border-2 border-[#2D2A26] font-code text-xs font-bold cursor-pointer transition-all ${
                      itemsPerDay === num
                        ? 'bg-[#2D5A27] text-white shadow-[2px_2px_0px_#2D2A26] -translate-y-0.5'
                        : 'bg-[#FAF6ED] text-[#2D2A26] hover:bg-white shadow-[1px_1px_0px_#2D2A26]'
                    }`}
                  >
                    {num} {num === 1 ? 'item' : 'items'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-3 bg-[#FAF0D7]/60 border-2 border-dashed border-[#2D2A26] rounded-xl text-xs text-[#52493D]">
              🌿 <strong>Insight:</strong> Just replacing 1 morning coffee cup and 1 lunch takeaway box achieves 100+ items saved per student each semester.
            </div>

          </div>
        </div>

        {/* Right: Big Impact Board */}
        <div className="lg:col-span-7">
          <div className="paper-card rounded-2xl p-6 sm:p-8 bg-[#FFFFFF] relative">
            <div className="washi-tape washi-tape-green"></div>

            <span className="text-xs font-code font-bold uppercase text-[#7A5B18] tracking-wider block">
              Cumulative Environmental Dividends
            </span>
            <h3 className="font-craft text-2xl sm:text-3xl font-bold text-[#2D2A26] mt-1 mb-6">
              Tangible Footprint Averted
            </h3>

            {/* Big 4 Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat 1: Single Use Prevented */}
              <div className="p-5 bg-[#FAF6EC] border-2 border-[#2D2A26] rounded-2xl shadow-[3px_3px_0px_#2D2A26]">
                <span className="text-xs font-bold uppercase text-[#7A5B18] block">Disposables Prevented</span>
                <span className="font-code font-black text-3xl sm:text-4xl text-[#2D2A26] block my-1">
                  {totalItemsDiverted.toLocaleString()}
                </span>
                <p className="text-xs text-[#6B6152]">Single-use cups, lids & bento boxes kept out of landfills.</p>
              </div>

              {/* Stat 2: Plastic Mass */}
              <div className="p-5 bg-[#EBF3E8] border-2 border-[#2D2A26] rounded-2xl shadow-[3px_3px_0px_#2D2A26]">
                <span className="text-xs font-bold uppercase text-[#2D5A27] block">Solid Plastic Saved</span>
                <span className="font-code font-black text-3xl sm:text-4xl text-[#2D5A27] block my-1">
                  {kgPlasticSaved.toLocaleString()} kg
                </span>
                <p className="text-xs text-[#3E523A]">Equivalent to ~{(kgPlasticSaved * 2.2).toFixed(0)} lbs of non-biodegradable polymers.</p>
              </div>

              {/* Stat 3: CO2 Averted */}
              <div className="p-5 bg-[#F8E5DF] border-2 border-[#2D2A26] rounded-2xl shadow-[3px_3px_0px_#2D2A26]">
                <span className="text-xs font-bold uppercase text-[#C85A32] block">Emissions Avoided</span>
                <span className="font-code font-black text-3xl sm:text-4xl text-[#C85A32] block my-1">
                  {co2KgSaved.toLocaleString()} kg CO₂
                </span>
                <p className="text-xs text-[#61453E]">Equal to taking {Math.round(co2KgSaved / 400)} petrol cars off campus for a month.</p>
              </div>

              {/* Stat 4: Canteen Savings */}
              <div className="p-5 bg-[#FFF9E6] border-2 border-[#2D2A26] rounded-2xl shadow-[3px_3px_0px_#2D2A26]">
                <span className="text-xs font-bold uppercase text-[#7A5B18] block">Canteen Packaging Savings</span>
                <span className="font-code font-black text-3xl sm:text-4xl text-[#7A5B18] block my-1">
                  ₹{rupeesSavedCanteen.toLocaleString()}
                </span>
                <p className="text-xs text-[#635742]">Procurement funds re-invested into fresher organic produce!</p>
              </div>

            </div>

            {/* Campus Testimonial stamp */}
            <div className="mt-6 pt-4 border-t border-[#E0D8C8] flex items-center justify-between">
              <span className="font-hand text-lg text-[#52493D]">
                🌱 "A circular campus is cheaper, cleaner, and healthier for all."
              </span>
              <div className="rubber-stamp-green text-[10px]">
                HIGH ROI DESIGN
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

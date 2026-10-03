import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Printer, Tag, Sparkles, Check } from 'lucide-react';

export default function PrintableTagModal({ isOpen, onClose }) {
  const [containerId, setContainerId] = useState("CUP-502");
  const [containerType, setContainerType] = useState("Thermal Tumbler");

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="paper-card max-w-lg w-full bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <div className="washi-tape washi-tape-green"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border-2 border-[#2D2A26] bg-[#FAF6ED] hover:bg-[#EAE2D2] cursor-pointer"
        >
          <X className="w-4 h-4 text-[#2D2A26]" />
        </button>

        <div className="text-left mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAF0D7] border border-[#2D2A26] rounded text-[11px] font-bold uppercase text-[#7A5B18]">
            <Tag className="w-3 h-3" />
            <span>Physical Prototype Asset</span>
          </div>
          <h3 className="font-craft text-2xl font-bold text-[#2D2A26] mt-2">
            Printable Container ID Sticker
          </h3>
          <p className="text-xs text-[#6B6358] mt-1">
            Print this tag on vinyl or paper sticker stock to attach to a physical tumbler or lunchbox for your demonstration!
          </p>
        </div>

        {/* Customization Inputs */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-left">
          <div>
            <label className="text-[11px] font-bold uppercase text-[#544D42] block mb-1">Container Tag ID</label>
            <input
              type="text"
              value={containerId}
              onChange={(e) => setContainerId(e.target.value.toUpperCase())}
              className="w-full font-code text-xs p-2 rounded-lg border-2 border-[#2D2A26] bg-[#FAF6ED] focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase text-[#544D42] block mb-1">Item Category</label>
            <input
              type="text"
              value={containerType}
              onChange={(e) => setContainerType(e.target.value)}
              className="w-full font-craft text-xs p-2 rounded-lg border-2 border-[#2D2A26] bg-[#FAF6ED] focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Printable Sticker Mockup */}
        <div id="printable-sticker-area" className="p-6 bg-[#FAF6ED] border-2 border-dashed border-[#2D2A26] rounded-2xl flex flex-col items-center text-center shadow-[3px_3px_0px_#2D2A26] my-2">
          
          <div className="flex items-center justify-between w-full border-b-2 border-[#2D2A26] pb-2 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🌱</span>
              <span className="font-craft font-bold text-sm text-[#2D2A26]">EcoDrop Network</span>
            </div>
            <span className="rubber-stamp-green text-[9px]">CAMPUS PROPERTY</span>
          </div>

          <div className="bg-white p-3 border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26] mb-3">
            <QRCodeSVG value={`ECODROP:CONTAINER:${containerId}:${containerType}`} size={120} level="H" />
          </div>

          <span className="font-code font-black text-xl text-[#2D2A26] tracking-wider">
            {containerId}
          </span>
          <span className="font-craft font-bold text-sm text-[#7A5B18] mt-0.5">
            {containerType}
          </span>

          <div className="mt-3 pt-3 border-t border-dashed border-[#DDD5C5] w-full text-[11px] text-[#554D41] space-y-0.5">
            <p className="font-bold">♻️ Drop at any campus crate after dining</p>
            <p>Earns <strong>+15 EcoPoints</strong> directly to your student ID</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex-1 paper-btn bg-[#2D5A27] text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#2D2A26]"
          >
            <Printer className="w-4 h-4" />
            <span>Print Sticker Tag</span>
          </button>

          <button
            onClick={onClose}
            className="paper-btn bg-[#FAF6ED] text-[#2D2A26] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

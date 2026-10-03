import React, { useState } from 'react';
import { X, QrCode, Camera, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [scanning, setScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = (type, id, points) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanSuccess(type, id, points);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="paper-card max-w-md w-full bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 relative">
        <div className="washi-tape washi-tape-coral"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border-2 border-[#2D2A26] bg-[#FAF6ED] hover:bg-[#EAE2D2] cursor-pointer"
        >
          <X className="w-4 h-4 text-[#2D2A26]" />
        </button>

        <div className="text-center mb-4 pt-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FAF0D7] border border-[#2D2A26] rounded text-[10px] font-bold uppercase text-[#7A5B18]">
            <Camera className="w-3 h-3" />
            <span>Interactive Camera Viewfinder</span>
          </div>
          <h3 className="font-craft text-2xl font-bold text-[#2D2A26] mt-2">
            Scan EcoDrop Code
          </h3>
          <p className="text-xs text-[#6B6358] mt-1">
            Aim camera at the QR code etched on the bottom of your tumbler or at the return station drop-hatch.
          </p>
        </div>

        {/* Viewfinder Mockup */}
        <div className="relative w-64 h-64 mx-auto my-4 bg-[#23201D] border-4 border-[#2D2A26] rounded-2xl overflow-hidden flex items-center justify-center shadow-[4px_4px_0px_#2D2A26]">
          {/* Target Corners */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-[#E5A93C] rounded-tl-lg"></div>
          <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-[#E5A93C] rounded-tr-lg"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-[#E5A93C] rounded-bl-lg"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-[#E5A93C] rounded-br-lg"></div>

          {/* Animated Red Laser Scan Line */}
          <div className="absolute inset-x-4 h-0.5 bg-[#C85A32] shadow-[0_0_8px_#C85A32] animate-bounce"></div>

          <div className="text-center text-white/70">
            <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <span className="font-code text-xs text-white/80">
              {scanning ? "Reading QR Payload..." : "Ready to scan"}
            </span>
          </div>
        </div>

        {/* Quick Simulation Buttons */}
        <div className="space-y-2 mt-4 text-left">
          <span className="text-[11px] font-bold uppercase text-[#7A5B18] block">
            Click to simulate scanning target:
          </span>

          <button
            onClick={() => handleSimulateScan("RETURN_CONTAINER", "CUP-402", 15)}
            disabled={scanning}
            className="w-full p-2.5 bg-[#FAF6ED] hover:bg-[#EBF3E8] border-2 border-[#2D2A26] rounded-xl flex items-center justify-between text-xs font-bold cursor-pointer transition-all shadow-[2px_2px_0px_#2D2A26]"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">☕</span>
              <span>Tumbler #CUP-402 (Return to Crate)</span>
            </div>
            <span className="font-code text-[#2D5A27]">+15 pts</span>
          </button>

          <button
            onClick={() => handleSimulateScan("RETURN_CONTAINER", "BOX-108", 20)}
            disabled={scanning}
            className="w-full p-2.5 bg-[#FAF6ED] hover:bg-[#EBF3E8] border-2 border-[#2D2A26] rounded-xl flex items-center justify-between text-xs font-bold cursor-pointer transition-all shadow-[2px_2px_0px_#2D2A26]"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🍱</span>
              <span>Bento Box #BOX-108 (Return to Crate)</span>
            </div>
            <span className="font-code text-[#2D5A27]">+20 pts</span>
          </button>

          <button
            onClick={() => handleSimulateScan("REFILL_WATER", "BYO-DISPENSER", 5)}
            disabled={scanning}
            className="w-full p-2.5 bg-[#FAF6ED] hover:bg-[#FAF0D7] border-2 border-[#2D2A26] rounded-xl flex items-center justify-between text-xs font-bold cursor-pointer transition-all shadow-[2px_2px_0px_#2D2A26]"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">💧</span>
              <span>Library Chilled Water Dispenser</span>
            </div>
            <span className="font-code text-[#7A5B18]">+5 pts</span>
          </button>
        </div>

      </div>
    </div>
  );
}

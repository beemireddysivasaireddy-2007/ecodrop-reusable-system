import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Coffee, Utensils, Bookmark, BookOpen, QrCode, CheckCircle2, 
  ArrowUpRight, Sparkles, RefreshCw, AlertTriangle, ShieldCheck, Ticket, X
} from 'lucide-react';

const iconMap = {
  Coffee: Coffee,
  Utensils: Utensils,
  Bookmark: Bookmark,
  BookOpen: BookOpen
};

export default function PrototypeStation({ 
  user, 
  setUser, 
  rewards, 
  transactions, 
  setTransactions,
  containers,
  setContainers,
  onOpenScanner
}) {
  const [activeModalVoucher, setActiveModalVoucher] = useState(null);
  const [feedbackNotice, setFeedbackNotice] = useState(null);

  // Trigger confetti celebration
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2D5A27', '#E5A93C', '#C85A32', '#8DA382']
      });
    } catch (e) {
      // fallback
    }
  };

  // Return container action
  const handleReturnContainer = (containerId) => {
    const target = containers.find(c => c.id === containerId);
    if (!target) return;

    const pointsEarned = 15;
    const newPoints = user.points_balance + pointsEarned;
    const newSaved = user.lifetime_saved_plastics + 1;
    const newCo2 = Number((user.co2_saved_kg + 0.15).toFixed(2));

    setUser({
      ...user,
      points_balance: newPoints,
      lifetime_saved_plastics: newSaved,
      co2_saved_kg: newCo2,
      containers_borrowed: Math.max(0, user.containers_borrowed - 1)
    });

    setContainers(containers.map(c => 
      c.id === containerId 
        ? { ...c, status: "RETURNED_IN_BIN", lastLocation: "Canteen Return Crate #1" }
        : c
    ));

    const newTx = {
      id: Date.now(),
      user_id: user.id,
      action_type: "RETURN_CONTAINER",
      container_id: containerId,
      description: `Returned ${target.type} at Canteen Smart Drop Bin`,
      points_changed: +pointsEarned,
      timestamp: "Just now",
      verified: true
    };

    setTransactions([newTx, ...transactions]);
    triggerCelebration();

    setFeedbackNotice({
      type: "success",
      title: `Container ${containerId} Returned!`,
      message: `Earned +${pointsEarned} EcoPoints. Canteen industrial wash station notified.`
    });

    setTimeout(() => setFeedbackNotice(null), 5000);
  };

  // Borrow container action
  const handleBorrowContainer = (containerId) => {
    const target = containers.find(c => c.id === containerId);
    if (!target) return;

    setUser({
      ...user,
      containers_borrowed: user.containers_borrowed + 1
    });

    setContainers(containers.map(c => 
      c.id === containerId 
        ? { ...c, status: "BORROWED_BY_YOU", lastLocation: "Main Cafeteria Counter", borrowedAt: "Just now" }
        : c
    ));

    const newTx = {
      id: Date.now(),
      user_id: user.id,
      action_type: "BORROW_CONTAINER",
      container_id: containerId,
      description: `Checked out ${target.type} with Student ID ${user.student_id}`,
      points_changed: 0,
      timestamp: "Just now",
      verified: true
    };

    setTransactions([newTx, ...transactions]);

    setFeedbackNotice({
      type: "info",
      title: `Borrowed ${target.type}`,
      message: `Zero deposit charged. Enjoy your drink/meal and return to any campus crate!`
    });

    setTimeout(() => setFeedbackNotice(null), 5000);
  };

  // Refill water station action
  const handleWaterRefill = () => {
    const pointsEarned = 5;
    const newPoints = user.points_balance + pointsEarned;
    const newSaved = user.lifetime_saved_plastics + 1;

    setUser({
      ...user,
      points_balance: newPoints,
      lifetime_saved_plastics: newSaved
    });

    const newTx = {
      id: Date.now(),
      user_id: user.id,
      action_type: "REFILL_WATER",
      container_id: "BYO-TUMBLER",
      description: "Chilled Refill Station (Library 2nd Floor)",
      points_changed: +pointsEarned,
      timestamp: "Just now",
      verified: true
    };

    setTransactions([newTx, ...transactions]);
    triggerCelebration();

    setFeedbackNotice({
      type: "success",
      title: "Chilled Refill Logged!",
      message: `+5 EcoPoints earned. 500ml single-use PET bottle averted!`
    });

    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // Redeem reward voucher action
  const handleRedeemReward = (reward) => {
    if (user.points_balance < reward.points_required) {
      setFeedbackNotice({
        type: "warning",
        title: "More Points Needed",
        message: `You need ${reward.points_required - user.points_balance} more points to unlock "${reward.title}". Return a container to earn +15!`
      });
      setTimeout(() => setFeedbackNotice(null), 5000);
      return;
    }

    const newPoints = user.points_balance - reward.points_required;
    setUser({
      ...user,
      points_balance: newPoints
    });

    const voucherCode = `VOUCH-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTx = {
      id: Date.now(),
      user_id: user.id,
      action_type: "REDEEM_REWARD",
      container_id: null,
      description: `Redeemed "${reward.title}" at ${reward.canteen_partner}`,
      points_changed: -reward.points_required,
      timestamp: "Just now",
      verified: true
    };

    setTransactions([newTx, ...transactions]);
    triggerCelebration();

    setActiveModalVoucher({
      reward,
      voucherCode,
      redeemedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      studentId: user.student_id
    });
  };

  const borrowedList = containers.filter(c => c.status === "BORROWED_BY_YOU");
  const availableList = containers.filter(c => c.status !== "BORROWED_BY_YOU");

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto text-left relative">
      
      {/* Toast Notice */}
      {feedbackNotice && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl border-2 border-[#2D2A26] shadow-[4px_4px_0px_#2D2A26] flex items-start gap-3 max-w-md animate-bounce-once ${
          feedbackNotice.type === 'success' 
            ? 'bg-[#EBF3E8] text-[#1E3F20]' 
            : feedbackNotice.type === 'warning'
            ? 'bg-[#FFF2D6] text-[#7A5B18]'
            : 'bg-[#FAF6ED] text-[#2D2A26]'
        }`}>
          <div className="shrink-0 mt-0.5">
            {feedbackNotice.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-[#2D5A27]" /> : <AlertTriangle className="w-5 h-5 text-[#C85A32]" />}
          </div>
          <div>
            <span className="font-craft font-bold text-sm block">{feedbackNotice.title}</span>
            <p className="text-xs mt-0.5">{feedbackNotice.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF0D7] border-2 border-[#2D2A26] rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2D2A26]">
            <QrCode className="w-3.5 h-3.5 text-[#7A5B18]" />
            <span>Interactive Working Prototype</span>
          </div>
          <h2 className="font-craft text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2">
            The EcoDrop Campus Station
          </h2>
          <p className="text-sm sm:text-base text-[#615B52] mt-1 max-w-2xl">
            Simulate the full student experience: borrow containers, scan returns at drop crates, watch your EcoPoints increase, and redeem actual canteen vouchers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenScanner}
            className="paper-btn bg-[#C85A32] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#2D2A26]"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Camera Scanner Simulator</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Student Pass on Left, Station Actions & Rewards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Student Digital Pass Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="paper-card rounded-2xl p-6 bg-[#FFFFFF] relative overflow-hidden">
            <div className="washi-tape washi-tape-coral"></div>

            {/* Pass Header */}
            <div className="flex items-start justify-between border-b-2 border-dashed border-[#DDD5C5] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-code font-bold uppercase tracking-wider bg-[#2D5A27] text-white px-2 py-0.5 rounded">
                  CAMPUS DIGITAL PASS
                </span>
                <h3 className="font-craft text-2xl font-bold text-[#2D2A26] mt-2">
                  {user.name}
                </h3>
                <p className="text-xs font-code text-[#7A5B18] font-bold">ID: {user.student_id}</p>
                <p className="text-xs text-[#6B6358]">{user.major}</p>
              </div>

              {/* QR Code for Student Pass */}
              <div className="p-2 bg-white border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26] flex flex-col items-center">
                <QRCodeSVG value={`STUDENT:${user.student_id}:${user.name}`} size={64} level="M" />
                <span className="text-[9px] font-code font-bold text-[#6B6358] mt-1">TAP ID</span>
              </div>
            </div>

            {/* Points & Stats Dashboard */}
            <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
              <div className="p-2.5 bg-[#FAF0D7] border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26]">
                <span className="text-[10px] font-bold uppercase text-[#7A5B18] block">Balance</span>
                <span className="font-code text-xl font-black text-[#2D2A26]">{user.points_balance}</span>
                <span className="text-[10px] text-[#7A5B18] font-semibold block">pts</span>
              </div>
              <div className="p-2.5 bg-[#EBF3E8] border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26]">
                <span className="text-[10px] font-bold uppercase text-[#2D5A27] block">Plastics</span>
                <span className="font-code text-xl font-black text-[#2D5A27]">{user.lifetime_saved_plastics}</span>
                <span className="text-[10px] text-[#2D5A27] font-semibold block">diverted</span>
              </div>
              <div className="p-2.5 bg-[#F5EFE3] border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26]">
                <span className="text-[10px] font-bold uppercase text-[#544D42] block">CO₂ Cut</span>
                <span className="font-code text-xl font-black text-[#2D2A26]">{user.co2_saved_kg}</span>
                <span className="text-[10px] text-[#544D42] font-semibold block">kg</span>
              </div>
            </div>

            {/* Quick Refill Station Tap */}
            <div className="p-3.5 bg-[#FAF6ED] border-2 border-[#2D2A26] rounded-xl mb-4 flex items-center justify-between">
              <div>
                <span className="font-craft text-sm font-bold text-[#2D2A26] block">B.Y.O. Water Refill</span>
                <span className="text-xs text-[#6B6358]">Fill personal flask at library dispenser</span>
              </div>
              <button
                onClick={handleWaterRefill}
                className="paper-btn bg-[#2D5A27] text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <span>Tap +5 pts</span>
              </button>
            </div>

            {/* Status Stamp */}
            <div className="flex items-center justify-between text-xs text-[#6B6358] pt-1">
              <span className="rubber-stamp text-[10px]">VERIFIED MEMBER</span>
              <span className="font-code text-[11px]">Synced via SQLite</span>
            </div>

          </div>

          {/* Container Currently Held by Student */}
          <div className="paper-card rounded-2xl p-6 bg-[#FFFFFF]">
            <div className="flex items-center justify-between mb-3 border-b-2 border-dashed border-[#DDD5C5] pb-2">
              <h4 className="font-craft text-lg font-bold text-[#2D2A26]">Containers in Hand</h4>
              <span className="text-xs font-code font-bold bg-[#FAF0D7] px-2 py-0.5 rounded border border-[#2D2A26]">
                {borrowedList.length} Active
              </span>
            </div>

            {borrowedList.length > 0 ? (
              <div className="space-y-3">
                {borrowedList.map((cup) => (
                  <div key={cup.id} className="p-4 bg-[#FFF9F3] border-2 border-[#2D2A26] rounded-xl shadow-[2px_2px_0px_#2D2A26]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-code font-bold text-xs text-[#C85A32] bg-[#FAF0D7] px-2 py-0.5 rounded border border-[#2D2A26]">
                            {cup.id}
                          </span>
                          <span className="font-craft font-bold text-base text-[#2D2A26]">{cup.type}</span>
                        </div>
                        <p className="text-xs text-[#5E564C] mt-1">{cup.material} • {cup.capacity}</p>
                        <p className="text-[11px] text-[#7A6C58] mt-0.5">Borrowed: {cup.borrowedAt || "Today"}</p>
                      </div>

                      <div className="p-1.5 bg-white border-2 border-[#2D2A26] rounded-lg shrink-0">
                        <QRCodeSVG value={cup.qrPayload} size={50} level="M" />
                      </div>
                    </div>

                    {/* Return Action Button */}
                    <div className="mt-3 pt-3 border-t-2 border-dashed border-[#E5DAC8] flex items-center justify-between">
                      <span className="text-xs font-hand text-lg text-[#2D5A27] font-bold">
                        Drop in bin = +15 pts!
                      </span>
                      <button
                        onClick={() => handleReturnContainer(cup.id)}
                        className="paper-btn bg-[#2D5A27] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#2D2A26]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Simulate Return</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-[#FAF6ED] border-2 border-dashed border-[#2D2A26] rounded-xl">
                <span className="text-3xl block mb-2">🌱</span>
                <p className="font-craft text-sm font-bold text-[#2D2A26]">No containers currently borrowed</p>
                <p className="text-xs text-[#6B6358] mt-1 mb-3">
                  Check out a fresh tumbler or bento box for your next meal below!
                </p>
              </div>
            )}

            {/* Available to Borrow Section */}
            {availableList.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#DDD5C5]">
                <span className="text-xs font-bold uppercase text-[#7A5B18] block mb-2">Available at Canteen Counter</span>
                <div className="space-y-2">
                  {availableList.map((cup) => (
                    <div key={cup.id} className="p-3 bg-[#FAF6ED] border-2 border-[#2D2A26] rounded-xl flex items-center justify-between gap-2">
                      <div>
                        <span className="font-craft font-bold text-xs text-[#2D2A26]">{cup.type}</span>
                        <span className="text-[11px] text-[#7A6C58] block">{cup.material}</span>
                      </div>
                      <button
                        onClick={() => handleBorrowContainer(cup.id)}
                        className="paper-btn bg-[#FFFFFF] text-[#2D2A26] font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-[#2D2A26] cursor-pointer"
                      >
                        Borrow Free
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Campus Rewards Redemption Market */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="paper-card rounded-2xl p-6 sm:p-8 bg-[#FFFFFF] relative">
            <div className="washi-tape washi-tape-green"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-[#DDD5C5] pb-4 mb-5">
              <div>
                <span className="text-xs font-code font-bold uppercase tracking-wider bg-[#FAF0D7] text-[#7A5B18] px-2.5 py-0.5 rounded border border-[#2D2A26]">
                  Eco-Perks Marketplace
                </span>
                <h3 className="font-craft text-2xl font-bold text-[#2D2A26] mt-2">
                  Redeem Your EcoPoints
                </h3>
              </div>
              <div className="text-xs font-code bg-[#FAF6ED] px-3 py-1.5 rounded-xl border-2 border-[#2D2A26]">
                Your Balance: <strong className="text-[#2D5A27]">{user.points_balance} pts</strong>
              </div>
            </div>

            {/* Rewards Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewards.map((reward) => {
                const Icon = iconMap[reward.icon] || Coffee;
                const canAfford = user.points_balance >= reward.points_required;

                return (
                  <div 
                    key={reward.id} 
                    className="p-4 rounded-xl border-2 border-[#2D2A26] bg-[#FAF6ED] hover:bg-white transition-all shadow-[2px_2px_0px_#2D2A26] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#2D2A26] bg-white text-[#524B40]">
                          {reward.badge}
                        </span>
                        <span className="font-code text-xs font-black text-[#2D5A27] bg-[#EBF3E8] px-2 py-0.5 rounded border border-[#2D2A26]">
                          {reward.points_required} pts
                        </span>
                      </div>

                      <div className="flex items-start gap-3 my-2">
                        <div 
                          className="w-10 h-10 rounded-lg border-2 border-[#2D2A26] flex items-center justify-center text-white shrink-0 shadow-[1px_1px_0px_#2D2A26]"
                          style={{ backgroundColor: reward.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-craft font-bold text-base text-[#2D2A26] leading-snug">
                            {reward.title}
                          </h4>
                          <span className="text-xs text-[#7A5B18] font-semibold block mt-0.5">
                            📍 {reward.canteen_partner}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#5C5448] mt-2 leading-relaxed">
                        {reward.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-dashed border-[#DDD5C5]">
                      <button
                        onClick={() => handleRedeemReward(reward)}
                        className={`w-full paper-btn font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                          canAfford
                            ? 'bg-[#E5A93C] text-[#2D2A26] shadow-[2px_2px_0px_#2D2A26]'
                            : 'bg-[#DDD5C5] text-[#7A7265] border-dashed cursor-not-allowed shadow-none'
                        }`}
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>{canAfford ? `Redeem for ${reward.points_required} pts` : `Need ${reward.points_required - user.points_balance} more pts`}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Return instructions callout */}
            <div className="mt-6 p-4 bg-[#FFF9F3] border-2 border-[#2D2A26] rounded-xl flex items-center gap-3">
              <span className="text-2xl">♻️</span>
              <p className="text-xs text-[#5E5143] leading-relaxed">
                <strong>How canteens verify returns:</strong> Each crate has an NFC/QR reader. When the tumbler drops through the aperture, it automatically logs to the central campus database and awards your account within 1 second.
              </p>
            </div>

          </div>

          {/* Recent Live Activity Stream */}
          <div className="paper-card rounded-2xl p-5 bg-[#FFFFFF]">
            <div className="flex items-center justify-between mb-3 border-b border-[#E0D8C8] pb-2">
              <h4 className="font-craft text-base font-bold text-[#2D2A26]">Live Campus Event Feed</h4>
              <span className="text-xs font-code text-[#7A6C58]">Audited via `transactions` table</span>
            </div>

            <div className="space-y-2">
              {transactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="p-2.5 rounded-lg bg-[#FAF6ED] border border-[#DDD5C5] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${tx.points_changed >= 0 ? 'bg-[#2D5A27]' : 'bg-[#C85A32]'}`}></span>
                    <span className="font-medium text-[#2D2A26]">{tx.description}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-code text-[11px] text-[#7A6C58]">{tx.timestamp}</span>
                    <span className={`font-code font-bold ${tx.points_changed >= 0 ? 'text-[#2D5A27]' : 'text-[#C85A32]'}`}>
                      {tx.points_changed > 0 ? `+${tx.points_changed}` : tx.points_changed === 0 ? '0' : tx.points_changed} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Redeemed Voucher Modal */}
      {activeModalVoucher && (
        <div className="fixed inset-0 z-50 bg-[#2D2A26]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="paper-card max-w-md w-full bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="washi-tape washi-tape-coral"></div>

            <button
              onClick={() => setActiveModalVoucher(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border-2 border-[#2D2A26] bg-[#FAF6ED] hover:bg-[#EAE2D2] cursor-pointer"
            >
              <X className="w-4 h-4 text-[#2D2A26]" />
            </button>

            <div className="text-center pt-2">
              <div className="rubber-stamp mb-3">CANTEEN PASS</div>
              <h3 className="font-craft text-2xl font-bold text-[#2D2A26]">
                {activeModalVoucher.reward.title}
              </h3>
              <p className="text-xs text-[#7A5B18] font-bold mt-1">
                📍 {activeModalVoucher.reward.canteen_partner}
              </p>
            </div>

            {/* Ticket Voucher Body */}
            <div className="my-6 p-4 bg-[#FAF0D7] border-2 border-dashed border-[#2D2A26] rounded-xl flex flex-col items-center text-center">
              <QRCodeSVG 
                value={`ECODROP:VOUCHER:${activeModalVoucher.voucherCode}:${activeModalVoucher.reward.id}:${activeModalVoucher.studentId}`} 
                size={140} 
                level="H" 
              />
              <span className="font-code font-black text-lg text-[#2D2A26] tracking-widest mt-3">
                {activeModalVoucher.voucherCode}
              </span>
              <p className="text-[11px] text-[#695D4A] mt-1">
                Show this barcode to the cashier to claim your drink or discount.
              </p>
            </div>

            <div className="text-xs text-[#6B6358] space-y-1 font-mono text-center border-t border-[#DDD5C5] pt-3">
              <div>Issued to: <strong>{activeModalVoucher.studentId}</strong></div>
              <div>Redeemed At: {activeModalVoucher.redeemedAt}</div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => setActiveModalVoucher(null)}
                className="w-full paper-btn bg-[#2D5A27] text-white font-bold text-sm py-2.5 rounded-xl cursor-pointer shadow-[2px_2px_0px_#2D2A26]"
              >
                Done / Return to App
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

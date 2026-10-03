import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MindMapSection from './components/MindMapSection';
import ScamperSection from './components/ScamperSection';
import PrototypeStation from './components/PrototypeStation';
import DatabaseViewer from './components/DatabaseViewer';
import ImpactCalculator from './components/ImpactCalculator';
import PrintableTagModal from './components/PrintableTagModal';
import ScannerModal from './components/ScannerModal';
import Footer from './components/Footer';
import { 
  INITIAL_USER, 
  INITIAL_CONTAINERS, 
  INITIAL_REWARDS, 
  INITIAL_TRANSACTIONS 
} from './data/mockData';

export default function App() {
  const [user, setUser] = useState(INITIAL_USER);
  const [containers, setContainers] = useState(INITIAL_CONTAINERS);
  const [rewards, setRewards] = useState(INITIAL_REWARDS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('prototype');

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPrintTagOpen, setIsPrintTagOpen] = useState(false);

  // Handle successful QR scan from camera simulator
  const handleScanSuccess = (actionType, itemId, points) => {
    if (actionType === 'RETURN_CONTAINER') {
      const target = containers.find(c => c.id === itemId);
      const cupName = target ? target.type : 'Container';

      setUser(prev => ({
        ...prev,
        points_balance: prev.points_balance + points,
        lifetime_saved_plastics: prev.lifetime_saved_plastics + 1,
        co2_saved_kg: Number((prev.co2_saved_kg + 0.15).toFixed(2)),
        containers_borrowed: Math.max(0, prev.containers_borrowed - 1)
      }));

      setContainers(prev => prev.map(c => 
        c.id === itemId 
          ? { ...c, status: "RETURNED_IN_BIN", lastLocation: "Smart Crate Station" } 
          : c
      ));

      const newTx = {
        id: Date.now(),
        user_id: user.id,
        action_type: "RETURN_CONTAINER",
        container_id: itemId,
        description: `Camera scan verified: returned ${cupName} at Smart Drop Bin`,
        points_changed: +points,
        timestamp: "Just now",
        verified: true
      };

      setTransactions(prev => [newTx, ...prev]);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

    } else if (actionType === 'REFILL_WATER') {
      setUser(prev => ({
        ...prev,
        points_balance: prev.points_balance + points,
        lifetime_saved_plastics: prev.lifetime_saved_plastics + 1
      }));

      const newTx = {
        id: Date.now(),
        user_id: user.id,
        action_type: "REFILL_WATER",
        container_id: "SMART-DISPENSER",
        description: "Scanned QR at Chilled Water Dispenser (Library)",
        points_changed: +points,
        timestamp: "Just now",
        verified: true
      };

      setTransactions(prev => [newTx, ...prev]);

      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] text-[#2D2A26] flex flex-col font-sans notebook-grid selection:bg-[#E5A93C]/40">
      
      {/* Top Artisanal Navbar */}
      <Navbar 
        pointsBalance={user.points_balance}
        onOpenScanner={() => setIsScannerOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onExplorePrototype={() => {
            setActiveTab('prototype');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          onOpenDatabase={() => {
            setActiveTab('database');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          onOpenPrintTag={() => setIsPrintTagOpen(true)}
        />

        {/* Tab Specific Views or All-in-One View */}
        <div className="border-t-2 border-[#2D2A26]/10 pt-4">
          {activeTab === 'prototype' && (
            <PrototypeStation 
              user={user}
              setUser={setUser}
              rewards={rewards}
              transactions={transactions}
              setTransactions={setTransactions}
              containers={containers}
              setContainers={setContainers}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          )}

          {activeTab === 'mindmap' && (
            <MindMapSection />
          )}

          {activeTab === 'scamper' && (
            <ScamperSection />
          )}

          {activeTab === 'database' && (
            <DatabaseViewer 
              user={user}
              rewards={rewards}
              transactions={transactions}
            />
          )}

          {activeTab === 'impact' && (
            <ImpactCalculator />
          )}
        </div>

      </main>

      {/* Footer */}
      <Footer onScrollTop={handleScrollTop} />

      {/* Scanner Simulation Modal */}
      <ScannerModal 
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* Printable Container Tag Modal */}
      <PrintableTagModal 
        isOpen={isPrintTagOpen}
        onClose={() => setIsPrintTagOpen(false)}
      />

    </div>
  );
}

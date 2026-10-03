import React, { useState } from 'react';
import { SQL_SCHEMA } from '../data/mockData';
import { Database, Table, Copy, Check, Terminal, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function DatabaseViewer({ user, rewards, transactions }) {
  const [activeTableTab, setActiveTableTab] = useState('transactions');
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EBF3E8] border-2 border-[#2D2A26] rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2D2A26]">
            <Database className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Clean Architecture • Zero Overengineering</span>
          </div>
          <h2 className="font-craft text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2">
            The 3-Table Database System
          </h2>
          <p className="text-sm sm:text-base text-[#615B52] mt-1 max-w-2xl">
            You don't need distributed microservices, Redis clusters, or dozens of tables. This entire system runs securely on just <strong>3 normalized tables</strong> in SQLite, Supabase, or PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySchema}
            className="paper-btn bg-[#FFFFFF] text-[#2D2A26] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#2D2A26]"
          >
            {copiedSchema ? <Check className="w-4 h-4 text-[#2D5A27]" /> : <Copy className="w-4 h-4 text-[#7A5B18]" />}
            <span>{copiedSchema ? 'SQL Schema Copied!' : 'Copy SQL Schema'}</span>
          </button>
        </div>
      </div>

      {/* Rationale Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-[#FAF0D7]/70 border-2 border-[#2D2A26] rounded-xl shadow-[3px_3px_0px_#2D2A26]">
          <span className="font-code font-bold text-xs text-[#7A5B18] uppercase block">Table 1</span>
          <h4 className="font-craft font-bold text-lg text-[#2D2A26] mt-0.5">users</h4>
          <p className="text-xs text-[#5C5346] mt-1">
            Tracks student identity (<code className="font-code text-[11px] bg-white px-1 py-0.5 rounded border border-[#2D2A26]">student_id</code>) and their running EcoPoints balance.
          </p>
        </div>

        <div className="p-4 bg-[#EBF3E8]/80 border-2 border-[#2D2A26] rounded-xl shadow-[3px_3px_0px_#2D2A26]">
          <span className="font-code font-bold text-xs text-[#2D5A27] uppercase block">Table 2</span>
          <h4 className="font-craft font-bold text-lg text-[#2D2A26] mt-0.5">rewards</h4>
          <p className="text-xs text-[#465442] mt-1">
            Stores catalog of redeemable food/drink vouchers and the points threshold needed.
          </p>
        </div>

        <div className="p-4 bg-[#F8E5DF]/80 border-2 border-[#2D2A26] rounded-xl shadow-[3px_3px_0px_#2D2A26]">
          <span className="font-code font-bold text-xs text-[#C85A32] uppercase block">Table 3</span>
          <h4 className="font-craft font-bold text-lg text-[#2D2A26] mt-0.5">transactions</h4>
          <p className="text-xs text-[#5C4640] mt-1">
            Immutable audit log for every return, borrow, refill, or voucher redemption.
          </p>
        </div>
      </div>

      {/* Main Database Viewer Container */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 bg-[#FFFFFF] relative">
        <div className="washi-tape washi-tape-coral"></div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2D2A26] pb-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'transactions', label: 'transactions (Live Ledger)', count: transactions.length },
              { id: 'users', label: 'users (Student Profiles)', count: 1 },
              { id: 'rewards', label: 'rewards (Catalog)', count: rewards.length },
              { id: 'schema', label: 'SQL DDL Code', count: null },
            ].map((tab) => {
              const isActive = activeTableTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTableTab(tab.id)}
                  className={`text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg border-2 border-[#2D2A26] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2D5A27] text-white shadow-[2px_2px_0px_#2D2A26] -translate-y-0.5'
                      : 'bg-[#FAF6ED] text-[#2D2A26] hover:bg-white shadow-[1px_1px_0px_#2D2A26]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className="ml-1.5 font-code text-[11px] opacity-80">({tab.count})</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-code text-[#7A6C58]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2D5A27] animate-ping"></span>
            <span>Live SQLite State</span>
          </div>
        </div>

        {/* Tab 1: Live Transactions Table */}
        {activeTableTab === 'transactions' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-hand text-lg text-[#7A5B18] font-bold">
                Table: `transactions` — records every borrow, return, and point change
              </span>
              <span className="text-xs font-code text-[#6B6358]">{transactions.length} rows stored</span>
            </div>

            <div className="overflow-x-auto border-2 border-[#2D2A26] rounded-xl shadow-[3px_3px_0px_#2D2A26]">
              <table className="w-full text-left text-xs font-code border-collapse">
                <thead className="bg-[#FAF0D7] border-b-2 border-[#2D2A26] text-[#2D2A26]">
                  <tr>
                    <th className="p-3 border-r border-[#DDD5C5]">id</th>
                    <th className="p-3 border-r border-[#DDD5C5]">user_id</th>
                    <th className="p-3 border-r border-[#DDD5C5]">action_type</th>
                    <th className="p-3 border-r border-[#DDD5C5]">container_id</th>
                    <th className="p-3 border-r border-[#DDD5C5]">points_changed</th>
                    <th className="p-3 border-r border-[#DDD5C5]">description</th>
                    <th className="p-3">timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE2D2] bg-white">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#FAF6ED] transition-colors">
                      <td className="p-3 border-r border-[#EAE2D2] font-bold text-[#7A5B18]">{tx.id}</td>
                      <td className="p-3 border-r border-[#EAE2D2]">{tx.user_id}</td>
                      <td className="p-3 border-r border-[#EAE2D2]">
                        <span className={`px-2 py-0.5 rounded border border-[#2D2A26] text-[10px] font-bold ${
                          tx.action_type === 'RETURN_CONTAINER' 
                            ? 'bg-[#EBF3E8] text-[#1E3F20]' 
                            : tx.action_type === 'REDEEM_REWARD'
                            ? 'bg-[#F8E5DF] text-[#C85A32]'
                            : 'bg-[#FAF0D7] text-[#7A5B18]'
                        }`}>
                          {tx.action_type}
                        </span>
                      </td>
                      <td className="p-3 border-r border-[#EAE2D2] font-semibold text-[#2D2A26]">
                        {tx.container_id || "NULL"}
                      </td>
                      <td className="p-3 border-r border-[#EAE2D2] font-bold">
                        <span className={tx.points_changed > 0 ? 'text-[#2D5A27]' : tx.points_changed < 0 ? 'text-[#C85A32]' : 'text-[#6B6358]'}>
                          {tx.points_changed > 0 ? `+${tx.points_changed}` : tx.points_changed}
                        </span>
                      </td>
                      <td className="p-3 border-r border-[#EAE2D2] text-[#4A453E] max-w-xs truncate">
                        {tx.description}
                      </td>
                      <td className="p-3 text-[#7A6C58]">{tx.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Live SQL Query executed */}
            <div className="mt-4 p-3 bg-[#2D2A26] text-[#FAF6ED] rounded-xl font-code text-xs flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#E5A93C] shrink-0" />
              <span className="text-[#A39988]">Latest Query:</span>
              <span className="text-[#96D69F] truncate">
                INSERT INTO transactions (user_id, action_type, points_changed) VALUES ({user.id}, '{transactions[0]?.action_type}', {transactions[0]?.points_changed});
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Live Users Table */}
        {activeTableTab === 'users' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-hand text-lg text-[#7A5B18] font-bold">
                Table: `users` — stores authenticated campus users & points balances
              </span>
              <span className="text-xs font-code text-[#6B6358]">1 active student</span>
            </div>

            <div className="overflow-x-auto border-2 border-[#2D2A26] rounded-xl shadow-[3px_3px_0px_#2D2A26]">
              <table className="w-full text-left text-xs font-code border-collapse">
                <thead className="bg-[#FAF0D7] border-b-2 border-[#2D2A26] text-[#2D2A26]">
                  <tr>
                    <th className="p-3 border-r border-[#DDD5C5]">id</th>
                    <th className="p-3 border-r border-[#DDD5C5]">student_id</th>
                    <th className="p-3 border-r border-[#DDD5C5]">name</th>
                    <th className="p-3 border-r border-[#DDD5C5]">major</th>
                    <th className="p-3 border-r border-[#DDD5C5]">points_balance</th>
                    <th className="p-3 border-r border-[#DDD5C5]">lifetime_saved</th>
                    <th className="p-3">created_at</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="hover:bg-[#FAF6ED]">
                    <td className="p-3 border-r border-[#EAE2D2] font-bold">{user.id}</td>
                    <td className="p-3 border-r border-[#EAE2D2] font-bold text-[#C85A32]">{user.student_id}</td>
                    <td className="p-3 border-r border-[#EAE2D2] font-semibold">{user.name}</td>
                    <td className="p-3 border-r border-[#EAE2D2] text-[#554D43]">{user.major}</td>
                    <td className="p-3 border-r border-[#EAE2D2]">
                      <span className="bg-[#EBF3E8] text-[#1E3F20] font-bold px-2 py-0.5 rounded border border-[#2D2A26]">
                        {user.points_balance} pts
                      </span>
                    </td>
                    <td className="p-3 border-r border-[#EAE2D2] font-bold text-[#2D5A27]">{user.lifetime_saved_plastics}</td>
                    <td className="p-3 text-[#7A6C58]">2026-10-01 08:30:00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-[#2D2A26] text-[#FAF6ED] rounded-xl font-code text-xs flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#E5A93C] shrink-0" />
              <span className="text-[#A39988]">Update Statement:</span>
              <span className="text-[#96D69F] truncate">
                UPDATE users SET points_balance = {user.points_balance}, lifetime_saved = {user.lifetime_saved_plastics} WHERE id = {user.id};
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Live Rewards Table */}
        {activeTableTab === 'rewards' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-hand text-lg text-[#7A5B18] font-bold">
                Table: `rewards` — canteen discounts & eco perks configuration
              </span>
              <span className="text-xs font-code text-[#6B6358]">{rewards.length} rewards active</span>
            </div>

            <div className="overflow-x-auto border-2 border-[#2D2A26] rounded-xl shadow-[3px_3px_0px_#2D2A26]">
              <table className="w-full text-left text-xs font-code border-collapse">
                <thead className="bg-[#FAF0D7] border-b-2 border-[#2D2A26] text-[#2D2A26]">
                  <tr>
                    <th className="p-3 border-r border-[#DDD5C5]">id</th>
                    <th className="p-3 border-r border-[#DDD5C5]">title</th>
                    <th className="p-3 border-r border-[#DDD5C5]">category</th>
                    <th className="p-3 border-r border-[#DDD5C5]">canteen_partner</th>
                    <th className="p-3 border-r border-[#DDD5C5]">points_required</th>
                    <th className="p-3">is_active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE2D2] bg-white">
                  {rewards.map((r) => (
                    <tr key={r.id} className="hover:bg-[#FAF6ED]">
                      <td className="p-3 border-r border-[#EAE2D2] font-bold text-[#7A5B18]">{r.id}</td>
                      <td className="p-3 border-r border-[#EAE2D2] font-semibold text-[#2D2A26]">{r.title}</td>
                      <td className="p-3 border-r border-[#EAE2D2]">{r.category}</td>
                      <td className="p-3 border-r border-[#EAE2D2]">{r.canteen_partner}</td>
                      <td className="p-3 border-r border-[#EAE2D2] font-bold text-[#2D5A27]">{r.points_required}</td>
                      <td className="p-3 text-[#2D5A27] font-bold">1 (TRUE)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-[#2D2A26] text-[#FAF6ED] rounded-xl font-code text-xs flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#E5A93C] shrink-0" />
              <span className="text-[#A39988]">Select Query:</span>
              <span className="text-[#96D69F] truncate">
                SELECT * FROM rewards WHERE is_active = 1 ORDER BY points_required ASC;
              </span>
            </div>
          </div>
        )}

        {/* Tab 4: SQL DDL Schema */}
        {activeTableTab === 'schema' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-hand text-lg text-[#7A5B18] font-bold">
                Direct SQL Schema (Ready to paste into SQLite or PostgreSQL)
              </span>
              <button
                onClick={handleCopySchema}
                className="text-xs font-bold font-code bg-[#FAF0D7] border border-[#2D2A26] px-2.5 py-1 rounded hover:bg-[#F2ECE0] cursor-pointer"
              >
                {copiedSchema ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <div className="bg-[#23201D] text-[#ECE7DF] p-4 sm:p-6 rounded-xl font-code text-xs sm:text-sm border-2 border-[#2D2A26] shadow-[3px_3px_0px_#2D2A26] overflow-x-auto max-h-96">
              <pre className="leading-relaxed whitespace-pre-wrap">{SQL_SCHEMA}</pre>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-[#DDD5C5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#6B6358]">
          <span className="font-hand text-base text-[#423C32]">
            ⭐ "The best database is the one with zero unnecessary complexity."
          </span>
          <span className="font-code text-[11px]">3 Tables • 1 Foreign Key • 100% Scalable</span>
        </div>

      </div>

    </section>
  );
}

# 🌿 EcoDrop — Handcrafted Reusable Packaging & Reward System
> **Problem 5:** Reducing Plastic Usage in Daily Life  
> *How might we encourage students and local communities to reduce single-use plastic consumption through innovative products or services?*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbeemireddysivasaireddy-2007%2Fecodrop-reusable-system)

---

## 📖 Project Overview

EcoDrop is an artisanal, tactile campus and community reusable container loan & deposit system designed to eliminate single-use plastics from university canteens and local cafeterias without imposing punitive "plastic taxes".

Instead of expecting students to carry greasy personal tupperware or wash containers in dorm sinks, EcoDrop adapts the **library book checkout model**:
1. **Borrow Free:** Flash your student ID at any food counter to receive food/coffee in food-grade thermal stainless tumblers or bio-composite bento boxes.
2. **Drop & Scan:** Return unwashed containers to any smart drop bin across 8 campus buildings.
3. **Earn EcoPoints:** Earn instant points (+15 per drop) to redeem for canteen lunches, fresh chai, and campus perks.

---

## 🔬 Design Engineering Methodology

### 1. Mind Mapping: Campus Plastic Habits
- **08:00 AM — Morning Rush:** Paper coffee cups lined with polyethylene (PE) and polystyrene lids.
- **12:30 PM — Lunch Break:** Styrofoam takeaway trays, single-use plastic forks, sauce sachets.
- **03:30 PM — Hydration:** Single-use PET water bottles and disposable boba cups.
- **07:30 PM — Hostel Deliveries:** Polythene bags and disposable packaging.

### 2. SCAMPER Redesign Matrix
- **S (Substitute):** Single-use PP plastics ➔ Double-wall 304 food-grade stainless steel & commercial dishwasher-safe composites.
- **C (Combine):** Reusable ware + laser-etched permanent QR code + instant student micro-reward wallet.
- **A (Adapt):** University library loan model (zero upfront deposit, free 24h borrowing, multi-building return bins).
- **M (Modify / Magnify):** Leakproof click-lids + campus eco-leaderboard gamification.
- **P (Put to another use):** End-of-life containers ground into 3D-printer filament in university Maker Labs.
- **E (Eliminate):** Remove disposable cups from cafeteria checkout; zero-waste becomes the default.
- **R (Reverse):** Flip the penalty into a reward: instant discount vouchers instead of plastic surcharges.

---

## 🗄️ Non-Overengineered 3-Table Database Design

Built for simplicity, speed, and maintainability (SQLite / PostgreSQL / Supabase):

```sql
-- 1. USERS: Student account & running points
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    major VARCHAR(100),
    points_balance INTEGER DEFAULT 0,
    lifetime_saved INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. REWARDS: Catalog of redeemable vouchers
CREATE TABLE rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    canteen_partner VARCHAR(100) NOT NULL,
    points_required INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT 1
);

-- 3. TRANSACTIONS: Immutable event ledger
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    action_type VARCHAR(30) NOT NULL,
    container_id VARCHAR(50),
    points_changed INTEGER NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Live Demo & Local Setup

### Live Repository:
[GitHub Repository](https://github.com/beemireddysivasaireddy-2007/ecodrop-reusable-system)

### Run Locally:
```bash
git clone https://github.com/beemireddysivasaireddy-2007/ecodrop-reusable-system.git
cd ecodrop-reusable-system
npm install
npm run dev
```

### Deploy to Vercel:
Click the Deploy button above, or run:
```bash
npx vercel
```

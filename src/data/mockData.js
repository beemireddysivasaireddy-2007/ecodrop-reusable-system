export const INITIAL_USER = {
  id: 1,
  student_id: "STU-2026-884",
  name: "Alex Rivera",
  major: "Design & Sustainable Systems",
  points_balance: 65,
  containers_borrowed: 1,
  lifetime_saved_plastics: 24,
  co2_saved_kg: 3.6,
};

export const INITIAL_CONTAINERS = [
  {
    id: "CUP-402",
    type: "Insulated Coffee Tumbler",
    material: "Double-wall 304 Stainless Steel",
    capacity: "350 ml",
    status: "BORROWED_BY_YOU",
    lastLocation: "Central Library Cafe",
    borrowedAt: "Today, 09:15 AM",
    depositFee: "₹0 (Student ID linked)",
    qrPayload: "ECODROP:CONTAINER:CUP-402:CAMPUS_CENTRAL"
  },
  {
    id: "BOX-108",
    type: "Modular Bento Lunchbox",
    material: "Eco-Composite PP + Bamboo Fiber",
    capacity: "850 ml",
    status: "AVAILABLE",
    lastLocation: "Student Center Canteen",
    borrowedAt: null,
    depositFee: "₹0 (Student ID linked)",
    qrPayload: "ECODROP:CONTAINER:BOX-108:CAMPUS_CENTRAL"
  },
  {
    id: "BTL-205",
    type: "Sport Hydration Flask",
    material: "BPA-Free Tritan & Recycled Silicone",
    capacity: "750 ml",
    status: "AVAILABLE",
    lastLocation: "Gym Refill Station",
    borrowedAt: null,
    depositFee: "₹0 (Student ID linked)",
    qrPayload: "ECODROP:CONTAINER:BTL-205:CAMPUS_CENTRAL"
  }
];

export const INITIAL_REWARDS = [
  {
    id: 1,
    title: "Free Organic Chai or Drip Coffee",
    category: "Beverage",
    canteen_partner: "Grounds & Beans Cafe",
    points_required: 50,
    icon: "Coffee",
    badge: "Most Popular",
    color: "#E5A93C",
    description: "Enjoy a freshly brewed artisan coffee or spiced chai in your reusable tumbler."
  },
  {
    id: 2,
    title: "15% Off Any Canteen Warm Lunch",
    category: "Food Discount",
    canteen_partner: "Main Campus Canteen",
    points_required: 75,
    icon: "Utensils",
    badge: "Big Saver",
    color: "#D97746",
    description: "Valid on all meal platters when served in an EcoDrop bento box."
  },
  {
    id: 3,
    title: "Handmade Botanical Seed Bookmark",
    category: "Campus Goods",
    canteen_partner: "Eco Club & Student Store",
    points_required: 30,
    icon: "Bookmark",
    badge: "Zero-Waste",
    color: "#2D5A27",
    description: "Plantable paper bookmark embedded with native wildflower seeds."
  },
  {
    id: 4,
    title: "₹50 Campus Bookstore Voucher",
    category: "Academics",
    canteen_partner: "University Book Depot",
    points_required: 120,
    icon: "BookOpen",
    badge: "Special Perk",
    color: "#8DA382",
    description: "Can be applied to notebooks, stationery, art supplies, or textbook rentals."
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 101,
    user_id: 1,
    action_type: "RETURN_CONTAINER",
    container_id: "CUP-399",
    description: "Returned Coffee Tumbler at Canteen Drop Bin #2",
    points_changed: +15,
    timestamp: "Yesterday, 4:30 PM",
    verified: true
  },
  {
    id: 100,
    user_id: 1,
    action_type: "REFILL_WATER",
    container_id: "BYO-BOTTLE",
    description: "Smart Water Refill Station (Library 2nd Floor)",
    points_changed: +5,
    timestamp: "Yesterday, 11:20 AM",
    verified: true
  },
  {
    id: 99,
    user_id: 1,
    action_type: "REDEEM_REWARD",
    container_id: null,
    description: "Redeemed '15% Off Warm Lunch' Voucher",
    points_changed: -75,
    timestamp: "2 days ago, 1:15 PM",
    verified: true
  },
  {
    id: 98,
    user_id: 1,
    action_type: "RETURN_CONTAINER",
    container_id: "BOX-102",
    description: "Returned Bento Box at Student Union Crate",
    points_changed: +20,
    timestamp: "3 days ago, 2:40 PM",
    verified: true
  }
];

export const MIND_MAP_DATA = {
  center: {
    title: "Daily Student Plastic Footprint",
    subtitle: "Average 4.2 single-use items per student / day",
    tag: "Core Habit Drivers"
  },
  nodes: [
    {
      id: "morning",
      time: "08:00 AM",
      phase: "Morning Caffeine Rush",
      item: "Paper/Plastic Coffee Cups + PS Lids",
      volume: "620 cups / morning / campus",
      painPoint: "Paper cups are coated with poly-laminates (PE) that can't be recycled in regular paper mills.",
      psychology: "Convenience barrier: students rush to 8:30 lectures; washing mugs takes time.",
      solution: "Express grab-and-go EcoDrop tumblers with 1-second QR tap at checkout.",
      color: "#E5A93C",
      icon: "Coffee"
    },
    {
      id: "lunch",
      time: "12:30 PM",
      phase: "Canteen Lunch Hour",
      item: "Styrofoam / Clamshells + Plastic Cutlery",
      volume: "850 boxes & forks / day",
      painPoint: "Used for less than 15 minutes, then buried in general garbage bins alongside leftover food.",
      psychology: "Messy leftovers deter carrying personal lunchboxes in backpacks.",
      solution: "Canteen takes care of commercial washing; students just drop dirty boxes in return bins.",
      color: "#D97746",
      icon: "UtensilsCrossed"
    },
    {
      id: "afternoon",
      time: "03:30 PM",
      phase: "Hydration & Study Sessions",
      item: "Single-use PET Water Bottles & Cold Boba",
      volume: "480 PET bottles / day",
      painPoint: "Water coolers exist, but students buy chilled packaged bottles for grab-and-go speed.",
      psychology: "Perceived hygiene doubt about water dispensers + convenience.",
      solution: "Touchless chilled refill stations awarding +5 EcoPoints per 500ml fill.",
      color: "#2D5A27",
      icon: "Droplets"
    },
    {
      id: "night",
      time: "07:30 PM",
      phase: "Hostel Delivery & Snacks",
      item: "Polythene Bags, Bubble Wrap, Sauce Sachets",
      volume: "350 delivery packages / night",
      painPoint: "Food delivery apps pack every order with double plastic bags, disposable spoons, and condiment pouches.",
      psychology: "Default 'opt-out' of cutlery is frequently ignored by vendors.",
      solution: "Campus gate drop-box partnership for returnable courier bags and meal totes.",
      color: "#8DA382",
      icon: "Package"
    }
  ]
};

export const SCAMPER_ITEMS = [
  {
    letter: "S",
    title: "Substitute",
    concept: "Replace Single-Use Film with Thermal Stainless & Plant-Bonded Fiber",
    details: "Substitute disposable polyethylene cups with double-wall food-grade 304 stainless steel and heavy-gauge dishwasher-safe bio-composite lunchboxes tested for 1,000+ commercial wash cycles.",
    impact: "Eliminates microplastic leaching and 98% lifecycle plastic usage per person.",
    tag: "Materials Innovation"
  },
  {
    letter: "C",
    title: "Combine",
    concept: "Container + Laser-Etched QR + Digital Micro-Incentives",
    details: "Combine physical tableware with a permanent QR identity. Every container is a connected IoT node that tracks return provenance and directly links to the student's campus reward wallet.",
    impact: "Blends physical packaging with digital instant gratification.",
    tag: "Digital-Physical Fusion"
  },
  {
    letter: "A",
    title: "Adapt",
    concept: "Adapt the University Library Book Loan System",
    details: "Adapt how students borrow reference books: free 24-hour checkout using existing student IDs, returnable at any drop-crate across 8 campus buildings, zero upfront purchase barrier.",
    impact: "Zero friction adoption; students don't have to 'buy' containers.",
    tag: "Service Design"
  },
  {
    letter: "M",
    title: "Modify / Magnify",
    concept: "Modify Lid Form for Spill-Proofing + Magnify Eco-Status",
    details: "Add a magnetic leakproof click-lid with tactile silicone ring. Add live campus leaderboard badges on the app so reducing plastic becomes high-status campus social currency.",
    impact: "Superior drinking experience + positive social peer influence.",
    tag: "Product & Behavioral"
  },
  {
    letter: "P",
    title: "Put to Another Use",
    concept: "End-of-Life Containers Remelted by University Maker Labs",
    details: "When a container reaches end-of-life after 3 years, the metal is recycled and composite caps are shredded in campus FabLab 3D-printers to manufacture replacement drop-box latches.",
    impact: "100% closed-loop circular lifecycle inside the university perimeter.",
    tag: "Circular Economy"
  },
  {
    letter: "E",
    title: "Eliminate",
    concept: "Eliminate the Single-Use Option at Cafeteria Point of Sale",
    details: "Eliminate single-use paper cups entirely from campus counters. Reusable EcoDrop containers become the seamless default option with zero added fees.",
    impact: "Canteens save ₹45,000/month on disposable packaging purchases.",
    tag: "System Choice Architecture"
  },
  {
    letter: "R",
    title: "Reverse / Rearrange",
    concept: "Reverse the Penalty: Instant Rewards Instead of Plastic Taxes",
    details: "Traditional policies tax or fine students for plastic. We reverse this: every returned cup earns redeemable discount credits, free snacks, and priority study-room bookings.",
    impact: "Gamified reward psychology drives 91% voluntary return rates.",
    tag: "Incentive Psychology"
  }
];

export const SQL_SCHEMA = `-- ========================================================
-- ECODROP ULTRA-CLEAN 3-TABLE DATABASE DESIGN
-- Designed for SQLite / PostgreSQL / Supabase
-- Simple, maintainable, scalable — no overengineering!
-- ========================================================

-- 1. USERS TABLE
-- Stores student profile, authentication ref, and current points balance
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id VARCHAR(50) UNIQUE NOT NULL,      -- e.g. 'STU-2026-884'
    name VARCHAR(100) NOT NULL,                  -- Student's full name
    major VARCHAR(100),                          -- Academic department
    points_balance INTEGER DEFAULT 0,            -- Current redeemable points
    lifetime_saved INTEGER DEFAULT 0,            -- Total plastics diverted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. REWARDS TABLE
-- Available perks, campus discounts, and partner vouchers
CREATE TABLE rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(150) NOT NULL,                 -- e.g. 'Free Coffee'
    category VARCHAR(50) NOT NULL,               -- 'Beverage', 'Food', 'Store'
    canteen_partner VARCHAR(100) NOT NULL,       -- Vendor honoring the perk
    points_required INTEGER NOT NULL,            -- e.g. 50
    is_active BOOLEAN DEFAULT 1                  -- 1 = Available, 0 = Inactive
);

-- 3. TRANSACTIONS / AUDIT TABLE
-- Immutable event ledger tracking borrows, returns, refills, and redemptions
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    action_type VARCHAR(30) NOT NULL,            -- 'RETURN_CONTAINER', 'REFILL', 'REDEEM'
    container_id VARCHAR(50),                    -- e.g. 'CUP-402' or NULL
    points_changed INTEGER NOT NULL,             -- Positive (+15) or Negative (-75)
    description TEXT NOT NULL,                   -- Human-readable event memo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OPTIONAL INDEXES FOR LIGHTNING SPEED:
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_created ON transactions(created_at);
`;

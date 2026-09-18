# 🌾 KRISHI BAZAAR — MASTER V0 / SYSTEM PROMPT

> Copy and paste the prompt below into [v0.dev](https://v0.dev/) to generate or customize the Next.js / React MVP.

```markdown
Create a high-impact, mobile-responsive, production-grade Agro-Commerce & AI Logistics MVP called "Krishi Bazaar (कृषि बाज़ार)".

The application connects smallholder farmers directly with bulk institutional buyers (flour mills, food processors, retail chains), utilizing AI price discovery, smart farmer crop aggregation (pooling small harvests into full truckloads), transparent escrow transactions, logistics tracking, and a multilingual voice/chat AI assistant.

### COLOR PALETTE & DESIGN SYSTEM
- Primary Agri-Green: Emerald-700 (#047857), Emerald-600 (#059669), Emerald-50 (#ecfdf5)
- Harvest Gold / Amber: Amber-500 (#f59e0b), Amber-600 (#d97706), Amber-50 (#fffbeb)
- Deep Earth / Slate: Slate-900 (#0f172a), Slate-800 (#1e293b), Slate-50 (#f8fafc)
- Clean, tactile cards, subtle shadows, crisp typography (Inter/Geist), badge tags for quality grades, and status indicator pills.

### TOP NAVIGATION & GLOBAL STATE
1. Header with Krishi Bazaar logo, bilingual tagline ("Empowering Farmers • Direct Mandi Access"), and a Live Production Status Badge: "Prototype Demo Mode | Target Architecture: Node.js + MongoDB + Python ML".
2. Role Navigation Switcher with 5 tabs:
   - 🌾 Farmer Portal
   - 🛒 Buyer Portal
   - 🚚 Logistics & Host
   - 🤖 Krishi AI Assistant
   - ⚡ Admin Control Center
3. Top "🎯 5-Minute Guided Demo Flow" button that highlights the next action in the presentation loop:
   Farmer Listing → AI Price Check → Buyer Bulk Order → Logistics Transit → Krishi AI Voice Query → Admin Analytics.

### 1. FARMER PORTAL
- Quick Metrics: Total Active Stock, Projected Payout (₹), Quality Certification (NABL A+), Aggregation Pool Status.
- "List Your Harvest" Form:
  - Crop Select: Sharbati Wheat, Lokwan Wheat, Basmati 1121, Mustard, Soybean.
  - Quantity (in Quintals), Moisture % (e.g. 11.4%), Quality Grade (A+, A, B).
  - Mandi / District (e.g. Sehore, MP).
  - Interactive "🤖 Run AI Price Prediction" button:
    - Calculates dynamic pricing based on historical mandi arrivals, seasonal trends, and moisture grade.
    - Displays: MSP Baseline (₹2,275/qtl), AI Recommended Price (₹2,480/qtl), 7-day volatility forecast (+4.2%), and Confidence Score (94%).
    - "Apply AI Recommended Price" one-click button.
  - "Publish to Live Marketplace" button that instantly pushes the lot into the shared marketplace and updates state.
- "Active Aggregation Pools" section:
  - Shows smallholder farmers pooled together: "Sehore Wheat Pool #402 (3/5 Farmers joined, 190/250 Quintals filled, 76% to Full Truck Load)".

### 2. BUYER PORTAL
- Search & Filter bar: Search by crop, grade, location, or certification.
- "Smart AI Matching" cards:
  - Matches bulk buyer specifications (e.g., "Requires 200+ Qtl Lokwan Wheat with <12% moisture") directly with aggregated farmer pools.
  - Shows savings calculator: "Aggregation saves ₹140/qtl in freight logistics".
- Live Marketplace Grid:
  - Crop listing cards displaying farmer name, village, lab tested moisture, price/quintal, and available volume.
  - "Buy / Place Bulk Order" interactive modal:
    - Quantity selector, total cost calculator.
    - Transparent escrow breakdown: Farmer Payout (94%), Escrow Logistics (4.5%), Platform fee (1.5%).
    - "Confirm Order & Lock Escrow" button: Creates order (e.g., KB-ORD-8821) and routes it directly to the Logistics pipeline.

### 3. LOGISTICS & HOST PORTAL
- Order Delivery Pipeline Tracker with interactive state advances:
  - Step 1: 📋 Order Assigned (Aggregation Hub)
  - Step 2: 🚜 Picked Up & Moisture Verified at Village
  - Step 3: 🚛 In Transit (Simulated Route: Sehore Hub → Indore Flour Mill)
  - Step 4: 🏢 Delivered & Escrow Released
- Clickable action buttons for demo: "Mark as Picked Up" → "Dispatch In Transit" → "Confirm Delivered & Release Escrow".
- Driver Card: Rajesh Yadav (Eicher Pro 14ft • MP 04 GA 9124), IoT sensor feed (Moisture 11.2%, Temp 27°C).
- Callout badge: "Production Integration: AIS-140 GPS & IoT Temperature Telemetry".

### 4. KRISHI AI CHATBOT & VOICE INTERFACE (FRIENDLY KISAN MITRA & KRISHI VANI)
- Friendly, empathetic agricultural advisor ("Krishi AI Kisan Mitra 🙏") supporting 6 languages: English, Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), Marathi (मराठी), Gujarati (ગુજરાતી), and Hinglish with dedicated language switcher pills.
- Dedicated "Krishi Vani Voice HUD" modal:
  - Pulsating acoustic soundwave visualizer when listening.
  - Real-time live speech-to-text transcription display.
  - Fail-safe spoken question chips in the active regional language for 100% demo reliability.
- Crystal-clear text-to-speech voice synthesis (Web SpeechSynthesis API) with dedicated "Listen in Audio (🔊)" and "Stop Audio" controls.
- Comprehensive vernacular knowledge base:
  - 🌾 Live APMC Mandi Rates & MSP benchmarks across major northern & central mandis.
  - 🐛 Plant pathology diagnostics with exact chemical dosage & organic practices (Yellow rust / Peela ratua / Peelo Geru / Tambera cure with Propiconazole 25% EC at 1ml/L).
  - 🌱 Split fertilizer & nutrition management (Urea, DAP basal, Nano Urea foliar spray at CRI & tillering).
  - 🌦️ 7-Day rain probability & weather harvesting advisory.
  - 🚚 Real-time order telemetry & driver status (#KB-ORD-8821).
  - 💰 Transparent Escrow & Direct Bank Transfer (DBT) explanation.
  - 📦 Smart Farmer Aggregation & pooling savings (₹140/qtl freight discount).
- Contextual interactive follow-up chips under each response for zero-typing navigation.
- Real-time animated ticker displaying live mandi prices for Wheat, Basmati, Mustard, Soybean, Maize, Cotton, Onion, and Chana.

### 5. ADMIN CONTROL CENTER
- High-level KPIs: Total Mandi GMV (₹1.42 Cr), Active Farmers (1,840), Supply Shortfall Alerts (2), Price Stability Index (98.2%).
- Interactive AI Demand Forecasting Visualizer:
  - 6-month projected wheat supply vs demand chart.
  - Anomaly alert: "High demand spike expected next month due to festival season — suggested procurement window is open now."
- Live Audit & Escrow Ledger:
  - Real-time streaming log of farmer listings, matched orders, escrow deposits, and driver updates.
- "Production Architecture Blueprint" Modal:
  - Details the production stack: Node.js Express API, MongoDB Atlas, Python ML (XGBoost for pricing), Twilio IVR, Razorpay Route Escrow.

### POLISH & USABILITY
- Ensure all buttons trigger real UI state changes and friendly toast notifications.
- Include realistic Indian agricultural mock data (Sehore, Indore, Karnal, Mansa, Kota).
- Include responsive mobile view navigation bar.
- Add clear disclaimer: "For Demonstration — Advanced ML Training, Live Banking APIs, and AIS-140 GPS are simulated for prototype review."
```

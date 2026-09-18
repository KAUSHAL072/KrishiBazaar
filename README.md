# 🌾 Krishi Bazaar (कृषि बाज़ार) — MVP & Pitch Kit

> **Direct Mandi Disintermediation • AI Price Discovery • Smart Farmer Crop Aggregation • End-to-End Escrow Logistics**

---

## ⚡ Quick Start (Run in 5 Seconds)

### Option 1: Instant Local Preview (Zero Install)
You can directly open `index.html` in Chrome / Edge:
```powershell
Start-Process "index.html"
```
Or start a fast local web server using Python:
```powershell
python -m http.server 3000
# Then open http://localhost:3000 in your browser
```

---

## 🚀 Instant Deployment to Vercel

This repository is pre-configured with `vercel.json` for 1-click zero-config deployment to Vercel:

1. **Via Vercel Web Dashboard (Drag & Drop / GitHub):**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Push this folder to GitHub or link your repository.
   - Click **Deploy** — Vercel will immediately publish it with a live public HTTPS URL!
2. **Via Vercel v0:**
   - If you want to customize further in v0, open [`MASTER_V0_PROMPT.md`](./MASTER_V0_PROMPT.md) and paste it into [v0.dev](https://v0.dev/).

---

## 🎯 5-Minute Presentation Demonstration Flow

Follow this exact sequence during your pitch (guided by the interactive banner inside the app):

| Minute | Portal / Step | Action in App | What to Say |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:40** | **1. Login Gateway & Persona Selection** | Land on **Login Portal** (`#view-login`). Show the 4 stakeholder cards. Click **Login as Farmer (Ramesh Patidar)**. | Introduce Krishi Bazaar's multi-stakeholder ecosystem connecting Farmers, Institutional Buyers, Fleet Hosts, and Regulators. Point out the active user badge in the header. |
| **0:40 - 1:20** | **2. Farmer Portal & In-Page AI Copilot** | 1. Select **Wheat (Sharbati Gold)**<br>2. Click **'Run AI Prediction'** (+₹245 over MSP)<br>3. Click **'Apply Recommended Price'** & **'Publish Harvest Lot'**<br>4. Click **'🌾 Sehore Mandi Rates'** in the in-page AI helper | AI analyzes arrival data & moisture to suggest ₹2,520/q. Smart pooling aggregates Ramesh's lot into a 250 Qtl FTL. The in-page AI assistant drawer slides open instantly. |
| **1:20 - 2:10** | **3. Buyer Portal & Omnipresent Drawer** | 1. Switch persona to **Buyer (Priya Sharma)**<br>2. Open floating assistant (notice badge adapts to *"Advising: Priya Sharma"* )<br>3. Click **'Buy Lot'**<br>4. Click **'Confirm Order & Lock Escrow'** | Institutional buyer (Malwa Agro Mills) buys verified lot. Transparent escrow locks ₹5,20,800: 94% to farmer, 4.5% logistics, 1.5% platform fee. |
| **2:10 - 3:00** | **4. Logistics Tracker** | 1. Switch to **Rajesh Yadav (Logistics Host)**<br>2. Click **'🚛 Optimized NH-46 Route'** in AI assistant<br>3. Click **'Mark Picked Up'** → **'Dispatch In Transit'** → **'Confirm Delivered & Release Escrow'** | Chain of custody tracking with simulated AIS-140 GPS and weighbridge slip verification. Upon gate delivery, escrow releases instant DBT payout to farmers. |
| **3:00 - 3:45** | **5. Krishi AI (Omnipresent & Voice HUD)** | 1. Open floating chatbot anywhere or switch to **Krishi AI** tab<br>2. Select language (**हिन्दी / ਪੰਜਾਬੀ / मराठी / ગુજરાતી / English / Hinglish**)<br>3. Click 🎤 **Krishi Vani** to open the Voice HUD with acoustic wave animation<br>4. Speak or tap any vernacular chip (*"गेहूं मंडी भाव"*, *"पीला रतुआ इलाज"*, or *"KB-ORD-8821"* )<br>5. Click **'Listen in Audio (🔊)'** | Empathetic vernacular agronomist. Real-time Web Speech recognition in 6 regional languages & voice playback with zero typing required. Available anywhere in the app! |
| **3:45 - 4:30** | **6. Admin Center** | 1. Switch to **Dr. Vikram Seth (APMC Admin)**<br>2. View **AI Demand vs Supply Chart**<br>3. Point out early warning alert & audit trail | Macro liquidity oversight, ₹1.42 Cr GMV, 14.8% farmer income delta, and automated deficit detection to stabilize food supply chains. |
| **4:30 - 5:00** | **7. Architecture & Impact** | Click **'Target Prod Stack'** in header | Reiterate planned production architecture: Node.js Express, MongoDB Atlas, Python ML (XGBoost), Twilio IVR, AIS-140 GPS. |

---

## 🏛️ Enterprise Multi-Portal Architecture & 3 Specialized AI Copilots

### 🌾 1. Farmer Portal (10 Services)
1. **Produce Listing & AI Image Quality Grader**: Computer Vision crop inspection with Grade A+ auto-tagging.
2. **Sample Checking Process**: NABL moisture (<12%), lustre (96.4%), and defect (0.8%) certified assay slip.
3. **Business Sales History**: Historical volume, revenue, and +15.2% realization over local arthiyas.
4. **Transactions Ledger**: Downloadable CSV of credits, cess, and net DBT payouts.
5. **Orders History**: Contract management, pickup appointments, and e-waybill generation.
6. **Company Trust Scorecards**: Settlement speed and gate turnaround ratings for corporate mills.
7. **Logistics & Aggregation**: Pooled pickup manifests for Full Truck Load (FTL) freight discounts.
8. **Live Mandi Bhav Ticker**: APMC local auction vs. AI predicted net realization (+₹245/Qtl).
9. **Real-Time GPS Tracking**: Live telemetry map of the inbound pickup truck.
10. **Payment Milestone Tracking & Grievance Desk**: Guaranteed direct bank transfer (DBT) tracker & 24/7 ticket support.

### 🏢 2. Institutional Buyer Portal (10 Services + Chanakya Bot)
1. **Area-Wise District Hubs**: Micro-mandi drilldown across Sehore, Dewas, Ujjain, Hoshangabad, and Harda.
2. **Farmer KYC & Verification**: Aadhaar UIDAI, PM-Kisan DBT linkage, and Khasra land record verification.
3. **Quality Assay Terminal**: Side-by-side NABL laboratory analysis of moisture, gluten index, and foreign matter.
4. **Price Comparison Matrix**: Heatmap comparing Sehore farm-gate vs. Indore APMC auction vs. Neemuch.
5. **Live Silo Stock Tracker**: Real-time silo fill gauges (72% full) and automated deficit replenishment alerts.
6. **Procurement Order History**: Multi-lot order records and fulfillment status.
7. **Real-Time Fleet Tracking**: Inbound consignment GPS monitoring with estimated time of gate arrival.
8. **Smart Escrow Settlement**: 3-way transparent escrow holding (94% farmer, 4.5% logistics, 1.5% platform).
9. **"Use Own Transport & Save ₹140/Qtl" Option**: Seamless toggle that waives logistics fees when deploying own fleet.
10. **Chanakya AI Business Copilot**: Embedded commercial advisor for multi-mandi arbitrage and procurement tactics.

### 🚛 3. Logistics & Fleet Portal (10 Services + VahanSathi Bot)
1. **Active Dispatch Board**: 4-stage pipeline (Assigned → Pickup Confirmed → In Transit → Delivered).
2. **Live AIS-140 IoT Telemetry**: Real-time speed (48 km/h), fuel (68%), battery (12.6V), coolant (88°C), and tyre (110 PSI).
3. **Dewas Bypass Route Detail**: High-resolution map prioritizing NH-46 to bypass city congestion.
4. **Vehicle & Driver KYC Profile**: Driver verification, vehicle fitness, and national permit badges.
5. **90% Gate Advance Payment**: Instant 90% advance at weighbridge check-in + 10% on digital proof of delivery.
6. **Weighbridge Gross Specs**: Certified gross (14,850 kg), tare (5,250 kg), and net payload (9,600 kg).
7. **Profit & Savings Margin Graph**: ₹16,800 net margin (48.0% take-home) + ₹6,400 return-load backhaul savings.
8. **Trip Expenses & FASTag Log**: Granular operating costs (diesel, tolls, driver bata, maintenance).
9. **Trips History & Manifest**: Historical trip performance metrics (98.4% on-time record).
10. **VahanSathi AI Fleet Copilot & 24/7 Breakdown SOS**: Fast highway roadside assistance & fleet intelligence.

### 🛡️ 4. Mandi Board Admin Command Center (13 Services)
1. **3-Server Cluster Control**: Real-time status and restart/audit controls for APMC Primary Node, AI Inference Cluster, and Escrow Gateway.
2. **4-Corridor AI 6-Month Demand vs Supply Forecast**: Dynamic Chart.js forecasts for Wheat, Mustard, Soybean, and Basmati.
3. **Mandi Cess Tax Ledger**: 1.5% APMC cess accounting (₹18.4 Lakhs collected).
4. **Dispute Resolution Console**: Fast-track arbitration desk with role-based authority rules.

### 🎙️ 5. Siri / Gemini Regional Voice Control System
- **Hands-Free Regional Commands**:
  - *"सीहोर मंडी भाव दिखाओ"* → Navigates to Farmer Mandi Rates
  - *"क्वालिटी चेक करो"* → Executes Computer Vision AI grain grading
  - *"गाड़ी ट्रैक करो"* → Opens Live GPS Vehicle Tracker
  - *"चाणक्य बॉट खोलो"* → Activates Chanakya Business Copilot
  - *"मुनाफा ग्राफ दिखाओ"* → Opens 48% Transporter Profit Margin
  - *"लॉगआउट करो"* → Safely logs out to Login Gateway
- Spoken vernacular responses powered by Web Speech Synthesis in **Hindi, Punjabi, Marathi, Gujarati, English, and Hinglish**.

---

## 🏛️ Prototype vs. Production Architecture

| Component | In This Tomorrow Prototype (MVP) | Target Enterprise Production Stack |
| :--- | :--- | :--- |
| **Frontend** | Responsive SPA (HTML5, Tailwind, Chart.js, Lucide) | Next.js 14 App Router, Vercel Edge Network |
| **Backend APIs** | Reactive Client State Engine (`app.js`) | Node.js & Express REST microservices on Cloud Run |
| **Database** | Shared in-memory mock store with live reactivity | MongoDB Atlas (Geospatial index) + Redis cache |
| **AI / ML Pricing** | Simulated XGBoost dynamic pricing algorithm | Python FastAPI + LightGBM trained on Agmarknet arrivals |
| **Voice & Telephony** | Web Speech Synthesis & Recognition API | Twilio / Exotel IVR for dial-in feature phone access |
| **Payments** | Simulated Smart Escrow Contract | Razorpay Route / Cashfree Split Escrow with UPI DBT |
| **Logistics / Telemetry**| Simulated AIS-140 GPS & IoT dials | AIS-140 GPS API + Bluetooth IoT moisture probes |

---

## 🧪 Automated CDP Browser Verification

Run the full automated test suite anytime:
```powershell
python scratch/cdp_enterprise_test.py
```
**Score: 33 / 33 PASSED (100% Green)**.

---

## 📁 Repository Files

- [`index.html`](./index.html): The complete interactive mobile-responsive application with all 4 portals.
- [`app.js`](./app.js): Full business logic, AI pricing engine, escrow math, speech synthesis, Chart.js graphs, 3 AI bots, and voice controller.
- [`vercel.json`](./vercel.json): Vercel configuration for 1-click deployment.
- [`MASTER_V0_PROMPT.md`](./MASTER_V0_PROMPT.md): Ready-to-use master prompt for Vercel v0.
- [`PRESENTATION_DECK_SCRIPT.md`](./PRESENTATION_DECK_SCRIPT.md): Complete verbatim 5-minute pitch script.

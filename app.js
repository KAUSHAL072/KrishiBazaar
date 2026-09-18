// ============================================================================
// KRISHI BAZAAR (कृषि बाज़ार) — MVP APPLICATION LOGIC & STATE ENGINE
// ============================================================================

// Global Mock Database & State
const state = {
  activeRole: 'login',
  currentUser: null,
  isLoggedIn: false,
  isFloatingChatOpen: false,
  speechEnabled: true,
  escrowBalance: 1482500,
  demoStep: 1,

  // User Personas & Authentication
  users: {
    farmer: {
      role: 'farmer',
      name: 'Ramesh Patidar',
      nameHi: 'रमेश पाटीदार',
      avatar: '👨‍🌾',
      location: 'Sehore Hub, MP',
      phone: '9826012345',
      tag: 'Farmer • Sehore',
      land: '12 Acres',
      crop: 'Sharbati Wheat',
      desc: 'Smallholder farmer growing Sharbati Wheat, looking for fair MSP-plus prices & pooled transport.'
    },
    buyer: {
      role: 'buyer',
      name: 'Priya Sharma',
      nameHi: 'प्रिया शर्मा',
      avatar: '🏢',
      location: 'Malwa Agro Mills, Indore',
      phone: '9425067890',
      tag: 'Buyer • Malwa Mills',
      land: 'Flour Mill Corp',
      crop: 'Bulk Wheat & Mustard',
      desc: 'Procurement head sourcing 5,000 Qtl/month with lab-certified moisture < 12%.'
    },
    host: {
      role: 'host',
      name: 'Rajesh Yadav',
      nameHi: 'राजेश यादव',
      avatar: '🚛',
      location: 'Kisan Logistics Hub, MP',
      phone: '9755054321',
      tag: 'Logistics • Eicher 14ft',
      land: 'Fleet Partner',
      crop: 'Refrigerated & Dry FTL',
      desc: 'Logistics transporter operating Eicher Pro 14ft (MP 04 GA 9124) on Sehore-Indore corridor.'
    },
    admin: {
      role: 'admin',
      name: 'Dr. Vikram Seth',
      nameHi: 'डॉ. विक्रम सेठ',
      avatar: '🛡️',
      location: 'APMC Directorate, Bhopal',
      phone: '9893011223',
      tag: 'Admin • Mandi Board',
      land: 'State Regulator',
      crop: 'Market Oversight',
      desc: 'Directorate administrator auditing liquidity, dispute resolution & MSP compliance across 18 mandis.'
    }
  },

  // Krishi AI Chat State
  chatLanguage: 'hi', // 'hi' (Hindi), 'en' (English), 'hinglish' (Hinglish)
  isVoiceSpeaking: false,
  isVoiceListening: false,
  chatHistory: [],

  // Crop listings available in the marketplace
  listings: [
    {
      id: 'LOT-301',
      crop: 'Wheat (Sharbati Gold)',
      category: 'Wheat',
      farmer: 'Ramesh Patidar + 3 Farmers',
      isPool: true,
      poolName: 'Sehore Wheat Pool #402',
      qty: 200,
      price: 2480,
      moisture: '11.4%',
      grade: 'A+ (NABL Certified)',
      location: 'Sehore Hub, Madhya Pradesh',
      harvestDate: '2 days ago',
      verified: true,
      aiMatchScore: 98
    },
    {
      id: 'LOT-302',
      crop: 'Mustard (Sarson Seed)',
      category: 'Mustard',
      farmer: 'Hakam Singh',
      isPool: false,
      qty: 85,
      price: 5450,
      moisture: '8.2%',
      grade: 'Grade 1 Oil Content (42%)',
      location: 'Kota Mandi, Rajasthan',
      harvestDate: 'Yesterday',
      verified: true,
      aiMatchScore: 91
    },
    {
      id: 'LOT-303',
      crop: 'Basmati Rice 1121',
      category: 'Rice',
      farmer: 'Karnal Farmers FPO',
      isPool: true,
      poolName: 'Karnal Export Cluster',
      qty: 350,
      price: 3920,
      moisture: '12.0%',
      grade: 'Super Fine Extra Long',
      location: 'Karnal, Haryana',
      harvestDate: '3 days ago',
      verified: true,
      aiMatchScore: 87
    },
    {
      id: 'LOT-304',
      crop: 'Soybean (Yellow)',
      category: 'Soybean',
      farmer: 'Narmada Agro Collective',
      isPool: false,
      qty: 120,
      price: 4680,
      moisture: '10.5%',
      grade: 'Standard Food Grade',
      location: 'Hoshangabad, MP',
      harvestDate: '4 days ago',
      verified: true,
      aiMatchScore: 84
    }
  ],

  // Active Logistics Shipment being tracked
  shipment: {
    orderId: 'KB-ORD-8821',
    crop: 'Wheat (Sharbati Gold)',
    qty: 200,
    pricePerQtl: 2480,
    totalEscrow: 520800,
    consignor: 'Sehore Hub, MP (Ramesh Patidar Pool)',
    consignee: 'Malwa Agro Mills, Indore',
    driver: 'Rajesh Yadav (Eicher 14ft Pro - MP 04 GA 9124)',
    stage: 3, // 1: Assigned, 2: Picked Up, 3: In Transit, 4: Delivered
    statusText: 'In Transit (En Route to Indore)',
    eta: '45 mins remaining'
  },

  // Admin Activity Stream
  activityLogs: [
    { time: 'Just now', text: 'AI Price model calibrated for Central MP Mandis (+4.2% demand bias)', type: 'ai' },
    { time: '4 mins ago', text: 'Escrow locked ₹ 5,20,800 for Shipment #KB-ORD-8821', type: 'escrow' },
    { time: '18 mins ago', text: 'Sehore Pool #402 reached 80% Full Truck Load aggregation', type: 'pool' },
    { time: '35 mins ago', text: 'Lot LOT-302 (Kota Mustard) certified 42% oil grade by NABL lab', type: 'lab' },
    { time: '1 hour ago', text: 'Direct Bank Transfer of ₹ 3,74,000 completed to 3 Karnal farmers', type: 'payout' }
  ],

  // AIS-140 Real-Time GPS Tracking Telemetry Engine
  gps: {
    isSimulating: true,
    speedMultiplier: 1,
    currentSegmentIndex: 4, // Dewas Bypass Corridor (Active In Transit)
    segmentProgress: 0.35,  // 35% between Dewas and Manglia
    lat: 22.9138,
    lng: 76.0145,
    speed: 48,
    heading: 245,
    altitude: 535,
    odometer: 104,
    totalDistance: 142,
    etaMinutes: 42,
    geofence: 'Dewas Outer Geofence',
    currentMilestone: 'Dewas Bypass Interchange',
    satellites: 14
  }
};

// Selected lot for order modal
let currentOrderLot = null;
let demandChartInstance = null;

// Real-Time GPS Tracking Route & Map Instances (NH-46 Corridor, MP)
const gpsRoute = [
  { name: 'Sehore APMC Silo Hub', lat: 23.2032, lng: 77.0844, km: 0, geofence: 'Sehore Hub Geofence', etaMin: 140 },
  { name: 'Ichhawar Toll Plaza', lat: 23.1421, lng: 76.9211, km: 24, geofence: 'Ichhawar Toll Zone', etaMin: 115 },
  { name: 'Ashta Highway Weighbridge', lat: 23.0199, lng: 76.5348, km: 45, geofence: 'Ashta Bypass Zone', etaMin: 95 },
  { name: 'Sonkatch Rest Bay', lat: 22.9754, lng: 76.3712, km: 72, geofence: 'Sonkatch Transit Zone', etaMin: 70 },
  { name: 'Dewas Bypass Interchange', lat: 22.9676, lng: 76.0534, km: 98, geofence: 'Dewas Outer Geofence', etaMin: 42 },
  { name: 'Manglia Fuel & Agro Depot', lat: 22.8123, lng: 75.9421, km: 122, geofence: 'Indore Suburban Corridor', etaMin: 20 },
  { name: 'Indore Malwa Agro Silo Gate 3', lat: 22.7196, lng: 75.8577, km: 142, geofence: 'Malwa Mill Inbound Bay #3', etaMin: 0 }
];

const leafletInstances = {
  host: null,
  farmer: null,
  buyer: null
};

const mapMarkers = {
  host: null,
  farmer: null,
  buyer: null
};

const mapTileLayers = {
  host: null,
  farmer: null,
  buyer: null
};

let gpsTimerInterval = null;

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderIcons();
  updateUserHeaderUI();
  updateDrawerPersonaContext();
  switchRole('login');
  renderFarmerLots();
  renderMarketplace();
  updateLogisticsUI();
  renderAdminLogs();
  initDemandChart();
  updateDemoGuide();
  initChat();
  initRealTimeMaps();
  updateGpsDomElements();
  if (!gpsTimerInterval) {
    gpsTimerInterval = setInterval(updateGpsTick, 1000);
  }
});

function renderIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ============================================================================
// AUTHENTICATION & MULTI-PERSONA MANAGEMENT
// ============================================================================
function updateUserHeaderUI() {
  const user = state.currentUser ? (typeof state.currentUser === 'object' ? state.currentUser : state.users[state.currentUser]) : null;
  const avatarEl = document.getElementById('user-avatar');
  const nameEl = document.getElementById('user-name');
  const roleEl = document.getElementById('user-role-tag');
  const mobileAvatarEl = document.getElementById('mobile-user-avatar');
  const mobileNameEl = document.getElementById('mobile-user-name');
  const mobileRoleEl = document.getElementById('mobile-user-role');

  if (state.isLoggedIn && user) {
    if (avatarEl) avatarEl.innerText = user.avatar;
    if (nameEl) nameEl.innerText = user.name;
    if (roleEl) roleEl.innerText = `${capitalize(user.role)} • ${user.location.split(',')[0]}`;
    if (mobileAvatarEl) mobileAvatarEl.innerText = user.avatar;
    if (mobileNameEl) mobileNameEl.innerText = user.name;
    if (mobileRoleEl) mobileRoleEl.innerText = `${capitalize(user.role)} • ${user.location.split(',')[0]}`;
  } else {
    if (avatarEl) avatarEl.innerText = '👤';
    if (nameEl) nameEl.innerText = 'Guest User';
    if (roleEl) roleEl.innerText = 'Not Logged In';
    if (mobileAvatarEl) mobileAvatarEl.innerText = '👤';
    if (mobileNameEl) mobileNameEl.innerText = 'Guest User';
    if (mobileRoleEl) mobileRoleEl.innerText = 'Not Logged In';
  }
}

function loginAs(role) {
  if (!state.users[role]) role = 'farmer';
  state.currentUser = state.users[role];
  state.isLoggedIn = true;
  updateUserHeaderUI();
  updateDrawerPersonaContext();
  switchRole(role);
  const user = state.users[role];
  showToast(`🎉 Logged in as ${user.name} (${capitalize(role)})!`, 'success');
}

function logoutUser() {
  state.isLoggedIn = false;
  state.currentUser = null;
  updateUserHeaderUI();
  updateDrawerPersonaContext();
  switchRole('login');
  showToast('Logged out. Please select a persona to enter.', 'info');
}

function logout() {
  logoutUser();
}

function autoFillPhoneFromSelect(forcedRole) {
  const select = document.getElementById('otp-persona-select');
  const phoneInput = document.getElementById('otp-phone-input');
  const role = forcedRole || (select ? select.value : 'farmer');
  if (select && forcedRole) select.value = forcedRole;
  const user = state.users[role];
  if (user && phoneInput) {
    phoneInput.value = user.phone;
  }
}

function sendDemoOtp() {
  const phoneInput = document.getElementById('otp-phone-input');
  const phone = phoneInput ? phoneInput.value.trim() : '9826012345';
  const otpInput = document.getElementById('otp-code-input');
  
  showToast(`📱 SMS OTP Sent to +91-${phone}! Use demo code: 7890`, 'success');
  if (otpInput) {
    otpInput.value = '7890';
  }
  return true;
}

function verifyDemoOtp(providedCode) {
  const select = document.getElementById('otp-persona-select');
  const role = select ? select.value : 'farmer';
  const otpInput = document.getElementById('otp-code-input');
  const code = providedCode || (otpInput ? otpInput.value.trim() : '7890');

  if (!code || code.length < 4) {
    showToast('Please enter the 4-digit OTP (e.g. 7890)', 'error');
    return false;
  }

  showToast('✓ OTP Verified successfully! Authenticating credentials...', 'success');
  loginAs(role);
  return true;
}

// ============================================================================
// OMNIPRESENT FLOATING ASSISTANT DRAWER
// ============================================================================
function toggleFloatingChat(open) {
  const drawer = document.getElementById('floating-chat-drawer');
  const backdrop = document.getElementById('floating-chat-backdrop');
  if (!drawer) return;

  const shouldOpen = (open !== undefined) ? open : drawer.classList.contains('translate-x-full');
  state.isFloatingChatOpen = shouldOpen;

  if (shouldOpen) {
    drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
    updateDrawerPersonaContext();
    const msgs = document.getElementById('drawer-chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  } else {
    drawer.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }
  renderIcons();
}

function expandDrawerToFullView() {
  toggleFloatingChat(false);
  switchRole('ai-chat');
}

function updateDrawerPersonaContext() {
  const user = state.currentUser ? (typeof state.currentUser === 'object' ? state.currentUser : state.users[state.currentUser]) : state.users.farmer;
  const badge = document.getElementById('drawer-persona-badge');
  const chipsLabel = document.getElementById('drawer-chips-label');
  const chipsContainer = document.getElementById('drawer-quick-chips');
  const btnPersonaText = document.getElementById('floating-btn-persona-text');

  if (badge && user) {
    badge.innerText = `${user.avatar} Advising: ${user.name} (${capitalize(user.role)})`;
  }
  if (btnPersonaText && user) {
    btnPersonaText.innerText = `Ask as ${capitalize(user.role)}`;
  }

  if (chipsLabel && user) {
    const labels = {
      farmer: '🌾 Farmer Agronomy & Mandi:',
      buyer: '🏢 Institutional Buyer Copilot:',
      host: '🚛 Transit & Weighbridge Navigator:',
      admin: '🛡️ Policy & Liquidity Intelligence:'
    };
    chipsLabel.innerText = labels[user.role] || '🌱 Quick Prompts:';
  }

  if (chipsContainer && user) {
    const chipsByRole = {
      farmer: [
        { label: '🌾 आज मंडी भाव', code: 'mandi_rate' },
        { label: '🐛 पीला रतुआ इलाज', code: 'pest_rust' },
        { label: '🌱 खाद की मात्रा', code: 'fertilizer' },
        { label: '🌦️ मौसम का अनुमान', code: 'weather' },
        { label: '🚚 आर्डर KB-ORD-8821', code: 'track_order' },
        { label: '💰 बैंक पेमेंट (DBT)', code: 'payout' }
      ],
      buyer: [
        { label: '📦 नए लॉट खोजें', code: 'buyer_lots' },
        { label: '💧 नमी व लैब टेस्ट', code: 'buyer_moisture' },
        { label: '🔒 एस्क्रो पेमेंट सुरक्षा', code: 'buyer_escrow' },
        { label: '🚚 गाड़ी लोकेशन (#8821)', code: 'track_order' },
        { label: '💰 फ्रेट में ₹140 बचत', code: 'pooling' }
      ],
      host: [
        { label: '🗺️ सीहोर-इंदौर रूट', code: 'logistics_route' },
        { label: '⚖️ वेब्रिज वजन पर्ची', code: 'logistics_weighbridge' },
        { label: '📦 गेट डिलीवरी साइन-ऑफ', code: 'logistics_delivery' },
        { label: '💰 ड्राइवर फ्रेट रिलीज', code: 'payout' },
        { label: '🌦️ मौसम व बारिश रूट', code: 'weather' }
      ],
      admin: [
        { label: '📊 कुल लिक्विडिटी रिपोर्ट', code: 'admin_liquidity' },
        { label: '⚠️ सप्लाई डेफिसिट अलर्ट', code: 'admin_deficit' },
        { label: '⚖️ विवाद समाधान (Dispute)', code: 'admin_dispute' },
        { label: '🌾 आज के MSP बेंचमार्क', code: 'mandi_rate' },
        { label: '💰 एस्क्रो बैलेंस ऑडिट', code: 'payout' }
      ]
    };

    const chips = chipsByRole[user.role] || chipsByRole.farmer;
    chipsContainer.innerHTML = chips.map(c => `
      <button onclick="askPreset('${c.code}')" class="px-2 py-1 bg-stone-100 hover:bg-emerald-100 text-stone-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 rounded-lg text-[11px] font-bold transition whitespace-nowrap">
        ${c.label}
      </button>
    `).join('');
  }
}

function askFromInPage(code) {
  toggleFloatingChat(true);
  askPreset(code);
}

function sendDrawerChatMessage() {
  const input = document.getElementById('drawer-chat-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  input.value = '';
  sendChatMessage(val);
}

// ============================================================================
// ROLE NAVIGATION
// ============================================================================
function switchRole(role) {
  state.activeRole = role;

  // If switching to a core persona, update current active user
  if (['farmer', 'buyer', 'host', 'admin'].includes(role)) {
    state.currentUser = state.users[role];
    state.isLoggedIn = true;
    updateUserHeaderUI();
    updateDrawerPersonaContext();
  }

  // Update tabs styling
  const roles = ['login', 'farmer', 'buyer', 'host', 'ai-chat', 'admin'];
  roles.forEach(r => {
    const tab = document.getElementById(`tab-${r}`);
    const view = document.getElementById(`view-${r}`);
    
    if (tab) {
      if (r === role) {
        tab.className = 'role-tab px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white text-emerald-800 shadow-xs';
      } else {
        tab.className = 'role-tab px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
      }
    }

    if (view) {
      if (r === role) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    }
  });

  // Close mobile drawer if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderIcons();

  // Resize chart if admin tab opened
  if (role === 'admin' && demandChartInstance) {
    setTimeout(() => demandChartInstance.resize(), 100);
  }

  // Refresh and invalidate size of GPS maps when entering host, farmer, or buyer views
  if (['host', 'farmer', 'buyer'].includes(role)) {
    refreshGpsMaps();
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

// ============================================================================
// 5-MINUTE DEMO GUIDED STEPS
// ============================================================================
const demoSteps = [
  {
    step: 1,
    role: 'farmer',
    text: 'Step 1/5: Farmer Portal → Click "Run AI Prediction" then "Publish Harvest Lot"',
    action: () => switchRole('farmer')
  },
  {
    step: 2,
    role: 'buyer',
    text: 'Step 2/5: Buyer Portal → Inspect AI Match and click "Instant Bulk Order"',
    action: () => switchRole('buyer')
  },
  {
    step: 3,
    role: 'host',
    text: 'Step 3/5: Logistics Host → Click "Confirm Delivered & Release Escrow"',
    action: () => switchRole('host')
  },
  {
    step: 4,
    role: 'ai-chat',
    text: 'Step 4/5: Krishi AI → Click a quick question chip & listen to voice playback',
    action: () => switchRole('ai-chat')
  },
  {
    step: 5,
    role: 'admin',
    text: 'Step 5/5: Admin Dashboard → View AI Demand-Supply Forecast & Macro KPIs',
    action: () => switchRole('admin')
  }
];

function updateDemoGuide() {
  const current = demoSteps.find(s => s.step === state.demoStep) || demoSteps[0];
  const guideText = document.getElementById('demo-guide-step-text');
  if (guideText) {
    guideText.innerHTML = `<strong>Step ${current.step}/5:</strong> ${current.text.split(': ')[1]}`;
  }
}

function nextDemoStep() {
  state.demoStep = state.demoStep >= 5 ? 1 : state.demoStep + 1;
  const target = demoSteps.find(s => s.step === state.demoStep);
  if (target) {
    target.action();
    updateDemoGuide();
  }
}

// ============================================================================
// FARMER PORTAL LOGIC & AI PRICE DISCOVERY
// ============================================================================
function runAiPricePrediction() {
  const btn = document.getElementById('btn-predict-price');
  const crop = document.getElementById('farmer-crop').value;
  const moisture = parseFloat(document.getElementById('farmer-moisture').value) || 11.4;

  btn.innerHTML = `<span class="inline-block animate-spin mr-1">⚙️</span> Computing ML Model...`;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i><span>Re-run Prediction</span>`;
    btn.disabled = false;

    // Realistic calculation based on crop & moisture
    let baseMsp = 2275;
    let aiPrice = 2480;

    if (crop.includes('Rice')) {
      baseMsp = 2300;
      aiPrice = 3950;
    } else if (crop.includes('Mustard')) {
      baseMsp = 5650;
      aiPrice = 5820;
    } else if (crop.includes('Soybean')) {
      baseMsp = 4600;
      aiPrice = 4850;
    }

    // Moisture penalty / bonus
    if (moisture < 11.5) {
      aiPrice += 40; // Bonus for ultra-dry high-grade grain
    } else if (moisture > 14.0) {
      aiPrice -= 80;
    }

    const premium = aiPrice - baseMsp;

    document.getElementById('msp-display').innerText = `₹ ${baseMsp.toLocaleString('en-IN')}/q`;
    document.getElementById('ai-price-display').innerText = `₹ ${aiPrice.toLocaleString('en-IN')}/q`;
    document.getElementById('premium-display').innerText = `+ ₹ ${premium.toLocaleString('en-IN')}/q`;
    document.getElementById('farmer-price').value = aiPrice;

    const resultCard = document.getElementById('ai-price-result');
    resultCard.classList.remove('hidden');

    showToast(`AI Price Computed: ₹ ${aiPrice}/Quintal (+₹${premium} over MSP)`, 'success');
    renderIcons();
  }, 700);
}

function applyAiPrice() {
  const aiPriceText = document.getElementById('ai-price-display').innerText;
  const priceVal = parseInt(aiPriceText.replace(/[^0-9]/g, ''), 10);
  document.getElementById('farmer-price').value = priceVal;
  showToast(`Applied AI Price ₹ ${priceVal}/Quintal to your harvest lot`, 'success');
}

function resetAiPrice() {
  const resultCard = document.getElementById('ai-price-result');
  resultCard.classList.add('hidden');
}

function publishCropListing() {
  const crop = document.getElementById('farmer-crop').value;
  const qty = parseInt(document.getElementById('farmer-qty').value, 10) || 50;
  const moisture = document.getElementById('farmer-moisture').value + '%';
  const mandi = document.getElementById('farmer-mandi').value;
  const price = parseInt(document.getElementById('farmer-price').value, 10) || 2480;

  const newLot = {
    id: `LOT-${Math.floor(100 + Math.random() * 900)}`,
    crop: crop,
    category: crop.includes('Wheat') ? 'Wheat' : crop.includes('Rice') ? 'Rice' : crop.includes('Mustard') ? 'Mustard' : 'Soybean',
    farmer: 'Ramesh Patidar (You)',
    isPool: true,
    poolName: 'Sehore Sharbati Wheat Pool #402',
    qty: qty,
    price: price,
    moisture: moisture,
    grade: 'Grade A (Lab Verified)',
    location: mandi,
    harvestDate: 'Just now',
    verified: true,
    aiMatchScore: 99
  };

  // Add to listings
  state.listings.unshift(newLot);

  // Update pool progress
  const progressBar = document.getElementById('pool-progress-bar');
  const progressText = document.getElementById('pool-progress-text');
  if (progressBar && progressText) {
    progressBar.style.width = '100%';
    progressText.innerText = '250 / 250 Quintals (100% Full Truck Load Reached!)';
    progressText.className = 'text-emerald-700 font-bold';
  }

  // Add admin log
  state.activityLogs.unshift({
    time: 'Just now',
    text: `New lot ${newLot.id} (${qty} Qtl ${crop}) published by Ramesh Patidar at ₹${price}/Qtl`,
    type: 'listing'
  });

  renderFarmerLots();
  renderMarketplace();
  renderAdminLogs();

  showToast(`🎉 Lot Published! 250 Qtl Full Truck Load reached for Sehore Pool!`, 'success');

  // Advance demo guidance
  state.demoStep = 2;
  updateDemoGuide();

  // Offer fast switch to Buyer view
  setTimeout(() => {
    showActionToast(
      'Ready to test Buyer flow?',
      'Switch to Buyer Portal to purchase this newly published lot.',
      'Go to Buyer Portal',
      () => switchRole('buyer')
    );
  }, 1200);
}

function renderFarmerLots() {
  const container = document.getElementById('farmer-listings-list');
  if (!container) return;

  const myLots = state.listings.filter(l => l.farmer.includes('Ramesh Patidar'));

  container.innerHTML = myLots.map(lot => `
    <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
      <div class="flex items-center justify-between">
        <span class="font-bold text-xs text-slate-800">${lot.crop}</span>
        <span class="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
          ${lot.isPool ? 'Aggregated in Pool' : 'Direct Mandi'}
        </span>
      </div>
      <div class="flex items-center justify-between text-xs text-slate-600">
        <span>Volume: <strong>${lot.qty} Quintals</strong></span>
        <span>Price: <strong class="text-emerald-700">₹ ${lot.price.toLocaleString('en-IN')}/q</strong></span>
      </div>
      <div class="flex items-center justify-between text-[11px] text-slate-400">
        <span>Moisture: ${lot.moisture}</span>
        <span>${lot.location}</span>
      </div>
    </div>
  `).join('');

  const countBadge = document.getElementById('farmer-active-lots');
  if (countBadge) {
    countBadge.innerText = `${myLots.length} Lots`;
  }
}

// ============================================================================
// BUYER PORTAL LOGIC & MARKETPLACE
// ============================================================================
let activeCategory = 'All';

function filterCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    if (btn.innerText.includes(cat) || (cat === 'All' && btn.innerText.includes('All Crops'))) {
      btn.className = 'filter-pill px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white';
    } else {
      btn.className = 'filter-pill px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';
    }
  });
  renderMarketplace();
}

function filterMarketplace() {
  renderMarketplace();
}

function renderMarketplace() {
  const container = document.getElementById('marketplace-grid');
  if (!container) return;

  const query = (document.getElementById('marketplace-search')?.value || '').toLowerCase();

  const filtered = state.listings.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = item.crop.toLowerCase().includes(query) ||
                         item.location.toLowerCase().includes(query) ||
                         item.farmer.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const countLabel = document.getElementById('marketplace-count');
  if (countLabel) {
    countLabel.innerText = `Showing ${filtered.length} available lots`;
  }

  container.innerHTML = filtered.map(item => `
    <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4">
      <div class="space-y-2.5">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
              ${item.grade}
            </span>
            <h3 class="font-black text-slate-900 text-base mt-1">${item.crop}</h3>
          </div>
          <span class="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-lg flex items-center gap-1 shrink-0">
            <i data-lucide="zap" class="w-3 h-3 text-amber-600"></i>
            ${item.aiMatchScore}% Match
          </span>
        </div>

        <div class="text-xs text-slate-600 space-y-1">
          <div class="flex items-center gap-1.5">
            <i data-lucide="user" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>${item.farmer}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>${item.location}</span>
          </div>
          <div class="flex items-center gap-1.5 text-emerald-700 font-medium">
            <i data-lucide="droplet" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>Moisture: <strong>${item.moisture}</strong> (Certified Lab tested)</span>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-bold">Price / Qtl</div>
          <div class="text-lg font-black text-emerald-700">₹ ${item.price.toLocaleString('en-IN')}</div>
          <div class="text-[11px] text-slate-500 font-medium">${item.qty} Qtl Available</div>
        </div>
        <button onclick="openOrderModal('${item.crop}', ${item.qty}, ${item.price}, '${item.farmer}', '${item.location}', '${item.moisture}')" class="bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1 shadow-xs">
          <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
          <span>Buy Lot</span>
        </button>
      </div>
    </div>
  `).join('');

  renderIcons();
}

// ============================================================================
// BUYER ORDER MODAL & ESCROW BREAKDOWN
// ============================================================================
function openOrderModal(crop, maxQty, price, farmer, location, moisture) {
  currentOrderLot = { crop, maxQty, price, farmer, location, moisture };

  document.getElementById('modal-crop-name').innerText = crop;
  document.getElementById('modal-supplier-name').innerText = farmer;
  document.getElementById('modal-moisture').innerText = `${moisture} (Certified)`;
  document.getElementById('modal-location').innerText = location;
  document.getElementById('modal-order-qty').value = maxQty > 100 ? 200 : maxQty;

  calculateModalTotal();

  const modal = document.getElementById('order-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderIcons();
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function calculateModalTotal() {
  if (!currentOrderLot) return;
  const qty = parseFloat(document.getElementById('modal-order-qty').value) || 0;
  const subtotal = qty * currentOrderLot.price;

  // Escrow distribution: 94% farmer, 4.5% logistics (or 0% if using own transport), 1.5% platform
  const usesOwn = Boolean(state.buyerUsesOwnLogistics);
  const farmerShare = Math.round(subtotal * 0.94);
  const logisticsShare = usesOwn ? 0 : Math.round(subtotal * 0.045);
  const savedAmt = Math.round(subtotal * 0.045);
  const platformShare = Math.round(subtotal * 0.015);
  const totalAmount = farmerShare + logisticsShare + platformShare;

  document.getElementById('breakdown-farmer').innerText = `₹ ${farmerShare.toLocaleString('en-IN')}`;
  document.getElementById('breakdown-logistics').innerText = usesOwn ? `₹ 0 (Own Fleet - Saved ₹${savedAmt.toLocaleString('en-IN')}!)` : `₹ ${logisticsShare.toLocaleString('en-IN')}`;
  document.getElementById('breakdown-platform').innerText = `₹ ${platformShare.toLocaleString('en-IN')}`;
  document.getElementById('modal-total-amount').innerText = `₹ ${totalAmount.toLocaleString('en-IN')}`;
}

function confirmBuyerOrder() {
  const qty = parseFloat(document.getElementById('modal-order-qty').value) || 200;
  const subtotal = qty * currentOrderLot.price;

  // Create order
  const newOrderId = `KB-ORD-${Math.floor(8820 + Math.random() * 50)}`;
  state.shipment = {
    orderId: newOrderId,
    crop: currentOrderLot.crop,
    qty: qty,
    pricePerQtl: currentOrderLot.price,
    totalEscrow: subtotal,
    consignor: `${currentOrderLot.location} (${currentOrderLot.farmer})`,
    consignee: 'Malwa Agro Mills, Indore',
    driver: 'Rajesh Yadav (Eicher 14ft Pro - MP 04 GA 9124)',
    stage: 2, // Starts at Picked Up
    statusText: 'Picked Up & Verified at Village Hub',
    eta: '60 mins to destination'
  };

  // Increase escrow balance
  state.escrowBalance += subtotal;
  document.getElementById('global-escrow-balance').innerText = `₹ ${state.escrowBalance.toLocaleString('en-IN')}`;

  // Admin audit log
  state.activityLogs.unshift({
    time: 'Just now',
    text: `Bulk Order ${newOrderId} placed by Malwa Agro Mills. Escrow ₹${subtotal.toLocaleString('en-IN')} locked.`,
    type: 'order'
  });

  closeOrderModal();
  updateLogisticsUI();
  renderAdminLogs();

  showToast(`✅ Order ${newOrderId} confirmed! ₹${subtotal.toLocaleString('en-IN')} locked in escrow.`, 'success');

  // Advance demo step
  state.demoStep = 3;
  updateDemoGuide();

  // Fast redirect to Logistics
  setTimeout(() => {
    showActionToast(
      'Order Dispatched to Logistics!',
      `Shipment ${newOrderId} is ready for transit inspection.`,
      'Go to Logistics Tracker',
      () => switchRole('host')
    );
  }, 1200);
}

// ============================================================================
// LOGISTICS & HOST TRACKER
// ============================================================================
function updateLogisticsUI() {
  const s = state.shipment;
  document.getElementById('active-order-id').innerText = `Shipment #${s.orderId}`;
  document.getElementById('active-order-status-badge').innerText = s.statusText;
  document.getElementById('active-order-escrow').innerText = `₹ ${s.totalEscrow.toLocaleString('en-IN')}`;

  // Progress Bar & Step Labels
  const bar = document.getElementById('pipeline-progress-bar');
  const labels = [
    document.getElementById('step-label-1'),
    document.getElementById('step-label-2'),
    document.getElementById('step-label-3'),
    document.getElementById('step-label-4')
  ];

  const percentages = [25, 50, 75, 100];
  bar.style.width = `${percentages[s.stage - 1]}%`;

  labels.forEach((lbl, idx) => {
    if (idx < s.stage) {
      lbl.className = 'text-emerald-700 font-bold';
    } else if (idx === s.stage - 1) {
      lbl.className = 'text-amber-600 font-bold';
    } else {
      lbl.className = 'text-slate-400 font-medium';
    }
  });

  renderIcons();
}

function advanceLogistics(action) {
  if (action === 'pickup') {
    state.shipment.stage = 2;
    state.shipment.statusText = 'Farmgate Picked Up & Moisture Verified';
    showToast('🚜 Lot picked up from Sehore Hub & verified at electronic weighbridge.', 'success');
    jumpGpsMilestone(0);
  } else if (action === 'transit') {
    state.shipment.stage = 3;
    state.shipment.statusText = 'In Transit (En Route to Indore via Dewas Bypass)';
    showToast('🚛 Truck dispatched! Real-time AIS-140 GPS stream active.', 'success');
    jumpGpsMilestone(4);
  } else if (action === 'delivered') {
    state.shipment.stage = 4;
    state.shipment.statusText = 'Delivered & Escrow Released to Farmer DBT Accounts';
    jumpGpsMilestone(6);
    
    // Release escrow payout
    const payout = Math.round(state.shipment.totalEscrow * 0.94);
    state.activityLogs.unshift({
      time: 'Just now',
      text: `Shipment ${state.shipment.orderId} delivered! Direct Bank Transfer of ₹${payout.toLocaleString('en-IN')} released to Ramesh Patidar + 3 farmers.`,
      type: 'payout'
    });
    renderAdminLogs();

    showToast(`🎉 Delivered! ₹${payout.toLocaleString('en-IN')} credited to Farmers via Direct Bank Transfer (DBT)!`, 'success');

    // Advance demo step
    state.demoStep = 4;
    updateDemoGuide();

    setTimeout(() => {
      showActionToast(
        'Transaction Finished!',
        'Ask Krishi AI any question with voice synthesis.',
        'Open Krishi AI',
        () => switchRole('ai-chat')
      );
    }, 1500);
  }

  updateLogisticsUI();
}

// ============================================================================
// AIS-140 REAL-TIME GPS FLEET TRACKING & SATELLITE MAPPING ENGINE
// ============================================================================

function initRealTimeMaps() {
  const hasLeaflet = typeof window !== 'undefined' && typeof window.L !== 'undefined' && typeof window.L.map === 'function';
  if (hasLeaflet) {
    try {
      initMapInstance('host', 'live-fleet-map', 11);
      initMapInstance('farmer', 'farmer-live-map', 10);
      initMapInstance('buyer', 'buyer-live-map', 10);
    } catch (e) {
      console.warn('Leaflet map initialization exception, switching to canvas fallback:', e);
      enableCanvasFallbacks();
    }
  } else {
    enableCanvasFallbacks();
  }
}

function enableCanvasFallbacks() {
  const mapIds = ['live-fleet', 'farmer-live', 'buyer-live'];
  mapIds.forEach(prefix => {
    const mapDiv = document.getElementById(`${prefix}-map`);
    const canvas = document.getElementById(`${prefix}-canvas`);
    if (mapDiv && canvas) {
      mapDiv.classList.add('hidden');
      canvas.classList.remove('hidden');
    }
  });
  renderAllCanvasFallbacks();
}

function initMapInstance(roleKey, containerId, zoomLevel) {
  const el = document.getElementById(containerId);
  if (!el || leafletInstances[roleKey] || typeof window.L === 'undefined') return;

  try {
    const map = L.map(containerId, {
      center: [state.gps.lat, state.gps.lng],
      zoom: zoomLevel,
      zoomControl: roleKey === 'host',
      attributionControl: false
    });

    // High-performance Esri WorldStreetMap tiles (Commercial-grade global CDN, zero API keys required, completely eliminates OSM 403 access blocked errors)
    const streetLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; National Geographic, DeLorme, NAVTEQ'
    }).addTo(map);

    mapTileLayers[roleKey] = streetLayer;

    // Route Polyline (NH-46 Corridor)
    const routeCoords = gpsRoute.map(w => [w.lat, w.lng]);
    L.polyline(routeCoords, {
      color: '#0d9488',
      weight: 4,
      dashArray: '7, 5',
      opacity: 0.85
    }).addTo(map);

    // Origin Marker (Sehore Hub)
    L.marker([gpsRoute[0].lat, gpsRoute[0].lng], {
      icon: L.divIcon({
        className: 'gps-node-marker',
        html: '<div style="background:#059669; color:white; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px; border:2px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.3);">🌾</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(map).bindPopup('<b>Origin: Sehore APMC Hub</b><br>Moisture: 11.4% Verified');

    // Destination Marker (Indore Silo)
    L.marker([gpsRoute[gpsRoute.length - 1].lat, gpsRoute[gpsRoute.length - 1].lng], {
      icon: L.divIcon({
        className: 'gps-node-marker',
        html: '<div style="background:#4338ca; color:white; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px; border:2px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.3);">🏢</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(map).bindPopup('<b>Destination: Indore Malwa Silo</b><br>Bay #3 Reserved');

    // Intermediate Waypoints
    for (let i = 1; i < gpsRoute.length - 1; i++) {
      L.circleMarker([gpsRoute[i].lat, gpsRoute[i].lng], {
        radius: 4,
        fillColor: '#14b8a6',
        color: '#ffffff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.95
      }).addTo(map).bindPopup(`<b>${gpsRoute[i].name}</b><br>Km ${gpsRoute[i].km}`);
    }

    // Vehicle Marker with Pulse Radar
    const vehicleIcon = L.divIcon({
      className: 'gps-truck-wrapper',
      html: `
        <div style="position:relative; width:34px; height:34px;">
          <div class="gps-truck-pulse" style="position:absolute; inset:0; border-radius:50%; background:rgba(20,184,166,0.45); border:2px solid #14b8a6;"></div>
          <div style="position:absolute; inset:4px; background:#0f172a; border:2px solid #14b8a6; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
            🚚
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const vehicleMarker = L.marker([state.gps.lat, state.gps.lng], {
      icon: vehicleIcon,
      zIndexOffset: 1000
    }).addTo(map);

    leafletInstances[roleKey] = map;
    mapMarkers[roleKey] = vehicleMarker;
  } catch (err) {
    console.warn(`Error initializing Leaflet for ${roleKey}:`, err);
    enableCanvasFallbacks();
  }
}

function setMapLayerType(roleKey, type) {
  const map = leafletInstances[roleKey];
  if (!map || typeof window.L === 'undefined') return;

  if (mapTileLayers[roleKey]) {
    map.removeLayer(mapTileLayers[roleKey]);
  }

  let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
  let attr = 'Tiles &copy; Esri &mdash; National Geographic, DeLorme, NAVTEQ';
  if (type === 'satellite') {
    tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    attr = 'Imagery &copy; Esri, DigitalGlobe, GeoEye, Earthstar';
  } else if (type === 'topo') {
    tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    attr = 'Topography &copy; Esri, USGS, NOAA';
  }

  mapTileLayers[roleKey] = L.tileLayer(tileUrl, {
    maxZoom: 19,
    attribution: attr
  }).addTo(map);

  showToast(`🗺️ Map style set to ${capitalize(type)} View`, 'info');
}

function getHeadingDirection(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
}

function updateGpsTick() {
  if (!state.gps || !state.gps.isSimulating) return;

  const route = gpsRoute;
  let idx = state.gps.currentSegmentIndex;

  if (idx >= route.length - 1) {
    state.gps.speed = 0;
    state.gps.etaMinutes = 0;
    state.gps.odometer = 142;
    state.gps.geofence = 'Arrived: Malwa Mill Inbound Bay #3';
    updateGpsDomElements();
    updateLeafletMarkers();
    return;
  }

  const step = 0.008 * (state.gps.speedMultiplier || 1);
  state.gps.segmentProgress += step;

  if (state.gps.segmentProgress >= 1.0) {
    state.gps.segmentProgress = 0.0;
    state.gps.currentSegmentIndex++;
    idx = state.gps.currentSegmentIndex;

    if (idx >= route.length - 1) {
      state.gps.segmentProgress = 1.0;
      state.gps.lat = route[route.length - 1].lat;
      state.gps.lng = route[route.length - 1].lng;
      state.gps.speed = 0;
      state.gps.etaMinutes = 0;
      state.gps.odometer = 142;
      state.gps.geofence = 'Arrived: Malwa Mill Inbound Bay #3';
      updateGpsDomElements();
      updateLeafletMarkers();
      showToast('🏢 Consignment reached Indore Malwa Agro Silo Gate #3!', 'success');
      return;
    }
  }

  const p0 = route[idx];
  const p1 = route[idx + 1];
  const prog = state.gps.segmentProgress;

  state.gps.lat = Number((p0.lat + (p1.lat - p0.lat) * prog).toFixed(4));
  state.gps.lng = Number((p0.lng + (p1.lng - p0.lng) * prog).toFixed(4));

  const speedNoise = Math.floor(Math.sin(Date.now() / 2500) * 3);
  state.gps.speed = 48 + speedNoise;

  const dLng = p1.lng - p0.lng;
  const dLat = p1.lat - p0.lat;
  state.gps.heading = Math.round((Math.atan2(dLng, dLat) * 180 / Math.PI + 360) % 360);

  const currentKm = p0.km + (p1.km - p0.km) * prog;
  state.gps.odometer = Math.round(currentKm);
  const remainingKm = Math.max(0, 142 - state.gps.odometer);
  state.gps.etaMinutes = Math.max(1, Math.round((remainingKm / (state.gps.speed || 48)) * 60));
  state.gps.geofence = p0.geofence;
  state.gps.currentMilestone = p0.name;

  updateGpsDomElements();
  updateLeafletMarkers();
}

function updateGpsDomElements() {
  if (!state.gps) return;
  const g = state.gps;
  const remainingKm = Math.max(0, 142 - g.odometer);
  const dir = getHeadingDirection(g.heading);

  // Logistics Portal HUD
  const hudSpeed = document.getElementById('gps-hud-speed');
  if (hudSpeed) hudSpeed.innerText = `${g.speed} km/h`;

  const hudCoords = document.getElementById('gps-hud-coords');
  if (hudCoords) hudCoords.innerText = `${g.lat}°, ${g.lng}°`;

  const hudHeading = document.getElementById('gps-hud-heading');
  if (hudHeading) hudHeading.innerText = `${g.heading}° ${dir} • ${g.altitude}m`;

  const hudOdometer = document.getElementById('gps-hud-odometer');
  if (hudOdometer) hudOdometer.innerText = `${g.odometer} / ${g.totalDistance} km`;

  const hudEta = document.getElementById('gps-hud-eta');
  if (hudEta) hudEta.innerText = `${remainingKm} km • ${g.etaMinutes} Mins`;

  const hudGeofence = document.getElementById('gps-hud-geofence');
  if (hudGeofence) hudGeofence.innerText = g.geofence;

  // Farmer Portal Readouts
  const farmerCoords = document.getElementById('farmer-map-coords');
  if (farmerCoords) farmerCoords.innerText = `${g.lat}° N, ${g.lng}° E`;

  const farmerEta = document.getElementById('farmer-live-eta');
  if (farmerEta) farmerEta.innerText = `ETA: ${g.etaMinutes} Mins`;

  // Buyer Portal Readouts
  const buyerCoords = document.getElementById('buyer-map-coords');
  if (buyerCoords) buyerCoords.innerText = `${g.lat}° N, ${g.lng}° E`;

  const buyerEta = document.getElementById('buyer-live-eta');
  if (buyerEta) buyerEta.innerText = `ETA: ${g.etaMinutes} Mins`;

  const buyerSpeed = document.getElementById('buyer-speed-readout');
  if (buyerSpeed) buyerSpeed.innerText = `${g.speed} km/h • ${g.odometer} km done`;
}

function updateLeafletMarkers() {
  ['host', 'farmer', 'buyer'].forEach(role => {
    const marker = mapMarkers[role];
    if (marker && state.gps) {
      marker.setLatLng([state.gps.lat, state.gps.lng]);
    }
  });
  renderAllCanvasFallbacks();
}

function renderCanvasMapFallback(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const parent = canvas.parentElement;
  if (!parent || parent.offsetWidth === 0) return;

  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight || 300;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // Highway dark backdrop
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#090d16');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Route bounds (NH-46 corridor)
  const minLat = 22.70, maxLat = 23.25;
  const minLng = 75.80, maxLng = 77.15;
  const paddingX = 50;
  const paddingY = 40;
  const usableW = w - paddingX * 2;
  const usableH = h - paddingY * 2;

  function toScreen(lat, lng) {
    const xRatio = (lng - minLng) / (maxLng - minLng);
    const yRatio = (maxLat - lat) / (maxLat - minLat);
    return {
      x: paddingX + xRatio * usableW,
      y: paddingY + yRatio * usableH
    };
  }

  // Highway glow
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.2)';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  gpsRoute.forEach((pt, i) => {
    const s = toScreen(pt.lat, pt.lng);
    if (i === 0) ctx.moveTo(s.x, s.y);
    else ctx.lineTo(s.x, s.y);
  });
  ctx.stroke();

  // Primary road
  ctx.strokeStyle = '#0d9488';
  ctx.lineWidth = 3;
  ctx.beginPath();
  gpsRoute.forEach((pt, i) => {
    const s = toScreen(pt.lat, pt.lng);
    if (i === 0) ctx.moveTo(s.x, s.y);
    else ctx.lineTo(s.x, s.y);
  });
  ctx.stroke();

  // Waypoints
  gpsRoute.forEach((pt, i) => {
    const s = toScreen(pt.lat, pt.lng);
    ctx.fillStyle = i === 0 ? '#10b981' : (i === gpsRoute.length - 1 ? '#6366f1' : '#38bdf8');
    ctx.beginPath();
    ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(pt.name.split(' ')[0], s.x, s.y - 8);
  });

  // Vehicle
  if (state.gps) {
    const vPos = toScreen(state.gps.lat, state.gps.lng);
    const pulseRad = 12 + Math.sin(Date.now() / 250) * 4;
    ctx.fillStyle = 'rgba(20, 184, 166, 0.3)';
    ctx.beginPath();
    ctx.arc(vPos.x, vPos.y, pulseRad, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(vPos.x, vPos.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🚚', vPos.x, vPos.y + 3);
  }
}

function renderAllCanvasFallbacks() {
  ['live-fleet-canvas', 'farmer-live-canvas', 'buyer-live-canvas'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.classList.contains('hidden')) {
      renderCanvasMapFallback(id);
    }
  });
}

function recenterGpsMap(roleKey) {
  const map = leafletInstances[roleKey];
  if (map && state.gps) {
    map.setView([state.gps.lat, state.gps.lng], map.getZoom() || 11, { animate: true });
    showToast('🎯 Re-centered map on vehicle (MP 04 GA 9124)', 'info');
  } else {
    showToast('🎯 GPS Vehicle Position: ' + (state.gps ? `${state.gps.lat}°, ${state.gps.lng}°` : 'Active'), 'info');
  }
}

function toggleGpsSimulation() {
  if (!state.gps) return;
  state.gps.isSimulating = !state.gps.isSimulating;

  const btn = document.getElementById('btn-gps-toggle');
  const label = document.getElementById('label-gps-toggle');
  const icon = document.getElementById('icon-gps-toggle');

  if (state.gps.isSimulating) {
    if (btn) {
      btn.className = 'px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm';
    }
    if (label) label.innerText = 'Pause Movement';
    if (icon) icon.setAttribute('data-lucide', 'pause');
    showToast('▶️ Live GPS Movement Resumed', 'success');
  } else {
    if (btn) {
      btn.className = 'px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm';
    }
    if (label) label.innerText = 'Resume Movement';
    if (icon) icon.setAttribute('data-lucide', 'play');
    showToast('⏸️ Live GPS Movement Paused', 'info');
  }
  renderIcons();
}

function setGpsSpeed(mult) {
  if (!state.gps) return;
  state.gps.speedMultiplier = mult;

  [1, 2, 5].forEach(m => {
    const btn = document.getElementById(`btn-gps-speed-${m}`);
    if (btn) {
      if (m === mult) {
        btn.className = 'px-2.5 py-1 rounded-lg font-bold bg-teal-600 text-white transition';
      } else {
        btn.className = 'px-2.5 py-1 rounded-lg font-bold text-slate-400 hover:text-white transition';
      }
    }
  });

  showToast(`⚡ Simulation speed set to ${mult}x`, 'info');
}

function jumpGpsMilestone(idx) {
  if (!state.gps || idx < 0 || idx >= gpsRoute.length) return;

  const target = gpsRoute[idx];
  state.gps.currentSegmentIndex = Math.min(idx, gpsRoute.length - 2);
  state.gps.segmentProgress = 0.0;
  state.gps.lat = target.lat;
  state.gps.lng = target.lng;
  state.gps.odometer = target.km;
  state.gps.geofence = target.geofence;
  state.gps.currentMilestone = target.name;
  state.gps.etaMinutes = target.etaMin;

  if (idx === gpsRoute.length - 1) {
    state.gps.speed = 0;
  } else {
    state.gps.speed = 48;
  }

  updateGpsDomElements();
  updateLeafletMarkers();

  ['host', 'farmer', 'buyer'].forEach(role => {
    const map = leafletInstances[role];
    if (map) {
      map.panTo([target.lat, target.lng], { animate: true });
    }
  });

  showToast(`📍 Vehicle moved to: ${target.name} (km ${target.km})`, 'success');
}

function refreshGpsMaps() {
  setTimeout(() => {
    Object.keys(leafletInstances).forEach(role => {
      const map = leafletInstances[role];
      if (map) {
        map.invalidateSize();
        if (state.gps) {
          map.panTo([state.gps.lat, state.gps.lng]);
        }
      }
    });
    renderAllCanvasFallbacks();
  }, 100);
}

// ============================================================================
// KRISHI AI CHATBOT & MULTILINGUAL VERNACULAR VOICE ASSISTANT (KRISHI VANI)
// ============================================================================

let speechRecognitionInstance = null;
let chatMessageCounter = 0;
let currentVoiceTranscript = '';

// Language Display Names & Speech Recognition Codes
const langConfig = {
  en: { name: 'English', code: 'en-IN', flag: '🇬🇧', greetingPrompt: 'Welcome to Krishi AI' },
  hi: { name: 'हिन्दी', code: 'hi-IN', flag: '🇮🇳', greetingPrompt: 'राम राम किसान भाई!' },
  pa: { name: 'ਪੰਜਾਬੀ', code: 'pa-IN', flag: '🌾', greetingPrompt: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ ਜੀ!' },
  mr: { name: 'मराठी', code: 'mr-IN', flag: '🚜', greetingPrompt: 'राम राम शेतकरी बांधवांनो!' },
  gu: { name: 'ગુજરાતી', code: 'gu-IN', flag: '🌱', greetingPrompt: 'જય શ્રી કૃષ્ણ ખેડૂત મિત્ર!' },
  hinglish: { name: 'Hinglish', code: 'hi-IN', flag: '💬', greetingPrompt: 'Ram Ram Kisan Bhai!' }
};

// Comprehensive 6-Language Agricultural Knowledge Base
const krishiBrain = {
  greetings: {
    en: {
      text: `**Namaste Kisan Bhai! 🙏 Welcome to Krishi AI.**\n\nI am your dedicated agro-intelligence advisor. How are your crops doing today? I can help you with:\n\n• 🌾 **Live Mandi Rates & MSP benchmarks**\n• 🐛 **Crop disease diagnosis (Yellow rust, blast, aphids)**\n• 🌱 **Fertilizer dosage (Urea, DAP, Nano Urea)**\n• 🌦️ **7-Day Weather & rain forecasts**\n• 🚚 **Live shipment tracking (#KB-ORD-8821) & Escrow DBT payouts**\n\nHow can I help you right now?`,
      speech: "Namaste Kisan Bhai! Welcome to Krishi AI. How can I assist you with mandi prices, crop diseases, or payments today?",
      chips: [
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' },
        { label: '🐛 Yellow Rust Cure', prompt: 'How to cure yellow rust in wheat?' },
        { label: '🌱 Fertilizer Schedule', prompt: 'What is the correct Urea and DAP schedule for wheat?' },
        { label: '🚚 Track Shipment', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    },
    hi: {
      text: `**राम राम किसान भाई! 🙏 कृषि AI किसान मित्र में आपका स्वागत है।**\n\nमैं आपका अपना डिजिटल कृषि सलाहकार हूँ। आज आपकी फसल कैसी है? मैं इन सभी विषयों में आपकी पूरी सहायता कर सकता हूँ:\n\n• 🌾 **ताज़ा मंडी भाव और सरकारी समर्थन मूल्य (MSP)**\n• 🐛 **फसल रोग निदान व दवाइयाँ (पीला रतुआ, इल्ली, माहू आदि)**\n• 🌱 **यूरिया, DAP और नैनो यूरिया डालने का सही समय**\n• 🌦️ **7 दिनों का सटीक मौसम और बारिश का अनुमान**\n• 🚚 **गाड़ी की लाइव लोकेशन और बैंक खाते में तुरंत DBT भुगतान**\n\nबताइए भाई जी, आज किस विषय में जानकारी चाहिए?`,
      speech: "राम राम किसान भाई! कृषि AI किसान मित्र में आपका स्वागत है। मैं आपकी फसल, मंडी भाव और भुगतान में मदद के लिए तैयार हूँ। बताइए आज क्या जानकारी चाहिए?",
      chips: [
        { label: '🌾 गेहूं का आज का भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' },
        { label: '🐛 गेहूं में पीला रतुआ इलाज', prompt: 'गेहूं में पीला रतुआ रोग का क्या इलाज है?' },
        { label: '🌱 यूरिया और DAP का समय', prompt: 'यूरिया और डीएपी खाद कब डालनी चाहिए?' },
        { label: '💰 खाते में पैसे कब आएंगे?', prompt: 'डिलीवरी के बाद बैंक खाते में पैसा कब मिलेगा?' }
      ]
    },
    pa: {
      text: `**ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ ਜੀ! 🙏 ਕ੍ਰਿਸ਼ੀ AI ਕਿਸਾਨ ਮਿੱਤਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।**\n\nਮੈਂ ਤੁਹਾਡਾ ਆਪਣਾ ਡਿਜੀਟਲ ਖੇਤੀ ਸਲਾਹਕਾਰ ਹਾਂ। ਤੁਹਾਡੀ ਫ਼ਸਲ ਕਿਵੇਂ ਹੈ? ਮੈਂ ਤੁਹਾਡੀ ਹੇਠ ਲਿਖੇ ਵਿਸ਼ਿਆਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ:\n\n• 🌾 **ਅੱਜ ਦੇ ਮੰਡੀ ਭਾਅ ਅਤੇ ਸਰਕਾਰੀ MSP**\n• 🐛 **ਕਣਕ ਦੀ ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust) ਅਤੇ ਕੀੜਿਆਂ ਦੀ ਰੋਕਥਾਮ**\n• 🌱 **ਯੂਰੀਆ ਅਤੇ ਡੀ.ਏ.ਪੀ. (DAP) ਪਾਉਣ ਦਾ ਸਹੀ ਤਰੀਕਾ**\n• 🌦️ **7 ਦਿਨਾਂ ਦਾ ਮੌਸਮ ਅਤੇ ਮੀਂਹ ਦੀ ਜਾਣਕਾਰੀ**\n• 🚚 **ਟਰੱਕ ਦੀ ਲਾਈਵ ਲੋਕੇਸ਼ਨ ਅਤੇ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਭੁਗਤਾਨ (DBT)**\n\nਦੱਸੋ ਵੀਰ ਜੀ, ਅੱਜ ਕੀ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ?`,
      speech: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ ਜੀ! ਕ੍ਰਿਸ਼ੀ AI ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਦੱਸੋ ਅੱਜ ਮੰਡੀ ਭਾਅ ਜਾਂ ਫ਼ਸਲ ਬਾਰੇ ਕੀ ਪੁੱਛਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
      chips: [
        { label: '🌾 ਕਣਕ ਦਾ ਅੱਜ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' },
        { label: '🐛 ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ', prompt: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ ਕੀ ਹੈ?' },
        { label: '🌱 ਖਾਦ ਪਾਉਣ ਦਾ ਸਮਾਂ', prompt: 'ਕਣਕ ਵਿੱਚ ਯੂਰੀਆ ਅਤੇ ਡੀਏਪੀ ਕਦੋਂ ਪਾਉਣੀ ਚਾਹੀਦੀ ਹੈ?' },
        { label: '🚚 ਗੱਡੀ ਕਿੱਥੇ ਪਹੁੰਚੀ?', prompt: 'ਮੇਰਾ ਆਰਡਰ KB-ORD-8821 ਕਿੱਥੇ ਹੈ?' }
      ]
    },
    mr: {
      text: `**राम राम शेतकरी बांधवांनो! 🙏 कृषी AI किसान मित्रामध्ये आपले सहर्ष स्वागत आहे.**\n\nमी आपला डिजिटल कृषी मार्गदर्शक आहे. आज आपले पीक कसे आहे? मी खालील विषयांवर आपली मदत करू शकतो:\n\n• 🌾 **आजचे थेट कृषी बाजारभाव व हमीभाव (MSP)**\n• 🐛 **गव्हावरील तांबेरा (Yellow Rust) व कीड नियंत्रण**\n• 🌱 **खत व्यवस्थापन (युरिया, डीएपी, नॅनो युरिया)**\n• 🌦️ **पुढील ७ दिवसांचा अचूक हवामान अंदाज**\n• 🚚 **वाहतूक ट्रॅकिंग आणि थेट बँक खात्यात पैसे (DBT)**\n\nबोला शेतकरी दादा, आज कोणती माहिती हवी आहे?`,
      speech: "राम राम शेतकरी बांधवांनो! कृषी AI किसान मित्रामध्ये आपले स्वागत आहे. बोला आज बाजारभाव किंवा पिकाविषयी काय माहिती हवी आहे?",
      chips: [
        { label: '🌾 आजचा गहू बाजारभाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' },
        { label: '🐛 तांबेरा रोगावर औषध', prompt: 'गव्हावरील तांबेरा रोगावर उपाय काय आहे?' },
        { label: '🌱 खत देण्याची वेळ', prompt: 'युरिया आणि डीएपी खत कधी द्यावे?' },
        { label: '💰 खात्यात पैसे कधी येणार?', prompt: 'डिलिव्हरीनंतर खात्यात पैसे कधी जमा होणार?' }
      ]
    },
    gu: {
      text: `**જય શ્રી કૃષ્ણ / નમસ્તે ખેડૂત મિત્ર! 🙏 કૃષિ AI કિસાન મિત્રમાં આપનું હાર્દિક સ્વાગત છે.**\n\nહું આપનો ડિજિટલ ખેતી સલાહકાર છું. આપનો પાક કેવો છે? હું આપને આ તમામ બાબતોમાં મદદ કરી શકું છું:\n\n• 🌾 **આજના તાજા એપીએમસી બજારભાવ અને ટેકાના ભાવ (MSP)**\n• 🐛 **ઘઉંમાં પીળો ગેરુ (Yellow Rust) અને રોગ નિયંત્રણ દવાઓ**\n• 🌱 **યુરિયા અને ડીએપી ખાતર આપવાનો સાચો સમય**\n• 🌦️ **૭ દિવસની હવામાન અને વરસાદની આગાહી**\n• 🚚 **ગાડીનું લાઈવ લોકેશન અને સીધા ખાતામાં પેમેન્ટ (DBT)**\n\nકહો ખેડૂત ભાઈ, આજે શું માહિતી મેળવવી છે?`,
      speech: "નમસ્તે ખેડૂત મિત્ર! કૃષિ AI કિસાન મિત્રમાં આપનું સ્વાગત છે. કહો આજે બજારભાવ કે પાક વિશે શું જાણવું છે?",
      chips: [
        { label: '🌾 ઘઉંનો આજનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' },
        { label: '🐛 પીળા ગેરુનો ઈલાજ', prompt: 'ઘઉંમાં પીળા ગેરુ રોગનો ઉપાય શું છે?' },
        { label: '🌱 ખાતર આપવાનો સમય', prompt: 'યુરિયા અને ડીએપી ખાતર ક્યારે આપવું?' },
        { label: '🚚 ગાડી ક્યાં પહોંચી?', prompt: 'મારો ઓર્ડર KB-ORD-8821 ક્યાં પહોંચ્યો છે?' }
      ]
    },
    hinglish: {
      text: `**Ram Ram Kisan Bhai! 🙏 Krishi AI mein aapka swagat hai.**\n\nMain aapka digital kisan mitra hoon. Aaj aapki fasal kaisi hai? Main aapko in cheezon mein turant guide karunga:\n\n• 🌾 **Aaj ke mandi rates & MSP**\n• 🐛 **Crop bimari ka ilaj (Yellow rust, keeda)**\n• 🌱 **Urea aur DAP schedule**\n• 🌦️ **Mausam aur barish updates**\n• 🚚 **Gaadi tracking & direct bank payment (DBT)**\n\nNiche diye chips click karke ya mic se bolkar poochhein!`,
      speech: "Ram Ram Kisan Bhai! Main aapka Krishi AI mitra hoon. Mandi rates, bimari ya payment ke baare mein pooch sakte hain.",
      chips: [
        { label: '🌾 Wheat Rate MP', prompt: 'Wheat ka aaj ka bhav kya hai?' },
        { label: '🐛 Yellow Rust Cure', prompt: 'Wheat mein yellow rust bimari ka ilaj kya hai?' },
        { label: '🚚 Track Gaadi', prompt: 'Shipment KB-ORD-8821 kahan tak pahunchi?' },
        { label: '💰 Payment Status', prompt: 'Bank account mein payment kab credit hogi?' }
      ]
    }
  },

  wheat_rates: {
    en: {
      text: `**🌾 Wheat Mandi Rates & AI Price Discovery:**\n\n• **Govt MSP (2026-27):** ₹ 2,275 / Quintal\n• **Sharbati Gold (Grade A):** ₹ 2,480 - ₹ 2,560 / Quintal (+ ₹205 above MSP!)\n• **Lokwan Premium:** ₹ 2,360 - ₹ 2,430 / Quintal\n• **Sehore Mandi Arrivals:** 18,400 Quintals (Strong flour mill demand)\n\n💡 **AI Recommendation:**\nFlour mills in Indore & Dewas are actively procuring dry wheat (<12% moisture). **Optimal selling window is next 7 days** before northern arrivals peak. Pooling your lot on Krishi Bazaar gives you an extra ₹140/qtl freight discount!`,
      speech: "Wheat Sharbati Gold is trading at 2,480 to 2,560 rupees per quintal in Sehore, which is 205 rupees above government MSP. We recommend selling within 7 days.",
      chips: [
        { label: '🚜 List Wheat for Sale', prompt: 'How do I list my wheat on Krishi Bazaar?' },
        { label: '📦 How Pooling Saves Money', prompt: 'Explain how Smart Farmer Aggregation saves freight costs' },
        { label: '🌦️ Weather Forecast', prompt: 'Will it rain this week?' }
      ]
    },
    hi: {
      text: `**🌾 आज का गेहूं मंडी भाव व AI बाज़ार विश्लेषण (सीहोर व मालवा संभाग):**\n\n• **सरकारी न्यूनतम समर्थन मूल्य (MSP):** ₹ 2,275 / क्विंटल\n• **शरबती गोल्ड (सुपर क्वालिटी):** ₹ 2,480 - ₹ 2,560 / क्विंटल (**MSP से ₹205 ज़्यादा!**)\n• **लोकवन गेहूं:** ₹ 2,360 - ₹ 2,430 / क्विंटल\n• **मिल क्वालिटी गेहूं:** ₹ 2,320 - ₹ 2,370 / क्विंटल\n\n💡 **कृषि AI की सलाह:**\nइंदौर और भोपाल की बड़ी आटा मिलों में अभी सूखे व चमकदार गेहूं की भारी मांग है। **अगले 7 दिनों में फसल बेचना सबसे फायदेमंद रहेगा।**\nयदि आप 3-4 किसान भाइयों के साथ मिलकर पूरा ट्रक लोड (250 क्विंटल) बनाते हैं, तो भाड़े में ₹140 प्रति क्विंटल की सीधी बचत होगी!`,
      speech: "किसान भाई, आज सीहोर मंडी में शरबती गेहूं का भाव 2480 से 2560 रुपये प्रति क्विंटल चल रहा है, जो सरकारी समर्थन मूल्य से 205 रुपये अधिक है। अगले 7 दिन में बेचना सबसे फायदेमंद है।",
      chips: [
        { label: '🚜 गेहूं बेचने के लिए लिस्ट करें', prompt: 'फसल बेचने के लिए लिस्ट कैसे करें?' },
        { label: '💰 पूलिंग से भाड़ा बचत', prompt: 'किसान पूलिंग से पैसे की बचत कैसे होती है?' },
        { label: '🌦️ 7 दिन का मौसम', prompt: 'क्या इस हफ्ते बारिश की कोई संभावना है?' }
      ]
    },
    pa: {
      text: `**🌾 ਕਣਕ ਦੇ ਅੱਜ ਦੇ ਮੰਡੀ ਭਾਅ ਅਤੇ AI ਮਾਰਕੀਟ ਰਿਪੋਰਟ:**\n\n• **ਸਰਕਾਰੀ ਸਮਰਥਨ ਮੁੱਲ (MSP):** ₹ 2,275 / ਕੁਇੰਟਲ\n• **ਸੀਹੋਰ ਸ਼ਰਬਤੀ ਕਣਕ (ਏ-ਗ੍ਰੇਡ):** ₹ 2,480 - ₹ 2,560 / ਕੁਇੰਟਲ (**MSP ਨਾਲੋਂ ₹205 ਵੱਧ!**)\n• **ਲੋਕਵਾਨ ਅਤੇ ਮਿੱਲ ਕੁਆਲਿਟੀ ਕਣਕ:** ₹ 2,340 - ₹ 2,430 / ਕੁਇੰਟਲ\n\n💡 **ਕ੍ਰਿਸ਼ੀ AI ਦੀ ਸਲਾਹ:**\nਵੱਡੀਆਂ ਆਟਾ ਮਿੱਲਾਂ ਵੱਲੋਂ ਸੁੱਕੀ ਕਣਕ ਦੀ ਭਾਰੀ ਮੰਗ ਹੈ। **ਅਗਲੇ 7 ਦਿਨਾਂ ਵਿੱਚ ਫ਼ਸਲ ਵੇਚਣੀ ਸਭ ਤੋਂ ਲਾਹੇਵੰਦ ਰਹੇਗੀ।**\nਕ੍ਰਿਸ਼ੀ ਬਾਜ਼ਾਰ 'ਤੇ 4-5 ਕਿਸਾਨ ਰਲ ਕੇ ਪੂਰਾ ਟਰੱਕ (250 ਕੁਇੰਟਲ) ਬਣਾਉਣ 'ਤੇ ₹140 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਭਾੜੇ ਦੀ ਸਿੱਧੀ ਬੱਚਤ ਮਿਲਦੀ ਹੈ!`,
      speech: "ਕਿਸਾਨ ਵੀਰ ਜੀ, ਸ਼ਰਬਤੀ ਕਣਕ ਦਾ ਭਾਅ 2480 ਤੋਂ 2560 ਰੁਪਏ ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਚੱਲ ਰਿਹਾ ਹੈ, ਜੋ ਸਰਕਾਰੀ MSP ਨਾਲੋਂ 205 ਰੁਪਏ ਵੱਧ ਹੈ। ਅਗਲੇ 7 ਦਿਨਾਂ ਵਿੱਚ ਵੇਚਣਾ ਸਭ ਤੋਂ ਵਧੀਆ ਰਹੇਗਾ।",
      chips: [
        { label: '🚜 ਕਣਕ ਵੇਚਣ ਲਈ ਲਿਸਟ ਕਰੋ', prompt: 'ਫਸਲ ਵੇਚਣ ਲਈ ਲਿਸਟ ਕਿਵੇਂ ਕਰੀਏ?' },
        { label: '💰 ਪੂਲਿੰਗ ਨਾਲ ਭਾੜਾ ਬੱਚਤ', prompt: 'ਕਿਸਾਨ ਪੂਲਿੰਗ ਨਾਲ ਕਿਵੇਂ ਬੱਚਤ ਹੁੰਦੀ ਹੈ?' },
        { label: '🌦️ 7 ਦਿਨਾਂ ਦਾ ਮੌਸਮ', prompt: 'ਕੀ ਇਸ ਹਫਤੇ ਮੀਂਹ ਪਵੇਗਾ?' }
      ]
    },
    mr: {
      text: `**🌾 आजचे गव्हाचे थेट बाजारभाव व कृषी AI विश्लेषण:**\n\n• **शासकीय हमीभाव (MSP):** ₹ २,२७५ / क्विंटल\n• **शरबती गहू (ग्रेड A+):** ₹ २,४८० - ₹ २,५६० / क्विंटल (**हमीभावापेक्षा ₹२०५ जास्त!**)\n• **लोकवन गहू:** ₹ २,३६० - ₹ २,४३० / क्विंटल\n\n💡 **कृषी AI चा सल्ला:**\nमोठ्या फ्लोअर मिल्सकडून वाळलेल्या उच्च प्रतीच्या गव्हाला मोठी मागणी आहे. **येत्या ७ दिवसांत विक्री करणे फायदेशीर ठरेल.**\nशेतकरी समूहाने एकत्र येऊन २५० क्विंटलचा ट्रक लोड केल्यास भाड्यात प्रति क्विंटल ₹१४० ची थेट बचत होते!`,
      speech: "शेतकरी दादा, आज शरबती गव्हाचा बाजारभाव 2480 ते 2560 रुपये प्रति क्विंटल सुरू आहे, जो हमीभावापेक्षा 205 रुपये जास्त आहे. पुढील 7 दिवसांत विक्री करणे फायद्याचे राहील.",
      chips: [
        { label: '🚜 गहू विक्रीसाठी लिस्ट करा', prompt: 'पीक विक्रीसाठी लिस्ट कसे करावे?' },
        { label: '💰 समूह पूलिंगचे फायदे', prompt: 'शेतकरी समूहाने विक्री केल्यास काय फायदा होतो?' },
        { label: '🌦️ ७ दिवसांचा हवामान अंदाज', prompt: 'या आठवड्यात पाऊस पडेल का?' }
      ]
    },
    gu: {
      text: `**🌾 આજના ઘઉંના બજારભાવ અને AI એનાલિસિસ:**\n\n• **સરકારી ટેકાના ભાવ (MSP):** ₹ ૨,૨૭૫ / ક્વિન્ટલ\n• **શરબતી ગોલ્ડ ઘઉં:** ₹ ૨,૪૮૦ - ₹ ૨,૫૬૦ / ક્વિન્ટલ (**ટેકાના ભાવથી ₹૨૦૫ વધુ!**)\n• **લોકવાન પ્રીમિયમ ઘઉં:** ₹ ૨,૩૬૦ - ₹ ૨,૪૩૦ / ક્વિન્ટલ\n\n💡 **કૃષિ AI સલાહ:**\nલોટ મિલોમાં અત્યારે સૂકા અને ચમકદાર ઘઉંની પુષ્કળ માંગ છે. **આગામી ૭ દિવસમાં વેચાણ કરવું સૌથી વધુ નફાકારક રહેશે.**\nખેડૂત પૂલિંગ દ્વારા આખો ટ્રક લોડ તૈયાર કરવાથી ભાડામાં ક્વિન્ટલ દીઠ ₹૧૪૦ ની સીધી બચત થાય છે!`,
      speech: "ખેડૂત મિત્ર, આજે શરબતી ઘઉંનો ભાવ 2480 થી 2560 રૂપિયા પ્રતિ ક્વિન્ટલ ચાલે છે, જે ટેકાના ભાવ કરતાં 205 રૂપિયા વધુ છે. આગામી 7 દિવસમાં વેચાણ કરવું સૌથી સારું રહેશે.",
      chips: [
        { label: '🚜 ઘઉં વેચવા માટે મૂકો', prompt: 'પાક વેચાણ માટે કેવી રીતે મૂકવો?' },
        { label: '💰 ખેડૂત પૂલિંગથી ભાડા બચત', prompt: 'ખેડૂત પૂલિંગથી પૈસાની બચત કેવી રીતે થાય?' },
        { label: '🌦️ ૭ દિવસનું હવામાન', prompt: 'શું આ અઠવાડિયે વરસાદની શક્યતા છે?' }
      ]
    },
    hinglish: {
      text: `**🌾 Wheat Mandi Rates & Market Outlook:**\n\n• **Govt MSP:** ₹ 2,275 / Qtl\n• **Sharbati Gold:** ₹ 2,480 - ₹ 2,560 / Qtl (**MSP se ₹205 zyada!**)\n• **Lokwan:** ₹ 2,360 - ₹ 2,430 / Qtl\n\n💡 **AI Advice:**\nAgli 7 days best hain wheat sell karne ke liye. Pool karke bechne par ₹140/qtl freight discount milta hai!`,
      speech: "Sharbati wheat ka rate 2480 se 2560 rupaye chal raha hai. MSP se 205 rupaye zyada mil raha hai.",
      chips: [
        { label: '🚜 List Wheat Now', prompt: 'How do I list my wheat on Krishi Bazaar?' },
        { label: '💰 Pooling Savings', prompt: 'Explain how Smart Farmer Aggregation saves freight costs' }
      ]
    }
  },

  yellow_rust: {
    en: {
      text: `**🐛 Yellow Rust (Puccinia striiformis) Diagnosis & Treatment in Wheat:**\n\n**1. Immediate Chemical Treatment (Within 48 Hours):**\n• **Propiconazole 25% EC (Tilt):** Spray **1 ml per litre of water** (200 ml in 200 Litres of water per acre).\n• *Alternative:* **Tebuconazole 25.9% EC** @ 1.25 ml per litre.\n\n**2. Spraying Rules:**\n• Spray in afternoon sunshine after morning dew has dried from the leaves.\n• Repeat spray after 12-15 days if yellow pustules remain visible.\n\n**3. Critical Precaution:**\n• ❌ Immediately stop excess Urea/Nitrogen (it accelerates rust propagation!).\n• ✅ Ensure proper field drainage.`,
      speech: "For yellow rust in wheat, spray Propiconazole 25 percent EC at 200 ml in 200 litres of water per acre. Stop excess urea immediately.",
      chips: [
        { label: '🌱 Fertilizer Schedule', prompt: 'What is the correct Urea and DAP schedule for wheat?' },
        { label: '🌦️ Rain Forecast', prompt: 'Will it rain this week?' },
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    },
    hi: {
      text: `**🐛 गेहूं में पीला रतुआ (हल्दी रोग) का तुरंत व अचूक इलाज:**\n\n**1. रासायनिक उपचार (अगले 48 घंटे में छिड़काव करें):**\n• **प्रोपिकोनाज़ोल 25% EC (टिल्ट दवा):** **1 मिलीलीटर प्रति लीटर पानी** में मिलाकर (यानी 200 मिली दवा 200 लीटर पानी में प्रति एकड़) छिड़कें।\n• *या विकल्प:* **टेबुकोनाज़ोल 25.9% EC** @ 250 मिली प्रति एकड़।\n\n**2. छिड़काव के जरूरी नियम:**\n• छिड़काव दोपहर के समय करें जब पत्तियों से सुबह की ओस सूख चुकी हो।\n• अगर 12-15 दिन बाद भी पीला पाउडर दिखे तो दूसरा छिड़काव अवश्य करें।\n\n**3. अति आवश्यक सावधानियां:**\n• ❌ **यूरिया का इस्तेमाल तुरंत रोक दें** (ज़्यादा यूरिया से रतुआ फफूंद तेज़ी से फैलती है)।\n• ✅ खेत में पानी जमा न होने दें।`,
      speech: "गेहूं में पीला रतुआ होने पर तुरंत प्रोपिकोनाज़ोल 25 प्रतिशत ईसी दवा, 200 मिलीलीटर को 200 लीटर पानी में मिलाकर प्रति एकड़ छिड़कें। यूरिया का इस्तेमाल तुरंत रोक दें।",
      chips: [
        { label: '🌱 खाद डालने का सही समय', prompt: 'यूरिया और डीएपी खाद कब डालनी चाहिए?' },
        { label: '🌦️ बारिश का अनुमान', prompt: 'क्या इस हफ्ते बारिश की कोई संभावना है?' },
        { label: '🌾 गेहूं का मंडी भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' }
      ]
    },
    pa: {
      text: `**🐛 ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust) ਦਾ ਪੱਕਾ ਇਲਾਜ:**\n\n**1. ਸਪਰੇਅ ਦਾ ਤਰੀਕਾ (ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ):**\n• **ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% ਈ.ਸੀ. (ਟਿਲਟ/Tilt):** **200 ਮਿਲੀਲੀਟਰ ਦਵਾਈ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ** ਪ੍ਰਤੀ ਏਕੜ ਛਿੜਕਾਅ ਕਰੋ።\n• *ਜਾਂ:* **ਟੈਬੂਕੋਨਾਜ਼ੋਲ 25.9% ਈ.ਸੀ.** @ 250 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਏਕੜ।\n\n**2. ਛਿੜਕਾਅ ਦੇ ਨਿਯਮ:**\n• ਦੁਪਹਿਰ ਵੇਲੇ ਸਪਰੇਅ ਕਰੋ ਜਦੋਂ ਪੱਤਿਆਂ ਤੋਂ ਤਰੇਲ ਸੁੱਕ ਜਾਵੇ।\n• ਜੇ ਲੋੜ ਪਵੇ ਤਾਂ 15 ਦਿਨਾਂ ਬਾਅਦ ਦੂਜੀ ਸਪਰੇਅ ਦੁਹਰਾਓ।\n\n**3. ਸਾਵਧਾਨੀ:**\n• ❌ **ਯੂਰੀਆ ਖਾਦ ਤੁਰੰਤ ਬੰਦ ਕਰੋ** (ਵੱਧ ਯੂਰੀਆ ਨਾਲ ਕੁੰਗੀ ਬਹੁਤ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲਦੀ ਹੈ)।`,
      speech: "ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਰੋਕਥਾਮ ਲਈ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25 ਪ੍ਰਤੀਸ਼ਤ ਦਵਾਈ 200 ਮਿਲੀਲੀਟਰ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਪ੍ਰਤੀ ਏਕੜ ਸਪਰੇਅ ਕਰੋ। ਯੂਰੀਆ ਤੁਰੰਤ ਬੰਦ ਕਰੋ।",
      chips: [
        { label: '🌱 ਖਾਦ ਪਾਉਣ ਦਾ ਸਮਾਂ', prompt: 'ਕਣਕ ਵਿੱਚ ਯੂਰੀਆ ਅਤੇ ਡੀਏਪੀ ਕਦੋਂ ਪਾਉਣੀ ਚਾਹੀਦੀ ਹੈ?' },
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' }
      ]
    },
    mr: {
      text: `**🐛 गव्हावरील तांबेरा (Yellow Rust) रोगावर प्रभावी उपाय:**\n\n**1. रासायनिक फवारणी (पुढील ४८ तासांत करा):**\n• **प्रोपिकोनाझोल २५% EC (टिल्ट):** **१ मिली प्रति लिटर पाणी** (२०० मिली औषध २०० लिटर पाण्यात मिसळून प्रति एकरी) फवारावे.\n• *पर्याय:* **टेबुकोनाझोल २५.९% EC** @ २५० मिली प्रति एकर.\n\n**2. खबरदारी:**\n• ❌ **अतिरिक्त युरिया खताचा वापर त्वरित थांबवा** (जास्त युरियामुळे बुरशीचा प्रसार वाढतो).\n• फवारणी दुपारच्या वेळी पानांवरील दव सुकल्यानंतरच करावी.`,
      speech: "गव्हावरील तांबेरा रोगासाठी प्रोपिकोनाझोल 25 टक्के औषध 200 मिली 200 लिटर पाण्यात मिसळून एकरी फवारावे. युरिया खताचा वापर थांबवावा.",
      chips: [
        { label: '🌱 खत व्यवस्थापन', prompt: 'युरिया आणि डीएपी खत कधी द्यावे?' },
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' }
      ]
    },
    gu: {
      text: `**🐛 ઘઉંમાં પીળો ગેરુ (Yellow Rust) રોગ નિયંત્રણ ઉપાય:**\n\n**1. રાસાયણિક છંટકાવ (આગામી ૪૮ કલાકમાં):**\n• **પ્રોપીકોનાઝોલ ૨૫% EC (ટિલ્ટ):** **૧ મિલી પ્રતિ લિટર પાણી** (૨૦૦ મિલી દવા ૨૦૦ લિટર પાણીમાં ભેળવી પ્રતિ એકર) છંટકાવ કરવો.\n• *અથવા:* **ટેબુકોનાઝોલ ૨૫.૯% EC** @ ૨૫૦ મિલી પ્રતિ એકર.\n\n**2. સાવચેતી:**\n• ❌ **યુરિયા ખાતર આપવાનું તાત્કાલિક બંધ કરો** (વધુ યુરિયાથી ફૂગ ઝડપથી ફેલાય છે).\n• છંટકાવ બપોરે પાન પરથી ઝાકળ સુકાઈ જાય પછી જ કરવો.`,
      speech: "ઘઉંમાં પીળા ગેરુ માટે પ્રોપીકોનાઝોલ 25 ટકા દવા 200 મિલી 200 લિટર પાણીમાં પ્રતિ એકર છાંટવી. યુરિયા આપવાનું તુરંત બંધ કરવું.",
      chips: [
        { label: '🌱 ખાતર આપવાનો સમય', prompt: 'યુરિયા અને ડીએપી ખાતર ક્યારે આપવું?' },
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' }
      ]
    },
    hinglish: {
      text: `**🐛 Wheat Yellow Rust Treatment:**\n\n• **Dawa:** Propiconazole 25% EC (Tilt) @ 200 ml in 200L water per acre spray karein.\n• **Alternative:** Tebuconazole 25.9% EC.\n• **Important:** Urea use band karein aur dopahar mein spray karein jab os na ho.`,
      speech: "Yellow rust ke liye Propiconazole 25 percent EC 200 ml per acre spray karein. Urea band karein.",
      chips: [
        { label: '🌱 Fertilizer Schedule', prompt: 'What is the correct Urea and DAP schedule for wheat?' },
        { label: '🌾 Mandi Price', prompt: 'What is today wheat mandi price in MP?' }
      ]
    }
  },

  fertilizer: {
    en: {
      text: `**🌱 Fertilizer & Nutrition Schedule for Wheat & Rabi Crops:**\n\n• **DAP (Di-Ammonium Phosphate):** 50-55 kg/acre as basal dose at sowing + 20 kg Potash (MOP).\n• **Urea (Two Splits):**\n  1. *First Split:* 35 kg/acre at 1st irrigation (CRI stage, 21-25 days).\n  2. *Second Split:* 35 kg/acre at tillering/jointing (45-50 days).\n• **Nano Urea Spray:** 4 ml per litre at tillering boosts grain weight and shine!\n• **Zinc Sulfate:** If leaves show chlorosis (yellowing), spray 1 kg Zinc Sulfate 21% + 1 kg Urea in 200L water.`,
      speech: "Apply DAP at sowing. Split urea into two doses: at 21 days with first irrigation, and at 45 days. Use Nano Urea for better grain quality.",
      chips: [
        { label: '🐛 Yellow Rust Cure', prompt: 'How to cure yellow rust in wheat?' },
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    },
    hi: {
      text: `**🌱 गेहूं व रबी फसलों के लिए संतुलित खाद प्रबंधन:**\n\n• **DAP:** बुवाई के समय ही 50-55 किग्रा प्रति एकड़ दें। साथ में 20 किग्रा पोटाश (MOP) ज़रूर डालें।\n• **यूरिया (2 किस्तों में):**\n  1. *पहली किस्त:* पहले पानी (21-25 दिन, ताजमूल अवस्था) पर 35-40 किग्रा/एकड़।\n  2. *दूसरी किस्त:* 45-50 दिन बाद कल्ले फूटते समय 35 किग्रा/एकड़।\n• **नैनो यूरिया का स्प्रे:** कल्ले फूटते समय 4 मिली प्रति लीटर पानी में नैनो यूरिया का छिड़काव करने से दाना मोटा, भारी और चमकदार बनता है।`,
      speech: "डीएपी बुवाई के समय दें। यूरिया को दो किस्तों में पहले और दूसरे पानी पर 35-35 किलो दें। नैनो यूरिया से दाने की चमक बढ़ती है।",
      chips: [
        { label: '🐛 पीला रतुआ का इलाज', prompt: 'गेहूं में पीला रतुआ रोग का क्या इलाज है?' },
        { label: '🌾 गेहूं का आज का भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' }
      ]
    },
    pa: {
      text: `**🌱 ਕਣਕ ਲਈ ਸੰਤੁਲਿਤ ਖਾਦ ਪ੍ਰਬੰਧਨ:**\n\n• **ਡੀ.ਏ.ਪੀ. (DAP):** ਬਿਜਾਈ ਵੇਲੇ 50-55 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ ਪਾਓ + 20 ਕਿਲੋ ਪੋਟਾਸ਼ (MOP)।\n• **ਯੂਰੀਆ ਖਾਦ:** ਦੋ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਪਾਓ:\n  1. *ਪਹਿਲਾ ਪਾਣੀ (21 ਦਿਨ):* 45 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ।\n  2. *ਦੂਜਾ ਪਾਣੀ (45 ਦਿਨ):* 45 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ।\n• **ਨੈਨੋ ਯੂਰੀਆ ਸਪਰੇਅ:** 4 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਸਪਰੇਅ ਕਰਨ ਨਾਲ ਦਾਣੇ ਮੋਟੇ ਅਤੇ ਵਜ਼ਨਦਾਰ ਬਣਦੇ ਹਨ।`,
      speech: "ਡੀਏਪੀ ਬਿਜਾਈ ਵੇਲੇ ਪਾਓ ਅਤੇ ਯੂਰੀਆ ਨੂੰ ਦੋ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਪਹਿਲੇ ਅਤੇ ਦੂਜੇ ਪਾਣੀ ਵੇਲੇ ਪਾਓ।",
      chips: [
        { label: '🐛 ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ', prompt: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ ਕੀ ਹੈ?' },
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' }
      ]
    },
    mr: {
      text: `**🌱 गव्हासाठी योग्य खत नियोजन:**\n\n• **डीएपी (DAP):** पेरणीच्या वेळी ५०-५५ किलो प्रति एकर + २० किलो पोटॅश द्यावे.\n• **युरिया:** दोन हप्त्यांत विभागून द्यावा:\n  १. *पहिले पाणी (२१ दिवस):* ३५ किलो प्रति एकर.\n  २. *दुसरे पाणी (४५ दिवस):* ३५ किलो प्रति एकर.\n• **नॅनो युरिया:** ४ मिली प्रति लिटर पाण्यात मिसळून फवारल्याने दाणे चमकदार व भरघोस होतात.`,
      speech: "डीएपी पेरणीच्या वेळी द्यावे आणि युरिया दोन हप्त्यांत पहिल्या व दुसऱ्या पाण्याला द्यावा.",
      chips: [
        { label: '🐛 तांबेरा रोगावर उपाय', prompt: 'गव्हावरील तांबेरा रोगावर उपाय काय आहे?' },
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' }
      ]
    },
    gu: {
      text: `**🌱 ઘઉં માટે સંતુલિત ખાતર વ્યવસ્થાપન:**\n\n• **ડીએપી (DAP):** વાવણી વખતે જ ૫૦-૫૫ કિલો પ્રતિ એકર + ૨૦ કિલો પોટાશ આપવું.\n• **યુરિયા ખાતર:** બે હપ્તામાં આપવું:\n  ૧. *પ્રથમ પિયત (૨૧ દિવસ):* ૩૫-૪૦ કિલો પ્રતિ એકર.\n  ૨. *બીજું પિયત (૪૫ દિવસ):* ૩૫ કિલો પ્રતિ એકર.\n• **નેનો યુરિયા:** ૪ મિલી પ્રતિ લિટર પાણીમાં છંટકાવ કરવાથી દાણો વજનદાર અને ચમકદાર બને છે.`,
      speech: "વાવણી વખતે ડીએપી આપો અને યુરિયા પ્રથમ અને બીજા પિયતમાં આપો. નેનો યુરિયાથી દાણો સારો બને છે.",
      chips: [
        { label: '🐛 પીળા ગેરુનો ઈલાજ', prompt: 'ઘઉંમાં પીળા ગેરુ રોગનો ઉપાય શું છે?' },
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' }
      ]
    },
    hinglish: {
      text: `**🌱 Fertilizer Schedule:**\n\n• **DAP:** Sowing time 50 kg/acre dein.\n• **Urea:** 2 bar mein dein — 21 din (1st irrigation) par 35 kg aur 45 din par 35 kg.\n• **Nano Urea:** 4 ml/L pani mein spray karein.`,
      speech: "DAP sowing ke waqt aur urea 21 din aur 45 din par dein.",
      chips: [
        { label: '🐛 Yellow Rust Cure', prompt: 'How to cure yellow rust in wheat?' },
        { label: '🌾 Mandi Price', prompt: 'What is today wheat mandi price in MP?' }
      ]
    }
  },

  weather: {
    en: {
      text: `**🌦️ 7-Day Weather Forecast & Farm Advisory:**\n\n• **Weather:** Clear sunny skies across MP, Punjab, Haryana, Rajasthan & Gujarat.\n• **Temperatures:** Max 30°C / Min 17°C (Ideal for grain maturity).\n• **Rain Probability:** < 5% (Zero risk of hailstorms or unseasonal rain).\n• **Advisory:** Safe for harvesting, threshing, and mandi dispatch!`,
      speech: "The 7-day weather forecast is clear and sunny with zero rain probability. Safe conditions for harvesting and grain transport.",
      chips: [
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' },
        { label: '🚚 Track Shipment', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    },
    hi: {
      text: `**🌦️ 7 दिनों का मौसम अनुमान व कृषि सलाह:**\n\n• **मौसम स्थिति:** मध्य प्रदेश, राजस्थान व उत्तर भारत में पूरे हफ्ते मौसम साफ और धूप वाला रहेगा।\n• **तापमान:** दिन का 30°C, रात का 17°C (दाने पकने के लिए अनुकूल)।\n• **बारिश का खतरा:** 5% से कम (ओलावृष्टि या बारिश का कोई खतरा नहीं)।\n• **सलाह:** गेहूं कटाई, थ्रेशिंग और मंडी ले जाने के लिए उत्तम समय है!`,
      speech: "किसान भाई, अगले 7 दिनों तक मौसम बिल्कुल साफ और सूखा रहेगा। बारिश की कोई संभावना नहीं है। आप कटाई और ढुलाई कर सकते हैं।",
      chips: [
        { label: '🌾 गेहूं का आज का भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' },
        { label: '🚚 गाड़ी की लोकेशन', prompt: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' }
      ]
    },
    pa: {
      text: `**🌦️ 7 ਦਿਨਾਂ ਦਾ ਮੌਸਮ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਲਾਹ:**\n\n• **ਮੌਸਮ ਦਾ ਹਾਲ:** ਪੰਜਾਬ, ਹਰਿਆਣਾ ਅਤੇ ਰਾਜਸਥਾਨ ਵਿੱਚ ਪੂਰਾ ਹਫ਼ਤਾ ਮੌਸਮ ਸਾਫ਼ ਅਤੇ ਧੁੱਪ ਵਾਲਾ ਰਹੇਗਾ।\n• **ਮੀਂਹ ਦਾ ਖ਼ਤਰਾ:** 5% ਤੋਂ ਘੱਟ (ਮੀਂਹ ਜਾਂ ਗੜ੍ਹੇਮਾਰੀ ਦਾ ਕੋਈ ਖ਼ਤਰਾ ਨਹੀਂ)।\n• **ਸਲਾਹ:** ਕਣਕ ਦੀ ਵਾਢੀ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਲਿਜਾਣ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ ਹੈ।`,
      speech: "ਅਗਲੇ 7 ਦਿਨਾਂ ਵਿੱਚ ਮੌਸਮ ਬਿਲਕੁਲ ਸਾਫ਼ ਰਹੇਗਾ, ਮੀਂਹ ਦੀ ਕੋਈ ਸੰਭਾਵਨਾ ਨਹੀਂ ਹੈ।",
      chips: [
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' },
        { label: '🚚 ਗੱਡੀ ਕਿੱਥੇ ਹੈ?', prompt: 'ਮੇਰਾ ਆਰਡਰ KB-ORD-8821 ਕਿੱਥੇ ਹੈ?' }
      ]
    },
    mr: {
      text: `**🌦️ पुढील ७ दिवसांचा हवामान अंदाज:**\n\n• **हवामान:** संपूर्ण आठवडाभर हवामान कोरडे व सूर्यप्रकाशाचे राहील.\n• **पावसाची शक्यता:** ५% पेक्षा कमी (कोणताही अवकाळी पाऊस नाही).\n• **सल्ला:** पीक कापणी व शेतमाल बाजारात पाठवण्यासाठी वातावरण अतिशय अनुकूल आहे.`,
      speech: "पुढील 7 दिवसांत हवामान पूर्णपणे स्वच्छ राहील, पावसाची शक्यता नाही.",
      chips: [
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' },
        { label: '🚚 वाहतूक ट्रॅकिंग', prompt: 'माझा ऑर्डर KB-ORD-8821 कुठे आहे?' }
      ]
    },
    gu: {
      text: `**🌦️ ૭ દિવસની હવામાન આગાહી:**\n\n• **હવામાન સ્થિતિ:** ગુજરાત અને મધ્ય પ્રદેશમાં આખું અઠવાડિયું હવામાન સાફ અને સૂર્યપ્રકાશ વાળું રહેશે.\n• **વરસાદની શક્યતા:** ૫% થી પણ ઓછી.\n• **સલાહ:** પાકની લણણી અને વેચાણ માટે સૌથી અનુકૂળ સમય છે.`,
      speech: "આગામી 7 દિવસ સુધી હવામાન સાફ રહેશે, વરસાદની કોઈ શક્યતા નથી.",
      chips: [
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' },
        { label: '🚚 ગાડીનું લોકેશન', prompt: 'મારો ઓર્ડર KB-ORD-8821 ક્યાં પહોંચ્યો છે?' }
      ]
    },
    hinglish: {
      text: `**🌦️ 7-Day Weather Forecast:**\n\nMausam bilkul saaf aur dry rahega. Barish (<5%) ka koi chance nahi hai. Harvesting ke liye best time hai.`,
      speech: "Mausam bilkul saaf rahega. Barish ka koi khatra nahi hai.",
      chips: [
        { label: '🌾 Mandi Bhav', prompt: 'What is today wheat mandi price in MP?' },
        { label: '🚚 Track Gaadi', prompt: 'Shipment KB-ORD-8821 kahan tak pahunchi?' }
      ]
    }
  },

  tracking: {
    en: {
      text: `**🚚 Live Shipment Telemetry #${state.shipment.orderId}:**\n\n• **Produce:** ${state.shipment.qty} Qtl • ${state.shipment.crop}\n• **Driver:** ${state.shipment.driver}\n• **Route Status:** **${state.shipment.statusText}**\n• **Current Location:** Dewas Bypass (MP)\n• **IoT Sensors:** Moisture 11.2% (Optimal) | Temp 26.4°C\n• **ETA:** ${state.shipment.eta} to Malwa Agro Mills, Indore\n• **Escrow:** ₹ ${state.shipment.totalEscrow.toLocaleString('en-IN')} locked safely. Direct Bank Transfer (DBT) triggers automatically at mill gate!`,
      speech: `Shipment ${state.shipment.orderId} is currently in transit on Dewas bypass. ETA is 45 minutes. Escrow payout is 100% secured.`,
      chips: [
        { label: '💰 Escrow Payout Info', prompt: 'When will I receive payment in my bank?' },
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    },
    hi: {
      text: `**🚚 गाड़ी व आर्डर #${state.shipment.orderId} की लाइव ट्रैकिंग:**\n\n• **फसल:** ${state.shipment.qty} क्विंटल • ${state.shipment.crop}\n• **ड्राइवर:** ${state.shipment.driver}\n• **स्थिति:** **${state.shipment.statusText}**\n• **लोकेशन:** देवास बाईपास (इंदौर मार्ग पर)\n• **सेंसर जांच:** नमी 11.2% (सुरक्षित), तापमान 26.4°C\n• **पहुंचने का समय:** लगभग ${state.shipment.eta}\n• **सुरक्षित एस्क्रो राशि:** ₹ ${state.shipment.totalEscrow.toLocaleString('en-IN')}\n\nमिल के कांटे पर गाड़ी खाली होते ही 60 सेकंड में पैसा आपके बैंक खाते (DBT) में आ जाएगा!`,
      speech: `गाड़ी सीहोर से निकलकर देवास बाईपास पर है और 45 मिनट में मालवा एग्रो मिल्स इंदौर पहुंच जाएगी। आपकी रकम एस्क्रो में सुरक्षित है।`,
      chips: [
        { label: '💰 बैंक में पैसा कब आएगा?', prompt: 'डिलीवरी के बाद बैंक खाते में पैसा कब मिलेगा?' },
        { label: '🌾 गेहूं का मंडी भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' }
      ]
    },
    pa: {
      text: `**🚚 ਆਰਡਰ #${state.shipment.orderId} ਦੀ ਲਾਈਵ ਲੋਕੇਸ਼ਨ:**\n\n• **ਫ਼ਸਲ:** ${state.shipment.qty} ਕੁਇੰਟਲ • ${state.shipment.crop}\n• **ਡਰਾਈਵਰ:** ${state.shipment.driver}\n• **ਸਥਿਤੀ:** **${state.shipment.statusText}**\n• **ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ:** ਲਗਭਗ ${state.shipment.eta}\n• **ਸੁਰੱਖਿਅਤ ਰਕਮ:** ₹ ${state.shipment.totalEscrow.toLocaleString('en-IN')}\n\nਮਿੱਲ ਵਿੱਚ ਮਾਲ ਉਤਰਦੇ ਹੀ 60 ਸਕਿੰਟਾਂ ਵਿੱਚ ਰੁਪਏ ਸਿੱਧੇ ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ ਹੋ ਜਾਣਗੇ!`,
      speech: `ਗੱਡੀ ਦੇਵਾਸ ਬਾਈਪਾਸ 'ਤੇ ਹੈ ਅਤੇ 45 ਮਿੰਟ ਵਿੱਚ ਮਿੱਲ ਪਹੁੰਚ ਜਾਵੇਗੀ। ਪੈਸੇ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸੁਰੱਖਿਅਤ ਹਨ।`,
      chips: [
        { label: '💰 ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਕਦੋਂ ਆਉਣਗੇ?', prompt: 'ਡਿਲਿਵਰੀ ਤੋਂ ਬਾਅਦ ਬੈਂਕ ਵਿੱਚ ਪੈਸੇ ਕਦੋਂ ਆਉਣਗੇ?' },
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' }
      ]
    },
    mr: {
      text: `**🚚 वाहतूक व ऑर्डर #${state.shipment.orderId} चे थेट ट्रॅकिंग:**\n\n• **शेतमाल:** ${state.shipment.qty} क्विंटल • ${state.shipment.crop}\n• **चालक:** ${state.shipment.driver}\n• **सद्यस्थिती:** **${state.shipment.statusText}**\n• **वेळ:** सुमारे ${state.shipment.eta} (देवास बायपास मार्ग)\n• **सुरक्षित रक्कम:** ₹ ${state.shipment.totalEscrow.toLocaleString('en-IN')}\n\nमिलच्या काट्यावर वजन होताच ६० सेकंदांत थेट बँक खात्यात (DBT) रक्कम जमा होईल!`,
      speech: `गाडी देवास बायपासवर असून 45 मिनिटांत पोहोचेल. पैसे एस्क्रो खात्यात पूर्णपणे सुरक्षित आहेत.`,
      chips: [
        { label: '💰 खात्यात पैसे कधी?', prompt: 'डिलिव्हरीनंतर खात्यात पैसे कधी जमा होणार?' },
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' }
      ]
    },
    gu: {
      text: `**🚚 ઓર્ડર #${state.shipment.orderId} નું લાઈવ ટ્રેકિંગ:**\n\n• **માલ:** ${state.shipment.qty} ક્વિન્ટલ • ${state.shipment.crop}\n• **ડ્રાઈવર:** ${state.shipment.driver}\n• **સ્થિતિ:** **${state.shipment.statusText}**\n• **પહોંચવાનો સમય:** આશરે ${state.shipment.eta}\n• **સુરક્ષિત રકમ:** ₹ ${state.shipment.totalEscrow.toLocaleString('en-IN')}\n\nમિલ પર વજન થતાં જ ૬૦ સેકન્ડમાં રૂપિયા સીધા આપના બેંક ખાતામાં જમા થઈ જશે!`,
      speech: `ગાડી દેવાસ બાયપાસ પર છે અને 45 મિનિટમાં મિલ પહોંચી જશે. રૂપિયા સંપૂર્ણ સુરક્ષિત છે.`,
      chips: [
        { label: '💰 ખાતામાં રૂપિયા ક્યારે?', prompt: 'ડિલિવરી પછી બેંક ખાતામાં રૂપિયા ક્યારે આવશે?' },
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' }
      ]
    },
    hinglish: {
      text: `**🚚 Live Tracking #${state.shipment.orderId}:**\n\nGaadi Rajesh Yadav (Eicher 14ft) Dewas bypass par hai. 45 mins mein Indore mill deliver ho jayegi. Gate delivery par direct DBT account mein credit hoga!`,
      speech: "Gaadi Dewas bypass par hai aur 45 minute mein deliver ho jayegi.",
      chips: [
        { label: '💰 Payment Status', prompt: 'When will I receive payment in my bank?' },
        { label: '🌾 Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    }
  },

  payout: {
    en: {
      text: `**💰 Krishi Smart Escrow & Direct Bank Payout (DBT):**\n\n1. **Zero Commission Delays:** Unlike traditional mandis where commission agents delay payment for 2-4 weeks, the buyer deposits 100% funds into escrow before dispatch.\n2. **Gate Release in 60 Seconds:** When the mill verifies electronic weighbridge quality, **funds are transferred directly to your Aadhaar-linked bank account within 60 seconds**.\n3. **Transparent Payout:** 94% straight to farmer, 4.5% insured transport, 1.5% platform fee. Zero middleman cuts!`,
      speech: "Your payment is 100% secured in escrow before dispatch. Funds are credited directly to your bank account within 60 seconds of mill gate delivery.",
      chips: [
        { label: '🚚 Track Live Shipment', prompt: 'Where is my shipment KB-ORD-8821?' },
        { label: '🌾 Today Wheat Prices', prompt: 'What is today wheat mandi price in MP?' }
      ]
    },
    hi: {
      text: `**💰 सुरक्षित एस्क्रो और बैंक खाते में सीधा भुगतान (DBT):**\n\n1. **उधारी का झंझट खत्म:** पारंपरिक मंडी की तरह 15-30 दिन का इंतज़ार नहीं। खरीदार का 100% पैसा पहले ही एस्क्रो में सुरक्षित जमा रहता है।\n2. **60 सेकंड में बैंक खाता क्रेडिट:** जैसे ही इंदौर मिल में कंप्यूटर कांटे पर तौल की पर्ची कटती है, **60 सेकंड में पैसा आपके बैंक खाते (DBT) में क्रेडिट** हो जाता है।\n3. **पारदर्शी बंटवारा:** 94% सीधा किसान को, 4.5% बीमा व गाड़ी भाड़ा, 1.5% लैब जांच व प्लेटफॉर्म। कोई गुप्त कटौती नहीं!`,
      speech: "किसान भाई, खरीदार का पैसा पहले ही सुरक्षित जमा रहता है। मिल के कांटे पर तौल होते ही 60 सेकंड में पैसा आपके खाते में आ जाता है।",
      chips: [
        { label: '🚚 गाड़ी की लोकेशन देखें', prompt: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' },
        { label: '🌾 गेहूं का आज का भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' }
      ]
    },
    pa: {
      text: `**💰 ਸੁਰੱਖਿਅਤ ਐਸਕਰੋ ਅਤੇ ਸਿੱਧਾ ਬੈਂਕ ਭੁਗਤਾਨ (DBT):**\n\n1. **ਕੋਈ ਉਧਾਰੀ ਨਹੀਂ:** ਰਵਾਇਤੀ ਆੜ੍ਹਤੀਆਂ ਵਾਂਗ ਮਹੀਨਾ ਇੰਤਜ਼ਾਰ ਨਹੀਂ ਕਰਨਾ ਪੈਂਦਾ। ਖਰੀਦਦਾਰ ਦਾ ਪੂਰਾ ਪੈਸਾ ਪਹਿਲਾਂ ਹੀ ਸੁਰੱਖਿਅਤ ਜਮ੍ਹਾਂ ਹੁੰਦਾ ਹੈ।\n2. **60 ਸਕਿੰਟਾਂ ਵਿੱਚ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ:** ਮਿੱਲ ਗੇਟ 'ਤੇ ਕੰਪਿਊਟਰ ਕੰਡੇ 'ਤੇ ਕਣਕ ਤੁਲਦੇ ਹੀ ਪੈਸੇ ਸਿੱਧੇ ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ (DBT) ਵਿੱਚ ਆ ਜਾਂਦੇ ਹਨ।`,
      speech: "ਕਣਕ ਤੁਲਦੇ ਹੀ 60 ਸਕਿੰਟਾਂ ਵਿੱਚ ਪੈਸੇ ਸਿੱਧੇ ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਆ ਜਾਣਗੇ।",
      chips: [
        { label: '🚚 ਗੱਡੀ ਕਿੱਥੇ ਹੈ?', prompt: 'ਮੇਰਾ ਆਰਡਰ KB-ORD-8821 ਕਿੱਥੇ ਹੈ?' },
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' }
      ]
    },
    mr: {
      text: `**💰 सुरक्षित एस्क्रो आणि थेट बँक खात्यात पैसे (DBT):**\n\n१. **उधारीची पद्धत बंद:** व्यापाऱ्याकडे महिनाभर चकरा मारण्याची गरज नाही. खरेदीदाराचे पैसे आधीच सुरक्षित खात्यात जमा असतात.\n२. **६० सेकंदांत खात्यात जमा:** मिलवर वजन होताच ६० सेकंदांत रक्कम थेट आपल्या बँक खात्यात जमा होते.`,
      speech: "मिलच्या काट्यावर वजन होताच 60 सेकंदांत रक्कम थेट आपल्या बँक खात्यात जमा होते.",
      chips: [
        { label: '🚚 गाडी कुठे आहे?', prompt: 'माझा ऑर्डर KB-ORD-8821 कुठे आहे?' },
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' }
      ]
    },
    gu: {
      text: `**💰 સુરક્ષિત એસ્ક્રો અને બેંક ખાતામાં સીધા રૂપિયા (DBT):**\n\n૧. **ઉધારીમાંથી મુક્તિ:** ખરીદદારના ૧૦૦% રૂપિયા એસ્ક્રો ખાતામાં પહેલેથી જ સુરક્ષિત હોય છે.\n૨. **૬૦ સેકન્ડમાં બેંક જમા:** મિલ પર માલ વજન થતાં જ ૬૦ સેકન્ડમાં રૂપિયા સીધા આપના ખાતામાં ટ્રાન્સફર થાય છે.`,
      speech: "મિલ પર વજન થતાં જ 60 સેકન્ડમાં રૂપિયા સીધા તમારા ખાતામાં આવી જશે.",
      chips: [
        { label: '🚚 ગાડીનું લોકેશન', prompt: 'મારો ઓર્ડર KB-ORD-8821 ક્યાં પહોંચ્યો છે?' },
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' }
      ]
    },
    hinglish: {
      text: `**💰 Direct Bank Transfer (DBT) System:**\n\nBuyer ka paisa pehle escrow mein lock hota hai. Mill gate par delivery confirm hote hi 60 seconds mein direct aapke bank account mein credit ho jata hai!`,
      speech: "Mill gate par deliver hote hi 60 seconds mein direct bank account mein credit ho jata hai.",
      chips: [
        { label: '🚚 Track Gaadi', prompt: 'Shipment KB-ORD-8821 kahan tak pahunchi?' },
        { label: '🌾 Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    }
  },

  pooling: {
    en: {
      text: `**📦 Smart Farmer Aggregation (Crop Pooling):**\n\n• Small farmers (20-50 quintals) cannot hire a 250 quintal truck alone.\n• Krishi AI groups neighboring farmers in your village to create a Full Truck Load (FTL).\n• **Direct Benefit:** Saves ₹140/quintal in transport costs and unlocks corporate mill buyers with zero commission!`,
      speech: "Smart farmer aggregation pools small harvests into a single full truck load, saving 140 rupees per quintal in freight.",
      chips: [
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' },
        { label: '🚜 List Crop in Pool', prompt: 'How do I list my wheat on Krishi Bazaar?' }
      ]
    },
    hi: {
      text: `**📦 किसान समूह पूलिंग (स्मार्ट एकत्रीकरण) से बड़ा फायदा:**\n\n• अकेले 20-50 क्विंटल वाले किसान को पूरा ट्रक महंगा पड़ता है।\n• कृषि बाज़ार गांव के 4-5 किसानों की उपज को मिलाकर 250 क्विंटल का पूरा ट्रक लोड (FTL) बना देता है।\n• **सीधा लाभ:** भाड़े में ₹140 प्रति क्विंटल की बचत और बड़ी आटा मिलों से MSP से ₹200 ऊपर का सीधा भाव!`,
      speech: "पूलिंग में 4-5 किसानों की फसल को मिलाकर पूरा ट्रक बनाया जाता है, जिससे भाड़े में 140 रुपये प्रति क्विंटल की बचत होती है।",
      chips: [
        { label: '🌾 गेहूं का आज का भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' },
        { label: '🚜 फसल बेचने के लिए लिस्ट करें', prompt: 'फसल बेचने के लिए लिस्ट कैसे करें?' }
      ]
    },
    pa: {
      text: `**📦 ਕਿਸਾਨ ਪੂਲਿੰਗ (ਇਕੱਠੀ ਫ਼ਸਲ ਵੇਚਣ) ਦੇ ਫ਼ਾਇਦੇ:**\n\n• 4-5 ਕਿਸਾਨ ਰਲ ਕੇ 250 ਕੁਇੰਟਲ ਦਾ ਪੂਰਾ ਟਰੱਕ ਲੋਡ ਬਣਾਉਂਦੇ ਹਨ।\n• **ਸਿੱਧਾ ਲਾਹਾ:** ਭਾੜੇ ਵਿੱਚ ₹140 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਦੀ ਬੱਚਤ ਅਤੇ ਵੱਡੀਆਂ ਮਿੱਲਾਂ ਨਾਲ ਸਿੱਧਾ ਸੌਦਾ।`,
      speech: "ਪੂਲਿੰਗ ਨਾਲ ਭਾੜੇ ਵਿੱਚ 140 ਰੁਪਏ ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਦੀ ਬੱਚਤ ਹੁੰਦੀ ਹੈ।",
      chips: [
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' }
      ]
    },
    mr: {
      text: `**📦 शेतकरी समूह पूलिंगचे फायदे:**\n\n• गावातील ४-५ शेतकऱ्यांचा शेतमाल एकत्र करून २५० क्विंटलचा ट्रक भरला जातो.\n• **फायदा:** वाहतूक खर्चात प्रति क्विंटल ₹१४० ची थेट बचत आणि मोठ्या कंपन्यांना थेट विक्री.`,
      speech: "पूलिंगमुळे वाहतूक खर्चात प्रति क्विंटल 140 रुपयांची थेट बचत होते.",
      chips: [
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' }
      ]
    },
    gu: {
      text: `**📦 ખેડૂત પૂલિંગ (જૂથ વેચાણ) ના ફાયદા:**\n\n• ગામના ૪-૫ ખેડૂતો ભેગા મળીને ૨૫૦ ક્વિન્ટલનો આખો ટ્રક લોડ તૈયાર કરે છે.\n• **લાભ:** ભાડામાં ક્વિન્ટલ દીઠ ₹૧૪૦ ની સીધી બચત અને મિલો સાથે સીધો સોદો.`,
      speech: "પૂલિંગથી ભાડામાં ક્વિન્ટલ દીઠ 140 રૂપિયાની સીધી બચત થાય છે.",
      chips: [
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' }
      ]
    },
    hinglish: {
      text: `**📦 Smart Pooling Benefits:**\n\nChhote kisano ki fasal jodkar 250 quintal ka Full Truck Load banaya jata hai. Isse ₹140/qtl freight bachta hai!`,
      speech: "Pooling se 140 rupaye per quintal freight bachta hai.",
      chips: [
        { label: '🌾 Wheat Rate', prompt: 'What is today wheat mandi price in MP?' }
      ]
    }
  },

  how_to_sell: {
    en: {
      text: `**🚜 How to Sell on Krishi Bazaar in 3 Steps:**\n\n1. Go to **Farmer Portal** and enter crop variety & moisture.\n2. Click **'Run AI Prediction'** to get fair market price.\n3. Click **'Publish Harvest Lot'** to match with verified mill buyers!`,
      speech: "To sell on Krishi Bazaar, go to Farmer Portal, enter quantity, run AI price, and click publish.",
      chips: [
        { label: '🌾 Check Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    },
    hi: {
      text: `**🚜 कृषि बाज़ार पर फसल बेचने के 3 आसान कदम:**\n\n1. 'किसान पोर्टल' पर जाएं और फसल व नमी की मात्रा भरें।\n2. 'AI भाव अनुमान' पर क्लिक करके आज का उचित भाव देखें।\n3. 'मंडी में लॉट प्रकाशित करें' दबाएं — आपकी फसल तुरंत पूल होकर खरीदार को दिखेगी!`,
      speech: "किसान पोर्टल पर फसल और नमी भरें, एआई भाव अनुमान देखें और लॉट प्रकाशित कर दें।",
      chips: [
        { label: '🌾 गेहूं का आज का भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' }
      ]
    },
    pa: {
      text: `**🚜 ਫ਼ਸਲ ਵੇਚਣ ਦੇ 3 ਆਸਾਨ ਕਦਮ:**\n\n1. 'ਕਿਸਾਨ ਪੋਰਟਲ' 'ਤੇ ਜਾਓ ਅਤੇ ਕਣਕ ਦੀ ਮਾਤਰਾ ਤੇ ਨਮੀ ਭਰੋ।\n2. 'AI ਭਾਅ ਅਨੁਮਾਨ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।\n3. 'ਲਿਸਟ ਕਰੋ' ਦਬਾਓ — ਖਰੀਦਦਾਰ ਤੁਰੰਤ ਆਰਡਰ ਦੇਣਗੇ!`,
      speech: "ਕਿਸਾਨ ਪੋਰਟਲ 'ਤੇ ਮਾਤਰਾ ਭਰੋ, ਏਆਈ ਭਾਅ ਚੈੱਕ ਕਰੋ ਅਤੇ ਲਿਸਟ ਕਰੋ।",
      chips: [
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' }
      ]
    },
    mr: {
      text: `**🚜 पीक विक्रीच्या ३ सोप्या पायऱ्या:**\n\n१. 'शेतकरी पोर्टल' वर जाऊन पिकाची माहिती व आर्द्रता भरा.\n२. 'AI भाव अंदाज' वर क्लिक करा.\n३. 'लॉट प्रकाशित करा' दाबा — खरेदीदार थेट खरेदी करतील!`,
      speech: "शेतकरी पोर्टलवर माहिती भरा, एआय भाव अंदाज पाहा आणि लॉट प्रकाशित करा.",
      chips: [
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' }
      ]
    },
    gu: {
      text: `**🚜 પાક વેચવાના ૩ સરળ પગલાં:**\n\n૧. 'ખેડૂત પોર્ટલ' પર પાક અને ભેજનું પ્રમાણ ભરો.\n૨. 'AI ભાવ અંદાજ' પર ક્લિક કરો.\n૩. 'પ્રકાશિત કરો' ક્લિક કરો — ખરીદદાર સીધો ઓર્ડર કરશે!`,
      speech: "ખેડૂત પોર્ટલ પર માહિતી ભરો, એઆઈ ભાવ ચેક કરો અને પ્રકાશિત કરો.",
      chips: [
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' }
      ]
    },
    hinglish: {
      text: `**🚜 Fasal Kaise Bechein:**\n\n1. Farmer Portal par crop & moisture bharein.\n2. 'Run AI Prediction' karein.\n3. 'Publish' par click karein. Verified buyers turant buy karenge!`,
      speech: "Farmer portal par quantity bharein, AI price check karein aur publish kar dein.",
      chips: [
        { label: '🌾 Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    }
  },

  thanks: {
    en: {
      text: `**Always at your service, Kisan Bhai! 🙏**\n\nYour hard work feeds our nation. Jai Jawan, Jai Kisan! 🌾`,
      speech: "Always at your service Kisan Bhai! Jai Jawan, Jai Kisan!",
      chips: [{ label: '🌾 Wheat Rates', prompt: 'What is today wheat mandi price in MP?' }]
    },
    hi: {
      text: `**सदा आपकी सेवा में, किसान भाई! 🙏**\n\nआपके पसीने से ही देश का पेट भरता है। जब भी ज़रूरत हो, बेझिझक पूछिएगा।\n\n🌾 **जय जवान, जय किसान!** 🇮🇳`,
      speech: "सदा आपकी सेवा में किसान भाई! जय जवान, जय किसान!",
      chips: [{ label: '🌾 आज का गेहूं भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' }]
    },
    pa: {
      text: `**ਹਮੇਸ਼ਾ ਤੁਹਾਡੀ ਸੇਵਾ ਵਿੱਚ, ਕਿਸਾਨ ਵੀਰ ਜੀ! 🙏**\n\nਤੁਹਾਡੀ ਮਿਹਨਤ ਨਾਲ ਪੂਰਾ ਦੇਸ਼ ਪਲਦਾ ਹੈ।\n\n🌾 **ਜੈ ਜਵਾਨ, ਜੈ ਕਿਸਾਨ!** 🇮🇳`,
      speech: "ਹਮੇਸ਼ਾ ਤੁਹਾਡੀ ਸੇਵਾ ਵਿੱਚ ਕਿਸਾਨ ਵੀਰ ਜੀ! ਜੈ ਜਵਾਨ, ਜੈ ਕਿਸਾਨ!",
      chips: [{ label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' }]
    },
    mr: {
      text: `**नेहमी आपल्या सेवेत, शेतकरी दादा! 🙏**\n\nआपल्या कष्टाने संपूर्ण देश जगतो.\n\n🌾 **जय जवान, जय किसान!** 🇮🇳`,
      speech: "नेहमी आपल्या सेवेत शेतकरी दादा! जय जवान, जय किसान!",
      chips: [{ label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' }]
    },
    gu: {
      text: `**હંમેશા આપની સેવામાં, ખેડૂત મિત્ર! 🙏**\n\nઆપની મહેનતથી દેશ ચાલે છે.\n\n🌾 **જય જવાન, જય કિસાન!** 🇮🇳`,
      speech: "હંમેશા આપની સેવામાં ખેડૂત મિત્ર! જય જવાન, જય કિસાન!",
      chips: [{ label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' }]
    },
    hinglish: {
      text: `**Always at your service Kisan Bhai! 🙏**\n\nJai Jawan, Jai Kisan! 🌾`,
      speech: "Always at your service Kisan Bhai. Jai Jawan, Jai Kisan!",
      chips: [{ label: '🌾 Mandi Bhav', prompt: 'What is today wheat mandi price in MP?' }]
    }
  },

  buyer_lots: {
    en: {
      text: `**📦 Available Verified Lots in Marketplace:**\n\n1. **LOT-301: Wheat (Sharbati Gold)** — 200 Qtl @ ₹2,480/Qtl (Sehore Pool #402, Moisture: 11.4%, Grade A+, **98% AI Match**)\n2. **LOT-302: Mustard (Sarson)** — 85 Qtl @ ₹5,450/Qtl (Kota Hub, Oil: 42%, Moisture: 8.2%)\n3. **LOT-303: Basmati Rice 1121** — 350 Qtl @ ₹3,920/Qtl (Karnal Cluster, Moisture: 12.0%)\n\nAll lots are verified by electronic moisture meters and backed by escrow.`,
      speech: "Here are the top matched crop lots in Sehore and Kota available for bulk procurement.",
      chips: [
        { label: '💧 Moisture Specs', prompt: 'What is the moisture standard for wheat?' },
        { label: '🔒 Escrow Safety', prompt: 'How does escrow guarantee payment safety?' },
        { label: '🚚 Track Shipment', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    },
    hi: {
      text: `**📦 मार्केटप्लेस में उपलब्ध सत्यापित लॉट:**\n\n1. **LOT-301: गेहूं (शरबती गोल्ड)** — 200 क्विंटल @ ₹2,480/क्विंटल (सीहोर पूल #402, नमी: 11.4%, ग्रेड A+, **98% AI मैच**)\n2. **LOT-302: सरसों (सरसों दाना)** — 85 क्विंटल @ ₹5,450/क्विंटल (कोटा हब, तेल: 42%, नमी: 8.2%)\n3. **LOT-303: बासमती 1121 चावल** — 350 क्विंटल @ ₹3,920/क्विंटल (करनाल क्लस्टर, नमी: 12.0%)\n\nये सभी लॉट NABL मानकों पर जाँचे गए हैं और 3-वे एस्क्रो सुरक्षा के साथ आते हैं।`,
      speech: "सीहोर और कोटा के सत्यापित लॉट उपलब्ध हैं। शरबती गेहूं 2480 और सरसों 5450 रुपये प्रति क्विंटल है।",
      chips: [
        { label: '💧 नमी व लैब रिपोर्ट', prompt: 'गेहूं में नमी मानक और NABL टेस्टिंग कैसे होती है?' },
        { label: '🔒 एस्क्रो पेमेंट सुरक्षा', prompt: 'थोक खरीदार के लिए एस्क्रो पेमेंट सुरक्षा नियम क्या हैं?' },
        { label: '🚚 गाड़ी लोकेशन (#8821)', prompt: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' }
      ]
    },
    pa: {
      text: `**📦 ਮਾਰਕੀਟਪਲੇਸ ਵਿੱਚ ਉਪਲਬਧ ਪ੍ਰਮਾਣਿਤ ਲਾਟ:**\n\n1. **LOT-301: ਕਣਕ (ਸ਼ਰਬਤੀ ਗੋਲਡ)** — 200 ਕੁਇੰਟਲ @ ₹2,480/ਕੁਇੰਟਲ (ਸੀਹੋਰ ਪੂਲ #402, ਨਮੀ: 11.4%, **98% AI ਮੈਚ**)\n2. **LOT-302: ਸਰ੍ਹੋਂ** — 85 ਕੁਇੰਟਲ @ ₹5,450/ਕੁਇੰਟਲ (ਕੋਟਾ ਹੱਬ, ਤੇਲ: 42%)\n3. **LOT-303: ਬਾਸਮਤੀ 1121** — 350 ਕੁਇੰਟਲ @ ₹3,920/ਕੁਇੰਟਲ (ਕਰਨਾਲ ਕਲੱਸਟਰ)`,
      speech: "ਸੀਹੋਰ ਅਤੇ ਕੋਟਾ ਦੀਆਂ ਪ੍ਰਮਾਣਿਤ ਫ਼ਸਲ ਲਾਟਾਂ ਥੋਕ ਖਰੀਦ ਲਈ ਤਿਆਰ ਹਨ।",
      chips: [
        { label: '💧 ਨਮੀ ਮਾਪਦੰਡ', prompt: 'ਕਣਕ ਵਿੱਚ ਨਮੀ ਦੇ ਮਾਪਦੰਡ ਕੀ ਹਨ?' },
        { label: '🔒 ਐਸਕਰੋ ਸੁਰੱਖਿਆ', prompt: 'ਐਸਕਰੋ ਪੇਮੈਂਟ ਸੁਰੱਖਿਆ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ?' }
      ]
    },
    mr: {
      text: `**📦 बाजारात उपलब्ध पडताळलेले लॉट्स:**\n\n1. **LOT-301: गहू (शरबती गोल्ड)** — २०० क्विंटल @ ₹२,४८०/क्विंटल (सीहोर हब, ओलावा: ११.४%, **९८% AI मॅच**)\n2. **LOT-302: मोहरी (सरसों)** — ८५ क्विंटल @ ₹५,४५०/क्विंटल (कोटा मंडी)\n3. **LOT-303: बासमती ११२१ तांदूळ** — ३५० क्विंटल @ ₹३,९२०/क्विंटल`,
      speech: "सीहोर व कोटा येथील तपासलेले गव्हाचे व मोहरीचे लॉट्स उपलब्ध आहेत.",
      chips: [
        { label: '💧 ओलावा मानक', prompt: 'गव्हामधील ओलावा आणि लॅब रिपोर्ट कशी असते?' },
        { label: '🔒 एस्क्रो सुरक्षा', prompt: 'एस्क्रो पेमेंट सुरक्षा नियम काय आहेत?' }
      ]
    },
    gu: {
      text: `**📦 માર્કેટપ્લેસમાં ઉપલબ્ધ ચકાસાયેલ લૉટ્સ:**\n\n1. **LOT-301: ઘઉં (શરબતી ગોલ્ડ)** — ૨૦૦ ક્વિન્ટલ @ ₹૨,૪૮૦/ક્વિન્ટલ (સીહોર પૂલ, ભેજ: ૧૧.૪%, **૯૮% AI મેચ**)\n2. **LOT-302: રાયડો / સરસવ** — ૮૫ ક્વિન્ટલ @ ₹૫,૪૫૦/ક્વિન્ટલ\n3. **LOT-303: બાસમતી ૧૧૨૧ ચોખા** — ૩૫૦ ક્વિન્ટલ @ ₹૩,૯૨૦/ક્વિન્ટલ`,
      speech: "સીહોર અને કોટાના ચકાસાયેલ લૉટ્સ જથ્થાબંધ ખરીદી માટે ઉપલબ્ધ છે.",
      chips: [
        { label: '💧 ભેજ ધોરણો', prompt: 'ઘઉંમાં ભેજ અને લેબ ટેસ્ટિંગના ધોરણો શું છે?' },
        { label: '🔒 એસ્ક્રો સુરક્ષા', prompt: 'જથ્થાબંધ ખરીદદાર માટે એસ્ક્રો સુરક્ષા શું છે?' }
      ]
    },
    hinglish: {
      text: `**📦 Available Verified Lots in Marketplace:**\n\n1. **LOT-301: Sharbati Wheat** — 200 Qtl @ ₹2,480/Qtl (Sehore Pool, 11.4% moisture, 98% AI Match)\n2. **LOT-302: Mustard Seed** — 85 Qtl @ ₹5,450/Qtl (Kota Hub)\n3. **LOT-303: Basmati Rice 1121** — 350 Qtl @ ₹3,920/Qtl (Karnal)`,
      speech: "Sehore aur Kota ke verified lots bulk procurement ke liye available hain.",
      chips: [
        { label: '💧 Moisture Specs', prompt: 'What is the moisture standard for wheat?' },
        { label: '🔒 Escrow Safety', prompt: 'How does escrow guarantee payment safety?' }
      ]
    }
  },

  buyer_moisture: {
    en: {
      text: `**💧 Grain Moisture Standards & Quality Protocol:**\n\n• **Permissible Moisture:** Standard milling wheat must test **< 12.0%** (Currently LOT-301 tests at **11.4%**).\n• **NABL Certification:** All pooled lots undergo digital probe moisture testing with calibrated grain moisture meters.\n• **Deduction Schedule:** Zero deduction below 12.0%. Between 12.1%–14.0%, standard moisture discount of ₹40/qtl applies. >14.0% rejected at farmgate.`,
      speech: "All lots on Krishi Bazaar are certified with moisture below 12 percent with zero quality deduction.",
      chips: [
        { label: '📦 Browse Lots', prompt: 'What new wheat lots are available?' },
        { label: '🔒 Escrow Protection', prompt: 'How does escrow guarantee payment safety?' }
      ]
    },
    hi: {
      text: `**💧 गेहूं नमी मानक (Moisture Standard) व NABL क्वालिटी प्रोटोकॉल:**\n\n• **मानक सीमा:** आटा मिलों के लिए गेहूं में नमी **12.0% से कम** होनी चाहिए (LOT-301 में केवल **11.4%** है)।\n• **NABL डिजिटल टेस्टिंग:** सभी लॉट डिजिटल इलेक्ट्रॉनिक नमी मीटर द्वारा प्रमाणित होते हैं।\n• **कटौती नियम:** 12% से कम पर शून्य कटौती। 12.1% से 14% तक ₹40/क्विंटल डिस्काउंट, और 14% से अधिक पर फार्मगेट पर ही अस्वीकृत।`,
      speech: "कृषि बाज़ार पर सभी लॉट 12 प्रतिशत से कम नमी के साथ प्रमाणित होते हैं। कोई अवांछित कटौती नहीं होती।",
      chips: [
        { label: '📦 नए लॉट देखें', prompt: 'सीहोर में गेहूं के कौन से नए लॉट उपलब्ध हैं?' },
        { label: '🔒 एस्क्रो सुरक्षा', prompt: 'थोक खरीदार के लिए एस्क्रो पेमेंट सुरक्षा नियम क्या हैं?' }
      ]
    },
    pa: {
      text: `**💧 ਨਮੀ ਦੇ ਮਾਪਦੰਡ ਅਤੇ ਕੁਆਲਿਟੀ ਪ੍ਰੋਟੋਕੋਲ:**\n\n• **ਸਵੀਕਾਰਯੋਗ ਨਮੀ:** ਕਣਕ ਵਿੱਚ ਨਮੀ **12.0% ਤੋਂ ਘੱਟ** ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ (LOT-301 ਵਿੱਚ **11.4%** ਹੈ)।\n• **NABL ਜਾਂਚ:** ਹਰੇਕ ਲਾਟ ਡਿਜੀਟਲ ਮੋਇਸਚਰ ਮੀਟਰ ਨਾਲ ਟੈਸਟ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।`,
      speech: "ਕਣਕ ਵਿੱਚ ਨਮੀ 12 ਫੀਸਦੀ ਤੋਂ ਘੱਟ ਹੋਣੀ ਲਾਜ਼ਮੀ ਹੈ।",
      chips: [{ label: '📦 ਲਾਟ ਵੇਖੋ', prompt: 'ਮਾਰਕੀਟਪਲੇਸ ਵਿੱਚ ਕਿਹੜੇ ਲਾਟ ਹਨ?' }]
    },
    mr: {
      text: `**💧 धान्यातील ओलावा प्रमाण व NABL गुणवत्ता नियम:**\n\n• **मानक ओलावा:** पिठाच्या गिरणीसाठी गव्हात ओलावा **१२.०% पेक्षा कमी** असणे आवश्यक आहे (LOT-301 मध्ये **११.४%** आहे).\n• **डिजिटल तपासणी:** इलेक्ट्रॉनिक मीटरद्वारे काटेकोर तपासणी केली जाते.`,
      speech: "गव्हामध्ये ओलावा 12 टक्क्यांपेक्षा कमी असणे आवश्यक आहे.",
      chips: [{ label: '📦 लॉट्स पहा', prompt: 'बाजारात कोणते लॉट्स उपलब्ध आहेत?' }]
    },
    gu: {
      text: `**💧 ભેજ નિયંત્રણ ધોરણો અને ગુણવત્તા:**\n\n• **માન્ય ભેજ:** મિલિંગ ઘઉં માટે ભેજ **૧૨.૦% થી ઓછો** હોવો જોઈએ (LOT-301 માં **૧૧.૪%** છે).\n• **NABL ટેસ્ટિંગ:** ડિજિટલ મોઇશ્ચર મીટર દ્વારા દરેક લોટ ચકાસાય છે.`,
      speech: "ઘઉંમાં ભેજ 12 ટકાથી ઓછો હોવો જરૂરી છે.",
      chips: [{ label: '📦 લૉટ જુઓ', prompt: 'કયા લૉટ ઉપલબ્ધ છે?' }]
    },
    hinglish: {
      text: `**💧 Moisture Standards & NABL Protocol:**\n\n• Permissible moisture for milling wheat is **<12%** (LOT-301 is **11.4%**).\n• NABL calibrated digital meters are used for farmgate verification.`,
      speech: "Milling wheat ke liye moisture 12 percent se kam hona chahiye.",
      chips: [{ label: '📦 Browse Lots', prompt: 'What new wheat lots are available?' }]
    }
  },

  buyer_escrow: {
    en: {
      text: `**🔒 3-Way Smart Escrow Protection for Institutional Buyers:**\n\n1. **Capital Safety:** Buyer deposits 100% order amount into an RBI-regulated escrow account upon order placement.\n2. **Quality Guarantee:** Funds remain locked until electronic weighbridge gross/tare and moisture re-verification at the factory gate.\n3. **Automated Split Payout:** Upon delivery OTP confirmation, escrow automatically splits: **94% to Farmer**, **4.5% to Transporter**, **1.5% Platform Fee** within 60 seconds.`,
      speech: "Buyer funds remain fully protected in RBI regulated escrow until factory gate weighbridge verification.",
      chips: [
        { label: '📦 View Wheat Lots', prompt: 'What new wheat lots are available?' },
        { label: '🚚 Track Shipment', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    },
    hi: {
      text: `**🔒 3-वे स्मार्ट एस्क्रो सुरक्षा (थोक खरीदारों के लिए):**\n\n1. **पूंजी की पूर्ण सुरक्षा:** आपका पैसा सीधे किसी व्यक्ति को नहीं जाता, बल्कि RBI-विनियमित एस्क्रो खाते में सुरक्षित लॉक रहता है।\n2. **क्वालिटी व वजन गारंटी:** जब तक माल आपकी फैक्ट्री के वेब्रिज पर वजन होकर डिजिटल गेट पास जारी नहीं होता, भुगतान जारी नहीं होता।\n3. **स्वचालित पारदर्शी विभाजन:** डिलीवरी ओटीपी दर्ज होते ही 60 सेकंड में: **94% किसान को**, **4.5% ट्रांसपोर्टर को**, **1.5% प्लेटफॉर्म को** ट्रांसफर हो जाता है।`,
      speech: "खरीदार का पैसा पूरी तरह एस्क्रो में सुरक्षित रहता है और डिलीवरी व वजन की पुष्टि के बाद ही जारी होता है।",
      chips: [
        { label: '📦 नए लॉट देखें', prompt: 'सीहोर में गेहूं के कौन से नए लॉट उपलब्ध हैं?' },
        { label: '🚚 गाड़ी लोकेशन (#8821)', prompt: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' }
      ]
    },
    pa: {
      text: `**🔒 3-ਵੇਅ ਸਮਾਰਟ ਐਸਕਰੋ ਸੁਰੱਖਿਆ:**\n\n1. ਖਰੀਦਦਾਰ ਦਾ ਪੈਸਾ ਆਰ.ਬੀ.ਆਈ. ਨਿਯੰਤਰਿਤ ਐਸਕਰੋ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦਾ ਹੈ।\n2. ਮਿੱਲ ਦੇ ਗੇਟ 'ਤੇ ਵਜ਼ਨ ਅਤੇ ਨਮੀ ਦੀ ਤਸਦੀਕ ਤੋਂ ਬਾਅਦ ਹੀ ਭੁਗਤਾਨ ਜਾਰੀ ਹੁੰਦਾ ਹੈ।\n3. 94% ਕਿਸਾਨ ਨੂੰ ਅਤੇ 4.5% ਟਰਾਂਸਪੋਰਟਰ ਨੂੰ ਤੁਰੰਤ ਮਿਲਦਾ ਹੈ।`,
      speech: "ਐਸਕਰੋ ਸਿਸਟਮ ਰਾਹੀਂ ਖਰੀਦਦਾਰ ਅਤੇ ਕਿਸਾਨ ਦੋਵਾਂ ਦੇ ਪੈਸੇ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦੇ ਹਨ।",
      chips: [{ label: '📦 ਲਾਟ ਵੇਖੋ', prompt: 'ਮਾਰਕੀਟਪਲੇਸ ਵਿੱਚ ਕਿਹੜੇ ਲਾਟ ਹਨ?' }]
    },
    mr: {
      text: `**🔒 ३-वे स्मार्ट एस्क्रो सुरक्षा:**\n\n१. खरेदीदाराचे पैसे आरबीआय-नियंत्रित एस्क्रो खात्यात सुरक्षित लॉक राहतात.\n२. फॅक्टरी गेटवर वजन आणि गुणवत्ता तपासणीनंतरच रक्कम वर्ग केली जाते.\n३. ९४% शेतकऱ्यांना आणि ४.५% वाहतूकदाराला थेट बँकेत जमा होते.`,
      speech: "गेटवर वजन पडताळणी झाल्यानंतरच एस्क्रीमधून शेतकऱ्यांना पैसे मिळतात.",
      chips: [{ label: '📦 लॉट्स पहा', prompt: 'बाजारात कोणते लॉट्स उपलब्ध आहेत?' }]
    },
    gu: {
      text: `**🔒 ૩-વે સ્માર્ટ એસ્ક્રો સુરક્ષા:**\n\n૧. ખરીદનારના નાણાં RBI નિયંત્રિત એસ્ક્રો ખાતામાં સંપૂર્ણ સુરક્ષિત રહે છે.\n૨. ફેક્ટરી ગેટ પર વજન અને ગુણવત્તા ચકાસ્યા પછી જ પેમેન્ટ રિલીઝ થાય છે.\n૩. ૯૪% ખેડૂતને અને ૪.૫% ટ્રાન્સપોર્ટરને સીધા ખાતામાં મળે છે.`,
      speech: "ફેક્ટરી પર વજન અને ગુણવત્તા ચકાસ્યા પછી જ એસ્ક્રોમાંથી નાણાં છૂટા થાય છે.",
      chips: [{ label: '📦 લૉટ જુઓ', prompt: 'કયા લૉટ ઉપલબ્ધ છે?' }]
    },
    hinglish: {
      text: `**🔒 3-Way Smart Escrow Protection:**\n\n1. 100% money is safely locked in RBI-regulated escrow account.\n2. Payout is released only after mill electronic weighbridge sign-off.\n3. 94% goes to farmers, 4.5% to transporter, and 1.5% platform fee.`,
      speech: "Escrow guarantee ensures total fund safety until physical factory delivery.",
      chips: [{ label: '📦 Browse Lots', prompt: 'What new wheat lots are available?' }]
    }
  },

  logistics_route: {
    en: {
      text: `**🗺️ Optimized Logistics Route (Sehore Hub → Malwa Agro Mills, Indore):**\n\n• **Recommended Corridor:** Sehore Hub → Ashta Bypass → **Dewas Bypass** → Indore Sanwer Industrial Area (Total: 74 km).\n• **Time & Fuel Saved:** Dewas Bypass avoids city bottlenecks, saving **35 minutes** and reducing diesel burn by ~2.4 Litres for Eicher 14ft Pro.\n• **Corridor Telemetry:** FASTag lanes active, AIS-140 GPS stream transmitting live at 10s intervals. 38 km remaining to mill.`,
      speech: "Recommended route is via Dewas Bypass saving 35 minutes and avoiding city traffic.",
      chips: [
        { label: '⚖️ Weighbridge Slip', prompt: 'How to upload electronic weighbridge slip?' },
        { label: '📦 Gate Delivery Sign-off', prompt: 'What is the gate delivery sign-off process?' },
        { label: '🚚 Track Location', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    },
    hi: {
      text: `**🗺️ सबसे तेज़ व सुरक्षित रूट (सीहोर हब → मालवा एग्रो मिल्स, इंदौर):**\n\n• **सुझाया गया मार्ग:** सीहोर हब → आष्टा बाईपास → **देवास बाईपास** → इंदौर सांवेर इंडस्ट्रियल एरिया (कुल दूरी: 74 किमी)।\n• **बचत:** देवास शहर के जाम से बचने के कारण **35 मिनट की बचत** और 14 फीट आयशर ट्रक के लिए लगभग 2.4 लीटर डीजल की बचत।\n• **लाइव टेलीमेट्री:** सभी टोल प्लाजा पर फास्टैग सक्रिय है और AIS-140 GPS से हर 10 सेकंड पर लोकेशन अपडेट हो रही है। मिल से 38 किमी शेष है।`,
      speech: "सीहोर से इंदौर के लिए देवास बाईपास वाला रास्ता सबसे सुरक्षित है। इसमें 35 मिनट की बचत होती है।",
      chips: [
        { label: '⚖️ वेब्रिज वजन पर्ची', prompt: 'वेब्रिज पर डिजिटल वजन पर्ची और QR कोड स्कैन कैसे करें?' },
        { label: '📦 गेट डिलीवरी प्रोसेस', prompt: 'मिल पर गेट डिलीवरी और किसान एस्क्रो रिलीज की क्या प्रक्रिया है?' },
        { label: '🚚 गाड़ी की लोकेशन', prompt: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' }
      ]
    },
    pa: {
      text: `**🗺️ ਸਭ ਤੋਂ ਤੇਜ਼ ਅਤੇ ਸੁਰੱਖਿਅਤ ਰੂਟ:**\n\n• ਸੀਹੋਰ ਹੱਬ ਤੋਂ ਇੰਦੌਰ ਮਿੱਲ ਲਈ **ਦੇਵਾਸ ਬਾਈਪਾਸ** ਸਭ ਤੋਂ ਵਧੀਆ ਹੈ।\n• ਇਸ ਨਾਲ ਸ਼ਹਿਰ ਦੇ ਟ੍ਰੈਫਿਕ ਤੋਂ ਬਚ ਕੇ **35 ਮਿੰਟ ਦੀ ਬੱਚਤ** ਹੁੰਦੀ ਹੈ।\n• ਜੀ.ਪੀ.ਐਸ. ਲਾਈਵ ਐਕਟਿਵ ਹੈ ਅਤੇ 38 ਕਿਲੋਮੀਟਰ ਬਾਕੀ ਹੈ।`,
      speech: "ਦੇਵਾਸ ਬਾਈਪਾਸ ਰਸਤਾ 35 ਮਿੰਟ ਬਚਾਉਂਦਾ ਹੈ ਅਤੇ ਭਾਰੀ ਵਾਹਨਾਂ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਹੈ।",
      chips: [{ label: '⚖️ ਕੰਡਾ ਪਰਚੀ', prompt: 'ਕੰਡੇ ਦੀ ਪਰਚੀ ਕਿਵੇਂ ਅਪਲੋਡ ਕਰੀਏ?' }]
    },
    mr: {
      text: `**🗺️ सर्वोत्तम वाहतूक मार्ग (सीहोर → इंदूर):**\n\n• सीहोर हब → **देवास बायपास** → इंदूर सांवेर मार्ग सर्वोत्तम आहे.\n• यामुळे शहरातील वाहतूक कोंडी टळून **३५ मिनिटांची बचत** होते व डिझेल वाचते.`,
      speech: "देवास बायपास मार्गाने ३५ मिनिटांची बचत होते.",
      chips: [{ label: '⚖️ वजन पावती', prompt: 'इलेक्ट्रॉनिक वजन पावती कशी अपलोड करावी?' }]
    },
    gu: {
      text: `**🗺️ શ્રેષ્ઠ ટ્રાન્સપોર્ટ રૂટ (સીહોર → ઈન્દોર):**\n\n• સીહોર હબથી **દેવાસ બાયપાસ** થઈને જવાનો માર્ગ સૌથી અનુકૂળ છે.\n• ટ્રાફિક જામથી બચીને **૩૫ મિનિટનો સમય** અને ડીઝલની બચત થાય છે.`,
      speech: "દેવાસ બાયપાસ રસ્તો ૩૫ મિનિટ બચાવે છે.",
      chips: [{ label: '⚖️ વજન કાંટો', prompt: 'વજન સ્લિપ કેવી રીતે અપલોડ કરવી?' }]
    },
    hinglish: {
      text: `**🗺️ Fastest Route Sehore Hub to Indore Mill:**\n\n• Take **Dewas Bypass** to avoid city traffic (saves ~35 mins & 2.4L diesel).\n• AIS-140 GPS is streaming live. 38 km remaining.`,
      speech: "Dewas bypass is the fastest and safest route saving 35 minutes.",
      chips: [{ label: '⚖️ Weighbridge Slip', prompt: 'How to upload weighbridge slip?' }]
    }
  },

  logistics_weighbridge: {
    en: {
      text: `**⚖️ Electronic Weighbridge Verification Protocol:**\n\n1. **Tare Weight:** Record empty truck weight at the rural aggregation hub before loading.\n2. **Gross Weight:** Weigh fully loaded truck (200 Qtl wheat) and capture photo/QR of computer-printed ticket.\n3. **Factory Gate Cross-Check:** Mill's certified weighbridge automatically compares gross vs tare to release delivery receipt. Tolerance: ±0.2%.`,
      speech: "Electronic weighbridge tickets ensure zero weight tampering and seamless delivery clearance.",
      chips: [
        { label: '🗺️ Route Advice', prompt: 'What is the fastest route to Indore?' },
        { label: '📦 Gate Delivery Sign-off', prompt: 'What is the gate delivery sign-off process?' }
      ]
    },
    hi: {
      text: `**⚖️ इलेक्ट्रॉनिक वेब्रिज (कांटा) सत्यापन प्रक्रिया:**\n\n1. **खाली गाड़ी का वजन (Tare):** माल भरने से पहले ग्रामीण हब के धर्मकांटे पर खाली वजन दर्ज करें।\n2. **लोड गाड़ी का वजन (Gross):** 200 क्विंटल गेहूं लोड होने के बाद ग्रॉस वजन लें और कंप्यूटर रसीद की फोटो ऐप में अपलोड करें।\n3. **मिल गेट पर मिलान:** मिल के इलेक्ट्रॉनिक कांटे पर वजन मिलान होते ही डिलीवरी पर्ची सत्यापित हो जाती है।`,
      speech: "इलेक्ट्रॉनिक धर्मकांटे की पर्ची अपलोड करने से वजन में कोई हेराफेरी नहीं होती और बिल तुरंत पास होता है।",
      chips: [
        { label: '🗺️ सबसे तेज़ रूट', prompt: 'सीहोर से इंदौर आटा मिल तक कौन सा रूट सबसे तेज़ है?' },
        { label: '📦 गेट डिलीवरी प्रोसेस', prompt: 'मिल पर गेट डिलीवरी और किसान एस्क्रो रिलीज की क्या प्रक्रिया है?' }
      ]
    },
    pa: {
      text: `**⚖️ ਇਲੈਕਟ੍ਰਾਨਿਕ ਕੰਡਾ ਵਜ਼ਨ ਪ੍ਰਕਿਰਿਆ:**\n\n1. ਖਾਲੀ ਗੱਡੀ ਦਾ ਵਜ਼ਨ ਪਹਿਲਾਂ ਨੋਟ ਕਰੋ।\n2. ਮਾਲ ਭਰਨ ਤੋਂ ਬਾਅਦ ਕੁੱਲ ਵਜ਼ਨ ਦੀ ਪਰਚੀ ਐਪ ਵਿੱਚ ਅਪਲੋਡ ਕਰੋ।\n3. ਮਿੱਲ ਪਹੁੰਚ ਕੇ ਵਜ਼ਨ ਮਿਲਾਉਂਦੇ ਹੀ ਆਰਡਰ ਕਲੀਅਰ ਹੋ ਜਾਂਦਾ ਹੈ।`,
      speech: "ਕੰਪਿਊਟਰ ਕੰਡੇ ਦੀ ਪਰਚੀ ਅਪਲੋਡ ਕਰਨ ਨਾਲ ਡਿਲੀਵਰੀ ਤੁਰੰਤ ਮਨਜ਼ੂਰ ਹੁੰਦੀ ਹੈ।",
      chips: [{ label: '🗺️ ਰੂਟ ਗਾਈਡ', prompt: 'ਸਭ ਤੋਂ ਵਧੀਆ ਰੂਟ ਕਿਹੜਾ ਹੈ?' }]
    },
    mr: {
      text: `**⚖️ इलेक्ट्रॉनिक धर्मकाटा वजन प्रक्रिया:**\n\n१. माल भरण्यापूर्वी रिकाम्या वाहनाचे (Tare) वजन नोंदवा.\n२. माल भरल्यानंतर एकूण (Gross) वजन पावती ॲपवर अपलोड करा.\n३. मिल गेटवर वजन जुळताच डिलिव्हरी मान्य होते.`,
      speech: "धर्मकाटा पावती अपलोड केल्यावर डिलिव्हरी सहज पूर्ण होते.",
      chips: [{ label: '🗺️ वाहतूक मार्ग', prompt: 'इंदूरसाठी चांगला मार्ग कोणता?' }]
    },
    gu: {
      text: `**⚖️ ઇલેક્ટ્રોનિક વજન કાંટો નિયમો:**\n\n૧. માલ ભરતા પહેલા ખાલી ગાડીનું વજન નોંધો.\n૨. લોડ થયા પછી ગ્રોસ વજનની સ્લિપ એપમાં અપલોડ કરો.\n૩. મિલ પર વજન ટેલી થતાં જ ડિલિવરી પાસ થાય છે.`,
      speech: "વજન સ્લિપ અપલોડ કરવાથી ડિલિવરી સરળતાથી મંજૂર થાય છે.",
      chips: [{ label: '🗺️ ટ્રાન્સપોર્ટ રૂટ', prompt: 'સારો રસ્તો કયો છે?' }]
    },
    hinglish: {
      text: `**⚖️ Electronic Weighbridge Protocol:**\n\n1. Tare weighment before loading.\n2. Gross weighment ticket upload on app.\n3. Mill gate automated cross-verification.`,
      speech: "Weighbridge slips ensure accurate delivery and zero disputes.",
      chips: [{ label: '🗺️ Route Advice', prompt: 'What is the fastest route to Indore?' }]
    }
  },

  logistics_delivery: {
    en: {
      text: `**📦 Factory Gate Delivery Sign-Off & Escrow Release:**\n\n• **Gate Arrival:** Driver displays shipment QR code at Malwa Agro Mills receiving bay.\n• **4-Digit Receiver OTP:** Mill quality manager inspects grain moisture and issues delivery OTP.\n• **Instant Escrow Release:** Entering OTP in app instantly releases **₹ 4,89,552 via DBT to farmer bank accounts** and deposits transporter freight within 60 seconds.`,
      speech: "Entering the receiver 4-digit OTP instantly releases farmer payment and transporter freight.",
      chips: [
        { label: '💰 Transporter Payout', prompt: 'When will I receive payment in my bank?' },
        { label: '🚚 Order Telemetry', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    },
    hi: {
      text: `**📦 मिल गेट डिलीवरी और किसान एस्क्रो रिलीज प्रक्रिया:**\n\n• **गेट पर आगमन:** मिल गेट पर ड्राइवर ऐप का डिजिटल क्यूआर कोड (QR Code) दिखाता है।\n• **4-अंकीय डिलीवरी OTP:** मिल का क्वालिटी मैनेजर बोरियों की जांच करके 4-अंकीय ओटीपी देता है।\n• **तुरंत बैंक ट्रांसफर:** ऐप में OTP दर्ज करते ही एस्क्रो से **₹ 4,89,552 सीधे किसानों के बैंक खातों (DBT)** में और आपका ट्रांसपोर्टर भाड़ा तुरंत आपके खाते में जमा हो जाता है!`,
      speech: "मिल मैनेजर का चार अंकों का ओटीपी डालते ही किसानों और ट्रांसपोर्टर दोनों का पैसा खाते में आ जाता है।",
      chips: [
        { label: '💰 बैंक खाते में भुगतान', prompt: 'डिलीवरी के बाद बैंक खाते में पैसा कब मिलेगा?' },
        { label: '🚚 गाड़ी की लोकेशन', prompt: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' }
      ]
    },
    pa: {
      text: `**📦 ਗੇਟ ਡਿਲੀਵਰੀ ਅਤੇ ਐਸਕਰੋ ਭੁਗਤਾਨ ਰਿਲੀਜ਼:**\n\n• ਮਿੱਲ ਗੇਟ 'ਤੇ ਡਰਾਈਵਰ ਡਿਜੀਟਲ ਕੋਡ ਦਿਖਾਉਂਦਾ ਹੈ।\n• ਮਿੱਲ ਮੈਨੇਜਰ 4-ਅੰਕਾਂ ਦਾ ਡਿਲੀਵਰੀ OTP ਦਿੰਦਾ ਹੈ।\n• OTP ਭਰਦੇ ਹੀ **₹ 4,89,552 ਕਿਸਾਨਾਂ ਨੂੰ** ਅਤੇ ਟਰਾਂਸਪੋਰਟਰ ਦਾ ਭਾੜਾ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ ਹੋ ਜਾਂਦਾ ਹੈ!`,
      speech: "ਓਟੀਪੀ ਪਾਉਂਦੇ ਹੀ ਕਿਸਾਨਾਂ ਅਤੇ ਡਰਾਈਵਰ ਦੋਵਾਂ ਦੇ ਪੈਸੇ ਬੈਂਕ ਵਿੱਚ ਆ ਜਾਂਦੇ ਹਨ।",
      chips: [{ label: '💰 ਭੁਗਤਾਨ ਸਥਿਤੀ', prompt: 'ਡਿਲਿਵਰੀ ਤੋਂ ਬਾਅਦ ਬੈਂਕ ਵਿੱਚ ਪੈਸੇ ਕਦੋਂ ਆਉਣਗੇ?' }]
    },
    mr: {
      text: `**📦 मिल गेट डिलिव्हरी व पैसे वाटप:**\n\n• मिल गेटवर डिजिटल क्यूआर दाखवावा.\n• मिल मॅनेजरकडून ४-अंकी डिलिव्हरी OTP घ्यावा.\n• OTP टाकताच **₹ ४,८९,५५२ थेट शेतकऱ्यांच्या खात्यात** व वाहतूक भाडे ट्रान्सपोर्टरला त्वरित मिळते!`,
      speech: "ओटीपी भरताच शेतकऱ्यांना व ड्रायव्हरला थेट बँक खात्यात पैसे मिळतात.",
      chips: [{ label: '💰 खात्यात पैसे', prompt: 'डिलिव्हरीनंतर खात्यात पैसे कधी जमा होणार?' }]
    },
    gu: {
      text: `**📦 મિલ ગેટ ડિલિવરી અને એસ્ક્રો રિલીઝ:**\n\n• મિલ ગેટ પર ડિજિટલ QR કોડ બતાવો.\n• મિલ મેનેજર ૪-અંકનો ડિલિવરી OTP આપે છે.\n• OTP દાખલ કરતાં જ **₹ ૪,૮૯,૫૫૨ ખેડૂતોના ખાતામાં** અને ટ્રાન્સપોર્ટરનું ભાડું સીધું જમા થાય છે!`,
      speech: "ઓટીપી નાખતા જ ખેડૂત અને ડ્રાઇવર બંનેના નાણાં ખાતામાં આવી જાય છે.",
      chips: [{ label: '💰 બેંક પેમેન્ટ', prompt: 'ડિલિવરી પછી બેંક ખાતામાં રૂપિયા ક્યારે આવશે?' }]
    },
    hinglish: {
      text: `**📦 Mill Gate Delivery Sign-off:**\n\n• Show shipment QR code at mill gate.\n• Get 4-digit OTP from mill receiver.\n• Submitting OTP triggers instant **₹4,89,552 DBT payout** to farmers & transporter wallet!`,
      speech: "Submitting receiver OTP triggers instant DBT payouts to farmers and transporter.",
      chips: [{ label: '💰 Bank Payment', prompt: 'When will I receive payment in my bank?' }]
    }
  },

  admin_liquidity: {
    en: {
      text: `**📊 Mandi Board Macro Liquidity & Settlement Overview:**\n\n• **Total Mandi GMV:** **₹ 1.42 Crore** across 18 connected APMC hubs.\n• **Settlement Efficiency:** 94.8% settled via DBT within 2 hours of gate arrival.\n• **Escrow Solvency:** 100% collateralized with **₹ 14.82 Lakhs** in liquid escrow balance.\n• **Price Stability Index:** 98.2% compliance with MSP floor prices, generating an average +14.8% income delta for smallholder farmers.`,
      speech: "Total platform GMV is 1.42 Crore across 18 mandis with 100 percent escrow solvency.",
      chips: [
        { label: '⚠️ Supply Deficit Alert', prompt: 'What is the 6-month AI supply deficit alert?' },
        { label: '⚖️ Dispute Resolution', prompt: 'What is the dispute resolution protocol?' },
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' }
      ]
    },
    hi: {
      text: `**📊 मंडी बोर्ड मैक्रो लिक्विडिटी व वित्तीय ऑडिट रिपोर्ट:**\n\n• **कुल प्लेटफॉर्म GMV:** 18 संबद्ध मंडियों में **₹ 1.42 करोड़** का व्यापार दर्ज।\n• **भुगतान दक्षता:** 94.8% भुगतान मिल गेट डिलीवरी के 2 घंटे के भीतर सीधे बैंक खातों (DBT) में पूर्ण।\n• **एस्क्रो सॉल्वेंसी:** 100% सुरक्षित, वर्तमान में **₹ 14.82 लाख** का लिक्विड एस्क्रो बैलेंस उपलब्ध।\n• **मूल्य स्थिरता सूचकांक:** 98.2% सौदे MSP से ऊपर निष्पादित, जिससे छोटे किसानों को औसतन **+14.8% अधिक आय** प्राप्त हुई।`,
      speech: "कुल मंडी जीएमवी 1.42 करोड़ रुपये है। 100 प्रतिशत एस्क्रो सॉल्वेंसी और 98 प्रतिशत मूल्य स्थिरता दर्ज की गई है।",
      chips: [
        { label: '⚠️ सप्लाई डेफिसिट अलर्ट', prompt: 'अगले 6 महीनों में गेहूं का सप्लाई डेफिसिट अलर्ट क्या है?' },
        { label: '⚖️ विवाद समाधान नियम', prompt: 'विवाद समाधान का क्या नियम है?' },
        { label: '🌾 आज के मंडी भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' }
      ]
    },
    pa: {
      text: `**📊 ਮੰਡੀ ਬੋਰਡ ਮੈਕਰੋ ਲਿਕਵਿਡਿਟੀ ਰਿਪੋਰਟ:**\n\n• ਕੁੱਲ GMV: **₹ 1.42 ਕਰੋੜ** 18 ਮੰਡੀਆਂ ਵਿੱਚ।\n• 94.8% ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਤੁਰੰਤ ਭੁਗਤਾਨ।\n• ਐਸਕਰੋ ਬੈਲੇਂਸ: **₹ 14.82 ਲੱਖ** 100% ਸੁਰੱਖਿਅਤ।`,
      speech: "ਮੰਡੀ ਵਿੱਚ 1.42 ਕਰੋੜ ਦਾ ਕੁੱਲ ਵਪਾਰ ਹੋਇਆ ਹੈ ਅਤੇ ਸਾਰੇ ਪੈਸੇ ਸੁਰੱਖਿਅਤ ਹਨ।",
      chips: [{ label: '⚠️ ਸਪਲਾਈ ਅਲਰਟ', prompt: 'ਸਪਲਾਈ ਡੈਫਿਸਿਟ ਅਲਰਟ ਕੀ ਹੈ?' }]
    },
    mr: {
      text: `**📊 कृषी बाजार समिती लिक्विडिटी अहवाल:**\n\n• एकूण उलाढाल (GMV): **₹ १.४२ कोटी** (१८ बाजार समित्या).\n• ९४.८% शेतकऱ्यांना २ तासांत थेट बँक खात्यात पैसे.\n• एस्क्रो सुरक्षितता: **₹ १४.८२ लाख** १००% सुरक्षित.`,
      speech: "एकूण उलाढाल 1.42 कोटी असून 100 टक्के एस्क्रो सुरक्षा आहे.",
      chips: [{ label: '⚠️ पुरवठा तुटवडा', prompt: 'पुरवठा तुटवडा अलर्ट काय आहे?' }]
    },
    gu: {
      text: `**📊 મંડી બોર્ડ લિક્વિડિટી અને નાણાકીય અહેવાલ:**\n\n• કુલ પ્લેટફોર્મ GMV: ૧૮ મંડીઓમાં **₹ ૧.૪૨ કરોડ**.\n• ૯૪.૮% ખેડૂતોને સીધા બેંક ખાતામાં DBT ચૂકવણી.\n• એસ્ક્રો બેલેન્સ: **₹ ૧૪.૮૨ લાખ** ૧૦૦% સુરક્ષિત.`,
      speech: "કુલ પ્લેટફોર્મ જીએમવી 1.42 કરોડ રૂપિયા નોંધાયેલ છે.",
      chips: [{ label: '⚠️ અછત એલર્ટ', prompt: 'સપ્લાય અછત એલર્ટ શું છે?' }]
    },
    hinglish: {
      text: `**📊 Mandi Macro Liquidity Report:**\n\n• Total GMV: **₹1.42 Cr** across 18 mandis.\n• 94.8% settled via DBT within 2 hours of gate arrival.\n• Escrow Balance: **₹14.82 Lakhs** (100% solvent).`,
      speech: "Total platform GMV is 1.42 Crore with 100 percent solvency.",
      chips: [{ label: '⚠️ Supply Deficit Alert', prompt: 'What is the 6-month AI supply deficit alert?' }]
    }
  },

  admin_deficit: {
    en: {
      text: `**⚠️ 6-Month AI Demand-Supply Deficit Intelligence:**\n\n• **Regional Vulnerability:** Malwa industrial flour mills and East Rajasthan.\n• **Deficit Projection:** Institutional demand projected to exceed arrivals by **18.5% in Month 3** due to lower late-sown rabi acreage.\n• **Mitigation Plan:** Automatically activate farmer pooling clusters in Sehore and Harda; trigger buffer release from state central warehouses to cap volatility at ±3%.`,
      speech: "AI forecasting warns of an 18.5 percent wheat supply deficit in Malwa industrial mills over the next 90 days.",
      chips: [
        { label: '📊 Liquidity Overview', prompt: 'Show overall mandi liquidity summary' },
        { label: '⚖️ Dispute Resolution', prompt: 'What is the dispute resolution protocol?' }
      ]
    },
    hi: {
      text: `**⚠️ 6-महीने का AI सप्लाई डेफिसिट व स्टॉक चेतावनी मॉडल:**\n\n• **संवेदनशील क्षेत्र:** मालवा आटा मिल क्लस्टर (इंदौर-उज्जैन) और पूर्वी राजस्थान।\n• **कमी का पूर्वानुमान:** तीसरे महीने में औद्योगिक मांग की तुलना में मंडियों में आवक **18.5% कम** रहने का अनुमान।\n• **सुझाया गया कदम:** सीहोर, होशंगाबाद और हरदा में किसान पूलिंग क्लस्टरों को पहले से सक्रिय करें और बफर स्टॉक रिलीज की योजना तैयार रखें ताकि बाजार में कृत्रिम मूल्य उछाल न आए।`,
      speech: "एआई मॉडल ने मालवा मिलों में तीसरे महीने 18.5 प्रतिशत गेहूं की कमी का अलर्ट जारी किया है।",
      chips: [
        { label: '📊 लिक्विडिटी रिपोर्ट', prompt: 'आज की कुल मंडी लिक्विडिटी और वॉल्यूम समरी दिखाएं।' },
        { label: '⚖️ विवाद समाधान नियम', prompt: 'विवाद समाधान का क्या नियम है?' }
      ]
    },
    pa: {
      text: `**⚠️ 6 ਮਹੀਨਿਆਂ ਦਾ ਸਪਲਾਈ ਡੈਫਿਸਿਟ ਅਲਰਟ:**\n\n• ਤੀਜੇ ਮਹੀਨੇ ਵਿੱਚ ਕਣਕ ਦੀ ਆਮਦ ਮੰਗ ਨਾਲੋਂ **18.5% ਘੱਟ** ਰਹਿਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ।\n• ਮਾਰਕੀਟ ਨੂੰ ਸਥਿਰ ਰੱਖਣ ਲਈ ਪਹਿਲਾਂ ਤੋਂ ਪੂਲਿੰਗ ਵਧਾਉਣ ਦੀ ਸਿਫਾਰਸ਼।`,
      speech: "ਤੀਜੇ ਮਹੀਨੇ ਵਿੱਚ ਕਣਕ ਦੀ 18.5 ਫੀਸਦੀ ਕਮੀ ਹੋਣ ਦਾ ਖਦਸ਼ਾ ਹੈ।",
      chips: [{ label: '📊 ਲਿਕਵਿਡਿਟੀ ਰਿਪੋਰਟ', prompt: 'ਕੁੱਲ ਮੰਡੀ ਰਿਪੋਰਟ ਵੇਖੋ' }]
    },
    mr: {
      text: `**⚠️ ६ महिन्यांचा पुरवठा तुटवडा (Deficit) अलर्ट:**\n\n• तिसऱ्या महिन्यात गव्हाची आवक मागणीपेक्षा **१८.५% कमी** राहण्याचा अंदाज आहे.\n• किमती स्थिर ठेवण्यासाठी बफर स्टॉक व्यवस्थापन आवश्यक आहे.`,
      speech: "तिसऱ्या महिन्यात गव्हाचा १८.५ टक्के तुटवडा भासण्याची शक्यता आहे.",
      chips: [{ label: '📊 लिक्विडिटी अहवाल', prompt: 'एकूण उलाढाल अहवाल दाखवा' }]
    },
    gu: {
      text: `**⚠️ ૬ મહિનાનું સપ્લાય અછત એલર્ટ:**\n\n• ત્રીજા મહિનામાં ઘઉંની આવક માંગ કરતાં **૧૮.૫% ઓછી** રહેવાની શક્યતા છે.\n• બજાર ભાવ સ્થિર રાખવા માટે અગાઉથી આયોજન કરવાની ભલામણ.`,
      speech: "ત્રીજા મહિનામાં ઘઉંની 18.5 ટકા અછત થવાની આગાહી છે.",
      chips: [{ label: '📊 લિક્વિડિટી અહેવાલ', prompt: 'કુલ લિક્વિડિટી રિપોર્ટ જુઓ' }]
    },
    hinglish: {
      text: `**⚠️ 6-Month Supply Deficit Forecast:**\n\n• Month 3 wheat deficit estimated at **18.5%** in Malwa mills.\n• Recommend pre-emptive farmer aggregation and buffer stock release.`,
      speech: "Forecast projects an 18.5 percent wheat supply deficit in Malwa region.",
      chips: [{ label: '📊 Liquidity Report', prompt: 'Show overall mandi liquidity summary' }]
    }
  },

  admin_dispute: {
    en: {
      text: `**⚖️ APMC Dispute Resolution & Quality Arbitration Protocol:**\n\n• **Resolution SLA:** **< 2 Hours** from complaint filing.\n• **Re-testing Policy:** If buyer disputes moisture by >0.5%, independent NABL accredited referee sample is tested at mill gate.\n• **Escrow Freeze Rule:** Escrow locks only the disputed delta amount; undisputed 90% is released immediately to prevent farmer liquidity freeze.`,
      speech: "All quality disputes are arbitrated within two hours with NABL referee re-testing.",
      chips: [
        { label: '📊 Liquidity Overview', prompt: 'Show overall mandi liquidity summary' },
        { label: '⚠️ Supply Deficit Alert', prompt: 'What is the 6-month AI supply deficit alert?' }
      ]
    },
    hi: {
      text: `**⚖️ मंडी बोर्ड विवाद समाधान (Dispute Protocol & SLA):**\n\n• **समाधान समय सीमा:** शिकायत दर्ज होने के **2 घंटे के भीतर** समाधान।\n• **नमी व वजन पुनः परीक्षण:** यदि नमी में 0.5% से अधिक का अंतर आता है, तो स्वतंत्र NABL रेफरी लैब द्वारा तत्काल पुनः परीक्षण किया जाता है।\n• **एस्क्रो सुरक्षा:** विवाद होने पर केवल विवादित अंतर राशि रोकी जाती है, शेष 90% निर्विवाद राशि तुरंत किसान को जारी की जाती है।`,
      speech: "किसी भी विवाद का निपटारा दो घंटे के भीतर स्वतंत्र लैब जांच द्वारा किया जाता है।",
      chips: [
        { label: '📊 लिक्विडिटी रिपोर्ट', prompt: 'आज की कुल मंडी लिक्विडिटी और वॉल्यूम समरी दिखाएं।' },
        { label: '⚠️ डेफिसिट अलर्ट', prompt: 'अगले 6 महीनों में गेहूं का सप्लाई डेफिसिट अलर्ट क्या है?' }
      ]
    },
    pa: {
      text: `**⚖️ ਝਗੜਾ ਨਿਪਟਾਰਾ ਨਿਯਮ:**\n\n• ਕਿਸੇ ਵੀ ਵਿਵਾਦ ਦਾ ਹੱਲ **2 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ** ਕੀਤਾ ਜਾਂਦਾ ਹੈ।\n• ਆਜ਼ਾਦ ਲੈਬ ਵੱਲੋਂ ਦੁਬਾਰਾ ਸੈਂਪਲ ਚੈੱਕ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।\n• 90% ਪੈਸੇ ਤੁਰੰਤ ਕਿਸਾਨ ਨੂੰ ਮਿਲਦੇ ਹਨ।`,
      speech: "ਕਿਸੇ ਵੀ ਵਿਵਾਦ ਦਾ ਹੱਲ ਦੋ ਘੰਟਿਆਂ ਵਿੱਚ ਆਜ਼ਾਦ ਜਾਂਚ ਰਾਹੀਂ ਹੁੰਦਾ ਹੈ।",
      chips: [{ label: '📊 ਮੰਡੀ ਰਿਪੋਰਟ', prompt: 'ਕੁੱਲ ਮੰਡੀ ਰਿਪੋਰਟ ਵੇਖੋ' }]
    },
    mr: {
      text: `**⚖️ वाद निवारण प्रोटोकॉल:**\n\n• तक्रार नोंदवल्यापासून **२ तासांच्या आत** वाद निवारण.\n• निष्पक्ष NABL लॅबकडून पुनर्पडताळणी केली जाते.\n• शेतकऱ्यांचे ९०% पैसे त्वरित वर्ग केले जातात.`,
      speech: "दोन तासांत वाद निवारण केले जाते.",
      chips: [{ label: '📊 लिक्विडिटी अहवाल', prompt: 'एकूण उलाढाल अहवाल दाखवा' }]
    },
    gu: {
      text: `**⚖️ વિવાદ નિવારણ પ્રોટોકોલ:**\n\n• ફરિયાદ નોંધાયાના **૨ કલાકની અંદર** નિરાકરણ.\n• સ્વતંત્ર લેબ દ્વારા સેમ્પલની પુનઃ ચકાસણી.\n• ખેડૂતને ૯૦% રકમ તુરંત રિલીઝ કરવામાં આવે છે.`,
      speech: "વિવાદનું નિરાકરણ બે કલાકમાં લવાય છે.",
      chips: [{ label: '📊 લિક્વિડિટી અહેવાલ', prompt: 'કુલ લિક્વિડિટી રિપોર્ટ જુઓ' }]
    },
    hinglish: {
      text: `**⚖️ Dispute Resolution Protocol:**\n\n• Strict **< 2 hour resolution SLA**.\n• Independent NABL referee testing at mill gate.\n• Undisputed 90% funds released immediately to farmers.`,
      speech: "All disputes resolved within two hours with referee lab testing.",
      chips: [{ label: '📊 Liquidity Report', prompt: 'Show overall mandi liquidity summary' }]
    }
  },

  fallback: {
    en: {
      text: `**Namaste Kisan Bhai! 🙏 I have received your question.**\n\nHere are the most popular topics I can assist you with right now:`,
      speech: "Namaste Kisan Bhai! How can I help you with mandi prices, crop diseases, fertilizer, or delivery tracking?",
      chips: [
        { label: '🌾 Wheat Mandi Rates', prompt: 'What is today wheat mandi price in MP?' },
        { label: '🐛 Yellow Rust Cure', prompt: 'How to cure yellow rust in wheat?' },
        { label: '🌱 Fertilizer Schedule', prompt: 'What is the correct Urea and DAP schedule for wheat?' },
        { label: '🚚 Track Shipment', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    },
    hi: {
      text: `**नमस्ते किसान भाई! 🙏 मैंने आपका सवाल दर्ज कर लिया है।**\n\nमैं आपकी खेती, उपज के दाम और सरकारी योजनाओं में पूरी मदद करने के लिए तैयार हूँ। आप नीचे दिए गए प्रमुख विषयों में से चुन सकते हैं:`,
      speech: "नमस्ते किसान भाई! मैं आपकी खेती, मंडी भाव और आर्डर की जानकारी देने के लिए यहाँ हूँ।",
      chips: [
        { label: '🌾 गेहूं का मंडी भाव', prompt: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' },
        { label: '🐛 पीला रतुआ दवा', prompt: 'गेहूं में पीला रतुआ रोग का क्या इलाज है?' },
        { label: '🌱 खाद का समय', prompt: 'यूरिया और डीएपी खाद कब डालनी चाहिए?' },
        { label: '🚚 गाड़ी की लोकेशन', prompt: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' }
      ]
    },
    pa: {
      text: `**ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ ਜੀ! 🙏 ਮੈਂ ਤੁਹਾਡਾ ਸਵਾਲ ਨੋਟ ਕਰ ਲਿਆ ਹੈ।**\n\nਤੁਸੀਂ ਹੇਠਾਂ ਦਿੱਤੇ ਵਿਸ਼ਿਆਂ ਵਿੱਚੋਂ ਕਿਸੇ 'ਤੇ ਵੀ ਕਲਿੱਕ ਕਰਕੇ ਤੁਰੰਤ ਜਾਣਕਾਰੀ ਲੈ ਸਕਦੇ ਹੋ:`,
      speech: "ਕਿਸਾਨ ਵੀਰ ਜੀ, ਦੱਸੋ ਮੰਡੀ ਭਾਅ ਜਾਂ ਫ਼ਸਲ ਬਾਰੇ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
      chips: [
        { label: '🌾 ਕਣਕ ਦਾ ਭਾਅ', prompt: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' },
        { label: '🐛 ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ', prompt: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ ਕੀ ਹੈ?' },
        { label: '🚚 ਗੱਡੀ ਕਿੱਥੇ ਹੈ?', prompt: 'ਮੇਰਾ ਆਰਡਰ KB-ORD-8821 ਕਿੱਥੇ ਹੈ?' }
      ]
    },
    mr: {
      text: `**नमस्ते शेतकरी दादा! 🙏 आपला प्रश्न मी समजून घेतला आहे.**\n\nखालीलपैकी कोणत्याही विषयावर क्लिक करून आपण तात्काळ माहिती मिळवू शकता:`,
      speech: "शेतकरी दादा, बाजारभाव किंवा पिकाविषयी काय माहिती हवी आहे?",
      chips: [
        { label: '🌾 आजचा गहू भाव', prompt: 'आज गव्हाचा बाजारभाव काय आहे?' },
        { label: '🐛 तांबेरा रोग उपाय', prompt: 'गव्हावरील तांबेरा रोगावर उपाय काय आहे?' },
        { label: '🚚 वाहतूक ट्रॅकिंग', prompt: 'माझा ऑर्डर KB-ORD-8821 कुठे आहे?' }
      ]
    },
    gu: {
      text: `**નમસ્તે ખેડૂત મિત્ર! 🙏 મેં આપનો પ્રશ્ન નોંધી લીધો છે.**\n\nઆપ નીચેનામાંથી કોઈ પણ વિષય પસંદ કરીને તુરંત માહિતી મેળવી શકો છો:`,
      speech: "ખેડૂત મિત્ર, બજારભાવ કે પાક વિશે શું જાણવું છે?",
      chips: [
        { label: '🌾 ઘઉંનો બજારભાવ', prompt: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' },
        { label: '🐛 પીળો ગેરુ નિયંત્રણ', prompt: 'ઘઉંમાં પીળા ગેરુ રોગનો ઉપાય શું છે?' },
        { label: '🚚 ગાડીનું લોકેશન', prompt: 'મારો ઓર્ડર KB-ORD-8821 ક્યાં પહોંચ્યો છે?' }
      ]
    },
    hinglish: {
      text: `**Namaste Kisan Bhai! 🙏 Aapka sawal noted hai.**\n\nNiche diye topics mein se choose karein:`,
      speech: "Namaste Kisan Bhai! Mandi bhav, bimari ya gaadi tracking ke baare mein poochhein.",
      chips: [
        { label: '🌾 Wheat Rate MP', prompt: 'What is today wheat mandi price in MP?' },
        { label: '🐛 Yellow Rust Cure', prompt: 'How to cure yellow rust in wheat?' },
        { label: '🚚 Track Gaadi', prompt: 'Where is my shipment KB-ORD-8821?' }
      ]
    }
  }
};

// ============================================================================
// CHAT INITIALIZATION & 6-LANGUAGE SWITCHER
// ============================================================================
function initChat() {
  setChatLanguage(state.chatLanguage || 'hi', true);
}

function setChatLanguage(lang, isInitial = false) {
  state.chatLanguage = lang;

  // Update 6 language buttons (both desktop and drawer)
  ['en', 'hi', 'pa', 'mr', 'gu', 'hinglish'].forEach(l => {
    const btn = document.getElementById(`chat-lang-${l}`);
    if (btn) {
      if (l === lang) {
        btn.className = 'px-2.5 py-1 rounded-lg font-bold transition bg-white text-emerald-900 shadow-xs shrink-0';
      } else {
        btn.className = 'px-2.5 py-1 rounded-lg font-bold transition text-emerald-200 hover:text-white shrink-0';
      }
    }
    const dBtn = document.getElementById(`drawer-lang-${l}`);
    if (dBtn) {
      if (l === lang) {
        dBtn.className = 'px-2 py-0.5 rounded font-bold bg-white text-emerald-950 transition shrink-0';
      } else {
        dBtn.className = 'px-2 py-0.5 rounded font-bold text-emerald-200 hover:text-white transition shrink-0';
      }
    }
  });

  // Category Ribbon Translations
  const ribbonTranslations = {
    en: { mandi: 'Wheat Mandi Rates', pest: 'Yellow Rust Cure', track: 'Track KB-ORD-8821', fert: 'Urea & DAP Schedule', weather: '7-Day Rain Forecast', payment: 'Direct Bank Payout' },
    hi: { mandi: 'गेहूं मंडी भाव', pest: 'पीला रतुआ इलाज', track: 'गाड़ी लोकेशन (8821)', fert: 'यूरिया व DAP समय', weather: '7 दिन का मौसम', payment: 'खाते में भुगतान (DBT)' },
    pa: { mandi: 'ਕਣਕ ਮੰਡੀ ਭਾਅ', pest: 'ਪੀਲੀ ਕੁੰਗੀ ਇਲਾਜ', track: 'ਗੱਡੀ ਲੋਕੇਸ਼ਨ (8821)', fert: 'ਯੂਰੀਆ ਤੇ DAP ਸਮਾਂ', weather: '7 ਦਿਨਾਂ ਦਾ ਮੌਸਮ', payment: 'ਸਿੱਧਾ ਬੈਂਕ ਭੁਗਤਾਨ' },
    mr: { mandi: 'गहू बाजारभाव', pest: 'तांबेरा रोग उपाय', track: 'वाहतूक ट्रॅकिंग', fert: 'युरिया व DAP वेळ', weather: '७ दिवसांचा हवामान', payment: 'खात्यात पैसे (DBT)' },
    gu: { mandi: 'ઘઉં બજારભાવ', pest: 'પીળો ગેરુ નિયંત્રણ', track: 'ગાડી લોકેશન (8821)', fert: 'યુરિયા અને DAP સમય', weather: '૭ દિવસનું હવામાન', payment: 'ખાતામાં જમા (DBT)' },
    hinglish: { mandi: 'Wheat Mandi Bhav', pest: 'Yellow Rust Cure', track: 'Track Gaadi', fert: 'Urea & DAP Time', weather: 'Mausam Update', payment: 'Direct Bank Payout' }
  };

  const t = ribbonTranslations[lang] || ribbonTranslations.en;
  if (document.getElementById('chip-text-mandi')) document.getElementById('chip-text-mandi').innerText = t.mandi;
  if (document.getElementById('chip-text-pest')) document.getElementById('chip-text-pest').innerText = t.pest;
  if (document.getElementById('chip-text-track')) document.getElementById('chip-text-track').innerText = t.track;
  if (document.getElementById('chip-text-fert')) document.getElementById('chip-text-fert').innerText = t.fert;
  if (document.getElementById('chip-text-weather')) document.getElementById('chip-text-weather').innerText = t.weather;
  if (document.getElementById('chip-text-payment')) document.getElementById('chip-text-payment').innerText = t.payment;

  // Update Input Placeholders
  const placeholders = {
    hi: "अपनी भाषा में पूछें (जैसे: 'गेहूं का आज का भाव क्या है?', 'पीला रतुआ दवा?')...",
    pa: "ਪੰਜਾਬੀ ਵਿੱਚ ਪੁੱਛੋ (ਜਿਵੇਂ: 'ਅੱਜ ਕਣਕ ਦਾ ਭਾਅ ਕੀ ਹੈ?', 'ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ?')...",
    mr: "मराठीत विचारा (उदा. 'आज गव्हाचा भाव काय?', 'तांबेरा रोगावर उपाय?')...",
    gu: "ગુજરાતીમાં પૂછો (જેમ કે: 'ઘઉંનો આજનો ભાવ શું?', 'પીળા ગેરુનો ઈલાજ?')...",
    hinglish: "Hinglish mein poochhein (jaise: 'Wheat rate kya hai?', 'Yellow rust dawa?')...",
    en: "Type in English (e.g., 'Wheat prices in MP', 'Yellow rust cure')..."
  };

  const input = document.getElementById('chat-input');
  if (input) {
    input.placeholder = placeholders[lang] || placeholders.en;
  }
  const drawerInput = document.getElementById('drawer-chat-input');
  if (drawerInput) {
    drawerInput.placeholder = placeholders[lang] || placeholders.en;
  }

  // Update Typing indicator text
  const typingLbl = document.getElementById('typing-indicator-text');
  if (typingLbl) {
    const typingTexts = {
      hi: "कृषि AI उत्तर लिख रहा है...",
      pa: "ਕ੍ਰਿਸ਼ੀ AI ਜਵਾਬ ਤਿਆਰ ਕਰ ਰਿਹਾ ਹੈ...",
      mr: "कृषी AI उत्तर तयार करत आहे...",
      gu: "કૃષિ AI જવાબ તૈયાર કરી રહ્યું છે...",
      hinglish: "Krishi AI is typing advice...",
      en: "Krishi AI is typing helpful advice..."
    };
    typingLbl.innerText = typingTexts[lang] || typingTexts.en;
  }

  // Update Voice HUD Spoken Prompt Chips
  updateHudQuickPrompts(lang);

  // Initialize or add switch message
  if (isInitial || state.chatHistory.length === 0) {
    clearChatHistory();
  } else {
    const switchTexts = {
      en: "Language switched to English. How can I assist you?",
      hi: "भाषा बदलकर हिन्दी कर दी गई है। अब आप हिन्दी में सवाल पूछ सकते हैं।",
      pa: "ਭਾਸ਼ਾ ਬਦਲ ਕੇ ਪੰਜਾਬੀ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ। ਹੁਣ ਤੁਸੀਂ ਪੰਜਾਬੀ ਵਿੱਚ ਪੁੱਛ ਸਕਦੇ ਹੋ।",
      mr: "भाषा बदलून मराठी करण्यात आली आहे. आता आपण मराठीत विचारू शकता.",
      gu: "ભાષા બદલીને ગુજરાતી કરવામાં આવી છે. હવે આપ ગુજરાતીમાં પૂછી શકો છો.",
      hinglish: "Language switched to Hinglish. Aap Hinglish mein pooch sakte hain."
    };
    pushAiMessage(switchTexts[lang] || switchTexts.en, switchTexts[lang] || switchTexts.en, [
      { label: t.mandi, prompt: lang === 'hi' ? 'आज सीहोर मंडी में गेहूं का क्या भाव है?' : lang === 'pa' ? 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' : 'What is today wheat mandi price in MP?' },
      { label: t.pest, prompt: lang === 'hi' ? 'गेहूं में पीला रतुआ रोग का क्या इलाज है?' : lang === 'pa' ? 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ ਕੀ ਹੈ?' : 'How to cure yellow rust in wheat?' }
    ]);
  }
}

function clearChatHistory() {
  state.chatHistory = [];
  chatMessageCounter = 0;
  const initial = krishiBrain.greetings[state.chatLanguage] || krishiBrain.greetings.hi;
  pushAiMessage(initial.text, initial.speech, initial.chips);
}

function pushAiMessage(text, cleanSpeech, chips = []) {
  chatMessageCounter++;
  const msgObj = {
    id: chatMessageCounter,
    sender: 'ai',
    text: text,
    cleanSpeech: cleanSpeech,
    chips: chips,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  state.chatHistory.push(msgObj);
  renderChatMessages();
  return msgObj;
}

// ============================================================================
// CHAT RENDERING & INTENT MATCHING
// ============================================================================
function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  const drawerContainer = document.getElementById('drawer-chat-messages');
  if (!container && !drawerContainer) return;

  const html = state.chatHistory.map(msg => {
    if (msg.sender === 'user') {
      return `
        <div class="flex items-start justify-end gap-2.5">
          <div class="bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-xs sm:text-sm max-w-lg shadow-sm space-y-1">
            <p class="font-medium">${escapeHtml(msg.text)}</p>
            <div class="text-[10px] text-emerald-200 text-right font-semibold">${msg.time}</div>
          </div>
          <div class="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
            👤
          </div>
        </div>
      `;
    } else {
      // AI message with chips
      const chipsHtml = (msg.chips && msg.chips.length > 0) ? `
        <div class="pt-2 flex flex-wrap gap-1.5">
          ${msg.chips.map(c => `
            <button onclick="sendChatWithPrompt('${escapeQuotes(c.prompt)}')" class="px-2.5 py-1 bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-400 rounded-lg text-[11px] font-bold transition shadow-2xs">
              ${c.label} →
            </button>
          `).join('')}
        </div>
      ` : '';

      return `
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm text-sm font-bold ring-2 ring-amber-200">
            🌱
          </div>
          <div class="bg-white border border-stone-200 rounded-2xl rounded-tl-none p-3.5 sm:p-4 text-xs sm:text-sm text-stone-900 max-w-xl space-y-2 shadow-sm">
            <div class="flex items-center justify-between border-b border-stone-100 pb-1.5">
              <span class="font-black text-emerald-900 flex items-center gap-1.5 text-xs">
                <span>Krishi AI (कृषि मित्र)</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">Verified</span>
              </span>
              <span class="text-[10px] text-stone-400 font-medium">${msg.time}</span>
            </div>

            <div class="prose prose-sm text-stone-800 leading-relaxed space-y-1.5">
              ${formatAiResponseToHtml(msg.text)}
            </div>

            <!-- Audio Voice Listen Button -->
            <div class="pt-1.5 flex items-center justify-between border-t border-stone-100">
              <button onclick="speakMessageById(${msg.id})" id="audio-btn-${msg.id}" class="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1.5 transition bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <i data-lucide="volume-2" class="w-3.5 h-3.5 text-emerald-700"></i>
                <span>Listen in Audio (सुनें / ਸੁਣੋ)</span>
              </button>
            </div>

            ${chipsHtml}
          </div>
        </div>
      `;
    }
  }).join('');

  if (container) {
    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  }
  if (drawerContainer) {
    drawerContainer.innerHTML = html;
    drawerContainer.scrollTop = drawerContainer.scrollHeight;
  }

  renderIcons();
}

function formatAiResponseToHtml(text) {
  let formatted = escapeHtml(text);
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-950">$1</strong>');
  formatted = formatted.replace(/\n\n/g, '<div class="h-1.5"></div>');
  formatted = formatted.replace(/\n/g, '<br/>');
  return formatted;
}

function sendChatWithPrompt(promptText) {
  const input = document.getElementById('chat-input');
  if (input) input.value = promptText;
  sendChatMessage(promptText);
}

function askPreset(code) {
  const lang = state.chatLanguage || 'hi';
  const presetsMap = {
    mandi_rate: {
      en: 'What is today wheat mandi price in MP?',
      hi: 'आज सीहोर मंडी में गेहूं का क्या भाव है?',
      pa: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?',
      mr: 'आज गव्हाचा बाजारभाव काय आहे?',
      gu: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?',
      hinglish: 'Wheat ka aaj ka mandi rate kya chal raha hai?'
    },
    pest_rust: {
      en: 'How to cure yellow rust in wheat?',
      hi: 'गेहूं में पीला रतुआ रोग का क्या इलाज है?',
      pa: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ ਕੀ ਹੈ?',
      mr: 'गव्हावरील तांबेरा रोगावर उपाय काय आहे?',
      gu: 'ઘઉંમાં પીળા ગેરુ રોગનો ઉપાય શું છે?',
      hinglish: 'Wheat mein yellow rust bimari ka ilaj kya hai?'
    },
    track_order: {
      en: 'Where is my shipment KB-ORD-8821?',
      hi: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?',
      pa: 'ਮੇਰਾ ਆਰਡਰ KB-ORD-8821 ਕਿੱਥੇ ਹੈ?',
      mr: 'माझा ऑर्डर KB-ORD-8821 कुठे आहे?',
      gu: 'મારો ઓર્ડર KB-ORD-8821 ક્યાં પહોંચ્યો છે?',
      hinglish: 'Shipment KB-ORD-8821 kahan tak pahunchi?'
    },
    fertilizer: {
      en: 'What is the correct Urea and DAP schedule for wheat?',
      hi: 'यूरिया और डीएपी खाद कब डालनी चाहिए?',
      pa: 'ਕਣਕ ਵਿੱਚ ਯੂਰੀਆ ਅਤੇ ਡੀਏਪੀ ਕਦੋਂ ਪਾਉਣੀ ਚਾਹੀਦੀ ਹੈ?',
      mr: 'युरिया आणि डीएपी खत कधी द्यावे?',
      gu: 'યુરિયા અને ડીએપી ખાતર ક્યારે આપવું?',
      hinglish: 'Urea aur DAP dalne ka sahi time kya hai?'
    },
    weather: {
      en: 'Will it rain this week?',
      hi: 'क्या इस हफ्ते बारिश की कोई संभावना है?',
      pa: 'ਕੀ ਇਸ ਹਫਤੇ ਮੀਂਹ ਪਵੇਗਾ?',
      mr: 'या आठवड्यात पाऊस पडेल का?',
      gu: 'શું આ અઠવાડિયે વરસાદની શક્યતા છે?',
      hinglish: 'Kya is hafte barish hone ka chance hai?'
    },
    payout: {
      en: 'When will I receive payment in my bank?',
      hi: 'डिलीवरी के बाद बैंक खाते में पैसा कब मिलेगा?',
      pa: 'ਡਿਲਿਵਰੀ ਤੋਂ ਬਾਅਦ ਬੈਂਕ ਵਿੱਚ ਪੈਸੇ ਕਦੋਂ ਆਉਣਗੇ?',
      mr: 'डिलिव्हरीनंतर खात्यात पैसे कधी जमा होणार?',
      gu: 'ડિલિવરી પછી બેંક ખાતામાં રૂપિયા ક્યારે આવશે?',
      hinglish: 'Delivery ke baad bank account mein payment kab aayegi?'
    },
    buyer_lots: {
      en: 'Show high-grade wheat lots with moisture < 12% in Sehore/Indore',
      hi: 'इंदौर-सीहोर में 12% से कम नमी वाले ग्रेड-ए गेहूं लॉट दिखाएं',
      pa: 'ਇੰਦੌਰ ਵਿੱਚ 12% ਤੋਂ ਘੱਟ ਨਮੀ ਵਾਲੀ ਸ਼ਰਬਤੀ ਕਣਕ ਦਿਖਾਓ',
      mr: 'इंदूर-सिहोरमधील 12% पेक्षा कमी आर्द्रता असलेले ग्रेड-A गहू लॉट दाखवा',
      gu: 'ઈન્દોર-સિહોરમાં 12% થી ઓછી ભેજવાળા ગ્રેડ-એ ઘઉં લોટ બતાવો',
      hinglish: 'Indore-Sehore mein 12% moisture se kam grade-A wheat lots dikhao'
    },
    buyer_moisture: {
      en: 'What is the moisture and protein standard for Sharbati Wheat procurement?',
      hi: 'शरबती गेहूं की खरीद के लिए नमी और प्रोटीन मानक क्या है?',
      pa: 'ਸ਼ਰਬਤੀ ਕਣਕ ਦੀ ਖਰੀਦ ਲਈ ਨਮੀ ਅਤੇ ਪ੍ਰੋਟੀਨ ਦੇ ਕੀ ਮਾਪਦੰਡ ਹਨ?',
      mr: 'शरबती गहू खरेदीसाठी आर्द्रता आणि प्रथिने प्रमाण काय आहे?',
      gu: 'શરબતી ઘઉં ખરીદી માટે ભેજ અને પ્રોટીન માપદંડ શું છે?',
      hinglish: 'Sharbati wheat procurement ke liye moisture aur protein standard kya hai?'
    },
    buyer_escrow: {
      en: 'How does the buyer escrow guarantee and weighbridge release work?',
      hi: 'खरीदार एस्क्रो सुरक्षा और वे-ब्रिज रिलीज कैसे काम करता है?',
      pa: 'ਖਰੀਦਦਾਰ ਐਸਕਰੋ ਅਤੇ ਕੰਡੇ (ਵੇਅ-ਬ੍ਰਿਜ) ਭੁਗਤਾਨ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?',
      mr: 'खरेदीदार एस्क्रो सुरक्षा आणि वजनकाटा रिलीज कसा काम करतो?',
      gu: 'બાયર એસ્ક્રો સુરક્ષા અને વજનકાંટા પેમેન્ટ કેવી રીતે કામ કરે છે?',
      hinglish: 'Buyer escrow guarantee aur weighbridge release kaise kaam karta hai?'
    },
    logistics_route: {
      en: 'What is the optimized route from Sehore Aggregation Hub to Indore Silo?',
      hi: 'सीहोर किसान हब से इंदौर साइलो का सबसे अनुकूल मार्ग क्या है?',
      pa: 'ਸੀਹੋਰ ਹੱਬ ਤੋਂ ਇੰਦੌਰ ਸਾਇਲੋ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਰੂਟ ਕੀ ਹੈ?',
      mr: 'सिहोर ते इंदूर सायलोसाठी सर्वात चांगला मार्ग कोणता आहे?',
      gu: 'સિહોર થી ઈન્દોર સાયલો માટે સૌથી સારો રૂટ કયો છે?',
      hinglish: 'Sehore hub se Indore silo tak ka best route kya hai?'
    },
    logistics_weighbridge: {
      en: 'How to verify digital weighbridge slip and submit gross weight?',
      hi: 'डिजिटल धर्मकांटा पर्ची कैसे सत्यापित करें और वजन दर्ज करें?',
      pa: 'ਡਿਜੀਟਲ ਧਰਮਕੰਡੇ ਦੀ ਪਰਚੀ ਕਿਵੇਂ ਅਪਲੋਡ ਤੇ ਵੈਰੀਫਾਈ ਕਰੀਏ?',
      mr: 'डिजिटल वजनकाटा पावती कशी पडताळावी आणि वजन नोंदवावे?',
      gu: 'ડિજિટલ કાંટા પાવતી કેવી રીતે ચકાસવી અને વજન નોંધવું?',
      hinglish: 'Digital weighbridge slip verify karke gross weight kaise enter karein?'
    },
    logistics_delivery: {
      en: 'How does driver OTP delivery and immediate 90% payout work?',
      hi: 'डिलीवरी ओटीपी और 90% तुरंत भाड़ा भुगतान कैसे मिलता है?',
      pa: 'ਡਿਲਿਵਰੀ ਓਟੀਪੀ ਅਤੇ 90% ਤੁਰੰਤ ਕਿਰਾਇਆ ਕਿਵੇਂ ਮਿਲਦਾ ਹੈ?',
      mr: 'डिलिव्हरी ओटीपी आणि 90% त्वरित भाडे कसे मिळते?',
      gu: 'ડિલિવરી ઓટીપી અને 90% તાત્કાલિક ભાડું કેવી રીતે મળે છે?',
      hinglish: 'Delivery OTP verify hone par 90% instant payout kaise milta hai?'
    },
    admin_liquidity: {
      en: 'What is the Mandi settlement liquidity status and escrow reserve?',
      hi: 'मंडी सेटलमेंट लिक्विडिटी और एस्क्रो रिज़र्व की क्या स्थिति है?',
      pa: 'ਮੰਡੀ ਸੈਟਲਮੈਂਟ ਲਿਕਵਿਡਿਟੀ ਅਤੇ ਐਸਕਰੋ ਰਿਜ਼ਰਵ ਦਾ ਕੀ ਸਟੇਟਸ ਹੈ?',
      mr: 'मंडी सेटलमेंट लिक्विडिटी आणि एस्क्रो रिझर्व्ह स्थिती काय आहे?',
      gu: 'મંડી સેટલમેન્ટ લિક્વિડિટી અને એસ્ક્રો રિઝર્વ સ્થિતિ શું છે?',
      hinglish: 'Mandi settlement liquidity aur escrow reserve ka current status kya hai?'
    },
    admin_deficit: {
      en: 'Which district hubs are facing wheat supply deficit?',
      hi: 'किन जिला केंद्रों में गेहूं आपूर्ति की कमी दर्ज की गई है?',
      pa: 'ਕਿਹੜੇ ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਕਣਕ ਦੀ ਘਾਟ ਹੈ?',
      mr: 'कोणत्या जिल्ह्यांत गव्हाची टंचाई नोंदवली गेली आहे?',
      gu: 'કયા જિલ્લા કેન્દ્રોમાં ઘઉંની અછત નોંધાઈ છે?',
      hinglish: 'Kaunse district hubs mein wheat supply deficit detect hua hai?'
    },
    admin_dispute: {
      en: 'Are there any active moisture or weighbridge disputes today?',
      hi: 'क्या आज कोई नमी या तौल विवाद लंबित है?',
      pa: 'ਕੀ ਅੱਜ ਕੋਈ ਨਮੀ ਜਾਂ ਤੋਲ ਦਾ ਝਗੜਾ ਬਕਾਇਆ ਹੈ?',
      mr: 'आज काही आर्द्रता किंवा वजन वाद प्रलंबित आहे का?',
      gu: 'શું આજે કોઈ ભેજ અથવા વજન વિવાદ પેન્ડિંગ છે?',
      hinglish: 'Kya aaj koi moisture ya weighbridge dispute pending hai?'
    }
  };

  const selected = presetsMap[code];
  const query = selected ? (selected[lang] || selected.en) : code;
  sendChatWithPrompt(query);
}

function sendChatMessage(optionalText) {
  let userText = '';
  if (typeof optionalText === 'string' && optionalText.trim()) {
    userText = optionalText.trim();
  } else {
    const input = document.getElementById('chat-input');
    const drawerInput = document.getElementById('drawer-chat-input');
    if (drawerInput && drawerInput.value.trim()) {
      userText = drawerInput.value.trim();
      drawerInput.value = '';
    } else if (input && input.value.trim()) {
      userText = input.value.trim();
      input.value = '';
    }
  }

  if (!userText) return;

  const inputEl = document.getElementById('chat-input');
  if (inputEl) inputEl.value = '';
  const drawerInputEl = document.getElementById('drawer-chat-input');
  if (drawerInputEl) drawerInputEl.value = '';

  chatMessageCounter++;
  const userMsg = {
    id: chatMessageCounter,
    sender: 'user',
    text: userText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  state.chatHistory.push(userMsg);
  renderChatMessages();

  // Show Typing Indicator in both chat containers
  const indicator = document.getElementById('chat-typing-indicator');
  if (indicator) indicator.classList.remove('hidden');
  const drawerIndicator = document.getElementById('drawer-typing-indicator');
  if (drawerIndicator) drawerIndicator.classList.remove('hidden');

  // Match intent across all languages
  const lang = state.chatLanguage || 'hi';
  const lower = userText.toLowerCase();

  let matchedCategory = 'fallback';

  if (/(hi|hello|namaste|namaskar|ram ram|kisan|pranam|kaise ho|who are you|koun ho|ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ|ਸਲਾਮ|ਨਮਸਤੇ|नमस्ते|राम राम|प्रणाम|नमस्कार|કેમ છો|જય શ્રી કૃષ્ણ)/i.test(lower)) {
    matchedCategory = 'greetings';
  } else if (/(buyer.*lot|verified.*lot|bulk.*lot|lot-301|lot-302|procure|खरीद.*लॉट|लॉट|सत्यापित.*लॉट|ਖਰੀਦ.*ਲਾਟ|लॉट.*दाखवा|ખરીદી.*લોટ)/i.test(lower)) {
    matchedCategory = 'buyer_lots';
  } else if (/(moisture|protein|quality.*standard|grade.*spec|नमी.*मानक|प्रोटीन|गुणवत्ता.*मानक|ਨਮੀ.*ਮਾਪਦੰਡ|आर्द्रता.*प्रमाण|ભેજ.*માપદંડ)/i.test(lower)) {
    matchedCategory = 'buyer_moisture';
  } else if (/(buyer.*escrow|escrow.*guarantee|escrow.*release|weighbridge.*release|एस्क्रो.*सुरक्षा|खरीदार.*एस्क्रो|ਐਸਕਰੋ.*ਗਾਰੰਟੀ|एस्क्रो.*हमी|એસ્ક્રો.*સુરક્ષા)/i.test(lower)) {
    matchedCategory = 'buyer_escrow';
  } else if (/(route|silo|hub.*silo|freight.*route|मार्ग|रास्ता|अनुकूल.*मार्ग|ਸਾਇਲੋ.*ਰੂਟ|वाहतूक.*मार्ग|રૂટ)/i.test(lower)) {
    matchedCategory = 'logistics_route';
  } else if (/(weighbridge|dharamkanta|dharmkanta|gross.*weight|slip|धर्मकांटा|कांटा|वजन.*पर्ची|ਕੰਡੇ|ਧਰਮਕੰਡਾ|वजनकाटा|કાંટો)/i.test(lower)) {
    matchedCategory = 'logistics_weighbridge';
  } else if (/(delivery.*otp|driver.*payout|90%.*payout|freight.*payout|तुरंत.*भाड़ा|डिलीवरी.*ओटीपी|ਤੁਰੰਤ.*ਕਿਰਾਇਆ|त्वरित.*भाडे|તાત્કાલિક.*ભાડું)/i.test(lower)) {
    matchedCategory = 'logistics_delivery';
  } else if (/(liquidity|settlement.*liquidity|reserve|mandi.*fund|लिक्विडिटी|निपटान|एस्क्रो.*रिज़र्व|ਲਿਕਵਿਡਿਟੀ|रोखता|લિક્વિડਿટી)/i.test(lower)) {
    matchedCategory = 'admin_liquidity';
  } else if (/(deficit|shortage|supply.*deficit|कमी|अभाव|आपूर्ति.*कमी|ਘਾਟ|ਕਮੀ|टंचाई|અછत)/i.test(lower)) {
    matchedCategory = 'admin_deficit';
  } else if (/(dispute|grievance|complaint|विवाद|शिकायत|ਤਕਰਾਰ|वाद|તકરਾਰ)/i.test(lower)) {
    matchedCategory = 'admin_dispute';
  } else if (/(rust|yellow|brown|peela|ratua|fungus|puccinia|ਕੁੰਗੀ|ਪੀਲੀ|ਰੋਗ|तांबेरा|गवे|ગેરુ|રોਗ|रतुआ|पीला|हल्दी|कीड़ा|रोग|पत्ती)/i.test(lower)) {
    matchedCategory = 'yellow_rust';
  } else if (/(urea|dap|fertilizer|npk|potash|khad|khaad|nano urea|ਯੂਰੀਆ|ਡੀਏਪੀ|ਖਾਦ|खत|युरिया|ખાતર|યુરિયા|ડીએપી|खाद|यूरिया|डीएपी|छिड़काव)/i.test(lower)) {
    matchedCategory = 'fertilizer';
  } else if (/(weather|rain|barish|barsaat|mausam|temperature|forecast|ਮੌਸਮ|ਮੀਂਹ|ਬਰਸਾਤ|हवामान|पाऊस|હવામાન|વરસાદ|मौसम|बारिश|बरसात|तापमान)/i.test(lower)) {
    matchedCategory = 'weather';
  } else if (/(track|shipment|order|8821|truck|driver|gadi|gaadi|kahan|ਟਰੱਕ|ਗੱਡੀ|ਕਿੱਥੇ|गाडी|कुठे|ઓર્ડર|ક્યાં|कहाँ|ट्रैक|गाड़ी|आर्डर)/i.test(lower)) {
    matchedCategory = 'tracking';
  } else if (/(payment|paisa|paise|rupaye|money|dbt|escrow|bank|account|khata|ਪੈਸੇ|ਰੁਪਏ|ਖਾਤਾ|पैसे|खाते|ਰકમ|રૂપિયા|खाता|भुगतान)/i.test(lower)) {
    matchedCategory = 'payout';
  } else if (/(pool|pooling|aggregation|samuh|group|ftl|freight|ਪੂਲਿੰਗ|ਸਮੂਹ|समूह|ਪੂਲਿੰਗ|જૂથ|बचत|पूलिंग|समूह|भाड़ा)/i.test(lower)) {
    matchedCategory = 'pooling';
  } else if (/(sell|bechna|listing|list|kaise beche|ਵੇਚਣਾ|विक्री|વેચવું|बेचना|कैसे बेचें|मंडी में बेच)/i.test(lower)) {
    matchedCategory = 'how_to_sell';
  } else if (/(wheat|gehu|gehun|sharbati|lokwan|mandi|bhav|rate|price|msp|ਕਣਕ|ਭਾਅ|ਰੇਟ|गहू|बाजारभाव|ઘઉં|ભાવ|गेहूं|गेहू|भाव|दाम|एमएसपी)/i.test(lower)) {
    matchedCategory = 'wheat_rates';
  } else if (/(thank|dhanyawad|shukriya|shukran|ਧੰਨਵਾਦ|ਸ਼ੁਕਰੀਆ|धन्यवाद|आभार|આभार|शुक्रिया)/i.test(lower)) {
    matchedCategory = 'thanks';
  }

  const categoryObj = krishiBrain[matchedCategory] || krishiBrain.fallback;
  const replyObj = categoryObj[lang] || categoryObj.en || categoryObj.hi;

  // Realistic responsive delay
  setTimeout(() => {
    if (indicator) indicator.classList.add('hidden');
    if (drawerIndicator) drawerIndicator.classList.add('hidden');

    const aiMsg = pushAiMessage(replyObj.text, replyObj.speech, replyObj.chips);

    if (state.speechEnabled) {
      speakMessageById(aiMsg.id);
    }

    if (state.demoStep === 4) {
      state.demoStep = 5;
      updateDemoGuide();
    }
  }, 450);
}

// ============================================================================
// VOICE RECOGNITION (KRISHI VANI VOICE HUD WITH REAL-TIME WAVE SPEECH)
// ============================================================================
function updateHudQuickPrompts(lang) {
  const hudContainer = document.getElementById('hud-quick-prompts');
  if (!hudContainer) return;

  const quickPromptsByLang = {
    hi: [
      { text: '🌾 आज गेहूं का भाव क्या है?', q: 'आज सीहोर मंडी में गेहूं का क्या भाव है?' },
      { text: '🐛 पीला रतुआ दवा', q: 'गेहूं में पीला रतुआ रोग का क्या इलाज है?' },
      { text: '🌱 खाद का समय', q: 'यूरिया और डीएपी खाद कब डालनी चाहिए?' },
      { text: '🚚 गाड़ी कहां है?', q: 'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?' },
      { label: '💰 पैसे कब मिलेंगे?', q: 'डिलीवरी के बाद बैंक खाते में पैसा कब मिलेगा?' }
    ],
    pa: [
      { text: '🌾 ਕਣਕ ਦਾ ਅੱਜ ਦਾ ਭਾਅ', q: 'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?' },
      { text: '🐛 ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ', q: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ ਕੀ ਹੈ?' },
      { text: '🌱 ਖਾਦ ਪਾਉਣ ਦਾ ਸਮਾਂ', q: 'ਕਣਕ ਵਿੱਚ ਯੂਰੀਆ ਅਤੇ ਡੀਏਪੀ ਕਦੋਂ ਪਾਉਣੀ ਚਾਹੀਦੀ ਹੈ?' },
      { text: '🚚 ਗੱਡੀ ਕਿੱਥੇ ਹੈ?', q: 'ਮੇਰਾ ਆਰਡਰ KB-ORD-8821 ਕਿੱਥੇ ਹੈ?' }
    ],
    mr: [
      { text: '🌾 आजचा गहू बाजारभाव', q: 'आज गव्हाचा बाजारभाव काय आहे?' },
      { text: '🐛 तांबेरा रोग औषध', q: 'गव्हावरील तांबेरा रोगावर उपाय काय आहे?' },
      { text: '🌱 खत देण्याची वेळ', q: 'युरिया आणि डीएपी खत कधी द्यावे?' },
      { text: '🚚 वाहतूक ट्रॅकिंग', q: 'माझा ऑर्डर KB-ORD-8821 कुठे आहे?' }
    ],
    gu: [
      { text: '🌾 ઘઉંનો આજનો બજારભાવ', q: 'આજે ઘઉંનો બજારભાવ શું ચાલે છે?' },
      { text: '🐛 પીળા ગેરુનો ઈલાજ', q: 'ઘઉંમાં પીળા ગેરુ રોગનો ઉપાય શું છે?' },
      { text: '🌱 ખાતર આપવાનો સમય', q: 'યુરિયા અને ડીએપી ખાતર ક્યારે આપવું?' },
      { text: '🚚 ગાડીનું લોકેશન', q: 'મારો ઓર્ડર KB-ORD-8821 ક્યાં પહોંચ્યો છે?' }
    ],
    hinglish: [
      { text: '🌾 Wheat Mandi Rate', q: 'Wheat ka aaj ka bhav kya hai?' },
      { text: '🐛 Rust Bimari Cure', q: 'Wheat mein yellow rust bimari ka ilaj kya hai?' },
      { text: '🚚 Track Gaadi', q: 'Shipment KB-ORD-8821 kahan tak pahunchi?' }
    ],
    en: [
      { text: '🌾 Wheat Mandi Rates', q: 'What is today wheat mandi price in MP?' },
      { text: '🐛 Yellow Rust Cure', q: 'How to cure yellow rust in wheat?' },
      { text: '🌱 Fertilizer Schedule', q: 'What is the correct Urea and DAP schedule for wheat?' },
      { text: '🚚 Track Shipment', q: 'Where is my shipment KB-ORD-8821?' }
    ]
  };

  const pool = quickPromptsByLang[lang] || quickPromptsByLang.hi;
  hudContainer.innerHTML = pool.map(item => `
    <button onclick="pickPromptFromHud('${escapeQuotes(item.q || item.text)}')" class="px-2.5 py-1 bg-stone-800 hover:bg-emerald-900 text-stone-200 hover:text-emerald-200 rounded-lg text-xs font-medium border border-stone-700 transition">
      ${item.text}
    </button>
  `).join('');
}

function startVoiceInput() {
  const modal = document.getElementById('voice-listening-modal');
  const hudLang = document.getElementById('hud-lang-label');
  const hudStatus = document.getElementById('hud-status-text');
  const hudTranscript = document.getElementById('hud-transcript-text');

  currentVoiceTranscript = '';

  const cfg = langConfig[state.chatLanguage] || langConfig.hi;
  if (hudLang) hudLang.innerText = `कृषि वाणी • Live Voice (${cfg.name})`;
  if (hudStatus) hudStatus.innerText = `बोलिए किसान भाई, हम सुन रहे हैं... (${cfg.name} Listening)`;
  if (hudTranscript) hudTranscript.innerText = `"${cfg.greetingPrompt}..."`;

  updateHudQuickPrompts(state.chatLanguage);

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (hudStatus) hudStatus.innerText = "Microphone speech is not supported in this browser. Tap any question below:";
    return;
  }

  try {
    if (speechRecognitionInstance) {
      try { speechRecognitionInstance.stop(); } catch(e) {}
    }

    speechRecognitionInstance = new SpeechRecognition();
    speechRecognitionInstance.continuous = false;
    speechRecognitionInstance.interimResults = true;
    speechRecognitionInstance.lang = cfg.code;
    speechRecognitionInstance.maxAlternatives = 1;

    speechRecognitionInstance.onstart = () => {
      state.isVoiceListening = true;
      if (hudStatus) hudStatus.innerText = `बोलिए, हम सुन रहे हैं... (Listening in ${cfg.name})`;
    };

    speechRecognitionInstance.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          currentVoiceTranscript = event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      const liveText = currentVoiceTranscript || interim;
      if (hudTranscript && liveText) {
        hudTranscript.innerText = `"${liveText}"`;
      }
    };

    speechRecognitionInstance.onerror = (event) => {
      console.warn('Speech recognition notice:', event.error);
      if (event.error === 'not-allowed') {
        if (hudStatus) hudStatus.innerText = "⚠️ Microphone access was denied. Please select a question below:";
      } else if (event.error === 'no-speech') {
        if (hudStatus) hudStatus.innerText = "No voice heard. Please speak clearly or tap a question below:";
      }
    };

    speechRecognitionInstance.onend = () => {
      state.isVoiceListening = false;
      if (currentVoiceTranscript) {
        const input = document.getElementById('chat-input');
        if (input) input.value = currentVoiceTranscript;
      }
    };

    speechRecognitionInstance.start();
  } catch (err) {
    console.error('Speech init error:', err);
    if (hudStatus) hudStatus.innerText = "Microphone unavailable. Please tap any question below:";
  }
}

function stopVoiceRecognition() {
  state.isVoiceListening = false;
  if (speechRecognitionInstance) {
    try { speechRecognitionInstance.stop(); } catch (e) {}
    speechRecognitionInstance = null;
  }
  const modal = document.getElementById('voice-listening-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function confirmAndSendVoiceTranscript() {
  const hudTranscript = document.getElementById('hud-transcript-text');
  let text = currentVoiceTranscript;

  if (!text && hudTranscript) {
    const raw = hudTranscript.innerText.replace(/^"|"$/g, '').trim();
    if (raw && !raw.includes('Listening') && !raw.includes('बोलिए')) {
      text = raw;
    }
  }

  if (text) {
    const wasHandled = executeVoiceAction(text);
    if (!wasHandled) {
      stopVoiceRecognition();
      const input = document.getElementById('chat-input');
      if (input) input.value = text;
      sendChatMessage();
    }
  } else {
    simulateVoiceInput();
  }
}

function pickPromptFromHud(promptText) {
  stopVoiceRecognition();
  const input = document.getElementById('chat-input');
  if (input) input.value = promptText;
  sendChatMessage();
}

function simulateVoiceInput() {
  const promptsByLang = {
    hi: [
      'आज सीहोर मंडी में गेहूं का क्या भाव है?',
      'गेहूं में पीला रतुआ रोग का क्या इलाज है?',
      'यूरिया और डीएपी खाद कब डालनी चाहिए?',
      'मेरा आर्डर KB-ORD-8821 कहां पहुंचा है?'
    ],
    pa: [
      'ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?',
      'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਇਲਾਜ ਕੀ ਹੈ?',
      'ਮੇਰਾ ਆਰਡਰ KB-ORD-8821 ਕਿੱਥੇ ਹੈ?'
    ],
    mr: [
      'आज गव्हाचा बाजारभाव काय आहे?',
      'गव्हावरील तांबेरा रोगावर उपाय काय आहे?',
      'माझा ऑर्डर KB-ORD-8821 कुठे आहे?'
    ],
    gu: [
      'આજે ઘઉંનો બજારભાવ શું ચાલે છે?',
      'ઘઉંમાં પીળા ગેરુ રોગનો ઉપાય શું છે?',
      'મારો ઓર્ડર KB-ORD-8821 ક્યાં પહોંચ્યો છે?'
    ],
    hinglish: [
      'Sehore mandi mein wheat ka rate kya chal raha hai?',
      'Wheat mein yellow rust bimari ka ilaj kya hai?',
      'Shipment KB-ORD-8821 kahan tak pahunchi?'
    ],
    en: [
      'What is the expected Wheat price next week in MP?',
      'How to cure yellow rust on wheat leaves?',
      'Where is my bulk wheat shipment KB-ORD-8821?'
    ]
  };

  const pool = promptsByLang[state.chatLanguage] || promptsByLang.hi;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  const input = document.getElementById('chat-input');
  if (input) input.value = picked;
  showToast(`🎤 Voice: "${picked}"`, 'success');
  sendChatMessage();
}

// ============================================================================
// TEXT-TO-SPEECH VOICE SYNTHESIS (AUTHENTIC MULTILINGUAL AUDIO)
// ============================================================================
function speakMessageById(id) {
  const msg = state.chatHistory.find(m => m.id === id);
  if (!msg) return;

  if (!('speechSynthesis' in window)) {
    showToast('Audio speech is not supported in this browser.', 'info');
    return;
  }

  // If already speaking, stop it
  if (state.isVoiceSpeaking) {
    stopSpeech();
    return;
  }

  stopSpeech();

  const textToSpeak = msg.cleanSpeech || msg.text.replace(/[*#_`•]/g, '').replace(/\n+/g, '. ');
  const utterance = new SpeechSynthesisUtterance(textToSpeak);

  // Match voice to active language code
  const voices = window.speechSynthesis.getVoices();
  const cfg = langConfig[state.chatLanguage] || langConfig.hi;
  const targetPrefix = cfg.code.split('-')[0];

  let selectedVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(targetPrefix)) ||
                      voices.find(v => v.lang && v.lang.includes('IN')) ||
                      voices.find(v => v.lang && v.lang.startsWith('en'));

  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.lang = cfg.code;

  const stopBtn = document.getElementById('btn-speech-stop');
  utterance.onstart = () => {
    state.isVoiceSpeaking = true;
    if (stopBtn) {
      stopBtn.classList.remove('hidden');
      stopBtn.classList.add('inline-flex');
    }
    const audioBtn = document.getElementById(`audio-btn-${id}`);
    if (audioBtn) {
      audioBtn.innerHTML = `<i data-lucide="volume-x" class="w-3.5 h-3.5 text-rose-600"></i><span class="text-rose-600 font-bold">Speaking... (Click to stop)</span>`;
      renderIcons();
    }
  };

  utterance.onend = () => {
    resetAudioButtons();
  };

  utterance.onerror = () => {
    resetAudioButtons();
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  resetAudioButtons();
}

function resetAudioButtons() {
  state.isVoiceSpeaking = false;
  const stopBtn = document.getElementById('btn-speech-stop');
  if (stopBtn) {
    stopBtn.classList.add('hidden');
    stopBtn.classList.remove('inline-flex');
  }
  state.chatHistory.forEach(m => {
    const btn = document.getElementById(`audio-btn-${m.id}`);
    if (btn) {
      btn.innerHTML = `<i data-lucide="volume-2" class="w-3.5 h-3.5 text-emerald-700"></i><span>Listen in Audio (सुनें / ਸੁਣੋ)</span>`;
    }
  });
  renderIcons();
}

function toggleSpeech() {
  state.speechEnabled = !state.speechEnabled;
  if (!state.speechEnabled) {
    stopSpeech();
  }
  const label = document.getElementById('speech-toggle-label');
  if (label) {
    label.innerText = `Voice: ${state.speechEnabled ? 'ON' : 'OFF'}`;
  }
  showToast(`Voice audio synthesis turned ${state.speechEnabled ? 'ON' : 'OFF'}`, 'info');
}

// ============================================================================
// ADMIN CONTROL CENTER & CHARTS
// ============================================================================
function initDemandChart() {
  const ctx = document.getElementById('demandForecastChart')?.getContext('2d');
  if (!ctx) return;

  demandChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Oct 2026', 'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027'],
      datasets: [
        {
          label: 'Projected Institutional Demand (Thousand MT)',
          data: [42, 58, 64, 75, 82, 95],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.08)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true
        },
        {
          label: 'Estimated Mandi Arrivals / Supply (Thousand MT)',
          data: [50, 52, 55, 60, 78, 110],
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.08)',
          borderWidth: 2.5,
          borderDash: [5, 5],
          tension: 0.35,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 12,
            font: { size: 11, weight: 'bold', family: 'Plus Jakarta Sans' }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          grid: { color: '#f1f5f9' },
          ticks: { font: { size: 11 } }
        },
        x: {
          grid: { color: '#f1f5f9' },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

function renderAdminLogs() {
  const container = document.getElementById('admin-activity-log');
  if (!container) return;

  container.innerHTML = state.activityLogs.slice(0, 8).map(log => `
    <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
      <div class="flex items-center justify-between text-[10px] text-slate-400 font-bold">
        <span class="uppercase tracking-wider text-emerald-700">${log.type}</span>
        <span>${log.time}</span>
      </div>
      <p class="text-xs text-slate-700 font-medium">${log.text}</p>
    </div>
  `).join('');
}

// ============================================================================
// ARCHITECTURE MODAL
// ============================================================================
function openArchModal() {
  const modal = document.getElementById('arch-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderIcons();
}

function closeArchModal() {
  const modal = document.getElementById('arch-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-800 text-white' : 'bg-slate-900 text-white';

  toast.className = `${bgClass} text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0 duration-200 border border-white/10`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

function showActionToast(title, subtitle, actionText, actionFn) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl flex flex-col gap-2 pointer-events-auto border border-emerald-500/40 w-80 animate-in fade-in slide-in-from-bottom-2 duration-200`;
  
  toast.innerHTML = `
    <div>
      <div class="font-bold text-xs text-emerald-400">${title}</div>
      <div class="text-[11px] text-slate-300">${subtitle}</div>
    </div>
    <div class="flex justify-end gap-2 pt-1">
      <button class="btn-dismiss px-2.5 py-1 text-[11px] text-slate-400 hover:text-white rounded">Dismiss</button>
      <button class="btn-action px-3 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow">
        ${actionText} →
      </button>
    </div>
  `;

  toast.querySelector('.btn-dismiss').onclick = () => toast.remove();
  toast.querySelector('.btn-action').onclick = () => {
    toast.remove();
    actionFn();
  };

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 8000);
}

// Helpers
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// ============================================================================
// SUBTAB NAVIGATION CONTROLLERS (FARMER, BUYER, LOGISTICS, ADMIN)
// ============================================================================
function switchFarmerTab(tabName) {
  const tabs = ['produce', 'sales', 'ledger', 'orders', 'companies', 'logistics', 'mandi', 'payment', 'support'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-f-${t}`);
    const panel = document.getElementById(`farmer-sub-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'farmer-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-emerald-800 text-white shadow-xs shrink-0';
      } else {
        btn.className = 'farmer-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 shrink-0';
      }
    }
    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
  if (tabName === 'logistics') {
    refreshGpsMaps();
  }
  renderIcons();
}

function switchBuyerTab(tabName) {
  const tabs = ['market', 'chanakya', 'areakyc', 'quality', 'pricecomp', 'silo', 'history', 'tracking', 'escrow', 'logistics', 'contact'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-b-${t}`);
    const panel = document.getElementById(`buyer-sub-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'buyer-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-indigo-900 text-white shadow-xs shrink-0';
      } else {
        btn.className = 'buyer-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 shrink-0';
      }
    }
    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
  if (tabName === 'tracking') {
    refreshGpsMaps();
  }
  renderIcons();
}

function switchHostTab(tabName) {
  const tabs = ['dispatch', 'vahan', 'telemetry', 'driver', 'payment', 'cargo', 'margin', 'expenses', 'trips', 'sos'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-h-${t}`);
    const panel = document.getElementById(`host-sub-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'host-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-teal-800 text-white shadow-xs shrink-0';
      } else {
        btn.className = 'host-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 shrink-0';
      }
    }
    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
  if (tabName === 'dispatch') {
    refreshGpsMaps();
  }
  renderIcons();
}

function switchAdminTab(tabName) {
  const tabs = ['ops', 'servers', 'kpis', 'fleet', 'taxes', 'disputes', 'bots'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-a-${t}`);
    const panel = document.getElementById(`admin-sub-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'admin-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-indigo-900 text-white shadow-xs shrink-0';
      } else {
        btn.className = 'admin-subtab px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 shrink-0';
      }
    }
    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
  if (tabName === 'ops' && demandChartInstance) {
    setTimeout(() => demandChartInstance.resize(), 50);
  }
  renderIcons();
}

// ============================================================================
// FARMER SERVICES: AI IMAGE CHECKING, ASSAY & LEDGERS
// ============================================================================
function runAiImageGrading(preset = 'sharbati') {
  const gradingPresets = {
    sharbati: {
      crop: 'Wheat (Sharbati Gold)',
      grade: 'Grade A+ (Premium Sharbati)',
      moisture: 11.2,
      lustre: 96.4,
      defects: 0.8,
      foreignMatter: 0.4,
      aiPrice: 2520,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    mustard: {
      crop: 'Mustard (Yellow Sarson)',
      grade: 'Grade A (High Oil Content)',
      moisture: 8.4,
      lustre: 94.2,
      defects: 1.1,
      foreignMatter: 0.6,
      aiPrice: 5450,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    soybean: {
      crop: 'Soybean (JS-335)',
      grade: 'Grade A+ (Industrial Protein)',
      moisture: 10.1,
      lustre: 95.8,
      defects: 0.9,
      foreignMatter: 0.5,
      aiPrice: 4850,
      badgeColor: 'bg-indigo-100 text-indigo-800'
    }
  };

  const data = gradingPresets[preset] || gradingPresets.sharbati;
  
  // Update meter elements if present
  const gradeBadge = document.getElementById('ai-grade-badge');
  const moistureEl = document.getElementById('ai-assay-moisture');
  const lustreEl = document.getElementById('ai-assay-lustre');
  const defectsEl = document.getElementById('ai-assay-defects');
  const certQr = document.getElementById('assay-cert-box');

  if (gradeBadge) gradeBadge.innerText = data.grade;
  if (moistureEl) moistureEl.innerText = `${data.moisture}%`;
  if (lustreEl) lustreEl.innerText = `${data.lustre}%`;
  if (defectsEl) defectsEl.innerText = `${data.defects}%`;
  if (certQr) certQr.classList.remove('opacity-50');

  showToast(`🔍 AI Computer Vision: ${data.grade} verified! Moisture ${data.moisture}%, Fair Price: ₹${data.aiPrice}/Qtl`, 'success');
}

function applyAiAssayToListing() {
  const cropInput = document.getElementById('farmer-crop');
  const moistureInput = document.getElementById('farmer-moisture');
  const priceInput = document.getElementById('farmer-price');

  if (cropInput) cropInput.value = 'Wheat (Sharbati Gold)';
  if (moistureInput) moistureInput.value = '11.2';
  if (priceInput) priceInput.value = '2520';

  switchFarmerTab('produce');
  showToast('✅ NABL Grade A+ specs & fair price ₹2,520 applied directly to your listing form!', 'success');
}

function downloadLedgerSummary() {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Txn ID,Date,Crop,Buyer,Quantity (Qtl),Rate (INR/Qtl),Total Payout,Status,Bank UTR\n"
    + "TXN-MP-9021,15 Sep 2026,Sharbati Wheat,Malwa Agro Mills,200,2480,496000,SETTLED,UTR-HDFC-991823\n"
    + "TXN-MP-8944,02 Sep 2026,Yellow Mustard,Shree Ram Oil Jaipur,85,5450,463250,SETTLED,UTR-SBI-771201\n"
    + "TXN-MP-8810,18 Aug 2026,Soybean JS-335,Ruchi Soya Extraction,150,4800,720000,SETTLED,UTR-ICICI-441920\n";
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Krishi_Farmer_Ledger_Ramesh_Patidar.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📥 Downloaded verified GST & Bank UTR transaction ledger', 'success');
}

function downloadSampleReceipt(lotId = 'LOT-301') {
  showToast(`📜 Generated Digital NABL Certificate & QR for ${lotId} (Assay: Moisture 11.2%, Protein 13.8%)`, 'info');
}

function submitFarmerGrievance() {
  showToast('⚖️ Grievance registered (#GRV-MP-9012). APMC Mandi Secretary notified. 2-hour SLA active.', 'success');
}

// ============================================================================
// BUYER SERVICES: CHANAKYA BUSINESS AI & LOGISTICS TOGGLE
// ============================================================================
const chanakyaKB = {
  arbitrage: {
    title: 'Sehore vs Dewas vs Kota Mandi Arbitrage',
    text: `**💼 Chanakya Multi-Mandi Landed Cost Analysis:**\n\n• **Sehore Hub (Recommended):** Farmgate FOB ₹2,480 + Freight ₹140 = **Landed ₹2,620/Qtl**.\n• **Dewas Cluster:** FOB ₹2,510 + Freight ₹160 = **Landed ₹2,670/Qtl** (+₹50 delta).\n• **Kota Mandi:** FOB ₹2,550 + Freight ₹220 = **Landed ₹2,770/Qtl** (+₹150 delta).\n\n**Strategic Recommendation:** Booking 500 Qtl from **Sehore Farmers Cluster** yields immediate net savings of **₹25,000 to ₹75,000** on your procurement budget!`
  },
  specs: {
    title: 'Industrial Flour Milling Assaying Criteria',
    text: `**🔬 Industrial Milling Specifications (NABL Grade A+):**\n\n• **Moisture:** Target ≤ 11.5% (Max 12.0% before mold threshold)\n• **Gluten Index:** Minimum 28.0% for high loaf-volume bread & chakki atta\n• **Protein (Dry Basis):** 13.5% - 14.2% verified via NIR Spectrometry\n• **Foreign Matter:** < 0.5% (Zero stones / glass / ergot seeds)\n\nAll farmer lots on Krishi Bazaar carry verifiable QR-coded digital assay certificates.`
  },
  escrow: {
    title: '3-Way Smart Escrow Protection Architecture',
    text: `**🔒 Institutional Buyer Escrow Governance:**\n\n1. **Zero Advance Risk:** 100% funds locked safely in RBI-authorized Escrow.\n2. **90% Release Trigger:** Disburses only after your designated weighbridge certifies tare/gross weight.\n3. **10% Dispute Retention:** Held until lab moisture check passes. Any discrepancy triggers automated APMC arbitration.`
  },
  clusters: {
    title: 'Verified Farmer FPO Acreage & Capacity',
    text: `**🌱 High-Capacity Producer Clusters in Central India:**\n\n• **Sehore FPO Pool #402:** 320 Farmers • 2,400 Acres • 12,000 Qtl Sharbati Available\n• **Dewas Organic Producer Co:** 180 Farmers • 1,200 Acres • 7,500 Qtl Certified Wheat\n• **Harda Pulse & Grain Federation:** 210 Farmers • 1,900 Acres • 9,800 Qtl Premium Grain\n\nAll clusters carry 100% Aadhaar DBT link and verified Khasra land titles.`
  },
  hedging: {
    title: 'Rabi Season Forward Price Hedging',
    text: `**📈 AI Price Forecast & Forward Hedging Strategy:**\n\n• Projected wheat shortfall in Western Indian ports by next quarter will drive mandi spot rates up to **₹2,680 - ₹2,740/Qtl**.\n• Pre-booking forward delivery contracts on Krishi Bazaar locks your landed price at **₹2,480/Qtl**, insuring your processing margins against market volatility.`
  }
};

function askChanakya(queryKeyOrText) {
  const stream = document.getElementById('chanakya-chat-stream');
  if (!stream) return;

  let queryTitle = '';
  let answerText = '';

  if (chanakyaKB[queryKeyOrText]) {
    queryTitle = chanakyaKB[queryKeyOrText].title;
    answerText = chanakyaKB[queryKeyOrText].text;
  } else {
    queryTitle = queryKeyOrText;
    answerText = `**💼 चाणक्य व्यापार विश्लेषण:**\n\nआपने पूछा: "${queryKeyOrText}"\n\nहमारे औद्योगिक विश्लेषण के अनुसार, वर्तमान बाजार में गुणवत्ता (Grade A+ Sharbati) और विश्वसनीय आपूर्ति के लिए **सीहोर और देवास क्लस्टर** सबसे उपयुक्त हैं। स्मार्ट एस्क्रो कॉन्ट्रैक्ट और अपनी गाड़ी के विकल्प से आप अतिरिक्त ₹140/क्विंटल तक मार्जिन सुरक्षित कर सकते हैं।`;
  }

  // Append user message
  const userBubble = document.createElement('div');
  userBubble.className = 'flex justify-end';
  userBubble.innerHTML = `
    <div class="bg-indigo-900 text-white p-3 rounded-2xl rounded-tr-xs text-xs max-w-lg shadow-xs">
      <strong>Procurement Query:</strong> ${queryTitle}
    </div>
  `;
  stream.appendChild(userBubble);

  // Append AI message
  const aiBubble = document.createElement('div');
  aiBubble.className = 'flex items-start gap-2.5';
  aiBubble.innerHTML = `
    <div class="w-7 h-7 rounded-lg bg-indigo-950 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
      💼
    </div>
    <div class="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-indigo-200 text-stone-800 shadow-xs max-w-xl text-xs space-y-1.5">
      ${answerText.replace(/\n\n/g, '<br><br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
    </div>
  `;
  stream.appendChild(aiBubble);

  stream.scrollTop = stream.scrollHeight;
  renderIcons();
}

function submitChanakyaQuery() {
  const input = document.getElementById('chanakya-user-input');
  if (!input || !input.value.trim()) return;
  const q = input.value.trim();
  input.value = '';
  askChanakya(q);
}

function toggleBuyerLogisticsChoice(choice) {
  state.buyerUsesOwnLogistics = (choice === 'own');
  
  const ownDetailsSection = document.getElementById('buyer-own-vehicle-section');
  if (ownDetailsSection) {
    if (choice === 'own') {
      ownDetailsSection.classList.remove('hidden');
    } else {
      ownDetailsSection.classList.add('hidden');
    }
  }

  calculateModalTotal();

  if (choice === 'own') {
    showToast('🚛 Option B Activated: Using Own Company Fleet. Freight charge ₹0 (You Save ₹140/Qtl)!', 'success');
  } else {
    showToast('🛡️ Option A Activated: Krishi Insured Fleet with live AIS-140 GPS and cargo insurance.', 'info');
  }
}

// ============================================================================
// LOGISTICS SERVICES: VAHANSATHI CHATBOT
// ============================================================================
const vahanKB = {
  route: {
    title: 'NH-46 vs Dewas Bypass Route Optimization',
    text: `**🗺️ वाहनसाथी रूट गाइड:**\n\n• **अनुशंसित रूट:** सीहोर हब ➔ आष्टा टोल ➔ देवास आउटर बायपास (NH-52) ➔ मालवा एग्रो मिल्स इंदौर।\n• **दूरी:** 142 किमी • **समय:** 2 घंटे 45 मिनट।\n• **विशेष सूचना:** सुबह 08:00 से 11:00 बजे तक इंदौर शहर के भीतर भारी वाहनों की "नो-एंट्री" है। बायपास से जाने पर 35 मिनट समय और 6.2 लीटर डीजल की बचत होगी!`
  },
  weighbridge: {
    title: 'Electronic Weighbridge Calibration & 0.3% Tare SLA',
    text: `**⚖️ वेब्रिज व वजन पर्ची नियम:**\n\n• मंडी उपनियम नियम 42 के तहत खाली गाड़ी (Tare Weight) और भरी गाड़ी (Gross Weight) में 0.3% तक का सामान्य अंतर स्वीकार्य है।\n• धर्मकांटे की कंप्यूटर रसीद (#WB-SEH-2026-8812) अपलोड करते ही आपका 90% गेट एडवांस तुरंत क्लियर हो जाएगा।`
  },
  advance: {
    title: '90% Loading Advance Status',
    text: `**💰 90% गेट लोडिंग एडवांस विवरण:**\n\n• कुल भाड़ा: **₹ 35,000**\n• 90% एडवांस: **₹ 31,500** (UTR: HDFC-991823 द्वारा आपके बैंक ऑफ इंडिया खाते में भेजा जा चुका है)।\n• 10% बकाया: **₹ 3,500** (मालवा एग्रो मिल्स द्वारा डिजिटल डिलीवरी साइन-ऑफ होते ही 60 सेकंड में क्रेडिट होगा)।`
  },
  backhaul: {
    title: 'Return Load Match (Indore to Sehore/Bhopal)',
    text: `**🔄 वापसी भाड़ा (Backhaul Match Found!):**\n\n• **लोड विवरण:** 120 बोरी पशु आहार (Cattle Feed) • इंदौर सॉल्वेंट प्लांट ➔ सीहोर फीड सेंटर।\n• **भाड़ा:** ₹ 18,000 ग्रॉस।\n• **फायदा:** खाली गाड़ी नहीं दौड़ेगी — ₹ 6,400 का ईंधन बचेगा!`
  },
  diesel: {
    title: 'Fuel Economy Audit & Telematics',
    text: `**⛽ माइलेज व फ्यूल ऑडिट:**\n\n• आपकी Eicher 14ft Pro का वर्तमान औसत: **4.8 किमी/लीटर** (ग्रीन इकोनॉमी ज़ोन में)।\n• टैंक में 136 लीटर (68%) डीजल शेष है। इंदौर पहुंचने के लिए केवल 32 लीटर की आवश्यकता है। अतिरिक्त रिफ्यूलिंग की आवश्यकता नहीं है।`
  }
};

function askVahanSathi(queryKeyOrText) {
  const stream = document.getElementById('vahan-chat-stream');
  if (!stream) return;

  let queryTitle = '';
  let answerText = '';

  if (vahanKB[queryKeyOrText]) {
    queryTitle = vahanKB[queryKeyOrText].title;
    answerText = vahanKB[queryKeyOrText].text;
  } else {
    queryTitle = queryKeyOrText;
    answerText = `**🚛 वाहनसाथी पायलट सहायक:**\n\nआपने पूछा: "${queryKeyOrText}"\n\nआपकी गाड़ी **Eicher 14ft (MP 04 GA 9124)** देवास बायपास पर सुचारू रूप से चल रही है। अगले टोल प्लाजा (देवास) पर FASTag ऑटो-कट ₹480 होगा। मालवा एग्रो मिल्स गेट पर पहुंचने का अनुमानित समय 11:45 AM है।`;
  }

  // User message
  const userBubble = document.createElement('div');
  userBubble.className = 'flex justify-end';
  userBubble.innerHTML = `
    <div class="bg-teal-800 text-white p-3 rounded-2xl rounded-tr-xs text-xs max-w-lg shadow-xs">
      <strong>ड्राइवर प्रश्न:</strong> ${queryTitle}
    </div>
  `;
  stream.appendChild(userBubble);

  // AI message
  const aiBubble = document.createElement('div');
  aiBubble.className = 'flex items-start gap-2.5';
  aiBubble.innerHTML = `
    <div class="w-7 h-7 rounded-lg bg-teal-900 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
      🚛
    </div>
    <div class="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-teal-200 text-stone-800 shadow-xs max-w-xl text-xs space-y-1.5">
      ${answerText.replace(/\n\n/g, '<br><br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
    </div>
  `;
  stream.appendChild(aiBubble);

  stream.scrollTop = stream.scrollHeight;
  renderIcons();
}

function submitVahanQuery() {
  const input = document.getElementById('vahan-user-input');
  if (!input || !input.value.trim()) return;
  const q = input.value.trim();
  input.value = '';
  askVahanSathi(q);
}

// ============================================================================
// ADMIN SERVICES: MULTI-CORRIDOR AI DEMAND FORECAST & 3-SERVER CONTROLS
// ============================================================================
const corridorForecasts = {
  wheat: {
    title: 'AI 6-Month Demand vs Supply Forecast (Wheat Corridor)',
    alert: '<strong>Automated Early Warning Alert:</strong> A 15% wheat procurement deficit is forecasted in Western India by mid-next month. The matching engine is automatically notifying buyers to pre-book aggregated farmer lots in Sehore and Kota.',
    demand: [42, 58, 64, 75, 82, 95],
    supply: [50, 52, 55, 60, 78, 110]
  },
  mustard: {
    title: 'AI 6-Month Demand vs Supply Forecast (Mustard / Sarson Corridor)',
    alert: '<strong>Early Market Intelligence:</strong> High crushing demand reported by edible oil mills in Jaipur and Agra. Hadoti cluster mustard oil yields are trending 2.1% above historical average.',
    demand: [28, 35, 48, 62, 70, 75],
    supply: [30, 32, 40, 55, 85, 92]
  },
  soybean: {
    title: 'AI 6-Month Demand vs Supply Forecast (Soybean Corridor)',
    alert: '<strong>Peak Harvest Flow Alert:</strong> Malwa-Nimar solvent extraction plants operating at 92% capacity. Heavy truck arrivals expected across Indore, Dewas, and Ujjain bypasses this fortnight.',
    demand: [65, 78, 92, 90, 85, 80],
    supply: [80, 95, 110, 82, 70, 60]
  },
  basmati: {
    title: 'AI 6-Month Demand vs Supply Forecast (Basmati 1121 Corridor)',
    alert: '<strong>Export Surge Notification:</strong> Gulf export consignments up 22%. Karnal and Panipat milling hubs operating under tight procurement timelines with zero moisture tolerance.',
    demand: [30, 42, 55, 60, 68, 72],
    supply: [35, 48, 58, 62, 65, 70]
  }
};

function switchCorridorForecast(corridor) {
  const data = corridorForecasts[corridor];
  if (!data) return;

  const titleEl = document.getElementById('forecast-corridor-title');
  const alertEl = document.getElementById('corridor-alert-text');
  if (titleEl) titleEl.innerText = data.title;
  if (alertEl) alertEl.innerHTML = data.alert;

  // Update button active styling
  ['wheat', 'mustard', 'soybean', 'basmati'].forEach(c => {
    const btn = document.getElementById(`corridor-btn-${c}`);
    if (btn) {
      if (c === corridor) {
        btn.className = 'px-3 py-1 rounded-lg font-bold bg-indigo-900 text-white shadow-2xs shrink-0';
      } else {
        btn.className = 'px-3 py-1 rounded-lg font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 shrink-0';
      }
    }
  });

  if (demandChartInstance) {
    demandChartInstance.data.datasets[0].data = data.demand;
    demandChartInstance.data.datasets[1].data = data.supply;
    demandChartInstance.update();
  }

  showToast(`📊 Switched AI demand forecast to ${corridor.toUpperCase()} corridor`, 'info');
}

function controlServer(serverNum, action) {
  const serverNames = {
    1: 'Server 1 (APMC Primary Node)',
    2: 'Server 2 (AI Inference Cluster)',
    3: 'Server 3 (Escrow Settlement Gateway)'
  };

  const badge = document.getElementById(`server-badge-${serverNum}`);
  const dot = document.getElementById(`server-status-dot-${serverNum}`);
  const name = serverNames[serverNum] || `Server ${serverNum}`;

  if (action === 'restart') {
    if (badge) {
      badge.innerText = 'RESTARTING...';
      badge.className = 'px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold';
    }
    if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping';

    setTimeout(() => {
      if (badge) {
        badge.innerText = 'ONLINE';
        badge.className = 'px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold';
      }
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
      showToast(`✅ ${name} successfully restarted. Zero dropped packets.`, 'success');
    }, 1500);

    state.activityLogs.unshift({
      time: 'Just now',
      text: `Graceful restart executed on ${name}. Cluster health verified.`,
      type: 'system'
    });
    renderAdminLogs();
  } else if (action === 'audit') {
    showToast(`🔒 RBI 100% Solvency Audit Passed: All ₹${state.escrowBalance.toLocaleString('en-IN')} escrow deposits verified against banking ledgers.`, 'success');
  } else {
    showToast(`⚡ Action '${action}' successfully executed on ${name}.`, 'info');
  }
}

// ============================================================================
// MULTI-BOT SELECTOR IN SLIDE-OVER DRAWER
// ============================================================================
function switchDrawerBot(botName) {
  const personaBadge = document.getElementById('drawer-persona-badge');
  const chipsLabel = document.getElementById('drawer-chips-label');
  const chipsContainer = document.getElementById('drawer-quick-chips');

  // Update tabs
  ['krishi', 'chanakya', 'vahan'].forEach(b => {
    const tab = document.getElementById(`bot-tab-${b}`);
    if (tab) {
      if (b === botName) {
        tab.className = 'px-2 py-0.5 rounded-lg font-bold bg-emerald-700 text-white transition text-[10px]';
      } else {
        tab.className = 'px-2 py-0.5 rounded-lg font-bold bg-stone-800 hover:bg-stone-700 text-stone-300 transition text-[10px]';
      }
    }
  });

  if (botName === 'krishi') {
    if (personaBadge) personaBadge.innerText = '🌾 Advising: Ramesh Patidar (Farmer)';
    if (chipsLabel) chipsLabel.innerText = '🌾 Quick Farmer Questions:';
    if (chipsContainer) {
      chipsContainer.innerHTML = `
        <button onclick="askPreset('mandi_rate')" class="px-2 py-1 bg-stone-100 hover:bg-emerald-50 text-emerald-900 rounded-md text-[11px] font-semibold border border-stone-200">🌾 आज गेहूं भाव</button>
        <button onclick="askPreset('pest_rust')" class="px-2 py-1 bg-stone-100 hover:bg-emerald-50 text-emerald-900 rounded-md text-[11px] font-semibold border border-stone-200">🐛 पीला रतुआ इलाज</button>
        <button onclick="askPreset('fertilizer')" class="px-2 py-1 bg-stone-100 hover:bg-emerald-50 text-emerald-900 rounded-md text-[11px] font-semibold border border-stone-200">🌱 खाद की मात्रा</button>
        <button onclick="askPreset('pooling')" class="px-2 py-1 bg-stone-100 hover:bg-emerald-50 text-emerald-900 rounded-md text-[11px] font-semibold border border-stone-200">📦 समूह पूलिंग फायदा</button>
      `;
    }
  } else if (botName === 'chanakya') {
    if (personaBadge) personaBadge.innerText = '💼 Advising: Priya Sharma (Bulk Buyer)';
    if (chipsLabel) chipsLabel.innerText = '💼 Quick Procurement Arbitrage:';
    if (chipsContainer) {
      chipsContainer.innerHTML = `
        <button onclick="askChanakya('arbitrage'); toggleFloatingChat(false); switchRole('buyer'); switchBuyerTab('chanakya');" class="px-2 py-1 bg-stone-100 hover:bg-indigo-50 text-indigo-900 rounded-md text-[11px] font-semibold border border-stone-200">📊 Sehore Arbitrage</button>
        <button onclick="askChanakya('specs'); toggleFloatingChat(false); switchRole('buyer'); switchBuyerTab('chanakya');" class="px-2 py-1 bg-stone-100 hover:bg-indigo-50 text-indigo-900 rounded-md text-[11px] font-semibold border border-stone-200">🔬 NABL Grade A+ Specs</button>
        <button onclick="askChanakya('escrow'); toggleFloatingChat(false); switchRole('buyer'); switchBuyerTab('chanakya');" class="px-2 py-1 bg-stone-100 hover:bg-indigo-50 text-indigo-900 rounded-md text-[11px] font-semibold border border-stone-200">🔒 Escrow Protection</button>
      `;
    }
  } else if (botName === 'vahan') {
    if (personaBadge) personaBadge.innerText = '🚛 Advising: Rajesh Yadav (Fleet Pilot)';
    if (chipsLabel) chipsLabel.innerText = '🚛 Quick Fleet & Highway Assistance:';
    if (chipsContainer) {
      chipsContainer.innerHTML = `
        <button onclick="askVahanSathi('route'); toggleFloatingChat(false); switchRole('host'); switchHostTab('vahan');" class="px-2 py-1 bg-stone-100 hover:bg-teal-50 text-teal-900 rounded-md text-[11px] font-semibold border border-stone-200">🗺️ Dewas Bypass Route</button>
        <button onclick="askVahanSathi('advance'); toggleFloatingChat(false); switchRole('host'); switchHostTab('vahan');" class="px-2 py-1 bg-stone-100 hover:bg-teal-50 text-teal-900 rounded-md text-[11px] font-semibold border border-stone-200">💰 90% Gate Advance</button>
        <button onclick="askVahanSathi('backhaul'); toggleFloatingChat(false); switchRole('host'); switchHostTab('vahan');" class="px-2 py-1 bg-stone-100 hover:bg-teal-50 text-teal-900 rounded-md text-[11px] font-semibold border border-stone-200">🔄 Return Load Match</button>
      `;
    }
  }
}

// ============================================================================
// SYSTEM-WIDE VOICE CONTROL SYSTEM (SIRI / GEMINI ACTION INTERPRETER)
// ============================================================================
function speakAssistantResponse(textToSpeak) {
  if (!textToSpeak || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = window.speechSynthesis.getVoices();
    const cfg = (typeof langConfig !== 'undefined' && typeof state !== 'undefined' && state.chatLanguage) ? (langConfig[state.chatLanguage] || langConfig.hi) : { code: 'hi-IN' };
    const targetPrefix = cfg.code ? cfg.code.split('-')[0] : 'hi';
    const selectedVoice = (voices && voices.length) ? (
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith(targetPrefix)) ||
      voices.find(v => v.lang && v.lang.includes('IN')) ||
      voices.find(v => v.lang && v.lang.startsWith('en'))
    ) : null;
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = cfg.code || 'hi-IN';
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
}

function executeVoiceAction(transcript) {
  if (!transcript) return false;
  const t = transcript.toLowerCase();

  const hudActionBadge = document.getElementById('hud-action-badge');
  const hudActionText = document.getElementById('hud-action-text');

  function showActionBadge(label) {
    if (hudActionBadge && hudActionText) {
      hudActionText.innerText = `Action: ${label}`;
      hudActionBadge.classList.remove('hidden');
    }
  }

  // 1. Mandi Bhav / Prices
  if (t.includes('mandi') || t.includes('bhav') || t.includes('भाव') || t.includes('रेट') || t.includes('दाम') || t.includes('price')) {
    showActionBadge('Navigated to Live Mandi Bhav');
    stopVoiceRecognition();
    switchRole('farmer');
    switchFarmerTab('mandi');
    speakAssistantResponse('सीहोर और इंदौर मंडी भाव तालिका खोल दी गई है।');
    showToast('🎙️ Voice Action: Navigated to Live Mandi Bhav Rates', 'success');
    return true;
  }

  // 2. Grain Quality / Assay / Image
  if (t.includes('quality') || t.includes('क्वालिटी') || t.includes('परख') || t.includes('ग्रेड') || t.includes('इमेज') || t.includes('check')) {
    showActionBadge('Opening AI Grain Quality Grader');
    stopVoiceRecognition();
    switchRole('farmer');
    switchFarmerTab('produce');
    runAiImageGrading('sharbati');
    speakAssistantResponse('AI कंप्यूटर विज़न क्वालिटी ग्रेडिंग सक्रिय की गई है। शरबती गेहूं ग्रेड A+ पाया गया।');
    showToast('🎙️ Voice Action: AI Image Grading Executed', 'success');
    return true;
  }

  // 3. Track Vehicle / Truck / Satellite Map
  if (t.includes('track') || t.includes('ट्रैक') || t.includes('ट्रक') || t.includes('गाड़ी') || t.includes('truck') || t.includes('vehicle') || t.includes('gps') || t.includes('map') || t.includes('मैप') || t.includes('नक्शा') || t.includes('location') || t.includes('लोकेशन')) {
    showActionBadge('Opened Live GPS Vehicle Tracker');
    stopVoiceRecognition();
    switchRole('host');
    switchHostTab('dispatch');
    refreshGpsMaps();
    speakAssistantResponse('लाइव वाहन जीपीएस नक्शा खोल दिया गया है। आपकी गाड़ी देवास बायपास पर 48 किलोमीटर प्रति घंटा से चल रही है।');
    showToast('🎙️ Voice Action: Opened Live GPS Telemetry & Satellite Map', 'success');
    return true;
  }

  // 4. Profit / Margin / Expenses
  if (t.includes('profit') || t.includes('मुनाफा') || t.includes('margin') || t.includes('बचत') || t.includes('भाड़ा') || t.includes('खर्च')) {
    showActionBadge('Displaying Transporter Profit Margin Graph');
    stopVoiceRecognition();
    switchRole('host');
    switchHostTab('margin');
    speakAssistantResponse('ट्रांसपोर्टर मुनाफा विश्लेषण खोल दिया गया है। 48% शुद्ध मुनाफा और ₹6,400 वापसी बचत उपलब्ध है।');
    showToast('🎙️ Voice Action: Opened Transporter Profit Margin', 'success');
    return true;
  }

  // 5. Buyer Portal / Marketplace
  if (t.includes('buyer') || t.includes('खरीदार') || t.includes('procure') || t.includes('कंपनी') || t.includes('खरीद')) {
    showActionBadge('Switched to Institutional Buyer Marketplace');
    stopVoiceRecognition();
    switchRole('buyer');
    switchBuyerTab('market');
    speakAssistantResponse('खरीदार मार्केटप्लेस खोल दिया गया है। 98% AI मैच लॉट उपलब्ध हैं।');
    showToast('🎙️ Voice Action: Switched to Buyer Portal', 'success');
    return true;
  }

  // 6. Chanakya Bot
  if (t.includes('chanakya') || t.includes('चाणक्य')) {
    showActionBadge('Activated Chanakya Business Copilot');
    stopVoiceRecognition();
    switchRole('buyer');
    switchBuyerTab('chanakya');
    askChanakya('arbitrage');
    speakAssistantResponse('चाणक्य बिजनेस सहायक सक्रिय हो गया है। सीहोर का आर्बिट्रेज विश्लेषण तैयार है।');
    showToast('🎙️ Voice Action: Activated Chanakya Business Copilot', 'success');
    return true;
  }

  // 7. VahanSathi Bot
  if (t.includes('vahansathi') || t.includes('वाहनसाथी') || t.includes('ड्राइवर')) {
    showActionBadge('Activated VahanSathi Fleet Copilot');
    stopVoiceRecognition();
    switchRole('host');
    switchHostTab('vahan');
    askVahanSathi('route');
    speakAssistantResponse('वाहनसाथी लॉजिस्टिक्स सहायक सक्रिय हो गया है। देवास बायपास रूट अनुशंसित है।');
    showToast('🎙️ Voice Action: Activated VahanSathi Copilot', 'success');
    return true;
  }

  // 8. Admin / Servers
  if (t.includes('admin') || t.includes('प्रशासन') || t.includes('सर्वर') || t.includes('server')) {
    showActionBadge('Opening Admin Command & Server Controls');
    stopVoiceRecognition();
    switchRole('admin');
    switchAdminTab('servers');
    speakAssistantResponse('एडमिन कमांड सेंटर और 3-सर्वर क्लस्टर कंट्रोल खोल दिया गया है।');
    showToast('🎙️ Voice Action: Opened Admin Server Dashboard', 'success');
    return true;
  }

  // 9. Logout
  if (t.includes('logout') || t.includes('लॉगआउट') || t.includes('बाहर')) {
    showActionBadge('Logging Out');
    stopVoiceRecognition();
    logout();
    speakAssistantResponse('सफलतापूर्वक लॉगआउट किया गया। नमस्ते!');
    showToast('🎙️ Voice Action: Safely Logged Out', 'info');
    return true;
  }

  return false;
}


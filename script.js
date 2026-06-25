// Affiliate URL - Update with your actual affiliate link
const AFFILIATE_URL = "https://softreview.net/refer/datadive";

// Coupon Data
const coupons = [
  { code: "ALLCOUPON", discount: "10% OFF", description: "Get 10% Off for 6 Months Limited Time Offer", type: "exclusive", initialDays: 3 },
  { code: "NO CODE REQUIRED", discount: "10% OFF", description: "Get 14 Day Free Trail", type: "exclusive", initialDays: 3 },
  { code: "ALLCOUPON", discount: "10% OFF", description: "10% off forever on all monthly and annual subscriptions", type: "normal", initialDays: 5 },
  { code: "ALLCOUPON", discount: "25% OFF", description: "Special discount for new Amazon sellers - Starter plan", type: "normal", initialDays: 5 },
  { code: "ALLCOUPONCODES10", discount: "20% OFF", description: "Exclusive 20% discount on Diamond plan annual subscription", type: "unverified", initialDays: 5 },
  { code: "ALLCOUPONCODES10", discount: "40% OFF", description: "40% off on Elite plan for the first 12 months", type: "unverified", initialDays: 5 }
];

// FAQ Data
const faqs = [
  { question: "1. What is DataDive?", answer: "DataDive is an AI-powered research and optimization platform for Amazon FBA sellers. It combines keyword research, rank tracking, niche analysis, and AI-assisted listing creation in one dashboard, built on Jungle Scout and Keepa data." },
  { question: "2. How do I use the DataDive coupon code?", answer: "Click Show Coupon on this page to reveal the code, then click Get a Deal to go to DataDive's pricing page. Choose your plan, enter ALLCOUPON in the coupon field at checkout, and you'll get 10% off your first 6 months." },
  { question: "3. Does DataDive offer a free trial?", answer: "Yes, DataDive offers a 14-day free trial with full access to all features on the Starter plan. A payment method is required to start the trial, and your card will be charged if you don't cancel before the 14 days end. " },
  { question: "4. Does the ALLCOUPON discount work with annual billing?", answer: "Yes. The 10% discount stacks on top of the annual billing rate, which is already lower than paying month-to-month, so annual subscribers save the most overall." },
  { question: "5. Do I need an Amazon Seller account to use DataDive?", answer: "No. DataDive lets you research, analyze, and validate products before you ever launch or open a Seller Central account, which makes it useful during the pre-launch research phase too." },
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initHeroCountdown();
  renderCoupons();
  renderFAQs();
  initPopup();
  initSmoothScroll();
  document.getElementById('current-year').textContent = new Date().getFullYear();
  document.querySelector('link[rel="canonical"]').href = window.location.origin;
});

// Header scroll effect
function initHeader() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    mobileMenuBtn.querySelector('.icon-menu').classList.toggle('hidden');
    mobileMenuBtn.querySelector('.icon-close').classList.toggle('hidden');
  });
  
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      mobileMenuBtn.querySelector('.icon-menu').classList.remove('hidden');
      mobileMenuBtn.querySelector('.icon-close').classList.add('hidden');
    });
  });
}

// Hero Countdown Timer
function initHeroCountdown() {
  const storageKey = 'hero_countdown_end';
  let endTime = getOrCreateEndTime(storageKey, 5);
  
  function update() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      endTime = Date.now() + 5 * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, endTime.toString());
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    document.getElementById('hero-days').textContent = pad(d);
    document.getElementById('hero-hours').textContent = pad(h);
    document.getElementById('hero-mins').textContent = pad(m);
    document.getElementById('hero-secs').textContent = pad(s);
  }
  update();
  setInterval(update, 1000);
}

function getOrCreateEndTime(key, days) {
  const stored = localStorage.getItem(key);
  if (stored && parseInt(stored) > Date.now()) return parseInt(stored);
  const endTime = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(key, endTime.toString());
  return endTime;
}

function pad(n) { return n.toString().padStart(2, '0'); }

// Render Coupons
function renderCoupons() {
  const exclusiveContainer = document.getElementById('exclusive-coupons');
  const normalContainer = document.getElementById('normal-coupons');
  const unverifiedContainer = document.getElementById('unverified-coupons');
  
  coupons.forEach((coupon, index) => {
    const card = createCouponCard(coupon, index);
    if (coupon.type === 'exclusive') exclusiveContainer.appendChild(card);
    else if (coupon.type === 'normal') normalContainer.appendChild(card);
    else unverifiedContainer.appendChild(card);
  });
}

function createCouponCard(coupon, index) {
  const maskedCode = '••••••' + coupon.code.slice(-2);
  const isExclusive = coupon.type === 'exclusive';
  const isUnverified = coupon.type === 'unverified';
  
  const iconClass = isExclusive ? 'coupon-icon-orange' : (isUnverified ? 'coupon-icon-gray' : 'coupon-icon-green');
  const typeLabel = isExclusive ? 'Exclusive Code' : (isUnverified ? 'Unverified Code' : 'Verified Code');
  const iconSvg = isExclusive ? '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' : 
    (isUnverified ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : 
    '<path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>');
  
  const card = document.createElement('article');
  card.className = 'coupon-card';
  card.innerHTML = `
    <div class="coupon-card-inner ${isExclusive ? 'has-badge' : ''}">
      <div class="coupon-orb-1"></div>
      <div class="coupon-orb-2"></div>
      ${isExclusive ? '<div class="hot-deal-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Hot Deal</div>' : ''}
      <div class="coupon-content">
        <div class="coupon-left">
          <div class="coupon-info">
            <div class="coupon-icon ${iconClass}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconSvg}</svg></div>
            <div>
              <div class="coupon-discount">${coupon.discount}</div>
              <div class="coupon-type ${isUnverified ? 'coupon-type-yellow' : ''}">${typeLabel}</div>
            </div>
          </div>
          <p class="coupon-desc">${coupon.description}</p>
          <div class="coupon-timer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span id="timer-${index}">00:00:00</span></div>
        </div>
        <div class="coupon-right">
          <div class="coupon-code-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg><code class="coupon-code">${maskedCode}</code></div>
          <button class="btn-show-coupon" data-code="${coupon.code}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> Show Coupon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
        </div>
      </div>
    </div>
  `;
  
  // Timer for this coupon
  const timerKey = `coupon_timer_${coupon.code}`;
  let endTime = getOrCreateEndTime(timerKey, coupon.initialDays);
  const timerEl = card.querySelector(`#timer-${index}`);
  
  function updateTimer() {
    let diff = endTime - Date.now();
    if (diff <= 0) {
      endTime = Date.now() + coupon.initialDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(timerKey, endTime.toString());
      diff = endTime - Date.now();
    }
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    timerEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  updateTimer();
  setInterval(updateTimer, 1000);
  
  // Show coupon button
  card.querySelector('.btn-show-coupon').addEventListener('click', function() {
    const code = this.dataset.code;
    localStorage.setItem('pendingCoupon', code);
    window.open(window.location.origin + window.location.pathname + '?popup=true', '_blank');
    setTimeout(() => { window.location.href = AFFILIATE_URL; }, 200);
  });
  
  return card;
}

// Render FAQs
function renderFAQs() {
  const container = document.getElementById('faq-list');
  faqs.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-question">${faq.question}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>
      <div class="faq-answer"><div class="faq-answer-inner">${faq.answer}</div></div>
    `;
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('active');
    });
    container.appendChild(item);
  });
}

// Popup functionality
function initPopup() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('popup') === 'true') {
    const code = localStorage.getItem('pendingCoupon');
    if (code) {
      document.getElementById('popup-code-text').textContent = code;
      document.getElementById('coupon-popup').classList.remove('hidden');
      localStorage.removeItem('pendingCoupon');
      history.replaceState({}, '', window.location.pathname);
    }
  }
  
  document.getElementById('popup-close').addEventListener('click', closePopup);
  document.getElementById('popup-continue').addEventListener('click', closePopup);
  document.getElementById('popup-copy-btn').addEventListener('click', function() {
    const code = document.getElementById('popup-code-text').textContent;
    navigator.clipboard.writeText(code).then(() => {
      this.classList.add('btn-copied');
      this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Code Copied!</span>';
      setTimeout(() => {
        this.classList.remove('btn-copied');
        this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy Coupon Code</span>';
      }, 3000);
    });
  });
}

function closePopup() {
  document.getElementById('coupon-popup').classList.add('hidden');
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

}




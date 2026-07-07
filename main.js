/* ============ NAV SCROLL SHRINK ============ */
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});

/* ============ MOBILE DRAWER ============ */
const drawer = document.getElementById('drawer');
const scrim = document.getElementById('scrim');
const navToggleBtn = document.getElementById('navToggle');
navToggleBtn.addEventListener('click', () => { drawer.classList.add('open'); scrim.classList.add('show'); navToggleBtn.setAttribute('aria-expanded','true'); });
document.getElementById('drawerClose').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
function closeDrawer(){ drawer.classList.remove('open'); scrim.classList.remove('show'); navToggleBtn.setAttribute('aria-expanded','false'); }

/* ============ SCROLL REVEAL ============ */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));

/* ============ COUNTER ANIMATION ============ */
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if(en.isIntersecting){
      const el = en.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const val = Math.floor(p * target);
        el.textContent = val.toLocaleString('en-IN') + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    }
  });
}, {threshold:0.4});
counters.forEach(c => cio.observe(c));

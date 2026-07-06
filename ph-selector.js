/* ============ pH SELECTOR ============ */
const phData = {
  "8.0": {title:"pH 8.0 — Everyday Drinking Water", desc:"A gentle starting point, close to lightly alkaline mineral water — suited to everyday hydration for the whole family.", sub:"Alkaline Stream"},
  "8.5": {title:"pH 8.5 — Regular Household Use", desc:"A step up in alkalinity for those who prefer a slightly stronger everyday drinking water.", sub:"Alkaline Stream"},
  "9.0": {title:"pH 9.0 — Cooking & Beverages", desc:"A popular choice for use in tea, coffee and everyday cooking, based on user preference.", sub:"Alkaline Stream"},
  "9.5": {title:"pH 9.5 — Active Lifestyle Use", desc:"Preferred by many active households as part of their daily routine.", sub:"Alkaline Stream"},
  "10.5": {title:"pH 10.5 — General Cleaning (Non-Drinking)", desc:"This level is intended for general household cleaning tasks such as washing produce — not for drinking.", sub:"Acidic Stream · Non-Drinking"}
};
document.querySelectorAll('.ph-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ph-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.dataset.ph;
    const d = phData[val];
    const phTitle = document.getElementById('phTitle');
    const phDesc = document.getElementById('phDesc');
    if(phTitle) phTitle.textContent = d.title;
    if(phDesc) phDesc.textContent = d.desc;
    const readoutVal = document.getElementById('phReadoutValue');
    const readoutSub = document.getElementById('phReadoutSub');
    if(readoutVal) readoutVal.textContent = 'pH ' + val;
    if(readoutSub) readoutSub.textContent = d.sub;
  });
});

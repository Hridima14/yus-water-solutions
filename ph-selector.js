/* ============ pH SELECTOR (alkaline ranges, each paired with an acidic range) ============ */
const phData = {
  "8-8.5":     { title: "pH 8 – 8.5 — Everyday Drinking Water", desc: "A gentle starting point, close to lightly alkaline mineral water — suited to everyday hydration for the whole family.", acid: "6 – 6.5" },
  "8.5-9":     { title: "pH 8.5 – 9 — Regular Household Use", desc: "A step up in alkalinity for those who prefer a slightly stronger everyday drinking water.", acid: "5.5 – 6" },
  "9-9.5":     { title: "pH 9 – 9.5 — Cooking, Beverages & Active Use", desc: "A popular range for tea, coffee, everyday cooking, and preferred by many active households.", acid: "5 – 5.5" },
  "9.5-10.5":  { title: "pH 9.5 – 10.5 — General Cleaning (Non-Drinking)", desc: "This range is intended for general household cleaning tasks such as washing produce — not for drinking.", acid: "4.5 – 5" }
};

document.querySelectorAll('.ph-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ph-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const val = btn.dataset.ph;
    const d = phData[val];
    if (!d) return;

    const phTitle = document.getElementById('phTitle');
    const phDesc = document.getElementById('phDesc');
    if (phTitle) phTitle.textContent = d.title;
    if (phDesc) phDesc.textContent = d.desc;

    const readoutVal = document.getElementById('phReadoutValue');
    if (readoutVal) readoutVal.textContent = 'pH ' + val.replace('-', ' – ');

    const acidVal = document.getElementById('phReadoutAcidValue');
    if (acidVal) acidVal.textContent = 'pH ' + d.acid;
  });
});

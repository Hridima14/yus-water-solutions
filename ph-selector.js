/* ============ pH SELECTOR (alkaline ranges, each paired with an acidic range + use) ============ */
const phData = {
  "8-8.5": {
    title: "pH 8 – 8.5 — Everyday Drinking Water",
    desc: "A gentle starting point, close to lightly alkaline mineral water — suited to everyday hydration for the whole family.",
    use: "Everyday Drinking",
    acid: "6 – 6.5",
    acidTitle: "pH 6 – 6.5 — Plants & Household Rinsing",
    acidDesc: "Mildly acidic — a gentle choice for watering plants or general household rinsing.",
    acidUse: "Plants & Household Rinsing"
  },
  "8.5-9": {
    title: "pH 8.5 – 9 — Regular Household Use",
    desc: "A step up in alkalinity for those who prefer a slightly stronger everyday drinking water.",
    use: "Regular Household Use",
    acid: "5.5 – 6",
    acidTitle: "pH 5.5 – 6 — Skin & Hair Rinsing",
    acidDesc: "Popular for skin and hair rinsing as part of a personal care routine.",
    acidUse: "Skin & Hair Rinsing"
  },
  "9-9.5": {
    title: "pH 9 – 9.5 — Cooking, Beverages & Active Use",
    desc: "A popular range for tea, coffee, everyday cooking, and preferred by many active households.",
    use: "Cooking, Beverages & Active Use",
    acid: "5 – 5.5",
    acidTitle: "pH 5 – 5.5 — Washing Produce & Utensils",
    acidDesc: "Commonly used for washing fruits, vegetables and utensils.",
    acidUse: "Washing Produce & Utensils"
  },
  "9.5-10.5": {
    title: "pH 9.5 – 10.5 — General Cleaning (Non-Drinking)",
    desc: "This range is intended for general household cleaning tasks such as washing produce — not for drinking.",
    use: "General Cleaning (Non-Drinking)",
    acid: "4.5 – 5",
    acidTitle: "pH 4.5 – 5 — Household Cleaning & Disinfecting",
    acidDesc: "Best suited to general household cleaning and surface disinfection (non-drinking).",
    acidUse: "Household Cleaning & Disinfecting"
  }
};

function updatePhPanel(d, val) {
  const phTitle = document.getElementById('phTitle');
  const phDesc = document.getElementById('phDesc');
  const phUse = document.getElementById('phUse');
  if (phTitle) phTitle.textContent = d.title;
  if (phDesc) phDesc.textContent = d.desc;
  if (phUse) phUse.textContent = d.use;

  const phAcidTitle = document.getElementById('phAcidTitle');
  const phAcidDesc = document.getElementById('phAcidDesc');
  const phAcidUse = document.getElementById('phAcidUse');
  if (phAcidTitle) phAcidTitle.textContent = d.acidTitle;
  if (phAcidDesc) phAcidDesc.textContent = d.acidDesc;
  if (phAcidUse) phAcidUse.textContent = d.acidUse;

  const readoutVal = document.getElementById('phReadoutValue');
  if (readoutVal) readoutVal.textContent = 'pH ' + val.replace('-', ' – ');

  const acidVal = document.getElementById('phReadoutAcidValue');
  if (acidVal) acidVal.textContent = 'pH ' + d.acid;
}

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

    updatePhPanel(d, val);
  });
});

/**
 * ============================================================
 * SHOWCASE DATA — Installations & Customer Reviews
 * ============================================================
 * This is the ONLY file you need to edit to add real content.
 * Do not touch card-swap.js, showcase-init.js, styles.css, or
 * showcase.css — the UI reads directly from these two arrays.
 *
 * INSTALLATIONS: replace each `image` path with a real photo
 * (recommended: upload to assets/installations/ and reference
 * it here, e.g. "assets/installations/amravati-01.jpg"),
 * `city` with the real city/location, and `description` with a
 * short (one line) installation note.
 *
 * REVIEWS: replace `name`, `city`, `rating` (1-5), `review`,
 * and optionally `product` and `photo` (leave `photo: null` to
 * keep the auto-generated initials avatar).
 *
 * You can add or remove entries freely — the carousel adapts
 * to however many items are in each array.
 * ============================================================
 */

const installationsData = [
  {
    image: "assets/installations/dr-sarda-hospital.jpg",
    city: "Dr. Sarda Hospital",
    description: "Rooftop installation alongside HVAC systems for consistent hospital water quality."
  },
  {
    image: "assets/installations/gajanan-township.jpg",
    city: "Gajanan Township",
    description: "Township-wide installation serving multiple residential blocks."
  },
  {
    image: "assets/installations/hotel-rangoli-pearl.jpg",
    city: "Hotel Rangoli Pearl",
    description: "Rooftop installation supporting consistent water quality across guest floors."
  },
  {
    image: "assets/installations/vidarbha-poultry.jpg",
    city: "Vidarbha Poultry",
    description: "Dual-unit installation supporting daily poultry farm water supply."
  },
  {
    image: "assets/installations/suyash-hospital.jpg",
    city: "Suyash Hospital",
    description: "Facility-wide installation supporting hospital operations."
  },
  {
    image: "assets/installations/rawankar-poultry-farm.jpg",
    city: "Rawankar Poultry Farm",
    description: "Outdoor installation treating water at the farm's main supply line."
  },
  {
    image: "assets/installations/potode-hospital.jpg",
    city: "Potode Hospital",
    description: "Second unit installed to support expanded hospital water demand."
  },
  {
    image: "assets/installations/jai-ambe-garden-city.jpg",
    city: "Jay Ambe Garden City",
    description: "Installed across multiple towers within the residential complex."
  },
  {
    image: "assets/installations/dr-rahat-hospital.jpg",
    city: "Dr. Rahat Hospital",
    description: "Wall-mounted installation integrated into the facility's plumbing."
  },
  {
    image: "assets/installations/dr-sudha-deshmukh.jpg",
    city: "Dr. Sudha Deshmukh",
    description: "Compact installation fitted alongside existing pump machinery."
  },
  {
    image: "assets/installations/amruta-poultry.jpg",
    city: "Amruta Hatcheries & Foods",
    description: "Outdoor installation supporting hatchery water treatment needs."
  }
];

const reviewsData = [
  {
    photo: null,
    name: "Owner, Hotel Rangoli Pearl",
    city: "Amravati",
    rating: 5,
    review: "Extremely good results, no scale deposition.",
    product: "Water Softener"
  },
  {
    photo: null,
    name: "Residents, Jay Ambe Garden City",
    city: "Amravati",
    rating: 5,
    review: "Cleaner utensils, more soap lather. Recommended for everyone — no chemicals.",
    product: "Water Softener"
  },
  {
    photo: null,
    name: "Owner, Sambodhi Agro Food & Beverages",
    city: "",
    rating: 5,
    review: "Reasonable rate, worth buying.",
    product: ""
  },
  {
    photo: null,
    name: "Adv. Prashant Bhelande",
    city: "",
    rating: 5,
    review: "I used it on my farm — it's excellent for healthy crops and yield.",
    product: "Water Softener"
  }
];

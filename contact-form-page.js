/* ============ CONTACT FORM (standalone contact page — redirects to Thank You) ============ */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  if(!name || !phone){ return; }
  btn.disabled = true;
  btn.textContent = 'Sending...';
  setTimeout(() => {
    window.location.href = 'thank-you.html';
  }, 700);
});

/* ============ CONTACT FORM ============ */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  if(!name || !phone){ return; }
  btn.disabled = true;
  btn.textContent = 'Sending...';
  setTimeout(() => {
    document.getElementById('formFields').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  }, 700);
});

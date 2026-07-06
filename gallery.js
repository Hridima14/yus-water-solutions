/* ============ GALLERY FILTER ============ */
document.querySelectorAll('.gf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.g-item').forEach(item => {
      item.classList.toggle('hide', f !== 'all' && item.dataset.cat !== f);
    });
  });
});


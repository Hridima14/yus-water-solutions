/**
 * showcase-init.js
 * Renders cards from showcase-data.js into the two CardSwap stages and
 * starts both carousels with an identical shared configuration (same
 * dimensions, same animation speed) as required by the design spec.
 * Edit showcase-data.js to change content — this file should not need edits.
 */
(function () {
  'use strict';

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderInstallationCard(item) {
    var card = document.createElement('div');
    card.className = 'cs-card installation-card';
    card.innerHTML =
      '<div class="cs-photo">' +
        '<img src="' + escapeHtml(item.image) + '" alt="Installation in ' + escapeHtml(item.city) + '" loading="lazy">' +
      '</div>' +
      '<div class="cs-info">' +
        '<span class="cs-city">' + escapeHtml(item.city) + '</span>' +
        '<p class="cs-desc">' + escapeHtml(item.description) + '</p>' +
      '</div>';
    return card;
  }

  function initials(name) {
    return String(name || '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w[0]; })
      .join('')
      .toUpperCase();
  }

  function renderReviewCard(item) {
    var card = document.createElement('div');
    card.className = 'cs-card review-card';

    var avatarHtml = item.photo
      ? '<img src="' + escapeHtml(item.photo) + '" alt="' + escapeHtml(item.name) + '" class="cs-avatar-img">'
      : '<div class="cs-avatar">' + escapeHtml(initials(item.name)) + '</div>';

    var rating = Math.max(0, Math.min(5, item.rating || 0));
    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
      starsHtml += i < rating ? '★' : '☆';
    }

    var metaParts = [];
    if (item.city) metaParts.push(escapeHtml(item.city));
    if (item.product) metaParts.push(escapeHtml(item.product));

    card.innerHTML =
      avatarHtml +
      '<div class="cs-stars">' + starsHtml + '</div>' +
      '<p class="cs-quote">&ldquo;' + escapeHtml(item.review) + '&rdquo;</p>' +
      '<div class="cs-name">' + escapeHtml(item.name) + '</div>' +
      '<div class="cs-meta">' + metaParts.join(' &middot; ') + '</div>';
    return card;
  }

  function computeSize(stageEl, baseW, baseH) {
    var available = stageEl.clientWidth || baseW;
    var w = Math.min(baseW, available);
    var h = Math.round(w * (baseH / baseW));
    return { width: w, height: h };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var installStage = document.getElementById('installationsStage');
    var reviewStage = document.getElementById('reviewsStage');

    if (!installStage || !reviewStage || typeof window.gsap === 'undefined' || typeof window.CardSwap === 'undefined') {
      return;
    }
    if (typeof installationsData === 'undefined' || typeof reviewsData === 'undefined') {
      return;
    }

    installationsData.forEach(function (item) {
      installStage.appendChild(renderInstallationCard(item));
    });
    reviewsData.forEach(function (item) {
      reviewStage.appendChild(renderReviewCard(item));
    });

    var BASE_WIDTH = 380;
    var BASE_HEIGHT = 320;

    var installSize = computeSize(installStage, BASE_WIDTH, BASE_HEIGHT);
    var reviewSize = computeSize(reviewStage, BASE_WIDTH, BASE_HEIGHT);
    // Both columns are equal-width in the grid, so these should already match —
    // take the smaller of the two to guarantee identical card dimensions either way.
    var sharedWidth = Math.min(installSize.width, reviewSize.width);
    var sharedHeight = Math.round(sharedWidth * (BASE_HEIGHT / BASE_WIDTH));

    // On narrow phones, use a tighter stack (less spread, fewer visible
    // cards) so the depth effect never pushes cards past the viewport edge.
    var isNarrow = sharedWidth < 340;
    var spreadFactor = isNarrow ? 0.06 : 0.1;

    var sharedConfig = {
      width: sharedWidth,
      height: sharedHeight,
      cardDistance: Math.round(sharedWidth * spreadFactor),
      verticalDistance: Math.round(sharedWidth * spreadFactor),
      delay: 4000,
      pauseOnHover: true,
      skewAmount: isNarrow ? 2 : 4,
      easing: 'elastic',
      maxVisible: isNarrow ? 3 : 4
    };

    var installSwap = new window.CardSwap(installStage, sharedConfig);
    var reviewSwap = new window.CardSwap(reviewStage, sharedConfig);

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var iSize = computeSize(installStage, BASE_WIDTH, BASE_HEIGHT);
        var rSize = computeSize(reviewStage, BASE_WIDTH, BASE_HEIGHT);
        var w = Math.min(iSize.width, rSize.width);
        var h = Math.round(w * (BASE_HEIGHT / BASE_WIDTH));
        installSwap.updateSize(w, h);
        reviewSwap.updateSize(w, h);
      }, 200);
    });
  });
})();

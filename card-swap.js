/**
 * CardSwap — vanilla-JS port of the GSAP "Card Swap Showcase" component.
 * Faithful port of the original React/GSAP logic (see makeSlot/placeNow/swap),
 * rewritten without a build step or React so it runs directly in a static page.
 * Requires GSAP (loaded via CDN in index.html) to be available as window.gsap.
 *
 * Usage:
 *   const instance = new CardSwap(containerEl, {
 *     width: 380, height: 320, cardDistance: 40, verticalDistance: 40,
 *     delay: 4000, pauseOnHover: true, skewAmount: 4, easing: 'elastic'
 *   });
 *   // containerEl must directly contain one or more `.cs-card` elements.
 */
(function (window) {
  'use strict';

  function CardSwap(container, options) {
    options = options || {};
    this.container = container;
    this.width = options.width || 400;
    this.height = options.height || 300;
    this.cardDistance = options.cardDistance != null ? options.cardDistance : 60;
    this.verticalDistance = options.verticalDistance != null ? options.verticalDistance : 70;
    this.delay = options.delay || 5000;
    this.pauseOnHover = !!options.pauseOnHover;
    this.skewAmount = options.skewAmount != null ? options.skewAmount : 6;
    this.onCardClick = options.onCardClick || null;
    // Only the front N cards get a visible stacked offset; any cards beyond
    // this are parked invisibly at the back slot until rotated into view.
    // This keeps the effect clean regardless of how many cards are in the
    // dataset (the original component assumed a small, fixed card count).
    this.maxVisible = options.maxVisible || 4;

    var easing = options.easing || 'elastic';
    this.config = easing === 'elastic'
      ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
      : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

    this.cards = Array.prototype.slice.call(container.querySelectorAll(':scope > .cs-card'));
    this.order = this.cards.map(function (_, i) { return i; });
    this.intervalId = null;
    this.tl = null;

    this._init();
  }

  CardSwap.prototype._makeSlot = function (i, total) {
    var depth = Math.min(i, this.maxVisible - 1);
    return {
      x: depth * this.cardDistance,
      y: -depth * this.verticalDistance,
      z: -depth * this.cardDistance * 1.5,
      zIndex: total - i,
      opacity: i < this.maxVisible ? 1 : 0
    };
  };

  CardSwap.prototype._placeNow = function (el, slot) {
    window.gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: this.skewAmount,
      opacity: slot.opacity,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true,
      width: this.width,
      height: this.height
    });
  };

  CardSwap.prototype._init = function () {
    var self = this;
    var total = this.cards.length;
    this.cards.forEach(function (el, i) {
      self._placeNow(el, self._makeSlot(i, total));
    });

    this._startInterval();

    if (this.pauseOnHover) {
      this.container.addEventListener('mouseenter', function () {
        if (self.tl) self.tl.pause();
        self._stopInterval();
      });
      this.container.addEventListener('mouseleave', function () {
        if (self.tl) self.tl.play();
        self._startInterval();
      });
    }

    this.cards.forEach(function (el, i) {
      el.addEventListener('click', function () {
        if (self.onCardClick) self.onCardClick(i);
      });
    });
  };

  CardSwap.prototype._startInterval = function () {
    this._stopInterval();
    var self = this;
    this.intervalId = window.setInterval(function () { self._swap(); }, this.delay);
  };

  CardSwap.prototype._stopInterval = function () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  CardSwap.prototype._swap = function () {
    if (this.order.length < 2) return;
    var self = this;
    var front = this.order[0];
    var rest = this.order.slice(1);
    var elFront = this.cards[front];
    if (!elFront) return;

    var total = this.cards.length;
    var cfg = this.config;
    var tl = window.gsap.timeline();
    this.tl = tl;

    tl.to(elFront, { y: '+=500', duration: cfg.durDrop, ease: cfg.ease });
    tl.addLabel('promote', '-=' + (cfg.durDrop * cfg.promoteOverlap));

    rest.forEach(function (idx, i) {
      var el = self.cards[idx];
      if (!el) return;
      var slot = self._makeSlot(i, total);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(el, { x: slot.x, y: slot.y, z: slot.z, opacity: slot.opacity, duration: cfg.durMove, ease: cfg.ease }, 'promote+=' + (i * 0.15));
    });

    var backSlot = this._makeSlot(total - 1, total);
    tl.addLabel('return', 'promote+=' + (cfg.durMove * cfg.returnDelay));
    tl.call(function () {
      window.gsap.set(elFront, { zIndex: backSlot.zIndex });
    }, null, 'return');

    tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, opacity: backSlot.opacity, duration: cfg.durReturn, ease: cfg.ease }, 'return');

    tl.call(function () {
      self.order = rest.concat([front]);
    });
  };

  /** Recompute card size/position (used on resize) without restarting the swap cycle order. */
  CardSwap.prototype.updateSize = function (width, height) {
    this.width = width;
    this.height = height;
    var self = this;
    var total = this.cards.length;
    this.order.forEach(function (cardIdx, position) {
      var el = self.cards[cardIdx];
      if (el) self._placeNow(el, self._makeSlot(position, total));
    });
  };

  CardSwap.prototype.destroy = function () {
    this._stopInterval();
    if (this.tl) this.tl.kill();
  };

  window.CardSwap = CardSwap;
})(window);

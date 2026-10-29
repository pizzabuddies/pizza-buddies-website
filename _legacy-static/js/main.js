/* Pizza Buddies — shared site behaviour (vanilla JS, no dependencies) */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var body = document.body;

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Close the overlay when a link inside it is chosen
    var mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      mobileNav.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          body.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* ---------- Reveal-on-scroll (respects reduced motion) ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Gallery filter (only runs on gallery page) ---------- */
  var filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    var chips = filterBar.querySelectorAll('.chip');
    var items = document.querySelectorAll('.gitem');
    var status = document.getElementById('gallery-status');

    filterBar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;

      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });

      var cat = chip.dataset.filter;
      var shown = 0;
      items.forEach(function (item) {
        var show = cat === 'all' || item.dataset.cat === cat;
        item.hidden = !show;
        if (show) shown++;
      });

      if (status) {
        status.textContent = shown + (shown === 1 ? ' photo shown' : ' photos shown');
      }
    });
  }

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

/* Pizza Buddies — estimate builder + availability enquiry
   ------------------------------------------------------------------
   IMPORTANT: this is an ESTIMATE tool, not a booking system. It ends
   in a lead-capture step that composes an email to the business —
   availability is always confirmed personally by the founders.

   PRICING — edit these three constants when prices change:            */
var PRICE_PER_PERSON = { classic: 16, premium: 18 };
var MINIMUM_HIRE = 900;              // £ — minimum hire, location dependent
var ESTIMATE_HEADROOM = 1.15;        // upper bound of range (+15% for travel/extras)

var ENQUIRY_EMAIL = 'info@pizzabuddies.co.uk';

(function () {
  'use strict';

  var form = document.getElementById('quote-form');
  if (!form) return;

  var steps = form.querySelectorAll('.qstep');
  var progressItems = document.querySelectorAll('.progress li');
  var donePanel = document.getElementById('quote-done');

  /* Prevent past dates being picked */
  var dateInput = form.elements['event-date'];
  if (dateInput) {
    var today = new Date();
    dateInput.min = today.toISOString().slice(0, 10);
  }

  /* ---------- helpers ---------- */

  function gbp(n) {
    return '£' + Math.round(n).toLocaleString('en-GB');
  }

  function fieldWrap(input) {
    return input.closest('.field') || input.closest('.pkg-grid');
  }

  function setError(input, msg) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.add('error');
    var err = wrap.querySelector('.err');
    if (err) err.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.remove('error');
    var err = wrap.querySelector('.err');
    if (err) err.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  form.addEventListener('input', function (e) {
    if (e.target.matches('input, select, textarea')) clearError(e.target);
  });

  function validateStep(stepEl) {
    var firstBad = null;

    stepEl.querySelectorAll('[required]').forEach(function (input) {
      var bad = false;

      if (input.type === 'radio') {
        bad = !form.querySelector('input[name="' + input.name + '"]:checked');
      } else if (!input.value.trim()) {
        bad = true;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        setError(input, 'That email address doesn’t look quite right.');
        firstBad = firstBad || input;
        return;
      } else if (input.type === 'tel' && input.value.replace(/\D/g, '').length < 7) {
        setError(input, 'Please enter a phone number we can reach you on.');
        firstBad = firstBad || input;
        return;
      } else if (input.type === 'number') {
        var n = Number(input.value);
        if (!n || n < 1 || n > 2000) {
          setError(input, 'Please enter a guest count between 1 and 2000.');
          firstBad = firstBad || input;
          return;
        }
      } else if (input.type === 'date' && input.min && input.value < input.min) {
        setError(input, 'Please pick a date in the future.');
        firstBad = firstBad || input;
        return;
      }

      if (bad) {
        setError(input, 'This one’s required.');
        firstBad = firstBad || input;
      }
    });

    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  /* ---------- step navigation ---------- */

  function showStep(num) {
    steps.forEach(function (s) { s.hidden = s.dataset.step !== String(num); });
    progressItems.forEach(function (li, i) {
      li.classList.toggle('done', i + 1 < num);
      if (i + 1 === num) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
    });
    var heading = form.querySelector('.qstep[data-step="' + num + '"] h2');
    if (heading) heading.focus();
    if (num === 2) renderEstimate();
  }

  form.addEventListener('click', function (e) {
    var next = e.target.closest('[data-next]');
    var back = e.target.closest('[data-back]');
    if (next) {
      var current = e.target.closest('.qstep');
      if (validateStep(current)) showStep(Number(current.dataset.step) + 1);
    }
    if (back) {
      showStep(Number(e.target.closest('.qstep').dataset.step) - 1);
    }
  });

  /* ---------- estimate calculation ---------- */

  function getData() {
    var f = form.elements;
    var pkgInput = form.querySelector('input[name="package"]:checked');
    var pkg = pkgInput ? pkgInput.value : 'classic';
    return {
      location: f['event-location'].value.trim(),
      type: f['event-type'].value,
      guests: Number(f['guest-count'].value),
      pkg: pkg,
      pkgLabel: pkg === 'premium' ? 'Premium (from £18pp)' : 'Classic (from £16pp)',
      date: f['event-date'].value,
      time: f['event-time'].value
    };
  }

  function niceDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function calcRange(guests, pkg) {
    var perHead = PRICE_PER_PERSON[pkg] || PRICE_PER_PERSON.classic;
    var base = guests * perHead;
    var low = Math.max(MINIMUM_HIRE, base);
    var high = Math.max(low, Math.ceil((base * ESTIMATE_HEADROOM) / 25) * 25);
    return { low: low, high: high, base: base, perHead: perHead };
  }

  var lastEstimateText = '';

  function renderEstimate() {
    var d = getData();
    var r = calcRange(d.guests, d.pkg);

    var rangeEl = document.getElementById('est-range');
    var minFlag = document.getElementById('est-minflag');
    var recap = document.getElementById('est-recap');

    if (r.high > r.low) {
      rangeEl.textContent = gbp(r.low) + ' – ' + gbp(r.high);
      lastEstimateText = gbp(r.low) + '–' + gbp(r.high);
    } else {
      rangeEl.textContent = 'From ' + gbp(r.low);
      lastEstimateText = 'From ' + gbp(r.low);
    }

    minFlag.textContent = r.base < MINIMUM_HIRE
      ? 'Our minimum hire of ' + gbp(MINIMUM_HIRE) + ' applies to this estimate'
      : '';

    recap.innerHTML = '';
    [
      ['Event', d.type],
      ['Date', niceDate(d.date) + (d.time ? ', ' + d.time : '')],
      ['Guests', String(d.guests) + ' × ' + gbp(r.perHead) + ' per person'],
      ['Package', d.pkgLabel],
      ['Location', d.location]
    ].forEach(function (row) {
      var li = document.createElement('li');
      var b = document.createElement('b');
      b.textContent = row[0];
      li.appendChild(b);
      li.appendChild(document.createTextNode(row[1]));
      recap.appendChild(li);
    });
  }

  /* ---------- final submit → composes email to the business ---------- */

  function buildSummary(d, contact) {
    return [
      'New availability enquiry — pizzabuddies.co.uk',
      '',
      'Name:     ' + contact.name,
      'Email:    ' + contact.email,
      'Phone:    ' + contact.phone,
      '',
      'Event:    ' + d.type,
      'Date:     ' + niceDate(d.date),
      'Time:     ' + d.time,
      'Location: ' + d.location,
      'Guests:   ' + d.guests,
      'Package:  ' + d.pkgLabel,
      'Estimate shown: ' + lastEstimateText,
      contact.notes ? '\nNotes:\n' + contact.notes : ''
    ].join('\n').trim();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var step3 = form.querySelector('.qstep[data-step="3"]');
    if (!validateStep(step3)) return;

    var d = getData();
    var contact = {
      name: form.elements['contact-name'].value.trim(),
      email: form.elements['contact-email'].value.trim(),
      phone: form.elements['contact-phone'].value.trim(),
      notes: form.elements['contact-notes'].value.trim()
    };

    var summary = buildSummary(d, contact);
    var subject = 'Availability check — ' + niceDate(d.date) + ' — ' + d.type + ', ' + d.guests + ' guests';

    /* Default (no-backend) delivery: open the visitor's email app,
       pre-addressed to the business with everything filled in.
       See README.md for swapping this to Formspree / Netlify Forms. */
    var mailto = 'mailto:' + ENQUIRY_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(summary);

    // Show the confirmation panel (with copyable fallback) first,
    // then hand over to the email client.
    form.hidden = true;
    var progressList = document.querySelector('.progress');
    if (progressList) progressList.hidden = true;

    document.getElementById('summary-text').textContent = summary;
    donePanel.hidden = false;
    var doneHeading = donePanel.querySelector('h2');
    if (doneHeading) doneHeading.focus();

    window.location.href = mailto;
  });

  /* Copy-summary fallback for visitors without a configured mail app */
  var copyBtn = document.getElementById('copy-summary');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = document.getElementById('summary-text').textContent;
      function flash(ok) {
        copyBtn.textContent = ok ? 'Copied ✓' : 'Select the text above and copy it manually';
        setTimeout(function () { copyBtn.textContent = 'Copy summary'; }, 2600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash(true); }, function () { flash(false); });
      } else {
        flash(false);
      }
    });
  }
})();

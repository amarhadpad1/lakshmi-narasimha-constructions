//Photo viewer: click a gallery photo to enlarge it
var dialog = document.getElementById('d');
var dialogImg = document.getElementById('di');
document.querySelectorAll('.gal figure').forEach(function (fig) {
  var img = fig.querySelector('img');
  function open() {
    dialogImg.src = img.src;
    dialogImg.alt = img.alt;
    dialog.showModal();
  }
  fig.tabIndex = 0;                  // reachable with the keyboard
  fig.setAttribute('role', 'button');
  fig.setAttribute('aria-label', 'Enlarge photo: ' + img.alt);
  fig.addEventListener('click', open);
  fig.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});
dialog.addEventListener('click', function () { dialog.close(); });
 
// Footer year
var yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
 
// Gentle fade-in as sections scroll into view (skipped if the visitor prefers less motion)
var reveals = document.querySelectorAll('.reveal');
var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !calm) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { io.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add('in'); });
}
 
// Contact form: sends each enquiry to the contractor's Google Sheet
var SHEET_URL = 'https://script.google.com/macros/s/AKfycbxKeCbDRh-ZFeNSxmWCTjklbrQvD8OqRWMsAkwD7gg8y7bLTgaUVwNnLJQXKgB14Gl0/exec';
 
document.getElementById('f').addEventListener('submit', function (e) {
  e.preventDefault();
  var form = this;
  var btn = form.querySelector('button');
  if (btn.disabled) return;          // ignore a second click
  btn.disabled = true;
 
  var msg = document.getElementById('msg');
  var name = document.getElementById('n').value;
  var data = new URLSearchParams({
    name: name,
    phone: document.getElementById('p').value,
    type: document.getElementById('t').value,
    details: document.getElementById('m').value
  });
  msg.textContent = 'Sending...';
  fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: data })
    .then(function () {
      msg.textContent = 'Thanks, ' + name + '. We will call you soon.';
      form.reset();
    })
    .catch(function () {
      msg.textContent = 'Could not send. Please call us on 98482 61089.';
    })
    .then(function () {
      btn.disabled = false;          // allow a new enquiry afterwards
    });
});
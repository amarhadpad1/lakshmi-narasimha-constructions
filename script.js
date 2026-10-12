// Photo viewer: click a gallery photo to enlarge it
var dialog = document.getElementById('d');
var dialogImg = document.getElementById('di');
document.querySelectorAll('.gal img').forEach(function (img) {
  img.addEventListener('click', function () {
    dialogImg.src = img.src;
    dialogImg.alt = img.alt;
    dialog.showModal();
  });
});
dialog.addEventListener('click', function () { dialog.close(); });

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
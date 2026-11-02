(function () {
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // dolny pasek dopiero po przewinieciu za przyciski hero
  var mob = document.getElementById('mob');
  var cta = document.getElementById('heroCta');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      var r = e[0];
      mob.classList.toggle('widac', !r.isIntersecting && r.boundingClientRect.top < 0);
    }).observe(cta);
  }

  // kafle oferty ustawiaja temat zapytania
  var temat = document.getElementById('temat');
  document.querySelectorAll('[data-temat]').forEach(function (a) {
    a.addEventListener('click', function () {
      var t = a.getAttribute('data-temat');
      for (var i = 0; i < temat.options.length; i++) if (temat.options[i].text === t) temat.selectedIndex = i;
    });
  });

  // formularz (wizualizacja - bez wysylki)
  var form = document.getElementById('form');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.imie.value.trim() || !form.tel.value.trim() || !form.querySelector('.zgoda input').checked) {
      msg.className = 'form-msg err';
      msg.textContent = 'Podaj imię, telefon i zaznacz zgodę na kontakt.';
      return;
    }
    msg.className = 'form-msg';
    msg.textContent = 'Dziękujemy. Oddzwonimy w sprawie: ' + temat.value + '.';
    form.reset();
  });

  // galeria
  var imgs = Array.prototype.map.call(document.querySelectorAll('.g img'), function (i) { return i; });
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg'), cur = 0;
  function show(i) { cur = (i + imgs.length) % imgs.length; lbImg.src = imgs[cur].src; lbImg.alt = imgs[cur].alt; lb.hidden = false; }
  document.querySelectorAll('.g').forEach(function (b) { b.addEventListener('click', function () { show(+b.getAttribute('data-i')); }); });
  document.getElementById('lbX').addEventListener('click', function () { lb.hidden = true; });
  document.getElementById('lbP').addEventListener('click', function () { show(cur - 1); });
  document.getElementById('lbN').addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.hidden = true; });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') lb.hidden = true;
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });

  document.getElementById('rok').textContent = new Date().getFullYear();
})();

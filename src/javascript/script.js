(() => {
  'use strict';
  const translations = window.APS_TRANSLATIONS;
  const validLanguages = ['br', 'en', 'es'];
  const languageTags = {br:'pt-BR', en:'en', es:'es'};
  let currentLanguage = 'br';
  function translate(key) {
    const value = key.split('.').reduce((item, part) => item?.[part], translations);
    return value?.[currentLanguage] ?? value?.br ?? key;
  }
  function setLanguage(language) {
    currentLanguage = validLanguages.includes(language) ? language : 'br';
    document.documentElement.lang = languageTags[currentLanguage];
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      if (key === 'home.cta-title') element.innerHTML = translate(key);
      else element.textContent = translate(key);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => element.setAttribute('aria-label',translate(element.dataset.i18nAria)));
    document.querySelectorAll('[data-lang]').forEach(button => {
      const selected = button.dataset.lang === currentLanguage;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    const descriptions={br:'Cursos de Proxmox VE e OPNsense com Adriano Scherbach. Aprenda virtualização, firewall e alta disponibilidade na prática.',en:'Proxmox VE and OPNsense courses with Adriano Scherbach. Learn virtualization, firewalls and high availability through practice.',es:'Cursos de Proxmox VE y OPNsense con Adriano Scherbach. Aprende virtualización, firewall y alta disponibilidad en la práctica.'};
    document.querySelector('meta[name="description"]').content=descriptions[currentLanguage];
    try { localStorage.setItem('language', currentLanguage); } catch { /* The site also works without browser storage. */ }
  }
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('language'); } catch {}
  const browserLanguage = navigator.language.slice(0,2);
  setLanguage(savedLanguage || (browserLanguage === 'pt' ? 'br' : browserLanguage));
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',() => setLanguage(button.dataset.lang)));
  const navigation = document.getElementById('navigation');
  const menuButton = document.querySelector('.mobile-toggle');
  function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) {closeMenu();menuButton.focus();} });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('selected',selected);
      filter.setAttribute('aria-pressed',String(selected));
    });
    document.querySelectorAll('.course').forEach(course => { course.hidden = button.dataset.filter !== 'all' && course.dataset.category !== button.dataset.filter; });
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => link.classList.toggle('active',link.hash === '#' + entry.target.id));});
    },{rootMargin:'-15% 0px -60% 0px',threshold:0});
    document.querySelectorAll('main>section').forEach(section => observer.observe(section));
  }
})();

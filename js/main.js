'use strict';
const body = document.body;
const header = document.querySelector('#site-header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 15);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
document.querySelector('#year').textContent = new Date().getFullYear();

// Native dialogs provide focus containment, Escape support and focus restoration.
const openDialog = dialog => { dialog.showModal(); body.classList.add('modal-open'); };
const closeDialog = dialog => dialog.close();
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    body.classList.remove('modal-open');
    if (dialog.id === 'mobile-menu') menuToggle.setAttribute('aria-expanded', 'false');
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(dialog);
  });
});
const mobileMenu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => { openDialog(mobileMenu); menuToggle.setAttribute('aria-expanded', 'true'); });
document.querySelector('[data-close-menu]').addEventListener('click', () => closeDialog(mobileMenu));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeDialog(mobileMenu)));
window.addEventListener('resize', () => { if (window.innerWidth > 850 && mobileMenu.open) closeDialog(mobileMenu); });

// All service content is in HTML, so the complete menu remains available without JS.
const groups = [...document.querySelectorAll('#price-groups > .price-group')];
const bookingUrl = 'https://chloenailswath.setmore.com/';
// One price source populates desktop cards, the mobile accordion and the full menu.
groups.forEach(group => {
  group.querySelectorAll('.price-list > div').forEach(item => {
    const link = document.createElement('a');
    link.className = 'service-book';
    link.href = bookingUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Book ${item.querySelector('dt').textContent.trim()} online`);
    link.innerHTML = 'Book now <span aria-hidden="true">↗</span>';
    item.append(link);
  });
});
const mobileAccordion = document.querySelector('#mobile-service-accordion');
groups.forEach((group, index) => {
  const details = document.createElement('details');
  details.className = 'service-accordion-item';
  details.name = 'chloe-service-category';
  if (index === 0) details.open = true;
  const summary = document.createElement('summary');
  const label = group.querySelector('h3').textContent.trim();
  const count = group.querySelectorAll('.price-list > div').length;
  summary.innerHTML = `<span>${label}<small>${count} services</small></span><span class="accordion-chevron" aria-hidden="true">⌄</span>`;
  details.append(summary);
  const content = group.cloneNode(true);
  ['id', 'role', 'aria-labelledby', 'tabindex'].forEach(attribute => content.removeAttribute(attribute));
  content.hidden = false;
  details.append(content);
  mobileAccordion.append(details);
});
const categoryButtons = [...document.querySelectorAll('[data-category]')];
const categoryNav = document.querySelector('.category-nav');
categoryNav.setAttribute('role', 'tablist');
const selectCategory = button => {
  categoryButtons.forEach(tab => { const active = tab === button; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  groups.forEach(group => { group.hidden = group.id !== button.dataset.category; });
};
categoryButtons.forEach((button, index) => {
  button.id = 'tab-' + button.dataset.category;
  button.setAttribute('role', 'tab');
  button.setAttribute('aria-controls', button.dataset.category);
  const group = document.getElementById(button.dataset.category);
  group.setAttribute('role', 'tabpanel');
  group.setAttribute('aria-labelledby', button.id);
  group.tabIndex = 0;
  button.addEventListener('click', () => selectCategory(button));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % categoryButtons.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + categoryButtons.length) % categoryButtons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = categoryButtons.length - 1;
    else return;
    event.preventDefault(); selectCategory(categoryButtons[next]); categoryButtons[next].focus();
  });
});
const priceDialog = document.querySelector('#price-dialog');
const fullPrices = document.querySelector('#full-price-content');
groups.forEach(group => {
  const clone = group.cloneNode(true);
  clone.querySelectorAll('.service-book').forEach(link => link.remove());
  ['id', 'role', 'aria-labelledby', 'tabindex'].forEach(attribute => clone.removeAttribute(attribute));
  clone.hidden = false;
  fullPrices.append(clone);
});
selectCategory(categoryButtons[0]);
body.classList.add('js-enabled');
document.querySelector('#full-menu').addEventListener('click', () => openDialog(priceDialog));
document.querySelector('[data-close-prices]').addEventListener('click', () => closeDialog(priceDialog));

const lightbox = document.querySelector('#lightbox');
const photos = [...document.querySelectorAll('[data-lightbox]')];
let photoIndex = 0;
const showPhoto = index => {
  photoIndex = (index + photos.length) % photos.length;
  const photo = photos[photoIndex];
  const img = document.querySelector('#lightbox-image');
  img.src = photo.href;
  img.alt = photo.querySelector('img').alt;
  document.querySelector('#lightbox-caption').textContent = `${photoIndex + 1} / ${photos.length} · ${photo.closest('figure').querySelector('figcaption > span:last-child').textContent}`;
};
photos.forEach((photo, index) => photo.addEventListener('click', event => { event.preventDefault(); showPhoto(index); openDialog(lightbox); }));
document.querySelector('[data-close-lightbox]').addEventListener('click', () => closeDialog(lightbox));
document.querySelector('#previous-photo').addEventListener('click', () => showPhoto(photoIndex - 1));
document.querySelector('#next-photo').addEventListener('click', () => showPhoto(photoIndex + 1));
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1)); }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

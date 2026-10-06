const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#mobile-nav');
function closeMenu() { nav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'メニューを開く'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.style.top = `${document.querySelector('.header').getBoundingClientRect().bottom}px`; nav.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く'); });
window.addEventListener('scroll', () => { if (!nav.hidden) nav.style.top = `${document.querySelector('.header').getBoundingClientRect().bottom}px`; }, {passive:true});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
matchMedia('(min-width:801px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
const dialog = document.querySelector('#plan-dialog');
const message = document.querySelector('#message');
const status = document.querySelector('#copy-status');
document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => {
  message.value = `ばってんLaboさん、こんにちは。\n${button.dataset.plan}について相談したいです。\n\nお店の名前：\n業種：\n相談したいこと：`;
  status.textContent = ''; dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
document.querySelector('#copy-message').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(message.value); status.textContent = 'コピーしました。LINEを開き、貼り付けてお送りください。'; }
  catch { message.focus(); message.select(); status.textContent = '文章を選択しました。お使いの端末のコピー操作でコピーしてください。'; }
});

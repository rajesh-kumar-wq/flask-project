function handleLogin() {
  const emailEl = document.getElementById('email');
  const passEl = document.getElementById('password');
  let valid = true;

  [emailEl, passEl].forEach(el => {
    el.classList.remove('error');
    if (!el.value.trim()) { el.classList.add('error'); valid = false; }
  });

  if (!valid) {
    setTimeout(() => {
      emailEl.classList.remove('error');
      passEl.classList.remove('error');
    }, 1800);
    return;
  }

  const btn = document.querySelector('.btn-login');
  btn.textContent = 'Signing in…';
  btn.disabled = true;
  btn.style.background = 'rgb(15, 110, 86)';

  setTimeout(() => {
    btn.textContent = 'Sign in';
    btn.disabled = false;
    btn.style.background = '';
  }, 2000);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});
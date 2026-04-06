async function handleLogin() {

  const emailEl = document.getElementById('email');
  const passEl = document.getElementById('password');

  let valid = true;

  [emailEl, passEl].forEach(el => {
    el.classList.remove('error');
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    }
  });

  if (!valid) return;

  const btn = document.querySelector('.btn-login');

  btn.textContent = "Signing in...";
  btn.disabled = true;

  try {

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailEl.value,
        password: passEl.value
      })
    });

    const data = await response.json();

    if (data.success) {

      window.location.href = "/dashboard";

    } else {

      alert("Invalid email or password");

    }

  } catch (error) {

    alert("Server error");

  }

  btn.textContent = "Sign in";
  btn.disabled = false;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});
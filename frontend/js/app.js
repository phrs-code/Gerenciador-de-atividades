//import { login } from './api.js';
//import { saveToken } from './auth.js';

const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value;

  // validação simples
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-error').textContent = '';
  if (!email.includes('@')) {
    document.getElementById('email-error').textContent = 'Email inválido';
    return;
  }
  if (password.length < 6) {
    document.getElementById('password-error').textContent = 'Mínimo 6 caracteres';
    return;
  }

  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Entrando...';

  console.log(email, password);
});
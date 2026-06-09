import { login } from './api.js';
import { saveToken } from './auth.js';

const form = document.getElementById('login-form');
const STATE = { tasks: [], filter: 'all', search: '' };

function render() {
  const filtered = STATE.tasks
    .filter(t => STATE.filter === 'all' || t.status === STATE.filter)
    .filter(t => t.title.toLowerCase().includes(STATE.search.toLowerCase()));
  listEl.innerHTML = filtered.map(renderTask).join('');
}

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

  try {
    const { token } = await login(email, password);
    saveToken(token);
    window.location.href = '/index.html';
  } catch (err) {
    alert('Falha ao entrar: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
});

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    STATE.filter = chip.dataset.filter;
    render();
  });
});

document.getElementById('search').addEventListener('input', (e) => {
  STATE.search = e.target.value;
  render();
});
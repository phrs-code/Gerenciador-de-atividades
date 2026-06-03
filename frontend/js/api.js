const BASE = 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
    return;
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const login       = (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const listTasks   = () => request('/tasks');
export const getTask     = (id) => request(`/tasks/${id}`);
export const createTask  = (data) => request('/tasks', { method: 'POST', body: JSON.stringify(data) });
export const updateTask  = (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTask  = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
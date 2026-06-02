//import { listTasks, deleteTask } from './api.js';

const listEl = document.getElementById('task-list');
const emptyEl = document.getElementById('empty');

function statusLabel(s) {
  return { todo: 'A fazer', doing: 'Em progresso', done: 'Concluída' }[s] || s;
}

function renderTask(t) {
  return `
    <li class="task" data-id="${t._id}">
      <div class="task-head">
        <h3>${escapeHtml(t.title)}</h3>
        <span class="badge badge-${t.status}">${statusLabel(t.status)}</span>
      </div>
      <p>${escapeHtml(t.description || '')}</p>
      <div class="task-foot">
        <span>📅 ${new Date(t.createdAt).toLocaleDateString('pt-BR')}</span>
        <div class="actions">
          <button class="btn-ghost" data-act="edit">Editar</button>
          <button class="btn-ghost danger" data-act="del">Excluir</button>
        </div>
      </div>
    </li>`;
}

// Função que gera o HTML do formulário
function renderForm() {
  return `
    <form id="task-form" class="task-form" novalidate>
        <h2 id="form-title">Nova tarefa</h2>

        <label for="title">Título *</label>
        <input id="title" name="title" required maxlength="80" />

        <label for="description">Descrição</label>
        <textarea id="description" name="description" rows="3" maxlength="500"></textarea>

        <label for="status">Status</label>
        <select id="status" name="status">
            <option value="todo">A fazer</option>
            <option value="doing">Em progresso</option>
            <option value="done">Concluída</option>
        </select>

        <div class="form-actions">
            <button type="button" id="cancel-btn" class="btn btn-ghost">Cancelar</button>
            <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
    </form>
  `;
}

// Captura o clique no botão "+ Nova tarefa"
document.getElementById('new-task').addEventListener('click', () => {
    // 1. Esconde a seção da lista de tarefas
    document.querySelector('.tasks').style.display = 'none';

    // 2. Cria um contêiner (div) e injeta o formulário dentro dele
    const formContainer = document.createElement('div');
    formContainer.id = 'form-container';
    formContainer.innerHTML = renderForm();
    
    // 3. Adiciona esse contêiner na tela (no body)
    document.body.appendChild(formContainer);

    // 4. Cria a lógica do botão "Cancelar" para destruir o form e voltar para a lista
    document.getElementById('cancel-btn').addEventListener('click', () => {
        document.body.removeChild(formContainer); // Remove o formulário da tela
        document.querySelector('.tasks').style.display = 'block'; // Mostra a lista novamente
    });
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]
  ));
}

async function load() {
  const tasks = [
  { _id: '1', title: 'Configurar ambiente',  status: 'done',  createdAt: '2026-05-20' },
  { _id: '2', title: 'Modelar collection',   status: 'doing', createdAt: '2026-05-21' },
  { _id: '3', title: 'Implementar JWT',      status: 'todo',  createdAt: '2026-05-22' },
];

  if (!tasks.length) {
    listEl.innerHTML = '';
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;
  listEl.innerHTML = tasks.map(renderTask).join('');
}

listEl.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const id = btn.closest('.task').dataset.id;
  if (btn.dataset.act === 'del') {
    if (!confirm('Excluir esta tarefa?')) return;
    console.log('Excluir tarefa', id);
    load();
  } else if (btn.dataset.act === 'edit') {
    window.location.href = `editar.html?id=${id}`;
  }
});

load();
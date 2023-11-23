// script.js

const taskContainer = document.getElementById("task-container");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("save-btn");
const newTaskBtn = document.getElementById("new-task-btn");
let editingTaskIndex = -1;

// Abre o modal para adicionar nova tarefa
function openNewTaskModal() {
  document.getElementById("edit-title").value = "";
  document.getElementById("edit-content").value = "";
  editingTaskIndex = -1;
  modal.style.display = "flex";
}

// Deleta a tarefa selecionada (marcada com uma borda)
function deleteSelectedTask() {
  const selectedTask = document.querySelector(".task-card.selected");

  if (selectedTask) {
    const index = Array.from(selectedTask.parentElement.children).indexOf(
      selectedTask
    );
    deleteTask(index);
  } else {
    alert("Selecione uma tarefa para excluir.");
  }
}

// Adiciona um ícone de lápis e um botão "Deletar" para editar cada tarefa
function addEditIcon(taskCard, index) {
  const editIcon = document.createElement("span");
  editIcon.classList.add("edit-icon");
  editIcon.innerHTML =
    '      <span id="edit-icon" class="edit-icon" onclick="openModal()">&#9998;</span>    ';
  editIcon.addEventListener("click", () => openModal(index));

  taskCard.appendChild(editIcon);
}

// Função para salvar uma tarefa
function saveTask() {
  const title = document.getElementById("edit-title").value;
  const content = document.getElementById("edit-content").value;

  if (title.trim() === "" || content.trim() === "") {
    alert("Título e Conteúdo são obrigatórios.");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (editingTaskIndex !== -1) {
    tasks[editingTaskIndex] = { title, content };
  } else {
    tasks.push({ title, content });
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  closeModal();
}

// Função para deletar uma tarefa
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeModal();
  renderTasks();
}

// Função para abrir o modal de edição
function openModal(index) {
  editingTaskIndex = index;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  document.getElementById("edit-title").value = tasks[index].title;
  document.getElementById("edit-content").value = tasks[index].content;
  modal.style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
  modal.style.display = "none";
}

// Função para renderizar as tarefas na página
function renderTasks() {
  taskContainer.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.content}</p>
        `;
    addEditIcon(taskCard, index);

    taskCard.addEventListener("click", () => {
      taskCard.classList.toggle("selected");
    });

    taskContainer.appendChild(taskCard);
  });
}

// Executa a função renderTasks quando a página é carregada
window.onload = renderTasks;

// Adiciona um ouvinte de eventos para o botão de salvar
saveBtn.addEventListener("click", saveTask);
// Adiciona um ouvinte de eventos para o botão "Nova Tarefa"
newTaskBtn.addEventListener("click", openNewTaskModal);

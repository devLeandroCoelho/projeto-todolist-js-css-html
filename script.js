const newTaskBtn = document.getElementById("new-task-btn");
const taskContainer = document.getElementById("task-container");
const modalElement = new bootstrap.Modal(document.getElementById("taskModal"));
let editingTaskIndex = -1;

function openNewTaskModal() {
  document.getElementById("edit-title").value = "";
  document.getElementById("edit-content").value = "";
  editingTaskIndex = -1;
  modalElement.show();
}

function openModal(index) {
  editingTaskIndex = index;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  document.getElementById("edit-title").value = tasks[index].title;
  document.getElementById("edit-content").value = tasks[index].content;
  modalElement.show();
}

function closeModal() {
  modalElement.hide();
}

function deleteSelectedTask() {
  if (editingTaskIndex === -1) {
    alert("Nenhuma tarefa selecionada para deletar.");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(editingTaskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeModal();
  renderTasks();
}

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
  closeModal();
  renderTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeModal();
  renderTasks();
}

function addEditIcon(taskCard, index) {
  const editIcon = document.createElement("span");
  editIcon.classList.add("edit-icon");
  editIcon.innerHTML = "&#9998;";
  editIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(index);
  });
  taskCard.appendChild(editIcon);
}

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

window.onload = renderTasks;
newTaskBtn.addEventListener("click", openNewTaskModal);

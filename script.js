
const form = document.getElementById("form");
const input = document.getElementById("input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-btn");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeBtn = document.getElementById("theme-btn");

let todos = [];
let filter = "all";


form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input.value.trim() === "") return;

  todos.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  afficherTodos();
});


function afficherTodos() {
  todoList.innerHTML = "";

  let todosAffichees = todos;
  if (filter === "active") {
    todosAffichees = todos.filter(t => !t.completed);
  } else if (filter === "completed") {
    todosAffichees = todos.filter(t => t.completed);
  }

  // on crée un <li> pour chaque tâche
  for (let i = 0; i < todosAffichees.length; i++) {
    const todo = todosAffichees[i];

    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
      todo.completed = checkbox.checked;
      afficherTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", function () {
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      afficherTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }

  // mise à jour du compteur
  const nbActives = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = nbActives + " tâches restantes";
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    afficherTodos();
  });
});

clearBtn.addEventListener("click", function () {
  todos = todos.filter(t => !t.completed);
  afficherTodos();
});

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.src = "images/icon-moon.svg";
  } else {
    themeBtn.src = "images/icon-sun.svg";
  }
});
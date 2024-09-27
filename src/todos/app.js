import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos } from "./models/usecases";
import { renderCountTodoPending } from "./models/usecases/render-todo-pending";

const elementIDs = {
  TodoList: ".todo-list",
  newTodoInput: "#new-todo-input",
  clearTodosCompleted: ".clear-completed",
  TodoFilter: ".filter",
  TodoPeding: "#pending-count",
};

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());

    renderTodos(elementIDs.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderCountTodoPending(elementIDs.TodoPeding);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  const newDescriptionInput = document.querySelector(elementIDs.newTodoInput);
  const todoListUl = document.querySelector(elementIDs.TodoList);
  const TodoFilterBtn = document.querySelectorAll(elementIDs.TodoFilter);
  const TodoPedingLabel = document.querySelector(elementIDs.TodoPeding);
  const clearTodosCompleted = document.querySelector(
    elementIDs.clearTodosCompleted
  );
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();

    event.target.value = "";
  });

  todoListUl.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUl.addEventListener("click", (event) => {
    const isDestroy = event.target.className === "destroy";
    const element = event.target.closest("[data-id]");

    if (!element || !isDestroy) return;

    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
    updatePendingCount();
  });

  clearTodosCompleted.addEventListener("click", (event) => {
    todoStore.deletedCompleted();
    displayTodos();
  });

  TodoFilterBtn.forEach((element) => {
    element.addEventListener("click", (event) => {
      TodoFilterBtn.forEach((e) => e.classList.remove("selected"));
      event.target.className = "selected";

      switch (event.target.id) {
        case "todos":
          todoStore.setFilter(Filters.All);
          break;

        case "pending":
          todoStore.setFilter(Filters.Pending);
          break;

        case "completed":
          todoStore.setFilter(Filters.Completed);
          break;
      }

      displayTodos();
    });
  });
};

import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("Todo numero 1"),
    new Todo("Todo numero 2"),
    new Todo("Todo numero 3"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("InitStore🍋");
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;

  const { todos = [], filters = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );

  state.todos = todos;
  state.filter = filters;
};

const saveTodoLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

const addTodo = (description) => {
  if (!description) throw new Error("descripcion is required");

  state.todos.push(new Todo(description));

  saveTodoLocalStorage();
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);

    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);

    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};

const deletedCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);

  saveTodoLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);

  saveTodoLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;

  saveTodoLocalStorage();
};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }

    return todo;
  });
  saveTodoLocalStorage();
};

// exporta un objeto
export default {
  addTodo,
  deletedCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};

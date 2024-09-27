import todoStore, { Filters } from "../../../store/todo.store";

let element;
export const renderCountTodoPending = (elementId) => {
  if (!element) element = document.querySelector(elementId);

  if (!element) throw new Error(`Element ${elementId} not found`);

  element.innerHTML = todoStore.getTodos(Filters.All).length;
  console.log(element.innerHTML = todoStore.getTodos(Filters.Pending).length);
  
};

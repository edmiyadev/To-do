import "./style.css";
import { App } from "./src/todos/app";
import InitStore from "./src/store/todo.store";

InitStore.initStore();

App("#app");

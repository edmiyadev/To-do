import "./style.css";
import { App } from "./src/todo/app";
import InitStore from "./src/todo/store/todo.store";

InitStore.initStore();

App("#app");

import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UiStore from "./store/applicationStore";
import TasksStore from "./store/tasksStore";
import CollectionsStore from "./store/collectionsStore";
import UserStore from "./store/userStore";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      ui: new UiStore(),
      tasks: new TasksStore(),
      collections: new CollectionsStore(),
      user: new UserStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

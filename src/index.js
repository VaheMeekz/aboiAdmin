import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./redux/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,

  composeWithDevTools(applyMiddleware(thunk))
);

(function () {
  localStorage.setItem("themeMode", "theme-mode-dark");
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

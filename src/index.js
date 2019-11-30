import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App.js";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware } from "redux";
import { gifsReducer } from "./Reducers/rootReducer.js";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";

const middlewares = [thunkMiddleware];
const store = createStore(gifsReducer, applyMiddleware(...middlewares));
// window.store = store; // Debug Lines
// window.AddGif = AddGif;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

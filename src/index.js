import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App.js";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers/rootReducer.js";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";

import { AddGif } from "./Actions/rootActions";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

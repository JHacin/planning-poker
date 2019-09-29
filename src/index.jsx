import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import WebFont from "webfontloader";
import "./index.css";
import App from "./App";
import store from "./redux/store";

WebFont.load({
  google: {
    families: ["Roboto:300,400,500,700:latin", "Roboto Mono:300,400,500,700:latin", "sans-serif"]
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

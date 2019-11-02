import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import WebFont from "webfontloader";
import "./index.css";
import App from "./App";
import store from "./redux/store";

WebFont.load({
  google: {
    families: [
      "Open Sans:300,400,600,700:latin",
      "Maven Pro:400,500,700:latin",
      "sans-serif"
    ]
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

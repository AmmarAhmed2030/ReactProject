import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App";
import CounterContextProvider from "./Context/CounterContext";
import TokenContextProvider from "./Context/tokenContext";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { getTotals } from "./Redux/cartSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(getTotals());
root.render(
  <Provider store={store}>
    <TokenContextProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </TokenContextProvider>
  </Provider>
);

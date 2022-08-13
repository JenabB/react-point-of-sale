import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./common/state";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="*" element={<App />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

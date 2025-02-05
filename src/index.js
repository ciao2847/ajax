import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ExchangeRate from "./ExchangeRate";
import "bootstrap/dist/css/bootstrap.min.css"; // 引入 Bootstrap 的 CSS 檔案

import "tailwindcss/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ExchangeRate />
  </React.StrictMode>
);

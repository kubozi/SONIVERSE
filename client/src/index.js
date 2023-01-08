import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App.tsx";
import App2 from "./App2";
import { BrowserRouter } from 'react-router-dom'

import './index.css';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App2 />
  </BrowserRouter>
);
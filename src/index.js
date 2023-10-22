import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App.js";

import "./styles/index.css";

console.log("main.jsx")
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App/>);
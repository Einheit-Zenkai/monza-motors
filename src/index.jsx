import React from "react";
import ReactDOM from "react-dom/client"; // Make sure to import from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Import the App component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/styles/navbar.css';
import '@/styles/video.css';
import '@/styles/buttons.css';
import '@/styles/global.css'; // 👈 GLOBAL STYLES HERE

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  // Use root.render instead of ReactDOM.render
  <Router>
    <App /> {/* Now the Router is wrapping the entire App */}
  </Router>
);

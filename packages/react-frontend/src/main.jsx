// src/main.jsx
// remember to be in packages\react-frontend folder
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";

// everything in react consists of components, which can be functional 
// components or class componets

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an elemment to the Root
root.render(<MyApp />);
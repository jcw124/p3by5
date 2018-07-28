import React from "react";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin/Admin";
import "./App.css";

const App = () => (
  <div className="App">
      <Navigation />
      <Login />
      <Register />
      <Admin />

  </div>
);

export default App;

import React from "react";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Admin from "./components/Admin/Admin";
import "./App.css";
import Questins from "./components/Questions";
import Game from "./components/Game";

const App = () => (
  <div className="App">
      <Navigation />
      <Login />
      <Admin />
      <Game /> 
  </div>
);

export default App;

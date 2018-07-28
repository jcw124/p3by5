import React from "react";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin/Admin";
import Questions from "./components/Questions";
import Game from "./components/Game";
import "./App.css";


const App = () => (
  <div className="App">
      <Navigation />
      <Login />
      <Register />
      <Admin />
      <Game />
      <Questions />
  </div>
);

export default App;

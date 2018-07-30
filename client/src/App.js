import React from "react";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin/Admin";
import NewGameName from "./components/NewGameName"
import NewGame from "./components/NewGame/NewGame";
import User from "./components/User/User";
import Game from "./components/Game/Game";
import "./App.css";

const App = () => (
  
  <div className="App">
      <Navigation />
      <Login />
      <Register />
      <Admin />
      <NewGameName />
      <NewGame />
      <User />
      <Game />
  </div>
);

export default App;

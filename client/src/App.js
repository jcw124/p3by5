import React from "react";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin/Admin";
import NewGameName from "./components/NewGameName"
import NewGame from "./components/NewGame/NewGame";
import Questions from "./components/Questions";
import Game from "./components/Game";
import "./App.css";

const App = () => (
  
  <div className="App">
      <Navigation />
      {/* <Login />
      <Register />
      <Admin /> */}
      <NewGameName />
      {/* <NewGame />
      <Game />
      <Questions /> */}
  </div>
);

export default App;

import React from "react";
import Navigation from "./components/Navigation";
import Admin from "./pages/Admin";
import GameCreate from "./pages/GameCreate";
import GamePlay from "./pages/GamePlay";
import "./App.css";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import NewGameName from "./components/NewGameName"
// import NewGame from "./components/NewGame/NewGame";
// import User from "./components/User/User";
// import Game from "./components/Game/Game";

const App = () => (
  
  <div className="App">
      <Navigation />
      {/* <Admin /> */}
      {/* <GameCreate /> */}
      <GamePlay />

      {/* <Login />
      <Register />
      <NewGameName />
      <NewGame />
      <User />
      <Game /> */}

  </div>
);

export default App;

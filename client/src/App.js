import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import GameCreate from "./pages/GameCreate";
import User from "./pages/User";
import GamePlay from "./pages/GamePlay"
import "./App.css";



const App = () => (
  
  <div className="App">
    <Navigation />
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/create" component={GameCreate} />
        <Route path="/user" component={User} />
        <Route path="/play" component={GamePlay} />
      </div>
    </Router>
  </div>
);

export default App;

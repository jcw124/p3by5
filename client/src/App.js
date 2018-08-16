import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminRegister from "./pages/AdminRegister";
//import GameCreate from "./pages/GameCreate";
import User from "./pages/User";
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home";
import "./App.css";



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      adminAuthenticated: false
      // gameName: ""
    };

    this.authenticate = this.authenticate.bind(this);
    this.deAuthenticate = this.deAuthenticate.bind(this);
    // this.updateGame = this.updateGame.bind(this);
  }

  // updateGame = (name) => {
  //   this.setState({
  //       gameName: name
  //   })
  // }

  authenticate() {
    this.setState({
      authenticated: true
    })
  }

  deAuthenticate() {
    this.setState({
      authenticated: false
    })
  }
  adminAuthenticate = () => {
    this.setState({
      adminAuthenticated: true
    })
  }

  adminDeAuthenticate = () => {
    this.setState({
      adminAuthenticated: false
    })
  }

  render() {
    return (
      <div className="App">
        {/* <Navigation /> */}
        <Router>
          <div className="master">
            <Switch>
              <Route exact path="/" render={props =>
                <Home
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                />}
              />
              <Route exact path="/login" render={props =>
                <Login
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                />}
              />
              <Route exact path="/register" render={props =>
                <Register
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                />}
              />
              <Route exact path="/admin" render={props =>
                <Admin
                  {...props}
                  authenticate={this.adminAuthenticate}
                  deAuthenticate={this.adminDeAuthenticate}
                  authenticated={this.state.adminAuthenticated}
                />}
              />
              <Route exact path="/adminreg" render={props =>
                <AdminRegister
                  {...props}
                  authenticate={this.adminAuthenticate}
                  deAuthenticate={this.adminDeAuthenticate}
                  authenticated={this.state.adminAuthenticated}
                />}
              />
              <Route exact path="/user" render={props =>
                <User
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                // updateGamePlay={this.updateGame}
                // gameName={this.state.gameName}
                />}
              />
              <Route exact path="/play" render={props =>
                <GamePlay
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                // gameName={this.state.gameName}
                />}
              />
            </Switch>
          </div>
        </Router>
      </div>
    )
  };
}


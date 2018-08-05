import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import GameCreate from "./pages/GameCreate";
import User from "./pages/User";
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home";
import "./App.css";



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };

    this.authenticate = this.authenticate.bind(this);
    this.deAuthenticate = this.deAuthenticate.bind(this);
  }

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
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                />}
              />
              <Route exact path="/create" render={props =>
                <GameCreate
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                />}
              />
              <Route exact path="/user" render={props =>
                <User
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                />}
              />
              <Route exact path="/play" render={props =>
                <GamePlay
                  {...props}
                  authenticate={this.authenticate}
                  deAuthenticate={this.deAuthenticate}
                  authenticated={this.state.authenticated}
                />} 
              />
            </Switch>
          </div>
        </Router>
      </div>
    )
  };
}


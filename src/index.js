import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./assets/scss/material-kit-react.scss";

// pages for this product
import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import TerminalJS from "./components/TerminalJS/TerminalJS"

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/test" component={TerminalTest} />
      <Route path="/components" component={Components} />
      <Route path="/" component={LandingPage} />

    </Switch>
  </Router>,
  document.getElementById("root")
);

function TerminalTest() {
  return (
    <TerminalJS name="Terminal" />

  )
}
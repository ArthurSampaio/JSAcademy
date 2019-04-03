import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import TerminalJS from './components/TerminalJS/TerminalJS'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'



class App extends Component {
  render() {
    return (
      <Fragment id="page-wrap">
        <Router>

          <div className="App">
            {/* <Menu >
              <Link to="/">Home</Link>
              <Link to="/training">Training</Link>

            </Menu> */}
            <Header />

          </div>

          <Route exact path="/" component={Home} />
          <Route path="/training" component={Code} />


        </Router>
      </Fragment>
    );

  }
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

function Code() {
  return (
    <div className={"test"}>
      <TerminalJS name="Terminal" />
    </div>
  )
}

export default App;

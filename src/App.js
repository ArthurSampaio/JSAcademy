import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TerminalJS from './components/TerminalJS/TerminalJS'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {
  render() {
    return (
      <Router>

        <div className="App">
          <Header />

        </div>

        <Route exact path="/" component={Home} />
        <Route path="/training" component={Code} />


      </Router>

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

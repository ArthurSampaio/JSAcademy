import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TerminalJS from './components/TerminalJS/TerminalJS'


class App extends Component {
  render() {
    return (

      <div className="App">
        <div className={"test"}>
          <TerminalJS name="Terminal" />
        </div>
      </div>
    );
  }
}

export default App;

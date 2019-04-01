import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TerminalJS from './components/TerminalJS/TerminalJS'


class App extends Component {
  render() {
    return (
      <div className="App">
        <TerminalJS eval='2+2' />
      </div>
    );
  }
}

export default App;

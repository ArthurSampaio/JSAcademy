import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TerminalJS from './components/TerminalJS'


class App extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <TerminalJS />
      </div>
    );
  }
}

export default App;

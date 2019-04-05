import React, { useState, useEffect } from 'react';
import Terminal from 'terminal-in-react';
import brace from 'brace';
import PropTypes from "prop-types";

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import './styles.css';

import Button from '@material-ui/core/Button';


const TerminalJS = (props) => {

  const { func, name } = props
  const [input, setInput] = useState(func)
  const [output, setOuput] = useState(' ')
  const [accept, setAccept] = useState(false)

  function onChange(newValue) {
    setInput(newValue)
  }

  useEffect(() => {
    // Update the document title using the browser API
    console.log(accept)
  });

  function execute() {
    try {
      const b = [1, 2, 3, 4]
      const bb = [1, 2, 3, 4, 6]

      const evaluate = eval(input)
      console.log(evaluate)
      console.log([2, 4, 6, 8])
      setOuput(evaluate.toString())

      // if (evaluate.toString() === [2, 4, 6, 8].toString()) {
      //   setAccept(true)
      // } else {
      //   setAccept(false)
      // }
    } catch (e) {
      setOuput(e.message);
    }
  }

  function clear() {
    setOuput(' ')
    setAccept(false)

  }

  return (
    <div className={`terminal ${accept ? 'accept-true' : ''} `}>
      <header className={"title"}><h1>{' '} {name} </h1></header>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        name="terminal-editor"
        editorProps={{ $blockScrolling: true }}
        value={input}
      />
      <div className={"output-container"} >
        <div className={"buttons-output"}>
          <Button id="run" variant="contained" color="primary" onClick={execute}>
            Run
          </Button>
          <Button variant="contained" color="secondary" onClick={clear}>
            Clear
          </Button>
        </div>
        <div className={"console"}>
          <code>{output}</code>
        </div>
      </div>
    </div>
  );
}


export default TerminalJS;
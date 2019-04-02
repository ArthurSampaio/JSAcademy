import React, { useState, useEffect } from 'react';
import Terminal from 'terminal-in-react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import './styles.css';
import Button from '@material-ui/core/Button';
import { GiAstronautHelmet } from "react-icons/gi";
import { MdSend } from "react-icons/md";


const defaultValue =
  `function a () {
  
  const d = (x) => 2*x
  const b = [1,2,3,4]
  const e = b.map(item => d(item))
  return e.toString()
 
}
a()`
const TerminalJS = (props) => {

  const [input, setInput] = useState(defaultValue)
  const [output, setOuput] = useState(' ')


  function onChange(newValue) {
    setInput(newValue)
  }

  function updateInput(newValue) {
    console.log('change', newValue);
    setInput(newValue)
  }

  function evaluate(value) {
    console.log(value)
  }

  function execute() {
    const b = eval(input)
    console.log(b)
    setOuput(b)
  }

  function clear() {
    setOuput(' ')
  }


  return (
    <div className={"terminal"}>
      <header className={"title"}><h1><GiAstronautHelmet />{' '} TerminalName </h1></header>
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
            <MdSend />
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
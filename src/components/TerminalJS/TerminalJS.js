import React, { useState, useEffect } from 'react';
import Terminal from 'terminal-in-react';
import brace from 'brace';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import './styles.css';

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

import Button from "components/CustomButtons/Button.jsx";

const TerminalJS = (props) => {

  const { task } = props
  const [input, setInput] = useState(task.appraisedFunction)
  const [output, setOuput] = useState(' ')
  const [accept, setAccept] = useState(false)

  function onChange(newValue) {
    setInput(newValue)
  }

  useEffect(() => {
    setInput(task.appraisedFunction)

  }, [task]);


  function execute() {
    try {
      const b = [1, 2, 3, 4]
      const bb = [1, 2, 3, 4, 6]

      const evaluate = eval(input)
      console.log(this)
      console.log(input)
      console.log(evaluate)
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

  function runTests() {
    try {
      const b = [1, 2, 3, 4]
      const bb = [1, 2, 3, 4, 6]

      const evaluate = eval(input)
      const isAccept = evaluate.toString() === [2, 4, 6, 8].toString()
      setAccept(isAccept)

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
      <div>   <div className={"title"}><h1>{' '} {task.title} </h1></div>
        <div> <p>{task.description}</p></div>
      </div>

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

          <Button variant="contained" color="warning" onClick={runTests}>
            Execute Tests
          </Button>
          <Button variant="contained" color="danger" onClick={clear}>
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


export default withStyles(basicsStyle)(TerminalJS);

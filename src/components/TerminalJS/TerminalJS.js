import React from 'react';
import Terminal from 'terminal-in-react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import './styles.css';
import Button from '@material-ui/core/Button';
import { GiAstronautHelmet } from "react-icons/gi";


const TerminalJS = (props) => {

  function onChange(newValue) {
    console.log('change', newValue);
    evaluate(newValue)
  }

  function evaluate(value) {
    console.log(value)
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
        value={`function onLoad(editor) { console.log("i've loaded");}`}
      />
    </div>
  );
}

export default TerminalJS;
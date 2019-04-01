import React from 'react';
import Terminal from 'terminal-in-react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import './styles.css';
import Button from '@material-ui/core/Button';



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
      <div >
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={`function onLoad(editor) { console.log("i've loaded");}`}
        />
      </div>

      <Button color="primary" variant="contained" onClick={evaluate}>
        Run
      </Button>

      <div
      >
        <Terminal
          watchConsoleLogging
          hideTopBar
          allowTabs={false}
          color='white'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commands={{
            popup: () => alert('Terminal in React'),
            'js': (_) => {
              const b = _.slice(1).join()
              console.log(b)
              // eslint-disable-next-line 
              return eval(props.eval)
            }
          }}
          descriptions={{
            color: false, show: false, clear: false,
            alert: 'alert', popup: 'alert',
            'js': 'run a js snippet'
          }}
          shortcuts={{
            'darwin,win,linux': {
              'ctrl + a': 'echo whoo',
            },
          }}
          msg='Javascript Academy - JS Shell. See more in gihub.com/ArthurSampaio/JSAcademy'
        />
      </div>
    </div>
  );

}

export default TerminalJS;
import React from 'react';
import Terminal from 'terminal-in-react';

const TerminalJS = (props) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Terminal
        hideTopBar
        color='white'
        backgroundColor='black'
        barColor='black'
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{
          'open-google': () => window.open('https://www.google.com/', '_blank'),
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
          'open-google': 'opens google.com',
          alert: 'alert', popup: 'alert',
          'js': 'run a js snippet'
        }}
        msg='Javascript Academy - JS Shell. See more in gihub.com/ArthurSampaio/JSAcademy'
      />
    </div>
  );

}

export default TerminalJS;
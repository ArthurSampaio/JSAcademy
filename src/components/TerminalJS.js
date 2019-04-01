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
        color='green'
        backgroundColor='black'
        barColor='black'
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{
          'open-google': () => window.open('https://www.google.com/', '_blank'),
          showmsg: 'aaa',
          popup: () => alert('Terminal in React'),
          'js': (_) => {
            const b = _.slice(1).join()
            console.log(b)
            // eslint-disable-next-line 
            return eval(b)
          }
        }}
        descriptions={{
          color: false, show: false, clear: false,
          'open-google': 'opens google.com',
          showmsg: 'shows a message',
          alert: 'alert', popup: 'alert',
          'js': 'run a js snippet'
        }}
        msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
      />
    </div>
  );

}

export default TerminalJS;
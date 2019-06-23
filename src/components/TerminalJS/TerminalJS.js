import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import WorkerService from '../../services/WorkerService'
import WebWorker from '../../services/WorkerSetup'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import './styles.css'

import basicsStyle from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx'

import Button from 'components/CustomButtons/Button.jsx'

const TerminalJS = props => {
  const { task, showButtonTest, accept } = props
  const [input, setInput] = useState(task.appraisedFunction)
  const [output, setOuput] = useState(' ')
  const [answer, setAnswer] = useState({})
  const [worker, setWorker] = useState(
    new WebWorker(WorkerService.codeToRun(task.appraisedFunction))
  )
  const [stackOutput, setStackOutput] = useState([])

  const functionRegex = /function\s*([A-z0-9]+)?\s*\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)\s*\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/g

  function onChange(newValue) {
    setInput(newValue)
    setWorker(new WebWorker(WorkerService.codeToRun(newValue)))
  }

  useEffect(() => {
    const defaultAnswer = {
      exercise: task._id,
      code: '',
      attempts: 0,
      startAt: new Date(),
      endAt: 0,
      time: 0,
    }
    new WebWorker(WorkerService.codeToRun(task.appraisedFunction))
    setAnswer(defaultAnswer)
    setInput(task.appraisedFunction)
    setWorker()
    setOuput(' ')
  }, [task])

  function execute() {
    worker.postMessage('run code')
    console.log('começou', Date.now)
    setTimeout(function() {
      console.log('terminou')
      worker.terminate()
    }, 3000)
    worker.addEventListener('message', event => {
      console.log('eventaaa', event)
      stackOutput.push(event.data)
      console.log('stack', stackOutput)

      setStackOutput(stackOutput)
      setOuput(
        stackOutput.reduce((acc, val) => {
          return acc + `> ${val} <br> `
        }, '')
      )
    })
    // try {
    //   const evaluate = evaluateCode()
    //   console.log('evaluate', evaluate)
    //   setOuput((evaluate && JSON.stringify(evaluate)) || '')
    // } catch (e) {
    //   console.log('ERRROOO', e)
    //   setOuput(e.message)
    // }
  }

  function codeToRun(code) {
    return `
    () => {
      console.log("AAA")
      this.addEventListener('message', e => {
        try {
          if (!e) return
          const geval = eval
          const evaluate = geval(${code.toString()})()
          postMessage(evaluate)

        } catch (e) {
          postMessage(e)

        }
      })
    }
    `
  }

  function evaluateCode() {
    try {
      const geval = eval
      const evaluate = geval(input)
      return evaluate
    } catch (e) {
      throw new Error(e.message)
    }
  }

  function executeFunctionFromCode() {
    const func = input.match(functionRegex)
    //const evaluate = eval(`(${func})`)
    const evaluate = runCodeWithFunction(func)
    return evaluate
  }

  function runCodeWithFunction(code) {
    return Function('"use strict";return (' + code + ')')()
  }

  function runTests() {
    try {
      const evaluate = executeFunctionFromCode()
      let acc = true
      task.testCases.map(item => {
        const inp = JSON.parse(item.input)
        const out = JSON.parse(item.output)
        if (evaluate(inp).toString() !== out.toString()) {
          acc = false
        }
      })
      const ans = updateAnswer(acc)
      setAnswer(ans)
      onRunTest(acc, ans)
      // const code = input.match(functionRegex)
      // setWorker(new WebWorker(WorkerService.codeToRunTests(code, task)))
      // console.log('works', worker)
      // worker.postMessage('run code')
      // console.log('começou', Date.now)
      // setTimeout(function() {
      //   console.log('terminou')
      //   worker.terminate()
      // }, 3000)
      // worker.addEventListener('message', event => {
      //   console.log('eventaaa', event)

      // })
    } catch (e) {
      setAnswer(updateAnswer(false))
      setOuput(e.message)
    }
  }

  function updateAnswer(acc) {
    const ans = acc
      ? {
          ...answer,
          code: input,
          attempts: answer.attempts + 1,
          endAt: new Date(),
        }
      : {
          ...answer,
          attempts: answer.attempts + 1,
        }

    return ans
  }

  function clear() {
    setOuput(' ')
    onClear()
    setStackOutput([])
  }

  function onClear() {
    props.onClear()
  }

  function metricsExercise(ans) {
    return {
      exercise: ans.exercise,
      code: ans.code,
      attempts: ans.attempts,
      time: ans.endAt - ans.startAt,
    }
  }

  function onRunTest(acc, ans) {
    props.onRun(acc && metricsExercise(ans))
  }

  function renderTerminal() {
    return (
      <div className={`terminal `}>
        <div>
          {' '}
          <div className={'title'}>
            <h1> {task.title} </h1>
          </div>
          <div>
            {' '}
            <p>{task.description}</p>
          </div>
        </div>

        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={onChange}
          name="terminal-editor"
          editorProps={{ $blockScrolling: true }}
          value={input}
          readOnly={accept}
        />
        <div className={'output-container'}>
          <div className={'buttons-output'}>
            <Button
              id="run"
              variant="contained"
              color="primary"
              onClick={execute}
            >
              Run
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={runTests}
              disabled={showButtonTest || accept}
            >
              Execute Tests
            </Button>
            <Button variant="contained" color="danger" onClick={clear}>
              Clear
            </Button>
          </div>
          <div className={'console'}>
            <code className={'styleOverflow'}>
              {stackOutput.map((item, index) => (
                <li key={index}>{item.toString()}</li>
              ))}
            </code>
          </div>
        </div>
      </div>
    )
  }

  return renderTerminal()
}

export default withStyles(basicsStyle)(TerminalJS)

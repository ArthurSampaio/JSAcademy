import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import './styles.css'

import basicsStyle from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx'

import Button from 'components/CustomButtons/Button.jsx'

const TerminalJS = props => {
  const { task, showButtonTest } = props
  const [input, setInput] = useState(task.appraisedFunction)
  const [output, setOuput] = useState(' ')
  const [answer, setAnswer] = useState({})

  const functionRegex = /function\s*([A-z0-9]+)?\s*\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)\s*\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/g

  function onChange(newValue) {
    setInput(newValue)
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
    setAnswer(defaultAnswer)
    setInput(task.appraisedFunction)
    setOuput(' ')
  }, [task])

  function execute() {
    try {
      const evaluate = evaluateCode()
      setOuput((evaluate && JSON.stringify(evaluate)) || '')
    } catch (e) {
      setOuput(e.message)
    }
  }

  function evaluateCode() {
    try {
      const evaluate = eval(input)
      return evaluate
    } catch (e) {
      return e.message
    }
  }

  function executeFunctionFromCode() {
    const func = input.match(functionRegex)
    const evaluate = eval(`(${func})`)
    return evaluate
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
      console.log('>>>>>>', ans)
      setAnswer(ans)
      onRunTest(acc, ans)
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
            disabled={showButtonTest}
          >
            Execute Tests
          </Button>
          <Button variant="contained" color="danger" onClick={clear}>
            Clear
          </Button>
        </div>
        <div className={'console'}>
          <code>{output}</code>
        </div>
      </div>
    </div>
  )
}

export default withStyles(basicsStyle)(TerminalJS)

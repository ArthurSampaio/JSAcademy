const WorkerService = {
  codeToRunTests: function(code, data) {
    return `
    () => {
      console.log("AAA")
      this.addEventListener('message', e => {
        if (!e) return
          const geval = eval
          const evaluate = Function('"use strict";return (' + ${code} + ')')()
          let acc = true
          const task = JSON.parse(JSON.stringify(${data}))
          task.testCases.map(item => {
            console.log(item)
            const inp = JSON.parse(item.input)
            const out = JSON.parse(item.output)
            if (evaluate(inp).toString() !== out.toString()) {
              acc = false
            }
          })
          postMessage(acc)
      })
    }
    `
  },
  codeToRun: function(code) {
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
  },
}

export default WorkerService

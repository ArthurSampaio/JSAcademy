const WorkerService = {
  codeToRun: function(dataCode) {
    const code = this.prepareCode(dataCode)
    return `
    () => {
      this.addEventListener('message', e => {
        try {
          if (!e) return
          const geval = eval
          const evaluate = geval(${code.toString()})()
          postMessage(evaluate.toString())

        } catch (e) {
          postMessage(e)

        }
      })
    }
    `
  },

  prepareCode: function(dataCode) {
    const code = this.replaceCode(dataCode)
    return `
      (() => {
        ${code}
      })
    `
  },
  replaceCode: function(code) {
    return code && code.replace(/console.log/g, 'postMessage')
  },
}

export default WorkerService

export default class WebWorker {
  constructor(worker) {
    try {
      const code = worker.toString()
      const blob = new Blob(['(' + code + ')()'])
      return new Worker(URL.createObjectURL(blob))
    } catch (e) {
      console.log('c', e)
    }
  }
}

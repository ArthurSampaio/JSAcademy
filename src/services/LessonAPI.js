import axios from 'axios'

const LessonAPI = {
  getLessonById: function(id) {
    return axios(`/api/lesson/${id}`).then(res => {
      return res.data
    })
  },
  sendAnswer: function(metric) {
    return axios.post(`/api/lesson/send`, metric).then(res => {
      return res.data
    })
  },
  getLessonMetrics: function(metricId) {
    return axios(`/api/lesson/metrics/${metricId}`).then(res => {
      return res.data
    })
  },
}

export default LessonAPI

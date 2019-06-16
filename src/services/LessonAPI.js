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
  save: function(lesson) {
    return axios.post(`/api/lesson/`, lesson).then(res => {
      return res.data
    })
  },
  getLessonsForUser: function() {
    return axios(`/api/lesson/user`).then(res => {
      return res.data
    })
  },
}

export default LessonAPI

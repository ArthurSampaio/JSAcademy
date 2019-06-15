import axios from 'axios'

const ExercisesAPI = {
  getExercisesById: function(id) {
    return axios(`/api/exercise/${id}`).then(res => {
      return res.data
    })
  },
  getExercises: function() {
    return axios(`/api/exercise`).then(res => {
      return res.data
    })
  },
}

export default ExercisesAPI

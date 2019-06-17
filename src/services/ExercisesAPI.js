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
  create: function(exercise) {
    return axios
      .post('/api/exercise', exercise)
      .then(res => {
        return res.data
      })
      .catch(function(error) {
        console.log(error)
        throw new Error('Não foi possível adicionar o exercício')
      })
  },
}

export default ExercisesAPI

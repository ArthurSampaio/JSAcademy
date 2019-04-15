import axios from 'axios';



const ExercisesAPI = {

  getExercisesById: function (id) {
    return axios(`/api/exercise/${id}`).then(res => {
      return res.data;
    });
  }

}


export default ExercisesAPI;
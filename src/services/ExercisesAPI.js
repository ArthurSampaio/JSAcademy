import axios from 'axios';



const ExercisesAPI = {

  getExercisesById: function (id) {
    return axios('/api/exercise').then(res => {
      return res.data;
    });
  }

}


export default ExercisesAPI;
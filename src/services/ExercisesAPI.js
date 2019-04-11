import axios from 'axios';



const ExercisesAPI = {

  getExercisesById: function (id) {
    return axios('/api/exercise').then(ex => console.log(ex));
  }

}


export default ExercisesAPI;
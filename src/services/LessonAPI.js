import axios from 'axios';



const LessonAPI = {

  getLessonById: function (id) {
    return axios(`/api/lesson/${id}`).then(res => {
      return res.data;
    });
  }

}


export default LessonAPI;
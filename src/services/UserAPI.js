import axios from 'axios'

const UserAPI = {
  createUser: function(user) {
    return axios.post('/api/user', user).then(res => {
      return res.data
    })
  },
  getUser: function(userId) {
    return axios(`api/user/${userId}`).then(res => {
      return res.data
    })
  },
}

export default UserAPI

import axios from 'axios'

const UserAPI = {
  createUser: function(user) {
    return axios.post('/api/user', user).then(res => {
      return res.data
    })
  },
}

export default UserAPI

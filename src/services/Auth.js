import { BehaviorSubject } from 'rxjs'
import axios from 'axios'
import decode from 'jwt-decode'

const currentUser = 'currentUser'
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem(currentUser))
)

export const AuthService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value
  },
  get currentUserDecodeValue() {
    return (
      currentUserSubject.value &&
      currentUserSubject.value.token &&
      decode(currentUserSubject.value.token)
    )
  },
}

function login(user) {
  return axios.post('api/token', user).then(res => {
    localStorage.setItem(currentUser, JSON.stringify(res.data))
    currentUserSubject.next(res.data)
    return user
  })
}

function logout() {
  localStorage.removeItem(currentUser)
  currentUserSubject.next(null)
}

import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Skill from 'views/Skill/Skill'
import LandingPage from 'views/LandingPage/LandingPage.jsx'
import ProfilePage from 'views/ProfilePage/ProfilePage.jsx'
import LoginPage from 'views/LoginPage/LoginPage.jsx'
import TerminalJS from 'components/TerminalJS/TerminalJS'
import RegisterPage from 'views/RegisterPage/RegisterPage'
import { createBrowserHistory } from 'history'

var hist = createBrowserHistory()

const App = props => {
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      console.log('>>>>>>>>>>', config)
      return config
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  function TerminalTest() {
    const testValue = `function a (b) {
            const d = (x) => 2*x
            const e = b.map(item => d(item))
            return e
        
        }
        a(b)`
    return <TerminalJS name="Terminal" func={testValue} />
  }
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/test" component={TerminalTest} />
        <Route path="/skill/:lessonId" component={Skill} />
        <Route path="/register" component={RegisterPage} />

        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  )
}

export default App

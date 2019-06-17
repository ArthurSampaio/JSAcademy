import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Skill from 'views/Skill/Skill'
import LandingPage from 'views/LandingPage/LandingPage.jsx'
import ProfilePage from 'views/ProfilePage/ProfilePage.jsx'
import LoginPage from 'views/LoginPage/LoginPage.jsx'
import MetricLesson from 'views/MetricLesson/MetricLesson'
import MyAnswers from 'views/MyAnswers/MyAnswers'
import TerminalJS from 'components/TerminalJS/TerminalJS'
import RegisterPage from 'views/RegisterPage/RegisterPage'
import PrivateRoute from 'components/PrivateRouter/PrivateRouter'
import ChooseLesson from 'views/ChooseLesson/ChooseLesson'
import CreateLesson from 'views/CreateLesson/CreateLesson'
import LessonDetails from 'views/LessonDetails/LessonDetails'

import MyLessons from 'views/MyLessons/MyLessons'
import { createBrowserHistory } from 'history'
import { AuthService } from './../../services/Auth'

var hist = createBrowserHistory()

const App = props => {
  axios.interceptors.request.use(
    function(config) {
      if (AuthService.currentUserValue) {
        const headers = {
          ...config.headers,
          Authorization: 'Bearer ' + AuthService.currentUserValue.token,
        }
        config.headers = headers
      }

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
    return <TerminalJS name="Terminal" task={testValue} />
  }
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/test" component={TerminalTest} />
        <Route path="/skill/:lessonId" component={Skill} />
        <Route path="/what-to-do-today" component={RegisterPage} />
        <Route path="/my-answers/user" component={MyAnswers} />
        <Route path="/answers/:metricId" component={MetricLesson} />
        <Route path="/lesson-details/:lessonId" component={LessonDetails} />
        <Route path="/choose-lesson" component={ChooseLesson} />
        <PrivateRoute path="/create-lesson" component={CreateLesson} />
        <PrivateRoute path="/my-lessons" component={MyLessons} />

        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  )
}

export default App

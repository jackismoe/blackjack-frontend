import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import appReducer from './appReducer'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Game from './components/Game'
import Nav from './components/Nav'
import Login from './components/Login'
import Footer from './components/Footer'
import Signup from './components/Signup'
import LoadGame from './components/LoadGame'
import Menu from './components/Menu'

const BASE_URL = 'http://black-jack-backend.herokuapp.com'
const store = createStore(appReducer, applyMiddleware(thunk))

export default BASE_URL

ReactDOM.render(
  <Provider store={store}>
    <Nav/>
    <Router>
      <Route path='/' component={Menu}/>
      <Route exact path='/' component={Login}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/loading' component={LoadGame}/>
      <Route exact path='/play' component={Game}/>
    </Router>
    <Footer/>
  </Provider>,
  document.getElementById('root')
);
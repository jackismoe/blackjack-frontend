import React from 'react'
import BASE_URL from '../index'
import {Link} from 'react-router-dom'
import Nav from './Nav'

export default class Login extends React.Component {

  handleSubmit = event => {
    event.preventDefault()

    const findPlayer = (player) => {
      this.props.history.push('/loading')
      fetch(`${BASE_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player: player
        })    
      })
      .then(response => response.json())
      .then(jsonResponse => {
        // deal with player
        console.log(jsonResponse)
        sessionStorage.setItem('userId', jsonResponse.id)
        sessionStorage.setItem('username', jsonResponse.username)
      })
      .catch(error => {
        document.querySelector('.login').reset()
        alert('No player found :(')
      })
    }

    const player = {
      name: event.target[0].value,
      password: event.target[1].value
    }

    findPlayer(player)
  }


  render() {
    return (
      <>
        <form className='login' onSubmit={this.handleSubmit}>
          <label>Username or Email</label><br/>
          <input type='text'/><br/>
          <label>Password</label><br/>
          <input type='password'/><br/>
          <input class='submit' type='submit'/>
          <br/>
          <br/>
          <Link to='/signup' onClick={Nav.closeMenu}>Sign Up</Link>
        </form>
      </>
    )
  }
}
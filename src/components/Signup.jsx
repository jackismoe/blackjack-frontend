import React from 'react'
import BASE_URL from '../index'
import {Link} from 'react-router-dom'

export default class Login extends React.Component {

  handleSubmit = event => {
    event.preventDefault()
    if (event.target[1].value == event.target[2].value) {
      const createPlayer = (player) => {
        fetch(`${BASE_URL}/users`, {
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
          sessionStorage.setItem('userId', jsonResponse.id)
          sessionStorage.setItem('username', jsonResponse.username)
          this.props.history.push('/loading')
        })
      }
      const player = {
        name: event.target[0].value,
        password: event.target[1].value
      }
      createPlayer(player)
    } else {
      document.querySelector('.signup').reset()
      alert('Check your inputs :)')
    }

  }

  render() {
    return (
      <>
        <form className='signup' onSubmit={this.handleSubmit}>
          <label>Username or Email</label><br/>
          <input type='text'/><br/>
          <label>Password</label><br/>
          <input type='password'/><br/>
          <label>Confirm Password</label><br/>
          <input type='password'/><br/>
          <input type='submit'/>
          <br/>
          <br/>
          <Link to='/'>Log In</Link>
        </form>
      </>
    )
  }
}
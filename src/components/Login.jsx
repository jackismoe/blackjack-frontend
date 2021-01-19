import React from 'react'
import BASE_URL from '../index'
import {Link} from 'react-router-dom'

export default class Login extends React.Component {

  handleSubmit = event => {
    event.preventDefault()
    console.log(event.target[0].value)
    console.log(event.target[1].value)

    const player = {
      name: event.target[0].value,
      password: event.target[1].value
    }

    const findPlayer = () => {
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
      })
      .catch(error => {
        document.querySelector('.login').reset()
        alert('No player found :(')
      })
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
          <input type='submit'/>
          <br/>
          <br/>
          <Link to='/signup'>Sign Up</Link>
        </form>
      </>
    )
  }
}
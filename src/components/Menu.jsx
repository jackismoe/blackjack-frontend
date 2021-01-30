import React from 'react'
import {connect} from 'react-redux'
import logout from '../actions/logout'



class Menu extends React.Component {

  logout = (user) => {
    sessionStorage.clear()
    this.props.logout(user)
    this.props.history.push('/')
    document.querySelector('.menu').style.visibility = 'hidden'
  }

  render() {
    return (
      <div className='menu'>
          <p><a onClick={() => this.logout(sessionStorage.userId)}>logout</a></p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (user) => dispatch(logout(user))
  }
}

export default connect(null, mapDispatchToProps)(Menu)
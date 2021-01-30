import React from 'react'
import { Sling as Hamburger } from 'hamburger-react'

export default class Nav extends React.Component {
  static menuOpen = false
  handleMenu = () => {
    const menu = document.querySelector('.menu')
    if (sessionStorage.userId) {
      if (Nav.menuOpen == true) {
        menu.style.visibility = 'hidden'
        Nav.menuOpen = false
      } else if (Nav.menuOpen == false) {
        menu.style.visibility = 'visible'
        Nav.menuOpen = true
      }
    }
  }

  static closeMenu = () => {
    const menu = document.querySelector('.menu')
    menu.style.visibility = 'hidden'
  }
  
  render() {
    return (
      <div className='navBar'>
        <div onClick={this.handleMenu} className='hamburger'><Hamburger/></div>
        <div className='title'><h3>reactJack</h3></div>
        <div className='userIcon'>•</div>
      </div>
    )
  }
}
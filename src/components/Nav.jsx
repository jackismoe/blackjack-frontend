import React from 'react'
import { Sling as Hamburger } from 'hamburger-react'

export default class Nav extends React.Component {
  static showMenu = () => {
    const game = document.querySelector('.game')
    const login = document.querySelector('.login')
    const signup = document.querySelector('.signup')
    const menu = document.querySelector('.menu')
    if (game) {
      if (game.style.left == '25%') {
      game.style.left = '0'
      menu.style.left = '-22%'
      } else if (game.style.left !== '25%'){
        game.style.left = "25%"
        menu.style.left = '2%'
      }
    } else if (login) {
      if (login.style.left == '25%') {
        login.style.left = '0'
        menu.style.left = '-22%'
      } else if (login.style.left !== '25%'){
        login.style.left = "25%"
        menu.style.left = '2%'
      }
    } else if (signup) {
      if (signup.style.left == '25%') {
        signup.style.left = '0'
        menu.style.left = '-22%'
      } else if (signup.style.left !== '25%'){
        signup.style.left = "25%"
        menu.style.left = '2%'
      }
    }
  }

  static hideMenu = () => {
    document.querySelector('.hamburger-react').click()  
  }
  
  render() {
    return (
      <div className='navBar'>
        <div onClick={Nav.showMenu}><Hamburger/></div>
        <div><h3>reactJack</h3></div>
        <div className='userIcon'>•</div>
      </div>
    )
  }
}
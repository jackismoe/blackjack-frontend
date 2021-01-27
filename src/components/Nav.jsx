import React from 'react'
import { Sling as Hamburger } from 'hamburger-react'

export default class Nav extends React.Component {
  showMenu = () => {
    const game = document.querySelector('.game')
    const menu = document.querySelector('.menu')
    if (game.style.left == '25%') {
      game.style.left = '0'
      menu.style.left = '-22%'
    } else if (game.style.left !== '25%'){
      game.style.left = "25%"
      menu.style.left = '2%'
    }
  }
  render() {
    return (
      <div className='navBar'>
        <div onClick={this.showMenu}><Hamburger/></div>
        <div><h3>reactJack</h3></div>
        <div className='userIcon'>•</div>
      </div>
    )
  }
}
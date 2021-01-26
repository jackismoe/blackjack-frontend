import React from 'react'
import { Sling as Hamburger } from 'hamburger-react'

export default class Nav extends React.Component {
  render() {
    return (
      <div className='navBar'>
        <div><Hamburger/></div>
        <div><h3>reactJack</h3></div>
        <div className='userIcon'>•</div>
      </div>
    )
  }
}
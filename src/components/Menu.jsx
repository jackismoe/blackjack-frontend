import React from 'react'

export default class Menu extends React.Component {
  render() {
    return (
      <div className='menu'>
        <ul>
          <li><a href='#'>logout</a></li>
          <li><a href='#'>see winning streaks</a></li>
        </ul>
      </div>
    )
  }
}
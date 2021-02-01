import React from 'react'

export default class Player extends React.Component {
  render() {
    return (
      <div className='player'>
        {/* <div className='availableCash'><h1>${this.props.playerCash}</h1></div> */}
        <div className='playerCardOneStart'>

        </div>
        <div className='playerCardTwoStart'>

        </div>
        <div className='dealtCards'>
          
        </div>
        <div className='playerRecord'>
          Wins: <h1>{this.props.playerWins}</h1>
          Losses: <h1>{this.props.playerLosses}</h1>
        </div>
        <h1 className='playerName'>{this.props.playerName}</h1>
        </div>
    )
  }
}
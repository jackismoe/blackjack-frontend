import React from 'react'

export default class Dealer extends React.Component {
  render() {
    return (
      <div className='dealer'>
          <button className='resetDealer' onClick={this.props.resetDealer}>Reset Dealer</button>
          <div className='dealerCardOneStart'>

          </div>
          <div className='dealerCardTwoStart'>

          </div>
          <div className='dealtCards'>
            
          </div>
          <div className='dealerRecord'>
            Wins: <h1>{this.props.dealerWins}</h1>
            Losses: <h1>{this.props.dealerLosses}</h1>
          </div>
          <h1 className='dealerName'>Dealer</h1>        
        </div>
    )
  }
}
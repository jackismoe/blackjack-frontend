import React from 'react'
import {connect} from 'react-redux'

class Game extends React.Component {
  constructor() {
    super()
  }
  
  firstDeal = () => {
    const shuffleDeck = () => {
      let shuffledDeck = this.props.deck.filter(card => card.dealt == false)
      console.log(shuffledDeck)
    }

    shuffleDeck()
  }

  componentDidMount() {
    debugger
  }


  render() {

    return (
      <div className='game'>
        <div className='player'>
          <div className='playerCardOne'>

          </div>
          <div className='playerCardTwo'>

          </div>
          <div className='dealtCards'>
            
          </div>
        </div>
        <div className='dealer'>
          <div className='dealerCardOne'>

          </div>
          <div className='dealerCardTwo'>

          </div>
          <div className='dealtCards'>
            
          </div>
        </div>
        <div className='bets'>
          <div className='userBet'>
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
              <option>500</option>
            </select>            
          </div>
          <div className='dealerBet'>
            <select>
              
            </select>
          </div>
        </div>
        <button className='deal' onClick={() => this.firstDeal()}>Deal</button>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    player: state.player,
    deck: state.deck
  }
}

export default connect(mapStateToProps, null)(Game)
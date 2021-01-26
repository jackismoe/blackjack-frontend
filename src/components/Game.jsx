import React from 'react'
import {connect} from 'react-redux'

class Game extends React.Component {
  startGame = () => {
    let sortedDeck
    let cardsInDeck
    let playerTotal
    let dealerTotal
    const dealerHand = []
    const playerHand = []

    const sortDeck = () => {  
      sortedDeck = this.props.deck.filter(card => card.dealt == false)
      cardsInDeck = sortedDeck.length
    }

    const resetDeck = () => {
      this.props.deck.map(card => card.dealt = false)
    }

    // first shuffle   
    sortDeck()

    const dealFirstTwo = (hand) => {
      const index = Math.floor(Math.random() * cardsInDeck)
      const card = sortedDeck.find((card, idx) => idx == index)
      card.dealt = true
      sortDeck()
      hand.push(card)

      if (hand.length < 2) {
        dealFirstTwo(hand)
      }
    }

    const dealOne = (hand) => {
      const index = Math.floor(Math.random() * cardsInDeck)
      const card = sortedDeck.find((card, idx) => idx == index)
      card.dealt = true
      sortDeck()
      hand.push(card)
    }

    const getTotal = (hand) => {
      let workingTotal = 0
      for (let card of hand) {
        workingTotal += card.value
      }
      return workingTotal
    }

    const playerTurn = () => {
      if (playerTotal > 21) {
        alert(`you've busted`)
        dealersTurn(dealerTotal, dealerHand)
      } else {
        const playerHit = window.confirm(`your total right now is ${playerTotal}. Would you like to hit?`)
        if (playerHit) {
          dealOne(playerHand)
          playerTotal = getTotal(playerHand)
          playerTurn()
        } else {
          dealersTurn(dealerTotal, dealerHand)
        }
      }
    }

    const dealersTurn = (total, hand) => {
      if (playerTotal > 21) {
        seeWhoWon()
      } else {
        if (total < 17) {
          dealOne(hand)
          dealerTotal = getTotal(dealerHand)
          dealersTurn(dealerTotal, hand)
        } else if (total > 21) {
          alert('dealer has busted')
          seeWhoWon()
        } else {
          seeWhoWon()
        }
      }
    }

    const seeWhoWon = () => {
      alert(`playerTotal is ${playerTotal} and dealer total is ${dealerTotal}`)
      resetDeck()
    }

    dealFirstTwo(playerHand)
    dealFirstTwo(dealerHand)
    playerTotal = getTotal(playerHand)
    dealerTotal = getTotal(dealerHand)
    playerTurn()
    


    // show cards on board
    // const playerCardOneDOM = document.querySelector('.playerCardOne')
    // const playerCardTwoDOM = document.querySelector('.playerCardTwo')
    // const dealerCardOneDOM = document.querySelector('.dealerCardOne')

    // playerCardOneDOM.style.backgroundImage = `url(../images/${playerHand[0].name}.png)`
    // playerCardTwoDOM.style.backgroundImage = `url(../images/${playerHand[1].name}.png)`
    // dealerCardOneDOM.style.backgroundImage = `url(../images/${dealerHand[0].name}.png)`
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
        <button className='deal' onClick={() => this.startGame()}>Deal</button>
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
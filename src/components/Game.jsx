import React from 'react'
import {connect} from 'react-redux'

class Game extends React.Component {

  startGame = () => {
    const spade = '♠'
    const club = '♣'
    const heart = '♥'
    const diamond = '♦'

    const playerSlotOne = document.querySelector('.playerCardOneStart')
    const playerSlotTwo = document.querySelector('.playerCardTwoStart')
    const dealerSlotOne = document.querySelector('.dealerCardOneStart')
    const dealerSlotTwo = document.querySelector('.dealerCardTwoStart')

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
      playerSlotOne.className = 'playerCardOneStart'
      playerSlotTwo.className = 'playerCardTwoStart'
      dealerSlotOne.className = 'dealerCardOneStart'
      dealerSlotTwo.className = 'dealerCardTwoStart'
      playerSlotOne.innerHTML = ''
      playerSlotTwo.innerHTML = ''
      dealerSlotOne.innerHTML = ''
      dealerSlotTwo.innerHTML = ''
    }
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

    const getCardSuitAndValue = (card) => {
      let cardSuit
      let cardValue

      let cardDisplay = []

      if (card.name.includes('spade')) {
        cardSuit = spade
      } else if ( card.name.includes('heart')) {
        cardSuit = heart
      } else if (card.name.includes('diamond')) {
        cardSuit = diamond
      } else if (card.name.includes('club')) {
        cardSuit = club
      }

      if (card.name.includes('Jack')) {
        cardValue = 'J'
      } else if (card.name.includes('Queen')) {
        cardValue = 'Q'
      } else if (card.name.includes('King')) {
        cardValue = 'K'
      } else if (card.name.includes('Ace')) {
        cardValue = 'A'
      } else {
        cardValue = card.value
      }
      cardDisplay.push(cardSuit)
      cardDisplay.push(cardValue)

      return cardDisplay
    }

    const showPlayerCards = (hand) => {
      const cardOne = hand[0]
      const cardTwo = hand[1]   
      
      const cardOneValues = getCardSuitAndValue(cardOne)
      const cardTwoValues = getCardSuitAndValue(cardTwo)

      const cardOneSuit = cardOneValues[0]
      const cardOneValue = cardOneValues[1]

      const cardTwoSuit = cardTwoValues[0]
      const cardTwoValue = cardTwoValues[1]

      playerSlotOne.className = 'playerCardOne'
      playerSlotTwo.className = 'playerCardTwo'
      playerSlotOne.innerHTML = `<h1>${cardOneSuit}</h1>${cardOneValue}</h1>`
      playerSlotTwo.innerHTML = `<h1>${cardTwoSuit}</h1>${cardTwoValue}</h1>`
    }

    const showFirstDealerCard = (hand) => {
      const cardOne = hand[0]
      
      const cardOneValues = getCardSuitAndValue(cardOne)

      const cardOneSuit = cardOneValues[0]
      const cardOneValue = cardOneValues[1]

      dealerSlotOne.className = 'dealerCardOne'
      dealerSlotOne.innerHTML = `<h1>${cardOneSuit}</h1>${cardOneValue}</h1>`
    }

    const showSecondDealerCard = (hand) => {
      const cardTwo = hand[1]
      
      const cardTwoValues = getCardSuitAndValue(cardTwo)

      const cardTwoSuit = cardTwoValues[0]
      const cardTwoValue = cardTwoValues[1]

      dealerSlotTwo.className = 'dealerCardTwo'
      dealerSlotTwo.innerHTML = `<h1>${cardTwoSuit}</h1>${cardTwoValue}</h1>`
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
      let winner

      if ((playerTotal > dealerTotal) && (playerTotal <= 21) || (dealerTotal > 21)) {
        winner = 'player'
      } else if ((dealerTotal > playerTotal) && (dealerTotal <= 21) || (playerTotal > 21)) {
        winner = 'dealer'
      }
      showSecondDealerCard(dealerHand)
      window.setTimeout(() => {
        alert(`playerTotal is ${playerTotal}.\ndealertotal is ${dealerTotal}.\n${winner} has won.`)
      }, 500)
      window.setTimeout(() => {
        resetDeck()
      }, 2000)
    }

    sortDeck()
    dealFirstTwo(playerHand)
    dealFirstTwo(dealerHand)
    playerTotal = getTotal(playerHand)
    dealerTotal = getTotal(dealerHand)
    showPlayerCards(playerHand)
    showFirstDealerCard(dealerHand)
    window.setTimeout(() => {
      playerTurn()
    }, 1500)
  }

  render() {
    return (
      <div className='game'>
        <div className='player'>
          <div className='playerCardOneStart'>

          </div>
          <div className='playerCardTwoStart'>

          </div>
          <div className='dealtCards'>
            
          </div>
        </div>
        <div className='dealer'>
          <div className='dealerCardOneStart'>

          </div>
          <div className='dealerCardTwoStart'>

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
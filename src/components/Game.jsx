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
    const playerCardsDOM = document.querySelector('.player .dealtCards')
    const dealerCardsDOM = document.querySelector('.dealer .dealtCards')



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

    const pickUpPlayerCards = () => {
      let dealtCards = document.querySelectorAll('.player .dealt')
      for (let card of dealtCards) {
        card.remove()
      }
    }
    const pickUpDealerCards = () => {
      let dealtCards = document.querySelectorAll('.dealer .dealt')
      for (let card of dealtCards) {
        card.remove()
      }
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

      pickUpPlayerCards()
      pickUpDealerCards()
      document.querySelector('.deal').style.visibility = 'visible'
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

    const showTertiaryPlayerCards = (desired) => {
      let handCopy = Array.from(desired)
      handCopy.splice(0, 2)
      pickUpPlayerCards()
      for (let card of handCopy) {
        let cardSuitAndValue = getCardSuitAndValue(card)
        let cardDiv = document.createElement('div')
        cardDiv.className = 'dealt'
        cardDiv.innerHTML = `<h1>${cardSuitAndValue[0]} ${cardSuitAndValue[1]}</h1>`
        playerCardsDOM.appendChild(cardDiv)
      }
    }

    const showTertiaryDealerCards = (desired) => {
      let handCopy = Array.from(desired)
      handCopy.splice(0, 2)
      pickUpDealerCards()
      for (let card of handCopy) {
        let cardSuitAndValue = getCardSuitAndValue(card)
        let cardDiv = document.createElement('div')
        cardDiv.className = 'dealt'
        cardDiv.innerHTML = `<h1>${cardSuitAndValue[0]} ${cardSuitAndValue[1]}</h1>`
        dealerCardsDOM.appendChild(cardDiv)
      }
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
          showTertiaryPlayerCards(playerHand)
          
          setTimeout(() => {
            playerTurn()
          }, 500)
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
          showTertiaryDealerCards(dealerHand)
          setTimeout(dealersTurn(dealerTotal, hand),900)
        } else if (total > 21) {
          seeWhoWon()
          setTimeout(alert('dealer has busted'), 900)
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

    document.querySelector('.deal').style.visibility = 'hidden'
    sortDeck()
    dealFirstTwo(playerHand)
    dealFirstTwo(dealerHand)
    playerTotal = getTotal(playerHand)
    dealerTotal = getTotal(dealerHand)
    showPlayerCards(playerHand)
    showFirstDealerCard(dealerHand)
    window.setTimeout(() => {
      playerTurn()
    }, 700)
  }

  render() {
    return (
      <div className='game'>
        <div className='player'>
          <div className='availableCash'><h1>${this.props.playerCash}</h1></div>
          <div className='playerCardOneStart'>

          </div>
          <div className='playerCardTwoStart'>

          </div>
          <div className='dealtCards'>
            
          </div>
        </div>
        <div className='dealer'>
          <div className='availableCash'><h1>${this.props.dealerCash}</h1></div>
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
              <option value='1000'>$1000</option>
              <option value='2500'>$2500</option>
              <option value='5000'>$5000</option>
              <option value='10000'>$10000</option>
              <option value='50000'>$500000</option>
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
    playerCash: state.playerCash,
    dealerCash: state.dealerCash,
    deck: state.deck
  }
}

export default connect(mapStateToProps, null)(Game)
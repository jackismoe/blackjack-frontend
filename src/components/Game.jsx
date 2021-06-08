import React from 'react'
import {connect} from 'react-redux'
import updateRecord from '../actions/updateRecord'
import resetDealer from '../actions/resetDealer'
import Player from './Player'
import Dealer from './Dealer'


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
    const dealerHand = []
    const playerHand = []

    let sortedDeck
    let cardsInDeck
    let playerTotal = 0
    let dealerTotal = 0

    const sortDeck = () => {  
      sortedDeck = this.props.deck.filter(card => card.dealt == false)
      cardsInDeck = sortedDeck.length
    }

    const pickUpPlayerCards = () => {
      const dealtCards = document.querySelectorAll('.player .dealt')
      for (let card of dealtCards) {
        card.remove()
      }
    }
    const pickUpDealerCards = () => {
      const dealtCards = document.querySelectorAll('.dealer .dealt')
      for (let card of dealtCards) {
        card.remove()
      }
    }

    const resetDeck = (winner) => {
      this.props.deck.map(card => card.dealt = false)
      playerSlotOne.className = 'playerCardOneStart'
      playerSlotOne.innerHTML = ''
      playerSlotTwo.className = 'playerCardTwoStart'
      playerSlotTwo.innerHTML = ''
      dealerSlotOne.className = 'dealerCardOneStart'
      dealerSlotOne.innerHTML = ''
      dealerSlotTwo.className = 'dealerCardTwoStart'
      dealerSlotTwo.innerHTML = ''

      pickUpPlayerCards()
      pickUpDealerCards()
      document.querySelector('.deal').style.visibility = 'visible'
      document.querySelector('.resetDealer').style.visibility = 'visible'

      // send game data to backend for W/L column
      this.props.updateRecord(this.props.player, winner)
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

      const cardDisplay = []

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
      playerSlotOne.innerHTML = `<h1 class=${cardOneSuit}>${cardOneSuit}</h1>${cardOneValue}</h1>`
      playerSlotTwo.innerHTML = `<h1 class=${cardTwoSuit}>${cardTwoSuit}</h1>${cardTwoValue}</h1>`
    }

    const showTertiaryPlayerCards = (desired) => {
      const handCopy = Array.from(desired)
      handCopy.splice(0, 2)
      pickUpPlayerCards()
      for (let card of handCopy) {
        const cardSuitAndValue = getCardSuitAndValue(card)
        const cardDiv = document.createElement('div')
        cardDiv.className = 'dealt'
        cardDiv.innerHTML = `<h1 class=${cardSuitAndValue[0]}>${cardSuitAndValue[0]}</h1><h1>${cardSuitAndValue[1]}</h1>`
        playerCardsDOM.appendChild(cardDiv)
      }
    }

    const showTertiaryDealerCards = (desired) => {
      const handCopy = Array.from(desired)
      handCopy.splice(0, 2)
      pickUpDealerCards()
      for (let card of handCopy) {
        const cardSuitAndValue = getCardSuitAndValue(card)
        const cardDiv = document.createElement('div')
        cardDiv.className = 'dealt'
        cardDiv.innerHTML = `<h1 class=${cardSuitAndValue[0]}>${cardSuitAndValue[0]}</h1><h1>${cardSuitAndValue[1]}</h1>`
        dealerCardsDOM.appendChild(cardDiv)
      }
    }

    const showFirstDealerCard = (hand) => {
      const cardOne = hand[0]
      
      const cardOneValues = getCardSuitAndValue(cardOne)

      const cardOneSuit = cardOneValues[0]
      const cardOneValue = cardOneValues[1]

      dealerSlotOne.className = 'dealerCardOne'
      dealerSlotOne.innerHTML = `<h1 class=${cardOneSuit}>${cardOneSuit}</h1>${cardOneValue}</h1>`
    }

    const showSecondDealerCard = (hand) => {
      const cardTwo = hand[1]
      
      const cardTwoValues = getCardSuitAndValue(cardTwo)

      const cardTwoSuit = cardTwoValues[0]
      const cardTwoValue = cardTwoValues[1]

      dealerSlotTwo.className = 'dealerCardTwo'
      dealerSlotTwo.innerHTML = `<h1 class=${cardTwoSuit}>${cardTwoSuit}</h1>${cardTwoValue}</h1>`
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
        console.log('value ' + card.value)
        console.log('total ' + workingTotal)
      }
      return workingTotal
    }

    const playerTurn = () => {
      if (playerTotal > 21) {
          alert(`you've busted`)
          showSecondDealerCard(dealerHand)
          debugger
          seeWhoWon()
      } else {
        const playerHit = window.confirm(`your total right now is ${playerTotal}. Would you like to hit?`)
        if (playerHit) {
          dealOne(playerHand)
          playerTotal = getTotal(playerHand)

          showTertiaryPlayerCards(playerHand)
          
          setTimeout(() => {
            playerTurn()
          }, 1000)
        } else {
          dealersTurn(dealerTotal, dealerHand)
        }
      }
    }

    const dealersTurn = (total, hand) => {

      if (dealerTotal > 21) {
          alert(`dealer has busted`)
          showSecondDealerCard(dealerHand)
          debugger
          seeWhoWon()
      } else {
        if (total < 17) {
          dealOne(hand)
          dealerTotal = getTotal(dealerHand)
          showTertiaryDealerCards(dealerHand)
          setTimeout(dealersTurn(dealerTotal, hand), 1500)
        } else if (total > 21) {
          showSecondDealerCard(dealerHand)
          debugger
          seeWhoWon()
          setTimeout(alert('dealer has busted'), 900)
        } else {
          showSecondDealerCard(dealerHand)
          debugger
          seeWhoWon()
        }
      }
    }
    
    const seeWhoWon = () => {
      let winner

      if ((playerTotal > dealerTotal) && (playerTotal <= 21) || (dealerTotal > 21)) {
        winner = this.props.playerName
      } else if ((dealerTotal > playerTotal) && (dealerTotal <= 21) || (playerTotal > 21)) {
        winner = 'dealer'
      }
      window.setTimeout(() => {
        alert(`${this.props.playerName}'s total is ${playerTotal}.\ndealertotal is ${dealerTotal}.\n${winner} has won.`)
      }, 500)
      window.setTimeout(() => {
        resetDeck(winner)
      }, 1000)
    }

    document.querySelector('.deal').style.visibility = 'hidden'
    document.querySelector('.resetDealer').style.visibility = 'hidden'

    //shuffle and deal
    sortDeck()
    dealFirstTwo(playerHand)
    dealFirstTwo(dealerHand)
    playerTotal = getTotal(playerHand)
    dealerTotal = getTotal(dealerHand)

    //show cards on table
    showPlayerCards(playerHand)
    showFirstDealerCard(dealerHand)

    //start game
    window.setTimeout(() => {
      playerTurn()
    }, 700)
  }

  render() {
    return (
      <div className='game' onLoad={this.checkRefresh}>
        <Player playerWins={this.props.playerWins} playerLosses={this.props.playerLosses} playerName={this.props.playerName}/>
        <Dealer resetDealer={this.props.resetDealer} dealerWins={this.props.dealerWins} dealerLosses={this.props.dealerLosses}/>
        <button className='deal' onClick={() => this.startGame()}>Deal</button>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    playerName: state.playerName,
    player: state.player,
    playerCash: state.playerCash,
    playerWins: state.playerWins,
    playerLosses: state.playerLosses,
    dealerWins: state.dealerWins,
    dealerLosses: state.dealerLosses,
    dealerCash: state.dealerCash,
    deck: state.deck
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRecord: (player, winner) => dispatch(updateRecord(player, winner)),
    resetDealer: () => dispatch(resetDealer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
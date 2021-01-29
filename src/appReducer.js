const appReducer = (state = {player: 0, deck: [], playerCash: 0, dealerCash: 0, playerWins: 0, playerLosses: 0, dealerWins: 0, dealerLosses: 0}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        player: action.game[0].id,
        playerCash: action.game[0].availableCash,
        playerWins: action.game[0].wins,
        playerLosses: action.game[0].losses,
        dealerWins: action.game[1].wins,
        dealerLosses: action.game[1].losses,
        dealerCash: 250000
      }
    case 'BUILD_DECK':
      return {
        ...state,
        deck: action.deck
      }
    case 'UPDATE_RECORD':
      return {
        ...state,
        playerWins: action.game[0].wins,
        playerLosses: action.game[0].losses,
        dealerWins: action.game[1].wins,
        dealerLosses: action.game[1].losses
      }
    // eslint-disable-next-line
    default:
      return state
  }
}

export default appReducer
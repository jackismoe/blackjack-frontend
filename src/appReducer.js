const appReducer = (state = {player: 0, deck: [], playerCash: 0, dealerCash: 0}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        player: action.user.id,
        playerCash: action.user.availableCash,
        dealerCash: 250000
      }
    case 'BUILD_DECK':
      return {
        ...state,
        deck: action.deck
      }
    // eslint-disable-next-line
    default:
      return state
  }
}

export default appReducer
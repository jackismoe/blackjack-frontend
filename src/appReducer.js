const appReducer = (state = {player: 0, deck: []}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        player: action.user.id
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
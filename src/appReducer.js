const appReducer = (state = {player: 0}, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      
      return {
        player: action.user.id
      }


    // eslint-disable-next-line
    default:
      return state
  }
}

export default appReducer
import BASE_URL from '../index'

const fetchPlayer = playerId => {
  return (dispatch) => {
    fetch(`${BASE_URL}/users/${playerId}`)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({type: 'ADD_PLAYER', game: jsonResponse})
    })
  }
}

export default fetchPlayer
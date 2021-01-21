import BASE_URL from '../index'

const fetchPlayer = playerId => {
  return (dispatch) => {
    fetch(`${BASE_URL}/users/${playerId}`)
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse)
      dispatch({type: 'ADD_PLAYER', user: jsonResponse})
    })
  }
}

export default fetchPlayer
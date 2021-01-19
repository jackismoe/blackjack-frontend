import BASE_URL from '../index'

export const createUser = (player) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player: player
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({type: 'CREATE_PLAYER', player: jsonResponse})
      console.log(jsonResponse)
    })
  }
}
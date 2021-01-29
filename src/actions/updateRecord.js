import BASE_URL from '../index'

const updateRecord = (player, winner) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/users/${player}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        winner: winner
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({type: 'UPDATE_RECORD', game: jsonResponse})
    })

  }
}

export default updateRecord
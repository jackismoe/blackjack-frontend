import BASE_URL from '../index'

const resetDealer = () => {
  return (dispatch) => {
    fetch(`${BASE_URL}/dealers/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({type: 'RESET_DEALER', dealer: jsonResponse})
    })
  }
}

export default resetDealer
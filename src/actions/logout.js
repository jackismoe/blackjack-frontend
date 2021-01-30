import BASE_URL from '../index'

const logout = (user) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/sessions/${user}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',      
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({type: 'LOGOUT'})
    })
  }
}

export default logout
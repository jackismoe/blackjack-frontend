import BASE_URL from '../index'

export const findUser = (player) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/players`)
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse)
    })
  }
}
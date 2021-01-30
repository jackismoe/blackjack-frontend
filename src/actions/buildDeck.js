import BASE_URL from '../index'

const buildDeck = () => {
  return (dispatch) => {
    fetch(`${BASE_URL}/cards`)
    .then(response => response.json())
    .then(jsonResponse => dispatch({type: 'BUILD_DECK', deck: jsonResponse}))
  }
}

export default buildDeck
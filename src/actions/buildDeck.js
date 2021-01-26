const buildDeck = () => {
  return (dispatch) => {
    //club
    //diamond
    //heart
    //spade
    // ♠♥♦♣
    const deck = [
      {
        name: 'club2',
        value: 2,
        dealt: false
      },
      {
        name: 'club3',
        value: 3,
        dealt: false
      },
      {
        name: 'club4',
        value: 4,
        dealt: true
      },
      {
        name: 'club5',
        value: 5,
        dealt: false
      },
      {
        name: 'club6',
        value: 6,
        dealt: false
      },
      {
        name: 'club7',
        value: 7,
        dealt: false
      },
      {
        name: 'club8',
        value: 8,
        dealt: false
      },
      {
        name: 'club9',
        value: 9,
        dealt: false
      },
      {
        name: 'club10',
        value: 10,
        dealt: false
      },
      {
        name: 'clubJack',
        value: 10,
        dealt: false
      },
      {
        name: 'clubQueen',
        value: 10,
        dealt: false
      },
      {
        name: 'clubKing',
        value: 10,
        dealt: false
      },
      {
        name: 'clubAce',
        value: 11,
        secondaryValue: 1,
        dealt: false
      },
      {
        name: 'diamond2',
        value: 2,
        dealt: false
      },
      {
        name: 'diamond3',
        value: 3,
        dealt: false
      },
      {
        name: 'diamond4',
        value: 4,
        dealt: false
      },
      {
        name: 'diamond5',
        value: 5,
        dealt: false
      },
      {
        name: 'diamond6',
        value: 6,
        dealt: false
      },
      {
        name: 'diamond7',
        value: 7,
        dealt: false
      },
      {
        name: 'diamond8',
        value: 8,
        dealt: false
      },
      {
        name: 'diamond9',
        value: 9,
        dealt: false
      },
      {
        name: 'diamond10',
        value: 10,
        dealt: false
      },
      {
        name: 'diamondJack',
        value: 10,
        dealt: false
      },
      {
        name: 'diamondQueen',
        value: 10,
        dealt: false
      },
      {
        name: 'diamondKing',
        value: 10,
        dealt: false
      },
      {
        name: 'diamondAce',
        value: 11,
        secondaryValue: 1,
        dealt: false
      },
      {
        name: 'heart2',
        value: 2,
        dealt: false
      },
      {
        name: 'heart3',
        value: 3,
        dealt: false
      },
      {
        name: 'heart4',
        value: 4,
        dealt: false
      },
      {
        name: 'heart5',
        value: 5,
        dealt: false
      },
      {
        name: 'heart6',
        value: 6,
        dealt: false
      },
      {
        name: 'heart7',
        value: 7,
        dealt: false
      },
      {
        name: 'heart8',
        value: 8,
        dealt: false
      },
      {
        name: 'heart9',
        value: 9,
        dealt: false
      },
      {
        name: 'heart10',
        value: 10,
        dealt: false
      },
      {
        name: 'heartJack',
        value: 10,
        dealt: false
      },
      {
        name: 'heartQueen',
        value: 10,
        dealt: false
      },
      {
        name: 'heartKing',
        value: 10,
        dealt: false
      },
      {
        name: 'heartAce',
        value: 11,
        secondaryValue: 1,
        dealt: false
      },
      {
        name: 'spade2',
        value: 2,
        dealt: false
      },
      {
        name: 'spade3',
        value: 3,
        dealt: false
      },
      {
        name: 'spade4',
        value: 4,
        dealt: false
      },
      {
        name: 'spade5',
        value: 5,
        dealt: false
      },
      {
        name: 'spade6',
        value: 6,
        dealt: false
      },
      {
        name: 'spade7',
        value: 7,
        dealt: false
      },
      {
        name: 'spade8',
        value: 8,
        dealt: false
      },
      {
        name: 'spade9',
        value: 9,
        dealt: false
      },
      {
        name: 'spade10',
        value: 10,
        dealt: false
      },
      {
        name: 'spadeJack',
        value: 10,
        dealt: false
      },
      {
        name: 'spadeQueen',
        value: 10,
        dealt: false
      },
      {
        name: 'spadeKing',
        value: 10,
        dealt: false
      },
      {
        name: 'spadeAce',
        value: 11,
        secondaryValue: 1,
        dealt: false
      }
    ]
    dispatch({type: 'BUILD_DECK', deck: deck})
  }
}

export default buildDeck
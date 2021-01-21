import React from 'react'



export default class Game extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     loading: true
  //   }
  // }

  // componentDidMount() {
  //   this.props.fetchPlayer(sessionStorage.userId)
  // }

  render() {
    return (
      <div className='game'>
        <div className='dealer'>
          dealer
          <div className='dealerCardOne'>
            
          </div>
          <div className='dealerCardTwo'>

          </div>
        </div>
        <div className='player'>
          {sessionStorage.username}
          <div className='playerCardOne'>

          </div>
          <div className='playerCardTwo'>

          </div>
        </div>
        <div className='bets'>
          <div className='user-bet'>user bet</div>
          <div className='dealer-bet'>dealer bet</div>
        </div>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchPlayer: (playerId) => dispatch(fetchPlayer(playerId))
//   }
// }

// const mapStateToProps = state => {
//   return {
//     player: state.player,
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Game)
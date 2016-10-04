import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const GameList = (props) => {
  const {games, loading} = props.data

  const _renderGames = function (games) {
    return games.map((game, index) => {
      return <li key={index}>{game.title}</li>
    })
  }

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <ul>
        {_renderGames(games)}
      </ul>
    )
  }
}

const GameListQuery = gql`
  query ListOfGames {
    games{
      title
    }
  }
`

const GameListWithGames = graphql(GameListQuery)(GameList)
export default GameListWithGames

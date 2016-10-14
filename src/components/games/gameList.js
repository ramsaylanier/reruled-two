import React from 'react'
import CSSModules from 'react-css-modules'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './gamelist.scss'

const GameList = (props) => {
  const {games, loading} = props.data

  const _renderGames = function (games) {
    return games.map((game, index) => {
      return <li key={index} styleName="item">{game.title}</li>
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

const GameListWithStyles = CSSModules(GameList, styles)
const GameListWithGames = graphql(GameListQuery)(GameListWithStyles)
export default GameListWithGames

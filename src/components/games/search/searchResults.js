import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './search.scss'
import {Link} from 'react-router'

const SearchResults = (props) => {
  const {games} = props

  return (
    <ul styleName='list'>
      {games.map((game, index) => {
        const gameLink = `/games/${game.title}`
        return (
          <li key={index} styleName='item'>
            <Link to={gameLink} styleName='link'>{game.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

const SearchResultsWithStyles = CSSModules(SearchResults, styles)
export default SearchResultsWithStyles

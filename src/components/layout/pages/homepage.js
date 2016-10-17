import React from 'react'
import GameSearch from '../../games/search/searchField'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

const Homepage = (props) => {
  return (
    <div styleName="base">
      <GameSearch/>
    </div>
  )
}

export default CSSModules(Homepage, styles)

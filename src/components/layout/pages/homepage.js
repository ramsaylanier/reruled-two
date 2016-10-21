import React from 'react'
import CSSModules from 'react-css-modules'
import GameSearch from '../../games/search/searchField'
import Page from './page'
import styles from './page.scss'

const Homepage = (props) => {
  return (
    <Page>
      <GameSearch/>
    </Page>
  )
}

export default CSSModules(Homepage, styles)

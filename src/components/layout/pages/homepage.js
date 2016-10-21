import React from 'react'
import CSSModules from 'react-css-modules'
import GameSearch from '../../games/search/searchField'
import Page from './Page'
import styles from './page.scss'

const Homepage = (props) => {
  return (
    <Page>
      <div styleName="tight-wrapper">
        <GameSearch/>
      </div>
    </Page>
  )
}

export default CSSModules(Homepage, styles)

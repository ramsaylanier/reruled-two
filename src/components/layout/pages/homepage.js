import React from 'react'
import CSSModules from 'react-css-modules'
import GameSearch from '../../games/search/searchField'
import {Page, PageContent} from './'
import GameHistory from 'components/history/gameHistory'
import styles from './page.scss'

const Homepage = (props) => {
  return (
    <Page>
      <PageContent>
        <GameSearch/>
        <p>Recent History</p>
        <GameHistory/>
      </PageContent>
    </Page>
  )
}

export default CSSModules(Homepage, styles)

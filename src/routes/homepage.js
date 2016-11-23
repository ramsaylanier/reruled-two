import React from 'react'
import GameSearch from 'components/games/search/searchField'
import {Page, PageContent} from 'components/layout/pages'
import GameHistory from 'components/history/gameHistory'

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

export default Homepage

import React from 'react'
import GameSearch from 'components/games/search/searchField'
import {Page, PageContent} from 'components/layout/pages'
import animatePage from 'components/layout/pages/pageDecorators'
import GameHistory from 'components/history/gameHistory'
import {connect} from 'react-redux'

function mapStateToProps (state) {
  return {
    history: state.user.history
  }
}

@connect(mapStateToProps)
@animatePage()
class Homepage extends React.Component {
  render () {
    const {history} = this.props
    return (
      <Page>
        <PageContent>
          <GameSearch/>
          <p>Recent History</p>
          <GameHistory history={history}/>
        </PageContent>
      </Page>
    )
  }
}

export default Homepage

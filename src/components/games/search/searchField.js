import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import SearchResults from './searchResults'
import CSSModules from 'react-css-modules'
import styles from './search.scss'
import Wrapper from 'components/layout/wrapper/wrapper'

const GameQuery = gql`
  query GetGames($title: String){
    games(title: $title){
      title
    }
  }
`

@graphql(GameQuery, {
  options: (props) => {
    return ({
      variables: {
        title: props.title || ''
      }
    })
  }
})
@CSSModules(styles)
class SearchField extends React.Component {
  constructor () {
    super()
    this._updateQuery = this._updateQuery.bind(this)
  }

  _updateQuery (e) {
    const query = this._input.value.toLowerCase()
    this.props.data.refetch({title: query})
  }

  render () {
    const {games} = this.props.data
    return (
      <Wrapper>
        <input
          styleName="field"
          type="text"
          ref={c => (this._input = c)}
          onChange={this._updateQuery}
          placeholder='Search Games By Title'
        />
        {games &&
          <SearchResults games={this.props.data.games}/>
        }
      </Wrapper>
    )
  }
}

export default SearchField

import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './menus.scss'
import {connect} from 'react-redux'
import {CLOSE_NAV} from '../../state/actions/actions'

class MenuItem extends React.Component {
  render () {
    return (
      <li styleName="item" onClick={() => this.props.closeMainNav()}>
        {this.props.children}
      </li>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeMainNav: () => {
      dispatch({type: CLOSE_NAV})
    }
  }
}

export default connect(null, mapDispatchToProps)(CSSModules(MenuItem, styles))

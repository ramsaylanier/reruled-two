import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './menus.scss'
import {connect} from 'react-redux'
import {CLOSE_NAV, OPEN_NAV} from '../../state/actions/actions'

class MenuToggle extends React.Component {
  render () {
    const isNavOpen = this.props.ui.navOpen
    return (
      <div onClick={(e) => this.props.toggleMainNav(isNavOpen)}>
        <div styleName="bar"></div>
        <div styleName="bar"></div>
        <div styleName="bar"></div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleMainNav: (isOpen) => {
      if (isOpen) {
        dispatch({type: CLOSE_NAV})
      } else {
        dispatch({type: OPEN_NAV})
      }
    }
  }
}

function mapStateToProps (state) {
  return {
    ui: state.ui
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(MenuToggle, styles))

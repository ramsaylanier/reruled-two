import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './menus.scss'
import {connect} from 'react-redux'
import {CLOSE_NAV, OPEN_NAV} from '../../state/actions/actions'

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

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
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

export default MenuToggle

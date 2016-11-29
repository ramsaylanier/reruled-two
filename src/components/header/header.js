import React from 'react'
import {connect} from 'react-redux'
import MenuToggle from '../menu/menuToggle'
import CSSModules from 'react-css-modules'
import styles from './header.scss'
import BackIcon from 'components/icons/backIcon'
import UserAvatar from 'components/profile/UserAvatar'
import {TOGGLE_DRAWER, CLOSE_NAV} from 'state/actions/actions'

const Header = (props) => {
  const handleBackButtonClick = (e) => {
    e.preventDefault()
    if (props.drawerOpen || props.navOpen) {
      props.closeDrawer()
      props.closeNav()
    } else {
      props.history.goBack()
    }
  }

  return (
    <header styleName="base">
      <button onClick={handleBackButtonClick} styleName="button">
        <BackIcon/>
      </button>

      {props.user && <UserAvatar/>}

      <MenuToggle/>
    </header>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user,
    drawerOpen: state.ui.drawerOpen,
    navOpen: state.ui.navOpen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeNav: () => {
      dispatch({type: CLOSE_NAV})
    },
    closeDrawer: () => {
      dispatch({
        type: TOGGLE_DRAWER,
        isOpen: false
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Header, styles))

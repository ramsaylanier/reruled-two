import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './menus.scss'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import TweenMax from 'gsap'
import MenuItem from './menuItem'

class MainNav extends React.Component {
  componentWillReceiveProps (nextProps) {
    let dX = '0%'
    if (nextProps.ui.navOpen) {
      dX = '-100%'
    }
    TweenMax.to(this._nav, 0.75, {
      x: dX,
      ease: Power4.easeOut
    })
  }

  _renderLinksWithUser (username) {
    return (
      <div>
        <ul styleName="list">
          <MenuItem><Link to={`/user/${username}`} styleName="link">{username}</Link></MenuItem>
          <MenuItem><Link to="/logout" styleName="link">Logout</Link></MenuItem>
        </ul>
        <ul styleName="list">
          <MenuItem><Link to="/" styleName="link">Games</Link></MenuItem>
        </ul>
      </div>
    )
  }

  _renderLinksWithoutUser () {
    return (
      <div>
        <ul styleName="list">
          <MenuItem><Link to="/login" styleName="link">Login</Link></MenuItem>
        </ul>
        <ul styleName="list">
          <MenuItem><Link to="/" styleName="link">Home</Link></MenuItem>
        </ul>
      </div>
    )
  }

  render () {
    const {user} = this.props
    const {username} = user
    return (
      <nav styleName="main" ref={c => { this._nav = c }}>
        { username ? this._renderLinksWithUser(username) : this._renderLinksWithoutUser()}
      </nav>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.ui
  }
}

export default connect(mapStateToProps)(CSSModules(MainNav, styles))

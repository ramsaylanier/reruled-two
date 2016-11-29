import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import TweenMax from 'gsap'
import {Page, PageHeader, PageContent} from 'components/layout/pages'
import {List} from 'components/layout/list'
import MenuItem from './menuItem'
import CSSModules from 'react-css-modules'
import styles from './menus.scss'

function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.ui
  }
}

@connect(mapStateToProps)
@CSSModules(styles, {allowMultiple: true})
class MainNav extends React.Component {
  componentWillReceiveProps (nextProps) {
    let dX = '0%'
    if (nextProps.ui.navOpen) {
      dX = '-100%'
    }
    TweenMax.to(this._nav, 0.75, {
      x: dX,
      ease: Power4.easeOut // eslint-disable-line no-undef
    })
  }

  _renderLinksWithUser (username) {
    return (
      <Page>
        <PageHeader type="light">
            <MenuItem><Link to="/logout" styleName="link">Logout</Link></MenuItem>
        </PageHeader>
        <PageContent>
          <List>
            <MenuItem><Link to="/" styleName="link">Games</Link></MenuItem>
          </List>
        </PageContent>
      </Page>
    )
  }

  _renderLinksWithoutUser () {
    return (
      <Page>
        <PageHeader type="light">
            <MenuItem><Link to="/login" styleName="link">Login</Link></MenuItem>
            <MenuItem><Link to="/register" styleName="link">Register</Link></MenuItem>
        </PageHeader>
        <PageContent>
          <List>
            <MenuItem><Link to="/" styleName="link">Games</Link></MenuItem>
          </List>
        </PageContent>
      </Page>
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

export default MainNav

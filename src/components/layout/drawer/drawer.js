import React from 'react'
import CSSModules from 'react-css-modules'
import {connect} from 'react-redux'
import styles from './drawer.scss'
import TweenMax from 'gsap'

class Drawer extends React.Component {
  componentWillReceiveProps (nextProps) {
    let dX = '0%'
    if (nextProps.ui.drawerOpen) {
      dX = '-100%'
    }
    TweenMax.to(this._drawer, 0.75, {
      x: dX,
      ease: Power4.easeOut
    })
  }

  render () {
    const drawerClass = 'base'
    return (
      <div styleName={drawerClass} ref={ c => { this._drawer = c }}>
        {this.props.ui.drawerContent}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.ui
  }
}

export default connect(mapStateToProps)(CSSModules(Drawer, styles, {allowMultiple: true}))

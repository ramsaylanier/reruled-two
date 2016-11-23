import React, {PropTypes, Component} from 'react'
import CSSModules from 'react-css-modules'
import {connect} from 'react-redux'
import styles from './drawer.scss'
import TweenMax from 'gsap'

function mapStateToProps (state) {
  return {
    ui: state.ui
  }
}

@connect(mapStateToProps)
@CSSModules(styles, {allowMultiple: true})
class Drawer extends Component {

  static propTypes = {
    ui: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {
    let dX = '0%'
    if (nextProps.ui.drawerOpen) {
      dX = '-100%'
    }
    TweenMax.to(this._drawer, 0.75, {
      x: dX,
      ease: Power4.easeOut // eslint-disable-line no-undef
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

export default Drawer

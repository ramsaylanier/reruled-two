import React from 'react'
import TweenMax from 'gsap'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

const animatePage = (Component) => {
  @CSSModules(styles)
  class AnimatedPage extends React.Component {
    componentDidMount () {
      TweenMax.to(this._page, 0.5, {
        x: '0vw',
        ease: Power4.easeOut, // eslint-disable-line
      })
    }

    render () {
      return (
        <div ref={c => { this._page = c }} styleName="animated">
          <Component {...this.props} animated={true} />
        </div>
      )
    }
  }

  return AnimatedPage
}

export default () => {
  return (target) => animatePage(target)
}

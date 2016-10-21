import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

class Page extends React.Component {
  render () {
    return (
      <div styleName="base">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(Page, styles)

import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

class PageHeader extends React.Component {
  render () {
    return (
      <div styleName="header">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(PageHeader, styles)

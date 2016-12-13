import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

@CSSModules(styles)
class Page extends React.Component {

  render () {
    return (
      <div styleName="base" ref={c => { this._page = c }}>
        {this.props.children}
      </div>
    )
  }
}

export default Page

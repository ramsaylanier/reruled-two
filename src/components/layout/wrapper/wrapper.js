import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './wrapper.scss'

const Wrapper = (props) => {
  const wrapperClass = `base ${props.type || ''}`
  return (
    <div styleName={wrapperClass}>
      {props.children}
    </div>
  )
}

export default CSSModules(Wrapper, styles, {allowMultiple: true})

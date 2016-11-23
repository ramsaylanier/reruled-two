import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './list.scss'

const List = (props) => {
  const {type = '', children} = props
  return (
    <ul styleName={`base ${type}`}>
      {children}
    </ul>
  )
}

export default CSSModules(List, styles, {allowMultiple: true})

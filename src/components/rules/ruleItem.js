import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './rules.scss'

const RuleItem = (props) => {
  const {description, type} = props
  return (
    <div styleName="item">
      <span styleName="description">{description}</span>
      <span styleName="type">{type}</span>
    </div>
  )
}

RuleItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default CSSModules(RuleItem, styles)

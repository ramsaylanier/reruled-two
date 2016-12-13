import React, {PropTypes} from 'react'
import {sortRulesByType} from 'components/rulesets/helpers'
import {map} from 'lodash'
import CSSModules from 'react-css-modules'
import styles from './rulesets.scss'

const RulesetSummary = (props) => {
  const {rules} = props
  const rulesByType = rules.length > 0 && sortRulesByType(rules)
  return (
    <div styleName="summary">
      {map(rulesByType, (rules, index) => {
        return (
          <div key={index} styleName="item">
            <span styleName={`type ${index}`}>{index.charAt(0)}</span>
            <span styleName="count">{rules.length}</span>
          </div>
        )
      })}
    </div>
  )
}

RulesetSummary.propTypes = {
  rules: PropTypes.array
}

export default CSSModules(RulesetSummary, styles, {allowMultiple: true})

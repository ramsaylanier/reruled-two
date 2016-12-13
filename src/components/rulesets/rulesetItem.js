import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {EditIcon} from 'components/icons'
import {ListItem} from 'components/layout/list'
import DrawerToggleButton from 'components/buttons/drawerToggleButton'
import RulesetSummary from './rulesetSummary'
import EditRulesetForm from './editRulesetForm'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './rulesets.scss'

const RulesetItem = (props) => {
  const {ruleset} = props
  const {rules} = ruleset

  const renderEditIcon = (ruleset) => {
    if (ruleset.author && props.user.id === ruleset.author.id) {
      return (
        <div styleName="edit">
          <DrawerToggleButton
            icon={<EditIcon/>}
            drawerContent={<EditRulesetForm ruleset={ruleset}/>}
            type="edit"
          />
        </div>
      )
    }
  }

  return (
    <ListItem key={ruleset.id}>
      <div styleName="item-header">
        <Link to={`/ruleset/${ruleset.id}`}>{ruleset.name}</Link>
        {renderEditIcon(ruleset)}
      </div>
      {rules &&
        <RulesetSummary rules={rules}/>
      }
    </ListItem>
  )
}

RulesetItem.propTypes = {
  ruleset: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

const RulesetItemWithStyles = CSSModules(RulesetItem, styles)
export default connect(mapStateToProps)(RulesetItemWithStyles)

import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './input.scss'

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
  }

  render () {
    const {type = 'text'} = this.props
    return (
      <input
        styleName={`base ${type}`}
        type={type}
        value={this.state.value}
        onChange={this.handleChange}
        {...this.props}
      />
    )
  }
}

export default CSSModules(Input, styles, {allowMultiple: true})

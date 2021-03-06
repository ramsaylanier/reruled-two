import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './input.scss'

@CSSModules(styles, {allowMultiple: true})
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
    // eslint-disable-next-line no-unused-vars
    const {styles, type = 'text', ...rest} = this.props
    return (
      <input
        styleName={`base ${type}`}
        type={type}
        value={this.state.value}
        onChange={this.handleChange}
        {...rest}
      />
    )
  }
}

export default Input

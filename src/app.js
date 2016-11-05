import React, // eslint-disable-line no-unused-vars
{ Component } from 'react'
import Marked from './marked-module' // eslint-disable-line no-unused-vars

class App extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return (
      <div>
        <textarea ref="marked-input"
          placeholder="you can input your markdown strings here!"
          value={this.state.value}
          onChange={this.handleChange} />
        <Marked ref="marked" markdown={this.state.value} />
      </div>
    )
  }
}

export default App

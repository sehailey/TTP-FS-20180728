import React, { Component } from 'react'
import axios from 'axios'

class Test extends Component {
  constructor() {
    super()
    this.state = { users: [] }
  }
  componentDidMount() {
    console.log('hello, world!')

    this.fetchAPIMessage()
  }

  fetchAPIMessage = async () => {
    try {
      const res = await axios.get('/api/users/')
      const users = res.data
      this.setState({ users })
    } catch (e) {
      console.log(e)
      this.setState({ error: 'Did not get data from Express' })
    }
  }
  render() {
    console.log(this.state.users)
    return this.state.users ? (
      <div> {this.state.users.map(user => user.email + '\n')}</div>
    ) : (
      <div />
    )
  }
}

export default Test

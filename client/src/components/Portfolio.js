import React, { Component } from 'react'
import { connect } from 'react-redux'
import StockLine from './StockLine'
//import { IEXClient } from 'iex-api'
//import * as _fetch from 'isomorphic-fetch'
//import axios from 'axios'

import { fetchUserStocks } from '../store'

//const iex = new IEXClient(_fetch)
//iex.stockCompany('AAPL').then(company => console.log(company))
// Import socket.io with a connection to a channel (i.e. tops)
// const socket = require('socket.io-client')(
//   'https://ws-api.iextrading.com/1.0/tops'
// )
//
// // Listen to the channel's messages
// socket.on('message', message => console.log(message))
//
// // Connect to the channel
// socket.on('connect', () => {
//   // Subscribe to topics (i.e. appl,fb,aig+)
//   socket.emit('subscribe', 'snap,fb,aig+')
//
//   // Unsubscribe from topics (i.e. aig+)
//   socket.emit('unsubscribe', 'aig+')
// })
//
// // Disconnect from the channel
// socket.on('disconnect', () => console.log('Disconnected.'))
// const iex = new IEXClient(fetch)
// console.log(iex)
// console.log(iex.stockCompany('AAPL'))

//.then(company => console.log(company))
// const url = 'https://ws-api.iextrading.com/1.0'
// let symbol = 'AAPL'
// const getStocks = async () => {
//   try {
//     const res = await axios.get('/stock')
//     const data = await res.data
//     console.log('data', data)
//   } catch (e) {
//     console.log(e)
//   }
// }

class Portfolio extends Component {
  constructor() {
    super()
    this.state = { loading: true }
  }
  componentDidMount() {
    const user = this.props.user
    if (user) this.props.getUserStocks(user.id)
    if (this.props.userStocks) this.setState({ loading: false })
  }
  render() {
    if (this.state.loading) return <div />
    return (
      <div>
        <div className="userStocks">
          {this.props.userStocks.map(stock => (
            <StockLine key={stock.id} {...stock} />
          ))}
        </div>
        <footer>
          “Data provided for free by
          <a href="https://iextrading.com/developer"> IEX</a>. View IEX’s
          <a href="https://iextrading.com/api-exhibit-a/"> Terms of Use</a>.”
        </footer>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    userStocks: state.userStocks
  }
}

const mapDispatch = dispatch => {
  return {
    getUserStocks: userId => {
      dispatch(fetchUserStocks(userId))
      console.log('fetch stocks for ', userId)
    }
  }
}
export default connect(
  mapState,
  mapDispatch
)(Portfolio)

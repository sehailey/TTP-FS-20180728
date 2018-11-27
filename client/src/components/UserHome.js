import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UserStocks } from './UserPortfolio'
import { SearchContainer } from './StockSearch'

import { fetchUserStocks, fetchMarketStocks } from '../store'

class Portfolio extends Component {
  constructor() {
    super()
    this.state = { loading: true }
  }
  componentDidMount() {
    const user = this.props.user
    if (user) {
      this.props.getUserStocks(user.id)
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <UserStocks {...this.props} />
        </div>
        <div className="col">
          <SearchContainer {...this.props} />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    userStocks: state.userStocks,
    marketStocks: state.marketStocks
  }
}

const mapDispatch = dispatch => {
  return {
    getUserStocks: userId => {
      dispatch(fetchUserStocks(userId))
    },
    getMarketStocks: stockString => {
      dispatch(fetchMarketStocks(stockString))
    }
  }
}
export default connect(
  mapState,
  mapDispatch
)(Portfolio)

//import { IEXClient } from 'iex-api'
//import * as _fetch from 'isomorphic-fetch'
//import axios from 'axios'

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

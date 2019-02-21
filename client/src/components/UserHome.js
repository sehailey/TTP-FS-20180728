import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PortfolioContainer } from './UserPortfolio'
import { SearchContainer } from './StockSearch'

import { fetchUserStocks } from '../store'

class Portfolio extends Component {
  constructor() {
    super()
    this.state = { loading: true }
    this.getUserMoney = this.getUserMoney.bind(this)
  }

  async fetchData() {
    const user = this.props.user
    await this.props.getUserStocks(user.id)
    this.setState({ loading: false })
  }

  getPortfolioValue() {
    const stocks = this.props.userStocks
    if (stocks.length === 0) return 0
    if (stocks.length === 1) return stocks[0].quantity * stocks[0].currentPrice
    if (stocks.length > 1)
      return stocks
        .map(stock => stock.quantity * stock.currentPrice)
        .reduce((a, b) => a + b)
  }

  getPurchasePortfilioPrice() {
    const stocks = this.props.userStocks
    console.log('GETPURCHASEPRICE', stocks)
    if (stocks.length === 0) return 0
    if (stocks.length === 1) return stocks[0].totalPurchasePrice
    if (stocks.length > 1)
      return stocks
        .map(stock => stock.totalPurchasePrice)
        .reduce((a, b) => a + b)
  }

  getProfit() {
    return this.getPortfolioValue() - this.getPurchasePortfilioPrice()
  }

  getUserMoney() {
    console.log(this.props.user.money, this.getProfit())
    return this.props.user.money - this.getProfit()
  }
  componentDidMount() {
    this.fetchData()
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) return <div />

    return (
      <div className="row">
        <PortfolioContainer {...this.props} />
        <SearchContainer getUserMoney={this.getUserMoney} {...this.props} />
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

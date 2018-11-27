import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { searchForStock, purchaseStock } from '../../store'

const defaultState = {
  symbol: '',
  quantity: 0
}

class SearchContainer extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { symbol } = this.state
    this.props.dispatchSearchForStock(symbol.toUpperCase())
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    const userMoney = this.props.getUserMoney()
    return (
      <div className="col h-75">
        <h4>{`Cash: $${userMoney.toFixed(2)}`}</h4>
        <SearchForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          {...this.state}
        />
        <SearchResults
          handleChange={this.handleChange}
          purchaseStock={this.props.dispatchPurchaseStock}
          {...this.state}
        />

        <div>{this.props.error}</div>
      </div>
    )
  }
}

const mapState = state => ({ user: state.user, userStocks: state.userStocks })
const mapDispatch = dispatch => ({
  dispatchPurchaseStock: (userId, stock, quantity) =>
    dispatch(purchaseStock(userId, stock, quantity)),
  dispatchSearchForStock: ticker => dispatch(searchForStock(ticker))
})

export default connect(
  mapState,
  mapDispatch
)(SearchContainer)

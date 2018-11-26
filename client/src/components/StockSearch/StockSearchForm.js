import React, { Component } from 'react'
import axios from 'axios'
import SelectedStock from './SelectedStock'

class StockSearchForm extends Component {
  constructor() {
    super()
    this.state = { symbol: '', quantity: '', stockSelected: false, stock: {} }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value })
  }

  async searchForStock(stock) {
    try {
      const ticker = stock.toUpperCase()
      const res = await axios.get(
        `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stock}&types=quote`
      )
      const data = await res.data
      console.log('search for stock:', res, data, 'DATA TICKER', data[ticker])
      if (!data[ticker]) {
        console.log('stock not found.')
      } else if (data[ticker].quote) {
        this.setState({
          symbol: '',
          quantity: '',
          stock: data[ticker].quote,
          stockSelected: true
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { symbol, quantity } = this.state
    this.searchForStock(symbol)
  }
  render() {
    return (
      <div>
        <form className="stock-search" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="symbol" className="col-2 col-form-label">
              Stock Symbol
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                value={this.state.symbol}
                onChange={this.handleChange}
                id="symbol"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="symbol" className="col-2 col-form-label">
              Quantity
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                value={this.state.quantity}
                onChange={this.handleChange}
                id="quantity"
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
        <SelectedStock
          stockSelected={this.state.stockSelected}
          {...this.state.stock}
        />
      </div>
    )
  }
}

export default StockSearchForm

import React, { Component } from 'react'
import UserStocks from './UserStocks'
import { connect } from 'react-redux'

class PortfolioContainer extends Component {
  componentDidMount() {
    let stocks = this.props.userStocks
    console.log('MOUNT', stocks)
    // this.props.userStocks.map(stock => {
    //   const marketStock = this.props.marketStocks.find(
    //     stk => stk.quote.symbol === stock.symbol
    //   ).quote
    //   console.log(marketStock.latestPrice, stock.quantity)
    //   price += marketStock.latestPrice + stock.quantity
    // })
    this.setState({ price: 0 })
  }

  render() {
    if (!this.props.marketStocks.length)
      return <div>You don't have any stocks.</div>

    return (
      <div className="row">
        <UserStocks
          totalPrice={this.state.price}
          marketStocks={this.props.marketStocks}
          userStocks={this.props.userStocks}
        />
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

export default connect(mapState)(PortfolioContainer)

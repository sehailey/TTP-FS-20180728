import React from 'react'
import StockLine from './StockLine'
import { connect } from 'react-redux'

const getPrice = stocks => {
  if (stocks.length === 0) return 0
  if (stocks.length === 1) return stocks[0].quantity * stocks[0].currentPrice
  if (stocks.length > 1)
    return stocks
      .map(stock => stock.quantity * stock.currentPrice)
      .reduce((a, b) => a + b)
}
const UserStocks = props => {
  if (!props.userStocks.length) return <div>You don't have any stocks.</div>
  let totalPrice = getPrice(props.userStocks)
  if (!totalPrice) totalPrice = 0

  return (
    <div className="row">
      <h1>{`Portfolio: $${totalPrice.toFixed(2)}`}</h1>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Ticker</th>
              <th scope="col">Shares</th>
              <th scope="col">Current Price</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {props.userStocks.map(stock => (
              <StockLine key={stock.id} {...stock} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    userStocks: state.userStocks
  }
}

export default connect(mapState)(UserStocks)

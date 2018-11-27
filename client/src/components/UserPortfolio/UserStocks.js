import React from 'react'
import StockLine from './StockLine'
import { connect } from 'react-redux'

const UserStocks = props => {
  const { userStocks } = props
  const stockString = userStocks.map(stock => stock.symbol).join(',')
  if (stockString && !props.marketStocks)
    this.props.getMarketStocks(stockString)

  if (!props.marketStocks) return <div />

  // console.log(totalMoney)

  return (
    <div className="row">
      <h1>Portfolio: $5,000.00</h1>
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
            {userStocks.map(stock => (
              <StockLine key={stock.id} {...stock} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserStocks

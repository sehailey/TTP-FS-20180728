import React from 'react'
import StockLine from './StockLine'

const UserStocks = props => {
  const { userStocks } = props

  if (!userStocks.length) return <div>You don't have any stocks.</div>
  let totalPrice = 0
  userStocks.map(stock => (totalPrice += stock.currentPrice * stock.quantity))

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

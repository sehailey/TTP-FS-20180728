import React from 'react'
import StockLine from './StockLine'

const UserStocks = props => {
  const { marketStocks, userStocks } = props

  if (!marketStocks.length) return <div>You don't have any stocks.</div>
  let totalPrice = 0

  console.log(totalPrice)

  // console.log(totalMoney)

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
            {userStocks.map(stock => {
              const marketStock = marketStocks.find(
                stk => stk.quote.symbol === stock.symbol
              ).quote

              return (
                <StockLine
                  key={stock.id}
                  quantity={stock.quantity}
                  {...marketStock}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserStocks

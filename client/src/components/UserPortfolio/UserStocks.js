import React from 'react'
import StockLine from './StockLine'

const StockList = props => {
  const { userStocks } = props
  return (
    <div className="row">
      <h1>Portfolio: $5,000.00</h1>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Ticker</th>
              <th scope="col">Shares</th>
              <th scope="col">Price</th>
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

      {/* <div className="col">
          {this.state.selectedStock ? (
            <div>stock selected</div>
          ) : (
            <div>no stock selected </div>
          )}
        </div> */}
    </div>
  )
}

export default StockList

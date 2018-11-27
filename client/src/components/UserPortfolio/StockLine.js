import React from 'react'

const StockLine = props => {
  const { symbol, quantity, latestPrice } = props

  return (
    <tr>
      <td>{symbol}</td>
      <td>{`${quantity} Shares`}</td>
      <td>{`$${(latestPrice * quantity).toFixed(2)}`}</td>
    </tr>
  )
}

export default StockLine

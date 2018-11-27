import React from 'react'

const StockLine = props => {
  const { symbol, quantity, price, totalPrice } = props
  return (
    <tr>
      <td>{symbol}</td>
      <td>{`${quantity} Shares`}</td>
      <td>{`$${totalPrice.toFixed(2)}`}</td>
    </tr>
  )
}

export default StockLine

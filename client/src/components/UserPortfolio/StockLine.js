import React from 'react'

const StockLine = props => {
  const { symbol, quantity, currentPrice } = props
  console.log(props)

  return (
    <tr>
      <td>{symbol}</td>
      <td>{`${quantity} Shares`}</td>
      <td>{`$${(currentPrice * quantity).toFixed(2)}`}</td>
    </tr>
  )
}

export default StockLine

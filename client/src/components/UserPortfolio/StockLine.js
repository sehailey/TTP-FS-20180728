import React from 'react'

const StockLine = props => {
  const { symbol, quantity, currentPrice, openPrice } = props
  console.log(props, currentPrice, 'STOCKLINE')
  if (!currentPrice) return <tr />

  const change = (currentPrice - openPrice).toFixed(2)
  return (
    <tr>
      <td>{symbol}</td>
      <td>{`$${currentPrice.toFixed(2)}`}</td>
      <td className={change < 0 ? 'text-danger' : 'text-success'}>{`${
        currentPrice < 0 ? '-' : '+'
      }$${change}`}</td>
      <td>{`${quantity} Shares`}</td>
      <td>{`$${(currentPrice * quantity).toFixed(2)}`}</td>
    </tr>
  )
}

export default StockLine

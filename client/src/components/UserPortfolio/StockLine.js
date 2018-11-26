import React from 'react'

const StockLine = props => {
  const { symbol } = props
  return (
    <tr>
      <td>{symbol}</td>
      <td>1 Shares</td>
      <td>$5324.00</td>
    </tr>
  )
}

export default StockLine

import React from 'react'

const StockLine = props => {
  const { symbol } = props
  return <div className="row">{symbol}</div>
}

export default StockLine

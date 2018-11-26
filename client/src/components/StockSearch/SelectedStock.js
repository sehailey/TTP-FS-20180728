import React from 'react'

const SelectedStock = props => {
  const {
    stockSelected,
    companyName,
    change,
    changePercent,
    latestPrice
  } = props
  if (!stockSelected) return <div />
  return (
    <div className="card" style={{ width: '18rem;' }}>
      <div className="card-body">
        <h5 className="card-title">{companyName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{latestPrice}</h6>
        <p className="card-text">{changePercent}</p>
        <a href="#" className="card-link">
          Purchase stock
        </a>
        <a href="#" className="card-link">
          Go back
        </a>
      </div>
    </div>
  )
}

export default SelectedStock

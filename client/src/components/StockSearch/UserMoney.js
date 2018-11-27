import React from 'react'

const UserMoney = props => {
  const { money } = props || 0
  const formatted = money.toFixed(2)

  return (
    <div className="row">
      <div className="col">
        <h6>{`Balance: $${formatted}`}</h6>
      </div>
    </div>
  )
}

export default UserMoney

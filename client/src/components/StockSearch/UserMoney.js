import React from 'react'
import { connect } from 'react-redux'

const getPrice = stocks => {
  if (stocks.length === 0) return 0
  if (stocks.length === 1) return stocks[0].quantity * stocks[0].currentPrice
  if (stocks.length > 1)
    return stocks
      .map(stock => stock.quantity * stock.currentPrice)
      .reduce((a, b) => a + b)
}

const UserMoney = props => {
  const { user, userStocks } = props
  console.log('USERMONEY', user.money, getPrice(userStocks))
  let portfolioValue = getPrice(userStocks)
  let userMoney = user.money + portfolioValue
  const formatted = userMoney.toFixed(2)

  return (
    <div className="row">
      <div className="col">
        <h6>{`Balance: $${formatted}`}</h6>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    userStocks: state.userStocks
  }
}
export default connect(mapState)(UserMoney)

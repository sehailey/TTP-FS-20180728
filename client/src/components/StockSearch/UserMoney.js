import React from 'react'
import { connect } from 'react-redux'

const getCurrentPrice = stocks => {
  if (stocks.length === 0) return 0
  if (stocks.length === 1) return stocks[0].quantity * stocks[0].currentPrice
  if (stocks.length > 1)
    return stocks
      .map(stock => stock.quantity * stock.currentPrice)
      .reduce((a, b) => a + b)
}

const getPurchasePrice = stocks => {
  if (stocks.length === 0) return 0
  if (stocks.length === 1) return stocks[0].totalPurchasePrice
  if (stocks.length > 1)
    return stocks.map(stock => stock.totalPurchasePrice).reduce((a, b) => a + b)
}

const UserMoney = props => {
  const { user, userStocks } = props

  let portfolioValue = getCurrentPrice(userStocks)
  let purchasePrice = getPurchasePrice(userStocks)
  console.log(
    'portfolioValue:',
    portfolioValue,
    'purchasePrice:',
    purchasePrice,
    'profit:',
    portfolioValue - purchasePrice
  )
  let userMoney = user.money + (portfolioValue - purchasePrice)
  const formatted = userMoney.toFixed(2)

  return <h6>{`Balance: $${formatted}`}</h6>
}

const mapState = state => {
  return {
    user: state.user,
    userStocks: state.userStocks
  }
}
export default connect(mapState)(UserMoney)

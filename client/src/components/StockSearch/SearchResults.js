import React from 'react'
import { connect } from 'react-redux'
import { setError, purchaseStock, clearStock } from '../../store'

const SearchResults = props => {
  const stock = props.selectedStock
  if (!stock.symbol) return <div />

  const {
    quantity,
    handleChange,
    dispatchSetError,
    dispatchPurchaseStock
  } = props
  const userMoney = props.user.money
  const userId = props.user.id

  const { companyName, symbol, latestTime, latestPrice } = stock

  const totalPrice = (quantity * latestPrice).toFixed(2)
  const remainingUserMoney = (userMoney - quantity * latestPrice).toFixed(2)

  const validatePurchase = props => {
    if (remainingUserMoney < 0) dispatchSetError('You don\'t have enough funds.')
    else {
      dispatchPurchaseStock(userId, stock, quantity)
    }
  }
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{`${companyName} (${symbol}) $${latestPrice.toFixed(
          2
        )}`}</h5>

        <p className="card-subtitle">{`data as of ${latestTime}`}</p>

        <label htmlFor="quantity" className="col-4 col-form-label">
          Amount to Purchase:
        </label>

        <input
          className="col-2 form-control"
          type="number"
          min="0"
          value={quantity}
          onChange={handleChange}
          id="quantity"
        />

        <p className="card-text">{`Total cost: $${totalPrice}`}</p>
        <p
          className={`card-text ${
            remainingUserMoney < 0 ? 'text-danger' : 'text-dark'
          }`}
        >{`Remaining balance: ${remainingUserMoney}`}</p>
        <button type="button" onClick={validatePurchase}>
          Buy
        </button>
        <button type="button" onClick={() => console.log('CLEAR!')}>
          Go back
        </button>
      </div>
    </div>
  )
}

const mapState = state => ({ ...state })
const mapDispatch = dispatch => ({
  dispatchPurchaseStock: (userId, stock, quantity) => {
    dispatch(purchaseStock(userId, stock, quantity))
    dispatch(clearStock())
  },
  dispatchSetError: error => dispatch(setError(error))
})
export default connect(
  mapState,
  mapDispatch
)(SearchResults)

import axios from 'axios'
import setError from './error'
/**
 * ACTION TYPES
 */
const FOUND_STOCK = 'FOUND_STOCK'
const CLEAR_STOCK = 'CLEAR_STOCK'

/**
 * INITIAL STATE
 */
const defaultStock = {}

/**
 * ACTION CREATORS
 */
export const foundStock = stock => ({
  type: FOUND_STOCK,
  stock
})

export const clearStock = () => ({
  type: CLEAR_STOCK
})

//export const clearStock = () => dispatch => dispatch(clearStock())

/**)
 * THUNK CREATORS
 */

export const searchForStock = ticker => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote`
    )
    if (!data[ticker]) {
      setError({ error: 'stock not found.' })
    } else {
      const stock = data[ticker].quote
      dispatch(foundStock(stock))
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStock, action) {
  switch (action.type) {
  case FOUND_STOCK:
    return action.stock
  case CLEAR_STOCK:
    return {}
  default:
    return state
  }
}

// const stockString = userStockRes
//   .map(userStock => userStock.symbol)
//   .join(',')
// console.log(stockString)
// const stockRes = await axios.get(
//   `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockString}&types=quote`
//   //https://api.iextrading.com/1.0/stock/market/batch?symbols=AAPL,BA&types=quote
// )

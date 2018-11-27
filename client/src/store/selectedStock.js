import axios from 'axios'
import setError from './error'
/**
 * ACTION TYPES
 */
const FOUND_STOCK = 'FOUND_STOCK'

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

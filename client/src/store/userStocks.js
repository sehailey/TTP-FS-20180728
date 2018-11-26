import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_USER_STOCKS = 'GOT_USER_STOCKS'
//const GOT_CURRENT_USER_STOCK_INFO = "GOT_CURRENT_USER_STOCK_INFO"
/**
 * INITIAL STATE
 */
const defaultUserStocks = []

/**
 * ACTION CREATORS
 */
export const gotUserStocks = userStocks => ({
  type: GOT_USER_STOCKS,
  userStocks
})

/**
 * THUNK CREATORS
 */

export const fetchUserStocks = userId => async dispatch => {
  try {
    console.log('INSIDE OF FETCHUSERSTOCKS')
    const userStockRes = await axios.get(`api/users/${userId}/stocks`)
    const userStocks = userStockRes.data
    dispatch(gotUserStocks(userStocks))
  } catch (error) {
    return error
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUserStocks, action) {
  switch (action.type) {
  case GOT_USER_STOCKS:
    console.log('gotuserstocks?')
    return action.userStocks
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

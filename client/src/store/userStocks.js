import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_USER_STOCKS = 'GOT_USER_STOCKS'
const PURCHASED_STOCK = 'PURCHASED_STOCK'
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

export const purchasedStock = stock => ({
  type: PURCHASED_STOCK,
  stock
})
/**)
 * THUNK CREATORS
 */

export const fetchUserStocks = userId => async dispatch => {
  try {
    const { data } = await axios.get(`api/users/${userId}/stocks`)

    dispatch(gotUserStocks(data))
  } catch (error) {
    return error
  }
}

export const purchaseStock = (userId, stock, quantity) => async dispatch => {
  try {
    console.log('NOW PURCHASING', userId, stock.symbol, quantity)
    const { data } = await axios.post(`api/users/${userId}/purchase`, stock)
    //dispatch(purchasedStock(data))
    console.log(data)
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
    return action.userStocks
  default:
    return state
  }
}

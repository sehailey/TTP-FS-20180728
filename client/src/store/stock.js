import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STOCK = 'GET_STOCK'
/**
 * INITIAL STATE
 */
const defaultStock = {}

/**
 * ACTION CREATORS
 */
const getStock = stock => ({ type: GET_STOCK, stock })

/**
 * THUNK CREATORS
 */

export const fetchStock = stock => async dispatch => {
  console.log('INSIDE OF FETCHSTOCK IN STORE')
  try {
    const res = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stock}&types=quote`
    )
    console.log('RES', res)
    dispatch(getStock(res.data))
  } catch (error) {
    return error
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStock, action) {
  switch (action.type) {
  case GET_STOCK:
    return action.stock
  default:
    return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STOCKS = 'GET_STOCKS'
/**
 * INITIAL STATE
 */
const defaultStocks = []

/**
 * ACTION CREATORS
 */
const getStocks = stocks => ({ type: GET_STOCKS, stocks })

/**
 * THUNK CREATORS
 */

export const fetchStocks = stocks => async dispatch => {
  console.log('INSIDE OF FETCHSTOCK IN STORE')
  try {
    const res = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stocks}&types=quote`
    )
    console.log('RES', res)
    dispatch(getStocks(res.data))
  } catch (error) {
    return error
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStocks, action) {
  switch (action.type) {
  case GET_STOCKS:
    return action.stocks
  default:
    return state
  }
}

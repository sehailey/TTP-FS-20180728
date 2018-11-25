import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_USER_STOCKS = 'GET_USER_STOCKS'
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
    const res = await axios.get(`api/users/${userId}/stocks`)
    // const res = await axios.get(
    //   `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stocks}&types=quote`
    // )
    // console.log('RES', res)
    dispatch(gotUserStocks(res.data))
    //console.log(res.data)
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

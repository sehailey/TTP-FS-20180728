import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_MARKET_STOCKS = 'GOT_MARKET_STOCKS'
/**
 * INITIAL STATE
 */
const defaultMarketStocks = []

/**
 * ACTION CREATORS
 */
export const gotMarketStocks = marketStocks => ({
  type: GOT_MARKET_STOCKS,
  marketStocks
})

/**)
 * THUNK CREATORS
 */

export const fetchMarketStocks = stockString => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockString}&types=quote`
    )
    dispatch(gotMarketStocks(Object.values(data)))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultMarketStocks, action) {
  switch (action.type) {
  case GOT_MARKET_STOCKS:
    return action.marketStocks
  default:
    return state
  }
}

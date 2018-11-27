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
    const userStocksRes = await axios.get(`api/users/${userId}/stocks`)
    const userStocks = userStocksRes.data
    const stockString = userStocks.map(stock => stock.symbol).join(',')
    const marketStocksRes = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockString}&types=quote`
    )
    const marketStocks = marketStocksRes.data

    const stockz = []
    userStocks.map(stock =>
      stockz.push({
        id: stock.id,
        symbol: stock.symbol,
        purchasePrice: stock.price,
        quantity: stock.quantity,
        currentPrice: marketStocks[stock.symbol].quote.latestPrice
      })
    )
    dispatch(gotUserStocks(stockz))
  } catch (error) {
    return error
  }
}

export const purchaseStock = (userId, stock, quantity) => async dispatch => {
  try {
    console.log('NOW PURCHASING', userId, stock.symbol, quantity)
    const { data } = await axios.post(`api/users/${userId}/purchase`, {
      stock,
      quantity
    })

    dispatch(purchasedStock(data))
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
  case PURCHASED_STOCK:
    return state.concat(action.stock)
  default:
    return state
  }
}

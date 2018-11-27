import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import userStocks from './userStocks'
import selectedStock from './selectedStock'
import marketStocks from './marketStocks'

import error from './error'

const reducer = combineReducers({
  user,
  userStocks,
  marketStocks,
  selectedStock,
  error
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './error'
export * from './userStocks'
export * from './marketStocks'
export * from './selectedStock'

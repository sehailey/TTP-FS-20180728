const SET_ERROR = 'SET_ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR'

const defaultError = ''
export const setError = error => ({
  type: SET_ERROR,
  error
})

export const clearError = () => ({
  type: CLEAR_ERROR
})

export default function(state = defaultError, action) {
  switch (action.type) {
  case SET_ERROR:
    return action.error
  case CLEAR_ERROR:
    return ''
  default:
    return state
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'load':
      return {
        data: action.data
      }
    default:
      return state
  }
}

export const load = data => ({ type: 'load', data })

export default reducer

import { GET_ERRORS, REGISTERED } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case REGISTERED:
      return {
        ...state,
        registered: action.payload
      };
    default:
      return state;
  }
}

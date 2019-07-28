import { GET_PROMOS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PROMOS:
      return action.payload;
    default:
      return state;
  }
}

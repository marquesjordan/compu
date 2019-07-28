import { CHECK_CUSTOMER } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CHECK_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
}

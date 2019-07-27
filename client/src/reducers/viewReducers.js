import { TOGGLE_VIEW } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case TOGGLE_VIEW:
      return action.payload;
    default:
      return state;
  }
}

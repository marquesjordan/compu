import { SUBSCRIPTION } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload
      };
    default:
      return state;
  }
}

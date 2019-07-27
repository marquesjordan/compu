import { FETCH_CREDITS, CLIENT_REWARD } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CREDITS:
      return {
        ...state,
        credits: action.payload
      };
    case CLIENT_REWARD:
      if (action.payload.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        credits: action.payload.credits
      };
    default:
      return state;
  }
}

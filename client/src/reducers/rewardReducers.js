import { CLIENT_REWARD } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLIENT_REWARD:
      return {
        ...state,
        send: action.payload
      };
    default:
      return state;
  }
}

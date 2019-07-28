import { GET_BUSINESS_SETTINGS } from '../actions/types';

const initialState = {
    settings: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BUSINESS_SETTINGS:
      return {
        ...state,
        settings: action.payload
      };
    default:
      return state;
  }
}

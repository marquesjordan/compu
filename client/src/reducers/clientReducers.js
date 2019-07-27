import {
  FETCH_CLIENTS,
  FETCH_CLIENT,
  FETCH_PROFILE,
  CREATE_REFERRAL,
  SEARCH_CLIENTS,
  REMOVE_CLIENT
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SEARCH_CLIENTS:
      return action.payload || false;
    case FETCH_CLIENTS:
      return action.payload || false;
    case FETCH_CLIENT:
      return action.payload || false;
    case REMOVE_CLIENT:
      return action.payload || false;
    default:
      return state;
  }
}

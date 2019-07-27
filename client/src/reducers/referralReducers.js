import {
  FETCH_REFERRAL,
  FETCH_REFERRALS,
  REMOVE_REFERRAL,
  UPDATE_REFERRAL,
  MESSAGE_SENT,
  CREATE_REFERRAL,
  REMOVE_CLIENT
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_REFERRAL:
      return action.payload || false;
    case FETCH_REFERRAL:
      return action.payload || false;
    case FETCH_REFERRALS:
      return action.payload || false;
    case REMOVE_REFERRAL:
      return action.payload || false;
    case UPDATE_REFERRAL:
      return action.payload || false;
    case REMOVE_CLIENT:
      return action.payload || false;
    default:
      return state;
  }
}

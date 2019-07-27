import { FETCH_USER, FETCH_CLIENTS, FETCH_PROFILE, SET_CURRENT_USER, FETCH_CREDITS } from '../actions/types';

const isEmpty = require("is-empty");

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case FETCH_PROFILE:
      return state || false;
    case SET_CURRENT_USER:
      return action.payload.user || false;
    default:
      return state;
  }
}

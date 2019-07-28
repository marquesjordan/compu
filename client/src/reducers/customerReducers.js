import { CHECK_CUSTOMER, CLEAR_CUSTOMER, ADD_CUSTOMER } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CHECK_CUSTOMER:
      return {
        ...state,
        customer: action.payload.customer,
        profile: action.payload.profile
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customer: action.payload.customer,
        profile: action.payload.profile
      };
    case CLEAR_CUSTOMER:
      return {
        ...state,
        customer: {},
        profile: {}
      };
    default:
      return state;
  }
}

import axios from 'axios';

import { CHECK_CUSTOMER, CLEAR_CUSTOMER, ADD_CUSTOMER } from './types';

export const checkCustomer = value => async dispatch => {
  const res = await axios.post(`/api/getCustomer`, { phone: value });

  dispatch({ type: CHECK_CUSTOMER, payload: res.data });
};

export const clearCustomer = () => async dispatch => {
  dispatch({ type: CLEAR_CUSTOMER, payload: {} });
};

export const addCredit = value => async dispatch => {
  const res = await axios.post(`/api/addCredit`, { phone: value });

  dispatch({ type: ADD_CUSTOMER, payload: res.data });
};

export const subtractCredit = value => async dispatch => {
  const res = await axios.post(`/api/subCredit`, value);

  dispatch({ type: ADD_CUSTOMER, payload: res.data });
};

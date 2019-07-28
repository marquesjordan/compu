import axios from 'axios';

import { GET_PROMOS } from './types';

export const getPromos = () => async dispatch => {
  const res = await axios.get('/api/getPromos', {
    headers: { Authorization: localStorage.jwtToken }
  });

  console.log('PROMOSSS ', res.data);

  dispatch({ type: GET_PROMOS, payload: res.data });
};

export const createPromo = values => async dispatch => {
  const res = await axios.post('/api/addPromo', values, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: GET_PROMOS, payload: res.data });
};

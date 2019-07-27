import axios from 'axios';
import {reset} from 'redux-form';
import {
  CREATE_CLIENT,
  FETCH_CLIENTS,
  FETCH_CLIENT,
  REMOVE_CLIENT,
  TOGGLE_VIEW,
  CREATE_REFERRAL,
  SEARCH_CLIENTS
} from './types';

export const toggleView = val => {
  return {
    type: TOGGLE_VIEW,
    payload: { toggle: val }
  };
};

export const searchClients = (value) => async dispatch => {
  const res = await axios.get(`/api/clients`, {
    headers: { Authorization: localStorage.jwtToken }
  });

  const result = res.data.filter( item => item.firstName.toLowerCase().includes(value) || item.lastName.toLowerCase().includes(value)  );

  dispatch({ type: SEARCH_CLIENTS, payload: result });
};

export const createClient = values => async dispatch => {
  const res = await axios.post('/api/clients', values, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_CLIENTS, payload: res.data });
  dispatch(reset('clientForm'));
};

export const removeClient = clientId => async dispatch => {
  const res = await axios.delete(`/api/clients/${clientId}`, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: REMOVE_CLIENT, payload: res.data });
};

export const fetchClients = () => async dispatch => {
  const res = await axios.get(`/api/clients`, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_CLIENTS, payload: res.data });
};

export const fetchClient = clientId => async dispatch => {
  const res = await axios.get(`/api/client/${clientId}`, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_CLIENT, payload: res.data });
};

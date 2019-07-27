import axios from 'axios';
import {reset} from 'redux-form';
import {
  CREATE_REFERRAL,
  FETCH_REFERRALS,
  FETCH_REFERRAL,
  UPDATE_REFERRAL,
  REMOVE_REFERRAL
} from './types';

export const createReferral = (values, history) => async dispatch => {
  const res = await axios.post('/api/referral', values, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: CREATE_REFERRAL, payload: res.data });
  dispatch(reset('referralForm'));
};

export const createRequestedReferral = (values, clientId) => async dispatch => {
  const res = await axios.post(`/api/referral/${clientId}`, values);

  dispatch({ type: CREATE_REFERRAL, payload: res.data });
};

export const updateReferral = (values, history) => async dispatch => {
  const res = await axios.put('/api/referral', values, {
    headers: { Authorization: localStorage.jwtToken }
  });

  history.push(`/clients/${values._client}/referral`);
  return { type: UPDATE_REFERRAL, payload: res.data };
};

export const removeReferral = (
  clientId,
  referralId
) => async dispatch => {
  const res = await axios.delete(
    `/api/clients/${clientId}/referral/${referralId}`,
    {
      headers: { Authorization: localStorage.jwtToken }
    }
  );

  dispatch({ type: CREATE_REFERRAL, payload: res.data });
};

export const fetchReferrals = clientId => async dispatch => {
  const res = await axios.get(`/api/clients/${clientId}/referral`, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_REFERRALS, payload: res.data });
};

export const fetchReferral = referralId => async dispatch => {
  const res = await axios.get(`/api/referral/${referralId}`, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_REFERRAL, payload: res.data });
};

export const setContacted = data => async dispatch => {
  const res = await axios.post('/api/setContacted', data, {
    headers: {
      Authorization: localStorage.jwtToken
    }
  });

  dispatch({ type: FETCH_REFERRALS, payload: res.data });
};

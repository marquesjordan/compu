import axios from 'axios';
import { FETCH_PROFILE, UPDATE_PROFILE } from './types';

export const fetchUserProfile = () => async dispatch => {
  const res = await axios.get('/api/profile', {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_PROFILE, payload: res.data });
};

export const sendViewNotification = data => async dispatch => {
  const res = await axios.post('/api/sendViewNotification', data);
};

export const sendRequestedNotification = data => async dispatch => {
  const res = await axios.post('/api/sendRequestedNotification', data);
};

export const fetchReviewProfile = id => async dispatch => {
  const res = await axios.get(`/api/profile/${id}`);

  dispatch({ type: FETCH_PROFILE, payload: res.data });
};

export const updateUserProfile = (data, history) => async dispatch => {
  const res = await axios.put('/api/profile', data, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_PROFILE, payload: res.data });
};

export const updateUserLicense = (data) => async dispatch => {
  const res = await axios.put('/api/profileAddLicense', data, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_PROFILE, payload: res.data });
};


export const updateRemoveLicense = (data) => async dispatch => {
  const res = await axios.put('/api/profileRemoveLicense', data, {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_PROFILE, payload: res.data });
};

import axios from 'axios';
import {
  FETCH_USER,
  UPLOAD_FILE,
  FORM_ERROR,
  GET_ERRORS,
  CLIENT_REWARD,
  FETCH_CREDITS,
  SET_CURRENT_USER,
  SUBSCRIPTION
} from './types';

export * from './AuthActions';
export * from './ClientActions';
export * from './ReferralActions';
export * from './ProfileActions';
export * from './CustomerActions';
export * from './BusinessActions';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user', {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUserCredits = () => async dispatch => {
  const res = await axios.get('/api/current_user', {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_CREDITS, payload: res.data.credits });
};

export const handleToken = token => async dispatch => {
  const user = await axios.get('/api/current_user', {
    headers: { Authorization: localStorage.jwtToken }
  });

  dispatch({ type: FETCH_CREDITS, payload: user.data.credits });
};

export const sendRegistrationEmail = data => async dispatch => {
  const res = await axios
    .post('/api/sendEmail', data)
    .then(() => {
      return;
    })
    .catch(err => {});
  return;
};

export const sendActionEmail = data => async dispatch => {
  const res = await axios
    .post('/api/sendEmail', data, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(() => {
      return;
    })
    .catch(err => {});
  return;
};

export const updateSubscription = () => async dispatch => {
  const res = await axios
    .post('/api/update_subscription', {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(() => {
      dispatch({
        type: SUBSCRIPTION,
        payload: { updated: 'Update Subscription Completed!' }
      });
    })
    .catch(err => {
      dispatch({ type: SUBSCRIPTION, payload: { error: 'Cancelation Error' } });
    });
};

export const getSmsNumbers = data => async dispatch => {
  const res = await axios.post('/api/setNumbers', data, {
    headers: {
      Authorization: localStorage.jwtToken
    }
  });
};

export const sendSMS = data => async dispatch => {
  const res = await axios.post('/api/sendSMS', data, {
    headers: {
      Authorization: localStorage.jwtToken
    }
  });

  dispatch({ type: GET_ERRORS, payload: res.data });
};

export const sendGift = data => async dispatch => {
  const res = await axios.post('/api/tango', data, {
    headers: {
      Authorization: localStorage.jwtToken
    }
  });

  dispatch({ type: CLIENT_REWARD, payload: res.data });
};

export const uploadFile = (data, title) => async dispatch => {
  const res = await axios.post(`/api/upload/${title}`, data, {
    headers: {
      Authorization: localStorage.jwtToken
    }
  });

  dispatch({ type: UPLOAD_FILE, payload: res.data });
};

export const removeFile = data => async dispatch => {
  const res = await axios.delete(
    `/api/deleteFile`,
    { data: data },
    {
      headers: { Authorization: localStorage.jwtToken }
    }
  );

  return { type: UPLOAD_FILE, payload: res.data };
};

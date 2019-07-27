import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  REGISTERED
} from './types';
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/register', userData)
    .then(res => {
      dispatch({
        type: REGISTERED,
        payload: {
          registered: {
            toEmail: res.data.email,
            name: res.data.name
          }
        }
      });
    }) // re-direct to login on successful register
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/login', userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const forgotPassword = userData => dispatch => {
  axios
    .post('/api/forgot', userData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: res.data
      });
    }) // re-direct to login on successful register
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const resetPassword = (userData, authToken) => dispatch => {
  axios
    .post(`/api/reset/${authToken}`, userData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: res.data
      });
    }) // re-direct to login on successful register
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => async dispatch => {
  const res = await axios.get('/api/current_user', {
    headers: { Authorization: localStorage.jwtToken }
  });
  decoded['user'] = res.data;
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => async dispatch => {
  // const res = await axios.get('/api/logout');
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  document.location.href = '/';
};

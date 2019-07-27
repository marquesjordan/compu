import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authReducers from './authReducers';
import userReducers from './userReducers';
import clientReducers from './clientReducers';
import referralReducers from './referralReducers';
import profileReducers from './profileReducers';
import uploadReducers from './uploadReducers';
import errorReducers from './errorReducers';
import rewardReducers from './rewardReducers';
import creditsReducers from './creditsReducers';
import viewReducers from './viewReducers';
import subscriptionReducers from './subscriptionReducers';

export default combineReducers({
  auth: authReducers,
  user: userReducers,
  form: reduxForm,
  toastr: toastrReducer,
  clients: clientReducers,
  referrals: referralReducers,
  profile: profileReducers,
  uploaded: uploadReducers,
  errors: errorReducers,
  view: viewReducers,
  rewards: rewardReducers,
  credits: creditsReducers,
  subscription: subscriptionReducers
});

import { UPLOAD_FILE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case UPLOAD_FILE:
      return action.payload || false;
    default:
      return state;
  }
}

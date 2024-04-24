import { ActionTypes } from '../constants';

// Custom Actions
const login = payload => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload: payload,
  };
};

export { login };

import { handleActions } from 'redux-actions';

import {loadStart, dataRecieved, errorOccured, logout, addError } from "actions/user";

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: false,
  errorTextLogin: '',
  errorTextPassword: '',
  token: '',
};

export const userReducer = handleActions({
  [loadStart]: (state) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorTextLogin: '',
      errorTextPassword: '',
    }
  },
  [dataRecieved]: (state, action) => {
    const data = action.payload;
    if (data.status === 'ok') {
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: false,
        errorTextLogin: '',
        errorTextPassword: '',
        token: data.message.token,
      }
    }
    if (data.status === 'err') {
      return {
        ...state,
        error: true,
        errorTextLogin: data.message.username,
        errorTextPassword: data.message.password,
        loading: false,
      }
    }
  },
  [errorOccured]: (state, action) => {
    const data = action.payload;
    return {
      ...state,
      loading: false,
      error: true,
      errorTextLogin: data.message.username,
      errorTextPassword: data.message.password,
    }
  },
  [logout]: (state) => {
    return {
      ...state,
      isLoggedIn: false,
      loading: false,
      error: false,
      errorText: '',
      token: '',
    }
  },
  [addError]: (state, action) => {
    const data = action.payload;
    return {
      ...state,
      error: true,
      errorText: data,
    }
  },
}, initialState);
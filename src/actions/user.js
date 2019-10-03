import { createAction } from 'redux-actions';
import { endpoints } from "../../endpoints";
import axios from "axios";
import {dataRecievedOne} from "actions/todos";

export const loadStart = createAction('[User] Load start');
export const dataRecieved = createAction('[User] Data recieved');
export const errorOccured = createAction('[User] Error occured');
export const logout = createAction('[User] Sign out');
export const addError = createAction('[User] Add error');

export const checkUser = (login, password) => (dispatch) => {

  dispatch(loadStart());

  const params = new URLSearchParams();
  params.append('username', login);
  params.append('password', password);

  axios.post(endpoints.auth, params , {
    mimeType: 'multipart/form-data',
  })
    .then(response => {
      const { data } = response;

      if (data.status === 'ok') {
        dispatch(dataRecieved(data));
      }
      if (data.status === 'error') {
        dispatch(errorOccured(data));
      }
    })
    .catch(error => {
      dispatch(errorOccured(error));
    });
};
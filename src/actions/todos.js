import { createAction } from 'redux-actions';
import axios from 'axios';
import { endpoints } from "../../endpoints";

export const loadStart = createAction('[Todos] Load start');
export const loadStop = createAction('[Todos] Load stop');
export const dataRecieved = createAction('[Todos] Data recieved');
export const dataRecievedOne = createAction('[Todos] Data recieved one');
export const errorOccured = createAction('[Todos] Error occured');
export const dataEditRecieved = createAction('[Todos] Data edit recieved');

export const editTodoText = (id, token, text) => (dispatch) => {

  dispatch(loadStart());

  const params = new URLSearchParams();
  params.append('token', token);
  params.append('text', text);

  const url = `${endpoints.editTodo + id}?developer=Alex`;

  axios.post(url, params , {
    mimeType: 'multipart/form-data',
  })
    .then(response => {
      const { data } = response;

      if (data.status === 'ok') {
        dispatch(dataEditRecieved(data));
      }
    })
    .catch(error => {
      dispatch(errorOccured(error));
    });
};

export const editTodoStatus = (id, token, status) => (dispatch) => {

  dispatch(loadStart());

  const params = new URLSearchParams();
  params.append('token', token);
  params.append('status', status);

  const url = `${endpoints.editTodo + id}?developer=Alex`;

  axios.post(url, params , {
    mimeType: 'multipart/form-data',
  })
    .then(response => {
      const { data } = response;

      if (data.status === 'ok') {
        dispatch(dataEditRecieved(data));
      }
    })
    .catch(error => {
      dispatch(errorOccured(error));
    });
};

export const addTodo = (task) => (dispatch) => {

  dispatch(loadStart());

  const params = new URLSearchParams();
  params.append('username', task.username);
  params.append('email', task.email);
  params.append('text', task.text);

  axios.post(endpoints.addTodo, params , {
    mimeType: 'multipart/form-data',
  })
    .then(data => {
      dispatch(dataRecievedOne(data.data));
    })
    .catch(error => {
      dispatch(errorOccured(error));
    });
};

export const loadTodos = (sort_field, sort_direction, page) => (dispatch) => {

  const url = `${endpoints.todos}&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(dataRecieved(data));
    })
    .catch(error => {
      dispatch(errorOccured(error));
    });
};
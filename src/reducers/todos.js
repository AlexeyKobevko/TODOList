import { handleActions } from 'redux-actions';

import {
  loadStart,
  dataRecieved,
  errorOccured,
  loadStop,
  dataRecievedOne,
  dataEditRecieved,
} from 'actions/todos';

const initialState = {
    loading: false,
    error: false,
    errorText: '',
    entries: [],
    okMessage: '',
    newTask: '',
};

export const todosReducer = handleActions({
  [dataEditRecieved]: (state, action) => {
    const data = action.payload;
    return {
      ...state,
      loading: false,
      okMessage: data.status,
      error: false,
      errorText: '',
    }
  },
  [loadStart]: (state) => {
      return {
        ...state,
        loading: true,
        okMessage: '',
        error: false,
        errorText: '',
      };
  },
  [loadStop]: (state) => {
    return {
      ...state,
      loading: false,
    };
  },
    [dataRecieved]: (state, action) => {
        const data = action.payload;

        if (data.status === 'ok') {
          return {
            ...state,
            entries: data.message.tasks,
            count: data.message.total_task_count,
            loading: false,
            error: false,
            errorText: '',
            okMessage: '',
            newTask: '',
          };
        }
        if (data.status === 'error') {
          return {
            ...state,
            error: true,
            errorText: data.message,
            loading: false,
            okMessage: '',
          }
        }
    },
  [dataRecievedOne]: (state, action) => {
    const data = action.payload;
    console.log(data);
    if (data.status === 'ok') {
      return {
        ...state,
        okMessage: 'Задача успешно добавлена',
        error: false,
        errorText: '',
        newTask: data.message,
        count: parseInt(state.count) + 1,
      };
    }
    if (data.status === 'error') {
      return {
        ...state,
        error: true,
        errorText: data.message,
        loading: false,
        okMessage: '',
      }
    }
  },
    [errorOccured]: (state, action) => {
      const data = action.payload;
        return {
            ...state,
            loading: false,
            error: true,
            errorText: data.message,
        };
    },
}, initialState);
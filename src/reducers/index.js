import { combineReducers } from 'redux';

import { todosReducer} from './todos';
import { userReducer } from "reducers/user";

export const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});
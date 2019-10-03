import { combineReducers } from 'redux';

import { todosReducer} from './todos';
import { userReducer } from "reducers/user";
import { withReduxStateSync } from 'redux-state-sync';

export const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

export default withReduxStateSync(rootReducer);
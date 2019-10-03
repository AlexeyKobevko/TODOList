import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import { rootReducer } from './reducers';

// const persistConfig = {
//   key: 'root',
//   storage,
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);


const stateSync = createStateSyncMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk, stateSync),
);
initStateWithPrevTab(store);

// export const persistor = persistStore(store);
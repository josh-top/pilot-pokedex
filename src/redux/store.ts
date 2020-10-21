import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer, { RootState } from './reducers';

import rootSaga from './sagas';

// save auth inside storage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['history', 'settings'],
};

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middlewares = [sagaMiddleware];

  const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

  const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);
  const store = createStore(persistedReducer, composedEnhancers);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(persistedReducer));
  }

  return { store, persistor };
}

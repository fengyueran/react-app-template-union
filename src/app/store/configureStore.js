import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import { rootReducer } from './rootreducer';
// import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState, history) {
  const middlewares = [thunk, sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'pruduction'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose;

  const store = createStore(
    rootReducer,
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  // store.runSaga(rootSaga);

  if (module.hot) {
    module.hot.accept('./rootreducer', () => {
      const nextReducer = require('./rootreducer'); // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }
  global.store = store;
  return store;
}

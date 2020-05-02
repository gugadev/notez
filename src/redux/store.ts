import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers';
import { rootEpic } from './epics';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const getMiddleware = () => {
    const middlewares = [epicMiddleware];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger() as EpicMiddleware<any>);
    }
    return applyMiddleware(...middlewares);
};

const store = createStore(rootReducer, {}, composeEnhancers(getMiddleware()));

epicMiddleware.run(rootEpic);

export default store;

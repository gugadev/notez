import { createEpicMiddleware } from "redux-observable";
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers";
import rootEpic from "./epics";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const getMiddleware = () => {
    const middlewares = [epicMiddleware];
    if (process.env.NODE_ENV !== "production") {
        middlewares.push(createLogger());
    }
    return applyMiddleware(...middlewares);
};

const store = createStore(rootReducer, {}, composeEnhancers(getMiddleware()));

epicMiddleware.run(rootEpic);

export default store;

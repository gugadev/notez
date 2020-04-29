import { createActions } from 'redux-actions';
import { HOME_LOADING, HOME_LOADED, HOME_LOAD_ERROR } from './home.constants';

export const {
  homeLoading,
  homeLoaded,
  homeLoadError
} = createActions(
  {},
  HOME_LOADING,
  HOME_LOADED,
  HOME_LOAD_ERROR
);


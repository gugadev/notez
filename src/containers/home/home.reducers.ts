import { handleActions } from 'redux-actions';
import { HOME_LOADING, HOME_LOADED, HOME_LOAD_ERROR } from './home.constants';
import { homeState, HomeState } from './home.state';

const handleHomeLoading = (state: HomeState, action: any): HomeState => ({
  ...state,
  loading: action.loading
});

const handleHomeLoaded = (state: any, action: any): HomeState => ({
  ...state,
  loading: false,
  data: action.payload
});

const handleHomeError = (state: any, action: any): HomeState => ({
  ...state,
  loading: false,
  error: action.payload
});

export const homeReducers = handleActions(
  {
    [HOME_LOADING]: {
      next: handleHomeLoading,
      throw: handleHomeError
    },
    [HOME_LOADED]: {
      next: handleHomeLoaded,
      throw: handleHomeError
    },
    [HOME_LOAD_ERROR]: {
      next: handleHomeError,
      throw: handleHomeError
    }
  },
  homeState
);

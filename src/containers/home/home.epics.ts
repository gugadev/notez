import { ofType, combineEpics } from "redux-observable";
import { map } from 'rxjs/operators';
import { HOME_LOADING } from "./home.constants";
import { homeLoaded } from "./home.actions";

const fetchHome = (action$: any) => action$.pipe(
  ofType(HOME_LOADING),
  map(() => homeLoaded('fakedata'))
);

export const homeEpics = combineEpics(
  fetchHome
);

export interface HomeState {
  loading?: boolean;
  data?: Record<string, any>;
  error?: Error | null
}

export const homeState: HomeState = {
  loading: false,
  data: {},
  error: null
};

import { useEffect, useReducer } from 'react';

export enum ActionType {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Action<D> = {
  type: ActionType;
  payload?: { data: D | null; error: Error | null };
};

interface State<D> {
  loading: boolean;
  data: D | null;
  error: Error | null;
}

const reducer = <D>(state: State<D>, action: Action<D>): State<D> => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case ActionType.SUCCESS:
      return {
        loading: false,
        data: action.payload ? action.payload.data : null,
        error: null,
      };
    case ActionType.ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload ? action.payload.error : null,
      };
    default:
      return state;
  }
};

export type Response<D> = { data?: D; error?: Error };

type Callback<D> = () => Promise<Response<D>>;

export const useFetch = <D, E>(
  callback: Callback<D>,
  deps: E[],
  initialFetch = false
) => {
  const initialState: State<D> = {
    loading: false,
    data: null,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const res = await callback();
      if (!res.data)
        return dispatch({
          type: ActionType.ERROR,
          payload: { data: null, error: res.error ?? null },
        });
      return dispatch({
        type: ActionType.SUCCESS,
        payload: { data: res.data, error: null },
      });
    } catch (error) {
      if (error instanceof Error)
        dispatch({
          type: ActionType.ERROR,
          payload: { data: null, error },
        });
    }
  };

  useEffect(() => {
    initialFetch && fetchData();
  }, deps);

  return [state, fetchData] as [State<D>, () => Promise<void>];
};

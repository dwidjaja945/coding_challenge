import React from "react";

const initialState = {
  loading: false,
  data: [],
  error: null
};
const reducer = (state, action) => {
  switch (action.type) {
    case "fetchingData":
      return {
        ...state,
        loading: true
      };
    case "data":
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case "error":
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

interface UseFetchTypes<T> {
  loading: Boolean;
  error: Error | null;
  data: T;
}

export function useFetch<T, U>(url: string, params?: U): UseFetchTypes<T> {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    dispatch({
      type: "fetchingData"
    });
    fetch(url, params)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: "data",
          payload: {
            data: resp
          }
        });
      })
      .catch(error => dispatch({ type: "error", payload: { error } }));
  }, []);

  const { loading, data, error } = state;
  return { loading, data, error };
}

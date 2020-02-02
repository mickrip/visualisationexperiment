import { useReducer, useCallback, useRef, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "startFetching":
      return { ...state, hasFetched: true, isFetching: true };
    case "error":
      return {
        ...state,
        hasFetched: true,
        isFetching: false,
        error: action.payload,
        hasErrors: true
      };
    case "success":
      return {
        ...state,
        hasFetched: true,
        isFetching: false,
        data: action.payload,
        error: undefined,
        hasErrors: false
      };
    default:
      return state;
  }
}

const initialState = {
  hasFetched: false,
  isFetching: false,
  hasErrors: false,
  data: undefined,
  error: undefined
};

const usePromise = promFunc => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    isFetchingRef.current = state.isFetching;
  }, [state.isFetching]);

  const refresh = useCallback(
    (...args) => {
      if (isFetchingRef.current === true) return;
      dispatch({ type: "startFetching" });
      let _data;
      let _error;
      promFunc(...args)
        .then(payload => {
          _data = payload;
        })
        .catch(err => {
          _error = err;
        })
        .finally(_ => {
          if (_data) {
            dispatch({ type: "success", payload: _data });
          }
          if (_error) {
            dispatch({ type: "error", payload: _error });
          }
        });
    },
    [promFunc]
  );

  return [{ ...state }, refresh];
};

export default usePromise;

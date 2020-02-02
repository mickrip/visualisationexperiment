import React, { useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import AppContext from "./AppContext";

const DefaultWrapper = ({ children }) => {
  return <>{children}</>;
};

const defaultMiddleware = () => {};

function reducer(state, action) {
  switch (action.type) {
    case "updateState":
      return { ...state, ...action.payload };
    case "addState":
      return { ...state, ...{ [action.name]: action.payload } };
    default:
      return state;
  }
}

let oldMapOfInstancesStringified;

const AppStateProvider = ({
  children,
  containers = {},
  wrappers = [<DefaultWrapper />],
  middleware = [defaultMiddleware]
}) => {
  const [isInitialised, setInitialised] = useState(false);
  const [state, dispatcher] = useReducer(reducer, {});

  // refresh instances
  let mapOfInstances = {};
  Object.keys(containers).forEach(k => {
    mapOfInstances[k] = containers[k](state, dispatcher);
  });

  // middleware and state-related effect hooks
  useEffect(() => {
    // run middleware init function
    if (!isInitialised) {
      middleware.forEach(({ init }) => {
        if (init) {
          init(dispatcher);
        }
      });
      setInitialised(true);
    }

    // run middleware update function and update state
    if (isInitialised) {
      const mapOfInstancesStringified = JSON.stringify(mapOfInstances);

      if (oldMapOfInstancesStringified !== mapOfInstancesStringified) {
        // run all middleware
        middleware.forEach(({ update }) => {
          if (update) {
            update(mapOfInstances, dispatcher);
          }
        });

        // dispatch state update
        const newMap = JSON.parse(mapOfInstancesStringified);
        dispatcher({ type: "updateState", payload: newMap });
        oldMapOfInstancesStringified = mapOfInstancesStringified;
      }
    }
  }, [isInitialised, mapOfInstances, middleware]);

  const WrapperComponents = wrappers.reduce((acc, curr) => {
    return React.cloneElement(curr, { children: acc });
  }, children);

  return (
    <AppContext.Provider value={[mapOfInstances, dispatcher]}>
      {isInitialised && WrapperComponents}
    </AppContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.element.isRequired,
  containers: PropTypes.object.isRequired,
  wrappers: PropTypes.arrayOf(PropTypes.element)
};

export default AppStateProvider;

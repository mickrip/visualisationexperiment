import get from "lodash/get";

const persistLocalStorage = (test = []) => {
  return {
    update: state => {
      let collectPersist = {};
      test.forEach(key => {
        const nodeKey = key.container + "." + key.key;
        const foo = get(state, nodeKey);
        if (!collectPersist[key.container]) collectPersist[key.container] = {};

        collectPersist[key.container] = {
          ...collectPersist[key.container],
          ...{ [key.key]: foo }
        };
      });
      localStorage.setItem("react_persist", JSON.stringify(collectPersist));
    },
    init: dispatch => {
      const persist = localStorage.getItem("react_persist");
      if (persist) {
        dispatch({
          type: "addState",
          name: "localStorageInit",
          payload: JSON.parse(persist)
        });
      }
    }
  };
};

export default persistLocalStorage;

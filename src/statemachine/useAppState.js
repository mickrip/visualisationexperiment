import { useContext } from "react";
import AppContext from "./AppContext";

const useAppState = container => {
  const [containers] = useContext(AppContext);

  // Check if we even have an appContext
  if (!containers) {
    throw new Error("State Machine cannot find context.");
  }

  // return entire state if there's no parameter
  if (!container) return containers;

  const containerInstance = containers[container];
  if (containerInstance === undefined) {
    console.error("containers available", Object.keys(containers));
    throw Error(
      `AppState Container '${container}' does not exist. See the console for available containers.`
    );
  }
  return containerInstance;
};

export default useAppState;

import React from "react";
import AppStateProvider from "./statemachine/AppStateProvider";
import Home from "./components/Home/Home";
import "./App.css";
const containers = {};

function App() {
  return (
    <AppStateProvider containers={containers}>
      <Home />
    </AppStateProvider>
  );
}

export default App;

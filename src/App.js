import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard";
// Main Routes file
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import appReducer from "./containers/reducers";

const initialState = {};

const middleware = [thunk];

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
      )
    : createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
      );

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route exact path="/" name="Dashboard" component={Dashboard} />
      </HashRouter>
    </Provider>
  );
}

export default App;

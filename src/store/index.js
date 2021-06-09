import { compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

// Enables Redux-Store chrome extention in browser
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
// Redux - Store
const store = createStore(combineReducers,initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

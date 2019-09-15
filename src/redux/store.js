import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { characterReducer, loginReducer } from "./reducers";

const rootReducer = combineReducers({ characterReducer, loginReducer });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export { store };

import boardReducer from "./board-reducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({ app: boardReducer });

export default rootReducers;
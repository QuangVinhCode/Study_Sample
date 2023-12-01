import { combineReducers } from "redux";
import classReducer from "./reducers/classReducer";
import commonReducer from "./reducers/commonReducer";

const rootReducer = combineReducers({
  classReducer: classReducer,
  commonReducer: commonReducer,
});

export default rootReducer;

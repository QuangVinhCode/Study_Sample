import { combineReducers } from "redux";
import classReducer from "./reducers/classReducer";
import subjectReducer from "./reducers/subjectReducer";
import commonReducer from "./reducers/commonReducer";

const rootReducer = combineReducers({
  classReducer: classReducer,
  subjectReducer: subjectReducer,
  commonReducer: commonReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import classReducer from "./reducers/classReducer";
import subjectReducer from "./reducers/subjectReducer";
import commonReducer from "./reducers/commonReducer";
import lessonReducer from "./reducers/lessonReducer";
import accountReducer from "./reducers/accountReducer";

const rootReducer = combineReducers({
  classReducer: classReducer,
  subjectReducer: subjectReducer,
  lessonReducer: lessonReducer,
  commonReducer: commonReducer,
  accountReducer:accountReducer,
});

export default rootReducer;

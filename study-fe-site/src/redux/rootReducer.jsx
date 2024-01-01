import { combineReducers } from "redux";
import commonReducer from "./reducers/commonReducer";
import lessonReducer from "./reducers/lessonReducer";
import exerciseReducer from "./reducers/exerciseReducer";
const rootReducer = combineReducers({
  lessonReducer: lessonReducer,
  exerciseReducer: exerciseReducer,
  commonReducer: commonReducer,
});

export default rootReducer;

import { EXERCISES_SET, EXERCISE_DELETE, EXERCISE_SET, EXERCISE_STATE_CLEAR } from "../actions/actionTypes";
const initialState = {
  exercise: {},
  exercises: [],
};

const exerciseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EXERCISE_SET:
      return { ...state, exercise: payload };
    case EXERCISES_SET:
      return { ...state, exercises: payload };
    case EXERCISE_DELETE:
      return { ...state, exercises: state.exercises.filter((item) => item.id !== payload), };
    case EXERCISE_STATE_CLEAR:
      return {
        exercise: {},
        exercises: [],
      };
    default:
      return state;
  }
};

export default exerciseReducer;

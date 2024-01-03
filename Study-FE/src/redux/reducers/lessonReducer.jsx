import { LESSONS_SET, LESSON_APPEND, LESSON_DELETE, LESSON_SET, LESSON_UPDATE } from "../actions/actionTypes";

const initialState = {
  lesson: {},
  lessons: [],
};

const lessonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LESSON_SET:
      return { ...state, lesson: payload };
    case LESSONS_SET:
      return { ...state, lessons: payload };
    case LESSON_APPEND:
      return { ...state, lessons: [...state.lessons,payload] };
    case LESSON_DELETE:
      return {
        ...state,
        lessons: state.lessons.filter((item) => item.id !== payload),
      };
      case LESSON_UPDATE:
        const newLessons = state.lessons.filter((item) => item.id !== payload.id);
        return {
          ...state,
          lessons: [payload,...newLessons],
        };
    default:
      return state;
  }
};

export default lessonReducer;

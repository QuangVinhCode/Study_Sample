import {SUBJECTS_SET, SUBJECT_DELETE, SUBJECT_SET, SUBJECT_STATE_CLEAR } from "./../actions/actionTypes";
const initialState = {
  subject: {},
  subjects: [],
};

const subjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBJECT_SET:
      return { ...state, subject: payload };
    case SUBJECTS_SET:
      return { ...state, subjects: payload };
    case SUBJECT_DELETE:
      return { ...state, subjects: state.subjects.filter((item) => item.id !== payload), };
    case SUBJECT_STATE_CLEAR:
      return {
        subject: {},
        subjects: [],
      };
    default:
      return state;
  }
};

export default subjectReducer;
